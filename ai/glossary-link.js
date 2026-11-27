(function(){
var M={"LLM": "llm", "대규모 언어 모델": "llm", "트랜스포머": "transformer", "파라미터": "param", "가중치": "param", "GPU 메모리": "gpu", "GPU": "gpu", "HBM": "gpu", "VRAM": "gpu", "추론": "train-infer", "토큰": "token", "어텐션": "attention", "KV 캐시": "kvcache", "컨텍스트 길이": "context", "컨텍스트": "context", "GQA": "gqa", "MQA": "gqa", "PagedAttention": "paged", "vLLM": "paged", "프롬프트 캐싱": "promptcache", "양자화": "quant", "손실": "loss", "loss": "loss", "경사하강법": "gd", "학습률": "gd", "역전파": "backprop", "옵티마이저": "adam", "Adam": "adam", "과적합": "overfit", "사전학습": "pretrain", "파인튜닝": "finetune", "LoRA": "lora", "QLoRA": "qlora", "망각": "forget", "혼합 정밀도": "mixed", "BF16": "mixed", "FP16": "mixed", "그래디언트 체크포인팅": "ckpt", "Whisper": "whisper", "위스퍼": "whisper", "샘플레이트": "samplerate", "16kHz": "samplerate", "8kHz": "samplerate", "로그 멜 스펙트로그램": "mel", "인코더": "encdec", "디코더": "encdec", "CER": "cer", "WER": "cer", "VAD": "vad", "환각": "hallu", "ITN": "itn", "강제 정렬": "align", "평가셋": "split", "학습셋": "split", "데이터 누수": "split", "라벨 마스킹": "labelmask", "개인정보 마스킹": "pii", "NER": "ner", "정규식": "regex", "재현율": "pr", "정밀도": "pr", "합성 데이터": "synth", "RAG": "rag"};
var keys=Object.keys(M).sort(function(a,b){return b.length-a.length;});
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function w(c){return /[A-Za-z0-9]/.test(c);}
var RE=new RegExp(keys.map(function(k){var p=esc(k);if(w(k[0]))p='(?<![A-Za-z0-9])'+p;if(w(k[k.length-1]))p+='(?![A-Za-z0-9])';return p;}).join('|'),'g');
var st=document.createElement('style');
st.textContent='a.gl{color:inherit;text-decoration:underline dotted;text-decoration-color:var(--muted,#888);text-underline-offset:3px}a.gl:hover{color:var(--pu-s,#534AB7);text-decoration-color:currentColor}';
document.head.appendChild(st);
var GP=document.body.classList.contains('gl-page'),PRE=GP?'#':'glossary.html#';
function pcIsComputer(t,i){var b=t.slice(Math.max(0,i-4),i),a=t.slice(i+2,i+8);return /(IBM |일반 |비트 |새 |지금 )$/.test(b)||/^(용|에 RAM|에서| 통신| 메인보드| AT| SSD| 운영체제|는 )/.test(a);}
function mbrSkip(t,i,aid){var a=t.slice(i+3,i+12);if(['mbrgpt','bios','uefi','firmware'].indexOf(aid)>=0)return !/^\(메모리 버퍼/.test(a);return /^(\(Master| 파티션)/.test(a);}
function link(root,used,skipDesc,noPC,aid){
  var sel='a,button,script,style,svg,code,pre,h1,textarea,#stitle'+(skipDesc?',#sdesc':'');
  var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,list=[];
  while((n=tw.nextNode())){if(n.nodeValue.trim()&&!n.parentElement.closest(sel))list.push(n);}
  list.forEach(function(node){
    var t=node.nodeValue,m,last=0,frag=null;RE.lastIndex=0;
    while((m=RE.exec(t))){
      var id=M[m[0]];if(m[0]==='PC'&&(noPC||pcIsComputer(t,m.index)))continue;if(m[0]==='MBR'&&mbrSkip(t,m.index,aid))continue;if(used.has(id))continue;used.add(id);
      if(!frag)frag=document.createDocumentFragment();
      frag.appendChild(document.createTextNode(t.slice(last,m.index)));
      var a=document.createElement('a');a.className='gl';a.href=PRE+id;a.textContent=m[0];
      frag.appendChild(a);last=m.index+m[0].length;
    }
    if(frag){frag.appendChild(document.createTextNode(t.slice(last)));node.parentNode.replaceChild(frag,node);}
  });
}
var PCOK=['pcb','thread','process','ctxsw','interrupt','isr','ivec','sp','icycle','flags','register','cu','ir','mar','mbr','gpr'];
if(GP){document.querySelectorAll('article.term').forEach(function(art){var d=art.querySelector('dl');if(d)link(d,new Set([art.id]),false,PCOK.indexOf(art.id)<0,art.id);});}
else link(document.querySelector('main')||document.body,new Set(),true);
var f=document.querySelector('footer');
if(!GP&&f&&!f.querySelector('a[href="glossary.html"]')){f.appendChild(document.createTextNode(' · '));var g=document.createElement('a');g.href='glossary.html';g.textContent='용어 사전';f.appendChild(g);}
var T={"llm": ["LLM (대규모 언어 모델)", "2018~2020", "수십억~수조 개의 파라미터를 가진 트랜스포머 모델에 방대한 글을 학습시켜, 다음 토큰을 예측하는 방식으로 글을 이해하고 만들어 내는 모델. Claude, GPT, Gemini, Qwen이 모두 여기에 속한다."], "transformer": ["트랜스포머", "2017", "2017년 구글 논문 \"Attention Is All You Need\"에서 나온 신경망 구조. 순서대로 처리하는 대신 어텐션으로 모든 단어 쌍의 관계를 한 번에 계산해 GPU 병렬 처리에 잘 맞는다."], "param": ["파라미터 (가중치)", "1958", "모델 안에 들어 있는, 학습으로 조정되는 숫자들. Whisper large는 약 15억 개, Qwen 7B는 약 70억 개다."], "gpu": ["GPU · GPU 메모리 (VRAM · HBM)", "2007~2013", "수천 개의 작은 코어로 같은 계산을 동시에 하는 칩. GPU에 붙은 전용 메모리(VRAM)에 모델 가중치와 KV 캐시가 올라가며, 데이터센터용 GPU는 대역폭이 매우 높은 HBM을 쓴다."], "train-infer": ["학습 · 추론", "2012~", "학습은 데이터로 가중치를 조정하는 단계, 추론은 완성된 가중치로 입력에 대한 출력을 계산하는 단계다."], "token": ["토큰", "2016", "모델이 글을 처리하는 기본 단위. 단어보다 작고 글자보다 큰 조각이며, 각 토큰은 번호(ID)로 바뀌어 모델에 들어간다."], "attention": ["어텐션 (Q · K · V)", "2014~2017", "각 토큰이 Query(내가 찾는 것) · Key(나를 찾을 때 쓰는 표지) · Value(내가 가진 정보)를 만든다."], "kvcache": ["KV 캐시", "2017~", "앞서 처리한 토큰들의 Key · Value 벡터를 GPU 메모리에 저장해 두고 재사용하는 것. 계산을 줄이는 대신 메모리를 쓴다(메모이제이션)."], "context": ["컨텍스트 길이", "2017~2024", "모델이 한 번에 입력으로 받아 참조할 수 있는 최대 토큰 수. 질문, 대화 기록, 첨부 문서, 생성 중인 답이 모두 여기에 들어간다."], "gqa": ["GQA · MQA", "2019~2023", "여러 Query 헤드가 하나의 K · V 헤드를 공유하게 해서 KV 캐시 크기를 줄이는 방법. MQA는 전부가 1벌을 공유하고, GQA는 몇 개 그룹으로 나눠 공유한다."], "paged": ["PagedAttention (vLLM)", "2023", "KV 캐시를 고정 크기 블록으로 나눠, 토큰이 늘어날 때마다 블록을 하나씩 할당하고 표로 위치를 관리하는 기법. 같은 GPU로 동시에 처리하는 요청 수가 크게 늘어난다."], "promptcache": ["프롬프트 캐싱", "2024", "여러 요청에 공통으로 들어가는 앞부분(프롬프트 접두부)의 KV 캐시를 저장해 두고 다음 요청에서 재사용하는 것."], "quant": ["양자화", "2022~", "가중치(나 KV 캐시)를 16비트 대신 8비트, 4비트처럼 더 적은 비트로 저장해 메모리와 대역폭을 줄이는 기법."], "loss": ["손실 (loss)", "1805", "모델의 출력이 정답과 얼마나 다른지를 숫자 하나로 나타낸 값. 학습은 이 값을 줄이는 과정이다."], "gd": ["경사하강법 · 학습률", "1847", "손실을 각 가중치로 미분한 기울기(gradient)를 구하고, 그 반대 방향으로 조금씩 가중치를 고치는 방법. 한 번에 얼마나 고칠지 정하는 보폭이 학습률이다."], "backprop": ["역전파", "1986", "미분의 연쇄 법칙을 이용해, 손실에서 출발해 출력층에서 입력층 방향으로 거꾸로 계산하며 모든 가중치의 기울기를 한 번에 구하는 방법."], "adam": ["옵티마이저 (Adam)", "2014", "기울기를 받아 실제로 가중치를 어떻게 고칠지 정하는 알고리즘. Adam(AdamW)은 가중치마다 기울기의 이동 평균과 기울기 제곱의 이동 평균, 두 값을 저장해 보폭을 자동 조절한다."], "overfit": ["과적합", "통계학부터", "모델이 학습 데이터의 일반적인 패턴 대신 개별 사례를 외워, 학습 데이터에서는 잘 맞지만 새 데이터에서는 성능이 떨어지는 현상."], "pretrain": ["사전학습", "2018", "무작위 가중치에서 시작해 방대한 데이터로 모델의 기본 능력을 만드는 첫 학습 단계. Whisper는 68만 시간 음성, Qwen2.5는 18조 토큰으로 사전학습됐다."], "finetune": ["파인튜닝", "2014~2018", "사전학습이 끝난 모델의 가중치에서 출발해, 비교적 적은 양의 내 데이터로 추가 학습시켜 특정 용도에 맞추는 것. 알고리즘은 사전학습과 같고 출발점과 데이터 규모만 다르다."], "lora": ["LoRA", "2021", "원본 가중치는 고정하고, 각 층에 작은 행렬 두 개(A · B)를 붙여 그 곱만큼만 가중치가 바뀌도록 학습하는 방법. 학습 대상 파라미터가 원본의 1% 미만으로 줄어든다."], "qlora": ["QLoRA", "2023", "원본 가중치를 4비트로 양자화해 GPU에 올리고, 그 위에 LoRA 어댑터를 붙여 학습하는 방법. LoRA보다 메모리를 다시 크게 줄인다."], "forget": ["망각 (파국적 망각)", "1989", "신경망이 새 데이터로 학습하면서 기존에 학습한 능력을 크게 잃는 현상. 가중치 전체가 새 데이터에만 맞춰지기 때문이다."], "mixed": ["혼합 정밀도 (FP16 · BF16)", "2017~2020", "순전파 · 역전파 계산은 16비트로 하고, 가중치의 원본 사본과 옵티마이저 상태는 32비트로 유지하는 학습 방식. BF16은 FP32와 같은 지수 범위를 가진 16비트 형식이라 FP16보다 안정적이다."], "ckpt": ["그래디언트 체크포인팅", "2016", "순전파 중간값을 일부 지점에만 저장하고, 역전파 때 필요한 나머지는 그 지점부터 다시 계산하는 기법. 메모리를 계산 시간과 맞바꾼다."], "whisper": ["Whisper", "2022", "OpenAI가 웹에서 모은 약 68만 시간의 다국어 음성-자막 데이터로 학습한 트랜스포머 인코더-디코더 음성 인식 모델. tiny(39M)부터 large-v3(1.55B), 경량화한 large-v3-turbo(809M)까지 있다."], "samplerate": ["샘플레이트 (8kHz · 16kHz)", "1928~1949", "1초에 소리 크기를 몇 번 측정해 저장하는지를 나타내는 값. 16kHz는 1초에 16,000번 측정한다."], "mel": ["로그 멜 스펙트로그램", "1937", "오디오를 짧은 구간(10ms 간격)마다 주파수 분석하고, 사람 귀의 감각에 맞춘 멜 척도로 묶은 뒤 로그를 취한 2차원 표. Whisper의 입력 형식이다(80칸, large-v3는 128칸)."], "encdec": ["인코더 · 디코더", "2014", "인코더는 입력 전체를 읽어 의미 있는 표현으로 바꾸고, 디코더는 그 표현을 어텐션으로 참조하면서 출력 토큰을 하나씩 생성한다."], "cer": ["CER · WER", "1980s~", "인식 결과를 정답과 비교해, 글자(CER) 또는 단어(WER)를 몇 개 바꾸고 · 지우고 · 끼워 넣어야 같아지는지 센 뒤 정답 길이로 나눈 값. 낮을수록 좋다."], "vad": ["VAD (음성 구간 검출)", "1960s~", "오디오에서 사람이 말하는 구간과 무음 · 잡음 구간을 구분하는 기술. STT 앞단에서 인식할 구간을 고르고, 긴 오디오를 자연스러운 쉼에서 자르는 데 쓴다."], "hallu": ["환각", "2022~", "모델이 입력(음성 · 문서)에 근거하지 않은 내용을 그럴듯하게 만들어 내는 현상. LLM에서는 틀린 사실로, Whisper에서는 없는 문장이나 같은 말 반복으로 나타난다."], "itn": ["ITN (역 텍스트 정규화)", "1990s~", "음성 인식 결과의 말 표기(삼만 원, 공일공)를 글 표기(3만 원, 010)로 바꾸는 처리. 반대 방향(글 → 말)은 TTS에서 쓰는 텍스트 정규화(TN)다."], "align": ["강제 정렬", "1990s~", "오디오와 그 정답 텍스트가 주어졌을 때, 텍스트의 각 글자 · 단어가 오디오의 몇 초에 해당하는지 찾아내는 것. 인식이 아니라 '맞추기'라서 정답이 이미 있다는 점이 다르다."], "split": ["학습셋 · 평가셋 (데이터 누수)", "고전 ML", "학습셋은 가중치를 고치는 데 쓰는 데이터, 평가셋은 학습에 쓰지 않고 성능을 재는 데이터다."], "labelmask": ["라벨 마스킹 (-100)", "2017~", "학습 라벨에서 손실 계산에 넣지 않을 위치를 -100으로 바꿔 두는 관례. PyTorch 교차 엔트로피 손실의 ignore_index 기본값이 -100이다."], "pii": ["개인정보 마스킹", "2011", "텍스트(나 음성)에서 개인을 식별할 수 있는 정보를 찾아 가리는 처리. STT에서는 인식 → 정규화 → 탐지(정규식 · NER) → 치환 순서로 후처리하는 것이 표준이다."], "ner": ["NER (개체명 인식)", "1995", "문장에서 사람 이름, 기관, 장소, 날짜 같은 개체가 어디에 있고 무엇인지 찾아내는 기술. 지금은 BERT 계열 모델이나 LLM으로 한다."], "regex": ["정규식", "1951", "문자열의 패턴(숫자 몇 개, 반복, 선택 등)을 짧은 표기로 나타내 찾기 · 검증 · 치환에 쓰는 언어."], "pr": ["정밀도 · 재현율", "1955", "정밀도는 모델이 '맞다'고 한 것 중 실제로 맞은 비율, 재현율은 실제로 맞는 것 중 모델이 찾아낸 비율이다."], "synth": ["합성 데이터", "2010s~", "실제로 수집하지 않고 프로그램(규칙, TTS, 생성 모델)으로 만든 학습 데이터. 정답을 알고 만들기 때문에 라벨이 정확하다."], "rag": ["RAG (검색 증강 생성)", "2020", "질문이 들어오면 관련 문서를 먼저 검색하고, 그 문서를 질문과 함께 LLM에 넣어 답을 생성하는 방식. 가중치를 바꾸지 않으므로 추론에 속한다."]};
var st2=document.createElement('style');
st2.textContent='.gltip{position:absolute;z-index:50;max-width:280px;background:var(--card,#fff);color:var(--fg,#1F1E1B);border:1px solid var(--border,#D9D7CF);border-radius:10px;padding:8px 12px;font-size:13px;line-height:1.55;box-shadow:0 4px 14px rgba(0,0,0,.12);pointer-events:none;opacity:0;transition:opacity .12s}.gltip.on{opacity:1}.gltip b{font-weight:500}.gltip .e{font-size:11px;color:var(--am-s,#854F0B);margin-left:6px}.gltip .m{display:block;font-size:11px;color:var(--muted,#5F5E5A);margin-top:4px}';
document.head.appendChild(st2);
var tip=document.createElement('div');tip.className='gltip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);
function show(a){
  var d=T[a.hash.slice(1)];if(!d)return;
  tip.innerHTML='';var b=document.createElement('b');b.textContent=d[0];var e=document.createElement('span');e.className='e';e.textContent=d[1];
  var p=document.createElement('div');p.textContent=d[2];var m=document.createElement('span');m.className='m';m.textContent=GP?'누르면 이 용어 항목으로 이동':'누르면 시대적 배경까지 자세히';
  tip.appendChild(b);tip.appendChild(e);tip.appendChild(p);tip.appendChild(m);
  var r=a.getBoundingClientRect(),vw=document.documentElement.clientWidth;
  tip.style.left='0px';tip.style.top='0px';tip.classList.add('on');
  var w=tip.offsetWidth,h=tip.offsetHeight;
  var x=Math.min(Math.max(8,r.left),vw-w-8),y=r.bottom+6;
  if(y+h>window.innerHeight-8&&r.top-h-6>8)y=r.top-h-6;
  tip.style.left=(x+window.scrollX)+'px';tip.style.top=(y+window.scrollY)+'px';
}
function hide(){tip.classList.remove('on');}
document.addEventListener('mouseover',function(ev){var a=ev.target.closest&&ev.target.closest('a.gl');if(a)show(a);});
document.addEventListener('mouseout',function(ev){var a=ev.target.closest&&ev.target.closest('a.gl');if(a&&!a.contains(ev.relatedTarget))hide();});
document.addEventListener('focusin',function(ev){var a=ev.target.closest&&ev.target.closest('a.gl');if(a)show(a);else hide();});
document.addEventListener('focusout',hide);
window.addEventListener('scroll',hide,{passive:true});
var sd=document.getElementById('sdesc');
if(sd){
  var obs=new MutationObserver(run);
  function run(){obs.disconnect();var used=new Set();sd.querySelectorAll('a.gl').forEach(function(a){used.add(a.hash.slice(1));});link(sd,used,false);obs.observe(sd,{childList:true,subtree:true,characterData:true});}
  run();
}
})();
