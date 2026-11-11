# dev-study

2026–2027 개발자 기본기 학습 기록입니다. STAGE별 정리, 그림, 실습 결과를 모읍니다.

- 사이트: https://jungky4132.github.io/dev-study/

## STAGE 1 · 컴퓨터 시스템 + 리눅스 기초
- [STAGE 1 용어 사전](https://jungky4132.github.io/dev-study/stage1/glossary.html) — STAGE 1 그림에 나오는 용어 156개(핵심 94 + 설명 속 기초 62)를, 그 개념이 왜 생길 수밖에 없었는지(시대 → 문제 → 개념) 순서로 정리
- [CPU 레지스터 한 장 그림](https://jungky4132.github.io/dev-study/stage1/cpu-register.html) — if 문 한 줄이 CPU 안에서 어떻게 실행되는지(비교 → 결과 표시 → 건너뛰기), 장치가 끼어들 때(인터럽트) 무슨 일이 일어나는지, 프로그램이 쓰는 주소가 실제 메모리 위치로 어떻게 바뀌는지(MMU)를 레지스터 하나하나까지 따라가기
- [SSD 셀 · 페이지 · 블록과 수명](https://jungky4132.github.io/dev-study/stage1/ssd-wear.html) — SSD는 왜 덮어쓰지 못하고 블록 단위로만 지우는지, 그리고 지울 때마다 수명이 줄어드는 과정
- [보조기억장치 정리](https://jungky4132.github.io/dev-study/stage1/storage-notes.html) — SSD 종류(셀 하나에 1~4비트)별 차이와 용도, 빠른 쓰기 영역(SLC 캐시), 하드디스크의 역사, 용어 정리
- [RAID 정리](https://jungky4132.github.io/dev-study/stage1/raid.html) — 디스크 여러 개를 묶어 더 빠르게, 또는 하나가 고장 나도 데이터를 잃지 않게 쓰는 방법과 그 등장 배경
- [입출력 방식 한 장 그림](https://jungky4132.github.io/dev-study/stage1/io-methods.html) — 키보드 · 디스크 같은 장치와 컴퓨터가 데이터를 주고받는 세 가지 방법(CPU가 계속 확인 · 장치가 알려 줌 · 전용 장치가 대신 옮김)과 CPU 부담의 차이
- [데이터와 문자 인코딩 한 장 그림](https://jungky4132.github.io/dev-study/stage1/data-encoding.html) — 컴퓨터가 숫자를 0과 1로 나타내는 방법(음수 포함)과 글자를 바이트로 저장하는 규칙, 그리고 한글이 깨지는 이유
- [메모리 계층과 캐시 한 장 그림](https://jungky4132.github.io/dev-study/stage1/memory-hierarchy.html) — 빠른 메모리는 작고 비싸서 여러 층으로 나눠 쓰는 이유, CPU가 데이터를 찾는 순서(캐시 → RAM), 작은 캐시가 잘 맞는 이유
- [MMU 한 장 그림](https://jungky4132.github.io/dev-study/stage1/mmu.html) — 프로그램이 쓰는 주소가 실제 메모리 위치로 바뀌는 과정과, 다른 프로그램의 영역을 침범하지 못하게 막는 방법(메모리 보호)
- [시스템 콜과 사용자 · 커널 모드 한 장 그림](https://jungky4132.github.io/dev-study/stage1/syscall-mode.html) — 일반 프로그램이 하드웨어를 직접 만지지 못하게 막는 이유(사용자 모드 · 커널 모드)와, 파일 읽기 같은 일을 운영체제에 부탁하는 방법(시스템 콜)
- [운영체제 · 커널 · 인터럽트 질문 정리](https://jungky4132.github.io/dev-study/stage1/os-kernel-qa.html) — 운영체제 전체가 커널 영역에 들어가는지, root와 커널 모드는 같은지, 시스템 콜은 왜 인터럽트인지 등 강의를 들으며 생긴 질문 8개를 그림 3장으로 정리
- [프로세스와 스레드 한 장 그림](https://jungky4132.github.io/dev-study/stage1/process-thread.html) — 실행 중인 프로그램(프로세스)이 메모리를 어떻게 나눠 쓰고 운영체제가 어떻게 관리하는지, 프로세스가 어떤 상태를 오가고 어떻게 태어나는지(fork · exec), 한 프로세스 안에서 일을 나누는 스레드는 무엇을 함께 쓰는지
- [CPU 스케줄링 한 장 그림](https://jungky4132.github.io/dev-study/stage1/cpu-scheduling.html) — CPU는 하나인데 실행할 프로그램이 여러 개일 때 누구를 먼저 실행할지 정하는 방법들(먼저 온 순서 · 짧은 것 먼저 · 돌아가며)을 같은 예시로 비교
- [파일 시스템과 inode 한 장 그림](https://jungky4132.github.io/dev-study/stage1/filesystem.html) — 경로(/etc/hostname)만으로 디스크 여기저기 흩어진 파일 내용을 찾아가는 과정: 디렉터리 → inode(파일 정보 카드) → 데이터 블록
- [리눅스 권한 (755) 한 장 그림](https://jungky4132.github.io/dev-study/stage1/linux-permission.html) — ls -l에 보이는 -rwxr-xr-x가 무슨 뜻인지, 755 같은 숫자로 바꾸는 법, 누가 어떤 파일을 읽고 고치고 실행할 수 있는지
- [systemd와 패키지 관리 한 장 그림](https://jungky4132.github.io/dev-study/stage1/systemd-dnf.html) — 리눅스에서 서비스(sshd 등)를 켜고 끄고 부팅 때 자동으로 띄우는 방법(systemd)과, 프로그램을 설치하는 방법(rpm · dnf)
