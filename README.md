# dev-study

2026–2027 개발자 기본기 학습 기록입니다. STAGE별 정리, 그림, 실습 결과를 모읍니다.

- 사이트: https://jungky4132.github.io/dev-study/

## STAGE 1 · 컴퓨터 시스템 + 리눅스 기초
- [STAGE 1 용어 사전](https://jungky4132.github.io/dev-study/stage1/glossary.html) — 그림에 나오는 용어 77개의 시대적 배경 · 그때의 문제 · 개념 · 지금
- [CPU 레지스터 한 장 그림](https://jungky4132.github.io/dev-study/stage1/cpu-register.html) — 명령어 사이클, PC 갱신 조건, 인터럽트(벡터 · ISR), 스택 포인터, 베이스 레지스터, [MMU](https://jungky4132.github.io/dev-study/stage1/mmu.html)
- [SSD 셀 · 페이지 · 블록과 수명](https://jungky4132.github.io/dev-study/stage1/ssd-wear.html) — 덮어쓰기가 안 되는 이유, 블록 단위 지우기, 가비지 컬렉션, 쓰기 증폭, 산화막 마모, 배드 블록 (단계별)
- [보조기억장치 정리](https://jungky4132.github.io/dev-study/stage1/storage-notes.html) — SLC · MLC · TLC · QLC 비교와 용도, SLC 캐시, HDD 역사 연표, 용어 정리
- [RAID 정리](https://jungky4132.github.io/dev-study/stage1/raid.html) — 등장 배경, 패리티(XOR) 복구 데모, RAID 레벨별 디스크 배치, 레벨이 늘어난 이유, mdadm 실무, 용어
- [입출력 방식 한 장 그림](https://jungky4132.github.io/dev-study/stage1/io-methods.html) — 프로그램 입출력, 인터럽트(PIC · NMI), DMA, 메모리 맵/고립형 입출력, 사이클 스틸링, 입출력 버스 (단계별)
- [데이터와 문자 인코딩 한 장 그림](https://jungky4132.github.io/dev-study/stage1/data-encoding.html) — 2진수 · 16진수, 2의 보수, 문자 집합과 인코딩(UTF-8 · EUC-KR), 한글이 깨지는 이유 (단계별)
- [메모리 계층과 캐시 한 장 그림](https://jungky4132.github.io/dev-study/stage1/memory-hierarchy.html) — 레지스터 · 캐시 · RAM · 보조기억장치, 캐시 히트와 미스, 참조 지역성 (단계별)
- [MMU 한 장 그림](https://jungky4132.github.io/dev-study/stage1/mmu.html) — 논리 · 물리 주소, 한계 검사와 베이스 더하기, 범위 초과 예외(메모리 보호), 페이징 미리보기 (단계별)
- [시스템 콜과 사용자 · 커널 모드 한 장 그림](https://jungky4132.github.io/dev-study/stage1/syscall-mode.html) — 사용자 · 커널 모드, 시스템 콜, 트랩, strace (단계별)
- [프로세스와 스레드 한 장 그림](https://jungky4132.github.io/dev-study/stage1/process-thread.html) — 메모리 구조, PCB, 프로세스 상태, 스레드가 공유하는 것과 따로 가지는 것 (단계별)
- [CPU 스케줄링 한 장 그림](https://jungky4132.github.io/dev-study/stage1/cpu-scheduling.html) — FCFS · SJF · 라운드 로빈 간트 차트와 평균 대기 시간, 선점, 에이징 (단계별)
- [파일 시스템과 inode 한 장 그림](https://jungky4132.github.io/dev-study/stage1/filesystem.html) — 디렉터리 계층, 디렉터리 항목 → inode → 데이터 블록, 인덱스 할당 (단계별)
- [리눅스 권한 (755) 한 장 그림](https://jungky4132.github.io/dev-study/stage1/linux-permission.html) — ls -l 읽기, rwx와 755, 디렉터리의 x 권한, 판정 순서, umask (단계별)
- [systemd와 패키지 관리 한 장 그림](https://jungky4132.github.io/dev-study/stage1/systemd-dnf.html) — systemd와 유닛 파일, start와 enable, 확인 순서, rpm과 dnf (단계별)
