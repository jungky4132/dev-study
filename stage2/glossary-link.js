(function(){
var M={"네트워크": "network", "호스트": "host", "그래프": "graph", "노드": "graph", "간선": "graph", "토폴로지": "topology", "프로토콜": "protocol", "WAN": "wan", "LAN": "lan", "MAN": "man", "이더넷": "ethernet", "회선 교환": "circuit", "메시지 교환": "message", "패킷 교환": "packetsw", "패킷": "packet", "헤더": "header", "페이로드": "header", "OSI 7계층": "osi", "OSI": "osi", "TCP/IP 4계층": "tcpip", "TCP/IP": "tcpip", "캡슐화": "encap", "역캡슐화": "encap", "MAC 주소": "mac", "IP 주소": "ipaddr", "사설 IP": "ipaddr", "공인 IP": "ipaddr", "포트 번호": "port", "포트": "port", "유니캐스트": "cast", "브로드캐스트": "cast", "멀티캐스트": "cast", "애니캐스트": "cast", "허브": "hub", "스위치": "switch", "라우터": "router", "방화벽": "firewall", "DMZ": "dmz", "NAT": "nat", "포트포워딩": "nat", "망분리": "netsep", "VoIP": "voip", "인터넷 전화": "voip", "코덱": "codec", "G.711": "codec", "RTP": "rtp", "SIP": "sip", "지터 버퍼": "jitter", "지터": "jitter"};
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
var T={"network": ["네트워크", "1960s", "호스트들이 통신 매체와 네트워크 장비로 연결되어, 정해진 약속(프로토콜)에 따라 데이터를 주고받는 구조 전체."], "host": ["호스트", "1969", "네트워크에 연결돼 데이터를 직접 보내거나 최종적으로 받는 끝단 장치."], "graph": ["그래프 (노드 · 간선)", "1736", "노드(점)와 노드를 잇는 간선(선)으로 이루어진 자료구조."], "topology": ["토폴로지", "1964", "네트워크 장치를 어떤 모양으로 연결했는지(스타 · 버스 · 링 · 메시 · 트리)."], "protocol": ["프로토콜", "1969", "통신하는 쪽끼리 미리 정한 약속: 데이터 형식, 주고받는 순서, 오류가 났을 때 할 일."], "wan": ["WAN", "1950s~1969", "도시 · 나라 · 대륙처럼 넓은 지역을 잇는 네트워크."], "lan": ["LAN", "1973", "집 · 사무실 · 건물처럼 좁은 범위를 내가 직접 깐 선과 장비로 잇는 네트워크."], "man": ["MAN", "1990", "도시 하나 정도 범위의 네트워크."], "ethernet": ["이더넷", "1973", "LAN에서 쓰는 대표 기술."], "circuit": ["회선 교환", "1878", "통신 전에 두 끝 사이에 길(회선)을 잡고, 통신이 끝날 때까지 그 길을 독점하는 방식."], "message": ["메시지 교환", "1900s", "메시지 전체를 중간 노드가 받아 저장한 뒤 다음 노드로 넘기는 저장 후 전달 방식."], "packetsw": ["패킷 교환", "1964~1969", "데이터를 패킷으로 쪼개 각 패킷이 독립적으로 길을 찾아가고, 받는 쪽에서 다시 조립하는 방식."], "packet": ["패킷", "1965", "전송을 위해 쪼갠 데이터 조각과, 그 앞에 붙인 헤더(주소 · 순서 등)를 합친 단위."], "header": ["헤더 · 페이로드", "1970s", "헤더 = 패킷 앞에 붙은 배달 정보(주소 · 포트 · 순서)."], "osi": ["OSI 7계층", "1984", "통신을 물리 · 데이터 링크 · 네트워크 · 전송 · 세션 · 표현 · 응용 7단계로 나눈 참조 모델."], "tcpip": ["TCP/IP 4계층", "1974~1983", "실제 인터넷이 쓰는 4단계 구조: 네트워크 접근(링크) · 인터넷(IP) · 전송(TCP/UDP) · 응용(HTTP 등)."], "encap": ["캡슐화", "1970s", "보낼 때 위 계층 데이터 앞에 각 계층의 헤더를 차례로 붙이는 것."], "mac": ["MAC 주소", "1970s~1980", "네트워크 카드(NIC)에 붙은 48비트 고유 주소(예: 3c:52:82:aa:bb:cc)."], "ipaddr": ["IP 주소", "1981", "네트워크 계층에서 장치를 가리키는 주소."], "port": ["포트", "1981", "한 컴퓨터 안에서 통신하는 프로그램을 구분하는 번호."], "cast": ["유니 · 브로드 · 멀티 · 애니캐스트", "1970s~1993", "유니캐스트 1:1, 브로드캐스트 1:같은 LAN 전부, 멀티캐스트 1:가입한 그룹, 애니캐스트 1:가장 가까운 하나."], "hub": ["허브", "1980s", "받은 전기 신호를 키워 모든 포트로 똑같이 내보내는 1계층 장비."], "switch": ["스위치", "1990", "MAC 주소 표를 만들어 프레임을 목적지 포트로만 보내는 2계층 장비."], "router": ["라우터", "1969", "IP 주소와 라우팅 표를 보고 패킷을 다음 네트워크로 넘기는 3계층 장비."], "firewall": ["방화벽", "1988", "IP · 포트 · 연결 상태 규칙에 따라 패킷을 통과시키거나 막는 장비 · 소프트웨어(firewalld도 방화벽이다)."], "dmz": ["DMZ", "1990s", "외부 방화벽과 내부 방화벽 사이, 외부 접근이 필요한 서버만 두는 완충 구역."], "nat": ["NAT", "1994", "패킷의 IP(와 포트)를 바꿔 주는 기술."], "netsep": ["망분리", "2013", "내부 업무망과 인터넷망을 물리적(PC · 선 분리) 또는 논리적(가상화)으로 나누는 보안 정책."], "voip": ["VoIP", "1995", "음성을 디지털로 바꿔 IP 패킷으로 주고받는 전화 기술."], "codec": ["코덱 (G.711)", "1972", "음성 · 영상을 디지털 데이터로 바꾸고(인코딩) 되돌리는(디코딩) 규칙과 프로그램."], "rtp": ["RTP", "1996", "UDP 위에서 실시간 음성 · 영상을 나르는 프로토콜."], "sip": ["SIP", "1999", "통화(세션)를 시작 · 변경 · 종료하는 신호 프로토콜."], "jitter": ["지터", "1990s", "패킷 도착 간격(지연)이 흔들리는 정도."]};
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
