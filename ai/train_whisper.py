"""
Whisper 한국어 파인튜닝 스크립트 (Hugging Face Transformers)

설치:
  pip install torch transformers accelerate evaluate jiwer librosa soundfile pandas datasets

데이터 형식 (CSV, UTF-8):
  path,text
  /data/wav/0001.wav,안녕하세요 고객센터입니다
  /data/wav/0002.wav,카드 분실 신고하려고요

실행 예:
  python train_whisper.py --train train.csv --eval eval.csv --model openai/whisper-small --out ./whisper-ko
"""
import argparse
from dataclasses import dataclass
from typing import Any

import evaluate
import librosa
import pandas as pd
from datasets import Dataset
from transformers import (
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments,
    WhisperForConditionalGeneration,
    WhisperProcessor,
)

SR = 16000          # Whisper 입력 샘플레이트 (8kHz 녹취도 여기서 16kHz로 리샘플링됨)
MAX_SEC = 30        # Whisper는 30초 창 단위
MAX_LABEL_TOKENS = 448


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--train", required=True)
    p.add_argument("--eval", required=True)
    p.add_argument("--model", default="openai/whisper-small")
    p.add_argument("--out", default="./whisper-ko")
    p.add_argument("--batch", type=int, default=16)
    p.add_argument("--accum", type=int, default=1)
    p.add_argument("--lr", type=float, default=1e-5)
    p.add_argument("--steps", type=int, default=4000)
    return p.parse_args()


def load_csv(path: str) -> Dataset:
    df = pd.read_csv(path)
    return Dataset.from_pandas(df[["path", "text"]].dropna().reset_index(drop=True))


@dataclass
class SpeechCollator:
    processor: Any
    decoder_start_token_id: int

    def __call__(self, features):
        inputs = [{"input_features": f["input_features"]} for f in features]
        batch = self.processor.feature_extractor.pad(inputs, return_tensors="pt")

        labels = [{"input_ids": f["labels"]} for f in features]
        lb = self.processor.tokenizer.pad(labels, return_tensors="pt")
        # 패딩 위치는 loss 계산에서 제외(-100)
        label_ids = lb["input_ids"].masked_fill(lb["attention_mask"].ne(1), -100)
        # 토크나이저가 붙인 시작 토큰은 모델이 자동으로 붙이므로 제거
        if (label_ids[:, 0] == self.decoder_start_token_id).all().item():
            label_ids = label_ids[:, 1:]
        batch["labels"] = label_ids
        return batch


def main():
    a = parse_args()

    processor = WhisperProcessor.from_pretrained(a.model, language="korean", task="transcribe")
    model = WhisperForConditionalGeneration.from_pretrained(a.model)
    model.generation_config.language = "korean"
    model.generation_config.task = "transcribe"
    model.generation_config.forced_decoder_ids = None
    model.config.use_cache = False  # gradient checkpointing과 함께 사용

    def prepare(ex):
        audio, _ = librosa.load(ex["path"], sr=SR)
        ex["input_features"] = processor.feature_extractor(audio, sampling_rate=SR).input_features[0]
        ex["input_length"] = len(audio) / SR
        ex["labels"] = processor.tokenizer(ex["text"]).input_ids
        return ex

    def keep(ex):
        return ex["input_length"] <= MAX_SEC and len(ex["labels"]) <= MAX_LABEL_TOKENS

    train_ds = load_csv(a.train).map(prepare, remove_columns=["path", "text"]).filter(keep)
    eval_ds = load_csv(a.eval).map(prepare, remove_columns=["path", "text"]).filter(keep)
    train_ds = train_ds.remove_columns("input_length")
    eval_ds = eval_ds.remove_columns("input_length")
    print(f"train={len(train_ds)}  eval={len(eval_ds)}")

    cer_metric = evaluate.load("cer")  # 한국어는 WER보다 CER

    def compute_metrics(pred):
        pred_ids, label_ids = pred.predictions, pred.label_ids
        label_ids[label_ids == -100] = processor.tokenizer.pad_token_id
        pred_str = processor.batch_decode(pred_ids, skip_special_tokens=True)
        label_str = processor.batch_decode(label_ids, skip_special_tokens=True)
        return {"cer": 100 * cer_metric.compute(predictions=pred_str, references=label_str)}

    args = Seq2SeqTrainingArguments(
        output_dir=a.out,
        per_device_train_batch_size=a.batch,
        gradient_accumulation_steps=a.accum,   # GPU 메모리 부족 시 batch를 줄이고 accum을 늘림
        learning_rate=a.lr,
        warmup_steps=500,
        max_steps=a.steps,
        gradient_checkpointing=True,
        fp16=True,                              # Ampere 이상 GPU면 bf16=True 권장
        eval_strategy="steps",
        eval_steps=1000,
        save_steps=1000,
        logging_steps=25,
        per_device_eval_batch_size=8,
        predict_with_generate=True,
        generation_max_length=225,
        load_best_model_at_end=True,
        metric_for_best_model="cer",
        greater_is_better=False,
        save_total_limit=2,
        report_to="none",
    )

    trainer = Seq2SeqTrainer(
        model=model,
        args=args,
        train_dataset=train_ds,
        eval_dataset=eval_ds,
        data_collator=SpeechCollator(processor, model.config.decoder_start_token_id),
        compute_metrics=compute_metrics,
        processing_class=processor,
    )

    # 학습 전 기준 성능(베이스라인) 측정 — 이 값보다 좋아져야 의미가 있음
    print("baseline:", trainer.evaluate())
    trainer.train()
    print("final:", trainer.evaluate())

    trainer.save_model(a.out)
    processor.save_pretrained(a.out)


if __name__ == "__main__":
    main()
