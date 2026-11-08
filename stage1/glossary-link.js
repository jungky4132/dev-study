(function(){
var M={"2진수": "binary", "16진수": "hex", "2의 보수": "twos", "ASCII": "ascii", "문자 집합": "charset", "인코딩": "charset", "EUC-KR": "euckr", "유니코드": "unicode", "코드 포인트": "unicode", "UTF-8": "utf8", "레지스터": "register", "프로그램 카운터": "pc", "PC": "pc", "ALU": "alu", "제어장치": "cu", "명령어 사이클": "icycle", "스택 포인터": "sp", "플래그 레지스터": "flags", "인터럽트": "interrupt", "인터럽트 서비스 루틴": "isr", "ISR": "isr", "인터럽트 벡터": "ivec", "MMU": "mmu", "베이스 레지스터": "base", "한계 레지스터": "limit", "메모리 계층": "hierarchy", "캐시 메모리": "cache", "캐시": "cache", "참조 지역성": "locality", "지역성": "locality", "메인 메모리": "ram", "RAM": "ram", "페이징": "paging", "가상 메모리": "paging", "TLB": "tlb", "HDD": "hdd", "하드디스크": "hdd", "플래시 메모리": "flash", "낸드 플래시": "flash", "SSD": "ssd", "SLC": "cells", "MLC": "cells", "TLC": "cells", "QLC": "cells", "SLC 캐시": "slccache", "FTL": "ftl", "가비지 컬렉션": "gc", "쓰기 증폭": "waf", "웨어 레벨링": "wl", "TRIM": "trim", "RAID": "raid", "패리티": "parity", "장치 컨트롤러": "devctrl", "장치 드라이버": "driver", "폴링": "polling", "DMA": "dma", "메모리 맵 입출력": "mmio", "고립형 입출력": "pmio", "PIC": "pic", "NMI": "nmi", "사이클 스틸링": "cyclesteal", "시스템 버스": "sysbus", "입출력 버스": "iobus", "입출력 채널": "channel", "BAR": "bar", "커널": "kernel", "커널 모드": "modes", "사용자 모드": "modes", "시스템 콜": "syscall", "트랩": "trap", "프로세스": "process", "PCB": "pcb", "스레드": "thread", "문맥 교환": "ctxsw", "CPU 스케줄링": "sched", "스케줄링": "sched", "FCFS": "fcfs", "SJF": "sjf", "라운드 로빈": "rr", "비선점형": "preempt", "선점형": "preempt", "에이징": "aging", "파일 시스템": "fs", "디렉터리 계층": "dirtree", "inode": "inode", "인덱스(색인) 할당": "idxalloc", "인덱스 할당": "idxalloc", "색인 할당": "idxalloc", "rwx": "perm", "755": "perm", "umask": "umask", "systemd": "systemd", "유닛 파일": "unitfile", "데몬": "daemon", "rpm": "rpm", "RPM": "rpm", "dnf": "dnf", "DNF": "dnf"};
var keys=Object.keys(M).sort(function(a,b){return b.length-a.length;});
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function w(c){return /[A-Za-z0-9]/.test(c);}
var RE=new RegExp(keys.map(function(k){var p=esc(k);if(w(k[0]))p='(?<![A-Za-z0-9])'+p;if(w(k[k.length-1]))p+='(?![A-Za-z0-9])';return p;}).join('|'),'g');
var st=document.createElement('style');
st.textContent='a.gl{color:inherit;text-decoration:underline dotted;text-decoration-color:var(--muted,#888);text-underline-offset:3px}a.gl:hover{color:var(--pu-s,#534AB7);text-decoration-color:currentColor}';
document.head.appendChild(st);
function link(root,used,skipDesc){
  var sel='a,button,script,style,svg,code,pre,h1,textarea,#stitle'+(skipDesc?',#sdesc':'');
  var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,list=[];
  while((n=tw.nextNode())){if(n.nodeValue.trim()&&!n.parentElement.closest(sel))list.push(n);}
  list.forEach(function(node){
    var t=node.nodeValue,m,last=0,frag=null;RE.lastIndex=0;
    while((m=RE.exec(t))){
      var id=M[m[0]];if(used.has(id))continue;used.add(id);
      if(!frag)frag=document.createDocumentFragment();
      frag.appendChild(document.createTextNode(t.slice(last,m.index)));
      var a=document.createElement('a');a.className='gl';a.href='glossary.html#'+id;a.title='용어 사전: '+m[0];a.textContent=m[0];
      frag.appendChild(a);last=m.index+m[0].length;
    }
    if(frag){frag.appendChild(document.createTextNode(t.slice(last)));node.parentNode.replaceChild(frag,node);}
  });
}
link(document.querySelector('main')||document.body,new Set(),true);
var f=document.querySelector('footer');
if(f&&!f.querySelector('a[href="glossary.html"]')){f.appendChild(document.createTextNode(' · '));var g=document.createElement('a');g.href='glossary.html';g.textContent='용어 사전';f.appendChild(g);}
var sd=document.getElementById('sdesc');
if(sd){
  var obs=new MutationObserver(run);
  function run(){obs.disconnect();var used=new Set();sd.querySelectorAll('a.gl').forEach(function(a){used.add(a.hash.slice(1));});link(sd,used,false);obs.observe(sd,{childList:true,subtree:true,characterData:true});}
  run();
}
})();
