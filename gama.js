// 가마에만 적용한 탐구 예시. 설명은 출처를 바탕으로 재서술했으며 인용문이 아닙니다.
const gamaOrder=[1,3,0,2]; // 먼저 개념·구조, 다음 혼례 사례, 마지막 비교·어려움 추론
const gamaLenses=['어디로 다니나요?','어떤 힘으로 움직이나요?','무엇으로 만들어졌나요?','사람이나 물건을 어떻게 옮기나요?'];
const gamaLabels=['누가','언제','어디서','무엇을','어떻게','왜'];
const gamaPocketQuestions=['누가 타거나 옮겼을까?','언제, 어떤 때 이용했을까?','어디에서, 어느 길로 다녔을까?','무엇으로 만들었고, 어떤 부분이 있을까?','어떻게 움직였을까?','무엇을 위해 이용했을까?'];
const gamaClues=[
 {word:'땅길',lens:2,source:0},
 {word:'사람의 힘',lens:4,source:1},
 {word:'나무',lens:3,source:1},
 {word:'안에 앉은 사람',lens:0,source:0},
 {word:'가마채를 들어',lens:4,source:1},
 {word:'혼례',lens:1,source:0},
 {word:'신분이나 지위',lens:0,source:1},
 {word:'1958년 9월 26일',lens:1,source:0},
 {word:'신부',lens:0,source:0},
 {word:'1906~1907년경',lens:1,source:2},
 {word:'우리나라',lens:2,source:2},
 {word:'작은 집 모양',lens:3,source:-1},
 {word:'사람이 안에 앉아 이동',lens:5,source:-1},
 {word:'바탕',lens:3,source:1},
 {word:'뚜껑',lens:3,source:1},
 {word:'가마채',lens:3,source:1},
 {word:'2명 또는 4명',lens:0,source:1},
 {word:'왕과 왕비',lens:0,source:1},
 {word:'벼슬을 맡은 관리',lens:0,source:1},
 {word:'앞뒤',lens:2,source:1},
 {word:'가마와 탄 사람의 무게',lens:4,source:2},
 {word:'앞뒤의 사람',lens:0,source:2},
 {word:'본체만 약 40kg',lens:4,source:3},
 {word:'가마꾼',lens:0,source:1},
 {word:'흔들림이 줄어',lens:4,source:1},
 {word:'더 편안하게',lens:5,source:1},
 {word:'20명 내외',lens:0,source:1},
 {word:'재료나 크기',lens:3,source:3},
 {word:'신랑',lens:0,source:0},
 {word:'말을 타고',lens:4,source:0},
 {word:'가마와 탄 사람의 무게',lens:4,source:3},
 {word:'튼튼하게',lens:4,source:2},
 {word:'가볍게',lens:4,source:2}
];
let gamaCollected=[],gamaPhase='read',gamaUnlocked=0,gamaPassed=[false,false,false,false],gamaSummaryChoices={},gamaQuizAnswers={},gamaQuizChecked=false,gamaPopupChoice=null,gamaPopupSource=0,gamaReturnPhase=null,gamaShownParts=[],gamaWeddingShown=false,gamaHintsOpen=false;
const gamaMiniQuiz=[
  {
    "q": "사진 속 신랑과 신부가 탄 교통수단을 바르게 짝 지은 것은 무엇인가요?",
    "options": [
      "신랑 — 가마 / 신부 — 말",
      "신랑 — 말 / 신부 — 말",
      "신랑 — 말 / 신부 — 가마"
    ],
    "answer": 2,
    "source": 0,
    "hint": "신랑이 탄 것과 신부가 탄 것을 각각 다시 살펴보세요.",
    "emphasis": [
      "신랑",
      "말",
      "신부",
      "가마"
    ],
    "confirm": "1958년의 이 혼례 사진에서 신랑은 말을 타고, 신부는 가마를 타고 이동했습니다."
  },
  {
    "q": "가마꾼은 가마의 어느 부분을 잡고 옮겼나요?",
    "options": [
      "바탕",
      "뚜껑",
      "가마채"
    ],
    "answer": 2,
    "source": 1,
    "hint": "바탕·뚜껑·가마채가 각각 어떤 부분인지 다시 읽고 사진에서 찾아보세요.",
    "emphasis": [
      "가마꾼",
      "앞뒤",
      "가마채",
      "사람의 힘"
    ],
    "confirm": "가마꾼은 가마의 앞뒤에 서서 가마채를 들어 옮겼습니다. 사람이 메는 가마는 사람의 힘으로 움직였습니다."
  },
  {
    "q": "무거운 가마를 메고 먼 길을 가야 했다면, 가마꾼에게 어떤 어려움이 있었을까요?",
    "options": [
      "가마 안에 오래 앉아 있어 다리가 저렸을 것입니다.",
      "무게를 견디며 오래 걸어 어깨와 다리가 힘들었을 것입니다.",
      "가마를 타기 위해 출발할 때까지 기다려야 했을 것입니다."
    ],
    "answer": 1,
    "source": 2,
    "inference": true,
    "hint": "가마를 타는 사람이 아니라 메고 걷는 가마꾼의 입장에서 생각해 보세요.",
    "emphasis": [
      "가마꾼",
      "가마와 탄 사람의 무게",
      "오래 걸으면",
      "어깨와 다리"
    ],
    "confirm": "가마꾼은 가마와 탄 사람의 무게를 함께 감당하며 걸었습니다. 무거운 가마를 메고 오래 걸으면 어깨와 다리가 힘들었을 것이라고 생각할 수 있습니다."
  },
  {
    "q": "가마꾼이 들어 옮겨야 했던 무게는 무엇인가요?",
    "options": [
      "가마에 탄 사람의 무게만",
      "가마와 탄 사람의 무게를 합한 무게",
      "가마 본체의 무게만"
    ],
    "answer": 1,
    "source": 3,
    "hint": "본체의 무게에 무엇의 무게가 더해지는지 다시 살펴보세요.",
    "emphasis": [
      "가마와 탄 사람의 무게",
      "가마꾼"
    ],
    "confirm": "가마꾼은 가마와 탄 사람의 무게를 함께 감당해야 했습니다. 약 40kg은 자료에서 살펴본 유물의 본체 무게이며, 가마채와 탄 사람의 무게는 포함하지 않습니다. 가마는 재료와 크기에 따라 무게가 달랐습니다."
  }
];
const gamaSummary=[
 {label:'교통로',q:'어떤 길로 다녔나요?',options:['물길','땅길','하늘길'],answer:1,source:0},
 {label:'이동 대상',q:'가마 안에 태워 옮긴 대상은 무엇인가요?',options:['사람','목재','곡식'],answer:0,source:0},
 {label:'움직이는 힘',q:'사람이 메는 가마는 어떤 힘으로 움직였나요?',options:['동물의 힘','자연의 힘','사람의 힘'],answer:2,source:1},
 {label:'만든 재료',q:'가마의 주된 재료는 무엇인가요?',options:['돌','나무','쇠'],answer:1,source:1}
];
function gamaSourceName(j){if(j===-1)return '가마의 뜻';return window.TRANSPORT_SOURCES[0][j].title.replace(/^(사진|글) · /,'');}
const gamaRequired={1:[2,23,19,16,1],3:[22,30],0:[28,29,8,0,3],2:[20]};
const gamaCluePrompts={0:'가마가 다니는 길도 찾아봅시다.',3:'가마에 태워 옮긴 사람도 찾아봅시다.',2:'가마의 재료가 무엇인지도 찾아봅시다.',23:'가마를 메고 가는 사람을 무엇이라고 하는지 찾아봅시다.',19:'가마꾼이 어느 쪽에 서는지 찾아봅시다.',16:'가마꾼의 수를 찾아봅시다.',1:'가마가 어떤 힘으로 움직이는지 찾아봅시다.',22:'이 유물의 무게도 살펴봅시다.',30:'가마꾼이 어떤 무게를 감당했는지 찾아봅시다.',28:'혼례 사진 속 신랑도 찾아봅시다.',29:'신랑이 무엇을 타고 이동했는지 찾아봅시다.',8:'신부가 무엇을 타고 이동했는지 찾아봅시다.',20:'생각 단서를 열어 가마꾼이 감당한 무게를 찾아봅시다.'};
function gamaWord(i){const c=gamaClues[i],found=gamaCollected.includes(i);return '<button data-clue="'+i+'" class="clue-word '+((gamaRequired[c.source]||[]).includes(i)?'essential-clue ':'')+(found?'found':'')+'" aria-label="'+esc(c.word+(found?' · 모은 단서':' · 단서 모으기'))+'" aria-pressed="'+found+'" onclick="gamaCollect('+i+');'+(i>=13&&i<=15||i===4?'gamaShowPart('+(i===4?15:i)+');':'')+([3,5,8].includes(i)?'gamaShowWedding();':'')+'">'+c.word+'</button>'}
function gamaCollect(i){if(!gamaClues[i]||([22,30].includes(i)&&!gamaWeightRevealed))return;gamaCollected=gamaCollected.includes(i)?gamaCollected.filter(x=>x!==i):[...gamaCollected,i];document.querySelectorAll('.clue-word').forEach(button=>{const id=Number(button.dataset.clue);if(Number.isInteger(id)){const on=gamaCollected.includes(id);button.classList.toggle('found',on);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',gamaClues[id].word+(on?' · 모은 단서':' · 단서 모으기'));}});gamaNotebook();gamaUpdateNext();}
function gamaNotebook(){document.querySelector('#gamaNotebook').innerHTML=gamaLabels.map((label,k)=>'<section class="clue-pocket"><div class="pocket-heading"><h3>'+label+'</h3><p class="pocket-question">'+gamaPocketQuestions[k]+'</p></div><div class="pocket-words">'+(gamaCollected.filter(i=>gamaClues[i].lens===k).map(i=>{const c=gamaClues[i];return '<button class="notebook-word" title="'+esc(gamaSourceName(c.source))+'에서 확인" onclick="gamaEvidence('+c.source+')">'+c.word+'</button>'}).join('')||'<span class="pocket-empty">아직 없음</span>')+'</div></section>').join('');}
function gamaReading(j){return [
 '<p>이 사진은 '+gamaWord(7)+'에 찍은 전통 '+gamaWord(5)+'의 모습입니다. 사진 속 '+gamaWord(28)+'은 '+gamaWord(29)+', '+gamaWord(8)+'는 가마를 타고 이동합니다. 신랑과 신부는 서로 다른 교통수단을 이용했습니다.</p><p>가마의 <strong class="gama-inline-emphasis">앞뒤</strong>를 살펴보세요. 가마꾼들이 가마채를 들어 '+gamaWord(3)+'을 옮깁니다. 가마는 '+gamaWord(0)+'을 따라 이동했습니다.</p>',
 '<p>가마는 주로 '+gamaWord(2)+'로 만든 작은 집 모양의 탈것입니다. 사람이 앉는 '+gamaWord(13)+' 위에 '+gamaWord(14)+'을 덮고, 앞뒤로 긴 막대인 '+gamaWord(15)+'를 붙였습니다.</p><p>가마를 메고 가는 사람을 '+gamaWord(23)+'이라고 합니다. 가마의 바탕에 사람이 앉으면, '+gamaWord(16)+'의 가마꾼이 가마의 '+gamaWord(19)+'에 나누어 서서 '+gamaWord(4)+' 옮겼습니다. 이처럼 사람이 메는 가마는 '+gamaWord(1)+'으로 움직였습니다.</p><p>가마를 옮기는 데 필요한 가마꾼의 수는 가마의 크기와 종류에 따라 달랐습니다. 왕이 타던 큰 가마는 가마꾼이 '+gamaWord(26)+'나 되기도 했습니다. 여러 사람이 함께 메면 '+gamaWord(24)+' 타는 사람이 '+gamaWord(25)+' 이동할 수 있었습니다.</p><p>조선시대에는 '+gamaWord(17)+', '+gamaWord(18)+' 등이 가마를 이용했습니다. 그러나 누구나 가마를 자유롭게 탈 수 있었던 것은 아닙니다. '+gamaWord(6)+'에 따라 탈 수 있는 가마의 종류가 달랐고, 이용을 제한하기도 했습니다.</p>',
 '<p>영상 속 제작자는 가마를 '+gamaWord(31)+' 만들면서도 '+gamaWord(32)+' 만들려고 한다고 설명합니다. 사람이 들어 옮겨야 하기 때문입니다.</p><section class="gama-thinking"><span class="gama-thinking-label">생각해 볼 문제</span><h3>가마를 가볍게 만들면 가마꾼에게 어떤 도움이 되었을까요?</h3><button id="gamaHintButton" class="btn" aria-expanded="'+gamaHintsOpen+'" onclick="gamaToggleHints()">'+(gamaHintsOpen?'생각 단서 접기':'생각 단서 보기')+'</button><div id="gamaThinkingClues" '+(gamaHintsOpen?'':'hidden')+'><ul><li>'+gamaWord(21)+'이 가마채를 들어 옮겨야 했습니다.</li><li>옮기는 사람들은 '+gamaWord(20)+'를 함께 감당해야 했습니다.</li></ul></div></section>',
 '<p>가마는 '+gamaWord(27)+'에 따라 무게가 서로 달랐습니다. 모든 가마의 무게가 같았던 것은 아닙니다. 이번에는 메트로폴리탄미술관이 소장한 <strong>20세기 한국 가마 한 점</strong>의 무게를 살펴봅시다.</p><div id="gamaWeightActivity">'+gamaWeightContent()+'</div>'
 ][j];}
let gamaWeightStarted=null,gamaWeightRevealed=false,gamaWeightTimer=null;
function gamaWeightZoom(){modal.innerHTML='<button class="btn" onclick="modal.close()">닫기 ×</button><h2>무게를 살펴본 한국 가마</h2><img src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/36448/2059993/main-image" alt="20세기 한국 가마" style="width:100%;height:auto"><p class="hint">메트로폴리탄미술관 · 1993.447a–i · 20세기 한국 유물 · Public Domain</p>';modal.showModal();}
function gamaWeightContent(){if(gamaWeightRevealed)return '<section class="gama-weight-answer"><h3>이 가마는 '+gamaWord(22)+'입니다.</h3><p>가마꾼은 '+gamaWord(30)+'를 함께 감당하며 걸어야 했습니다.</p><p class="gama-situation-question">'+gamaSituationWord('far')+'을 가거나 '+gamaSituationWord('slope')+'을 오를 때에는 어떤 어려움이 있었을까요?</p><p class="gama-imagine-prompt">가마꾼이 되어 먼 길을 떠난다고 상상해 봅시다. 가마를 메고 걸을 때 몸은 어떨지, 무엇이 힘들지 이야기해 봅시다.</p></section>';if(gamaWeightStarted!==null)return '<div class="gama-think-track" role="progressbar" aria-label="가마의 무게는 얼마였을까요? 생각해봅시다." aria-valuemin="0" aria-valuemax="10" aria-valuenow="0"><span id="gamaThinkFill"></span><strong>가마의 무게는 얼마였을까요?<small>생각해봅시다.</small></strong></div>';return '<button class="btn primary" onclick="gamaStartWeight()">가마의 무게는 얼마였을까요?</button>';}
function gamaStartWeight(){if(gamaWeightStarted===null)gamaWeightStarted=Date.now();document.querySelector('#gamaWeightActivity').innerHTML=gamaWeightContent();gamaWeightTick();if(!gamaWeightRevealed&&gamaWeightTimer===null)gamaWeightTimer=setInterval(gamaWeightTick,100);}
function gamaWeightTick(){if(gamaWeightStarted===null||gamaWeightRevealed)return;const elapsed=Math.max(0,Date.now()-gamaWeightStarted);if(elapsed>=10000){gamaWeightRevealed=true;if(gamaWeightTimer!==null)clearInterval(gamaWeightTimer);gamaWeightTimer=null;if(current===0&&gamaPhase==='read'&&activeSource===3){document.querySelector('#gamaWeightActivity').innerHTML=gamaWeightContent();gamaUpdateNext();}return;}if(current===0&&gamaPhase==='read'&&activeSource===3){const fill=document.querySelector('#gamaThinkFill');if(fill){fill.style.width=(elapsed/100)+'%';fill.parentElement.setAttribute('aria-valuenow',String(Math.floor(elapsed/1000)));}}}
function renderGamaSource(){const j=activeSource,s=window.TRANSPORT_SOURCES[0][j],target=document.querySelector('#sourceView');
 target.innerHTML='<div class="gama-source-heading"><h2>'+esc(gamaSourceName(j))+'</h2><span>'+(gamaOrder.indexOf(j)+1)+' / '+gamaOrder.length+'</span></div><div class="gama-document-body"><div class="gama-source-visual">'+(j===3?'<button class="picture-button" onclick="gamaWeightZoom()" aria-label="무게를 살펴본 가마 사진 확대"><img class="gama-weight-photo" src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/36448/2059993/main-image" alt="메트로폴리탄미술관 소장 20세기 한국 가마"></button><span class="gama-artifact-credit">메트로폴리탄미술관 · 1993.447a–i · 20세기 한국 유물 · Public Domain</span>':j===0?gamaWeddingPhoto():j===1?gamaFirstPhoto():classroomVideoMain('gama-maker'))+gamaGlossary(j)+(j===0?'<details class="classroom-video-optional"><summary>옛 그림도 살펴보기</summary>'+gamaWeddingDrawing()+'</details>':'')+'</div><div class="reading">'+gamaReading(j)+'</div></div><div class="gama-source-footer"><span>출처: '+esc(s.provider)+' · '+esc(j===0?'1958.09.26 촬영':s.created)+' · '+esc(s.context)+'</span> '+(s.url?'<a href="'+safe(s.url)+'" target="_blank" rel="noopener">원본 출처 ↗</a>':'<button onclick="evidenceZoom('+j+')">기관 출처 정보 ↗</button>')+'<span class="gama-credit-note">'+(j===0?'한국정책방송원 e영상역사관 「혼례 행렬」 · 1958.09.26 · 원본 상세 주소 확인 중.':j===3?'20세기 한국 유물 한 점의 본체 88lb를 약 40kg으로 환산. 가마채 제외. 모든 가마의 무게를 뜻하지 않습니다.':j===1?'한국민족문화대백과사전 「가마」를 바탕으로 재서술했습니다. 원문 인용이 아닙니다.':'KBS 「동네 한 바퀴」 · 오늘날의 전통 가마 제작자 이야기 · 방송 연도 확인 중')+'</span>'+(j===1?'<span class="gama-credit-note">이용자·왕비 행렬 참고: 국사편찬위원회 <a href="https://contents.history.go.kr/mobile/km/view.do?levelId=km_023_0060_0050_0020_0040" target="_blank" rel="noopener">우리역사넷 「왕비 가마 행렬과 권위」 ↗</a> · <a href="https://www.gogung.go.kr/ebook/access/ecatalogt.jsp?Dir=187&amp;callmode=admin&amp;catimage=&amp;eclang=ko&amp;start=68&amp;um=s" target="_blank" rel="noopener">국립고궁박물관 「조선왕실의 가마」 ↗</a></span>':'')+'<details><summary>자료 정보</summary><p>자료 제목: '+esc(s.originalTitle||s.title)+'<br>자료가 보여 주는 시대: '+esc(s.depicted)+'<br>이용 조건: '+esc(s.license)+'<br>출처 확인: 2026.11.05</p></details></div>';

}
function gamaEvidence(j){if(gamaPhase!=='read')gamaReturnPhase=gamaPhase;gamaPhase='read';if(j>=0)activeSource=gamaOrder.indexOf(j)<=gamaUnlocked?j:gamaOrder[gamaUnlocked];renderExplore();document.querySelector(j===-1?'.transport-definition':'#sourceView').focus();}
function gamaSetPhase(p){if(p==='quiz')p='conclude';if(p==='conclude'&&!gamaPassed.every(Boolean))return;gamaPhase=p;renderExplore();}

function renderGama(){
 const ss=window.TRANSPORT_SOURCES[0];if(gamaOrder.indexOf(activeSource)>gamaUnlocked)activeSource=gamaOrder[0];
 app.innerHTML='<div class="gama-title-row"><h1 class="transport-name">가마</h1><div><p class="transport-definition" tabindex="-1">가마란 '+gamaWord(12)+'하는 '+gamaWord(11)+'의 탈것입니다.</p><span class="gama-definition-credit">뜻 출처: <a href="https://encykorea.aks.ac.kr/Article/E0000155" target="_blank" rel="noopener">한국민족문화대백과사전 「가마」</a> · 어린이용 재서술</span></div></div><section class="panel gama-top"><div class="stage-picture"><button class="picture-button" onclick="zoom(0)">'+art(0)+'</button><span class="gama-image-credit">출처: '+esc(representatives[0].provider)+' · '+esc(representatives[0].date)+'</span></div><div class="gama-notebook"><h2>탐구 수첩</h2><div id="gamaNotebook" aria-live="polite"></div></div></section>'+inquiryLensGuide()+'<ol class="gama-progress" aria-label="현재 탐구 활동">'+[['read','1. 자료에서 단서 찾기'],['conclude','2. 특징 정리하기']].map(([id,t])=>'<li class="'+(gamaPhase===id?'current':'')+'" '+(gamaPhase===id?'aria-current="step"':'')+'>'+t+'</li>').join('')+'</ol><section id="gamaActivity"></section>';
 const host=document.querySelector('#gamaActivity');
 if(gamaPhase==='read'){host.innerHTML='<div class="source-tabs gama-tabs" role="tablist" aria-label="가마 탐구 자료">'+gamaOrder.map((j,position)=>{const s=ss[j];return '<button id="tab-'+j+'" role="tab" aria-controls="sourceView" aria-selected="'+(j===activeSource)+'" class="btn gama-source-tab '+(j===activeSource?'primary':'')+'" '+(position>gamaUnlocked?'disabled':'')+' onclick="gamaSelectSource('+j+')"><span class="source-type">'+(j===2?'영상':j===1||j===3?'글':'사진')+'</span><strong>'+esc(gamaSourceName(j))+(gamaPassed[j]?' ✓':'')+'</strong></button>'}).join('')+'</div><div class="gama-document" id="sourceView" role="tabpanel" tabindex="-1"></div><div class="activity-actions gama-next-row"><button class="btn" onclick="home()">다른 교통수단 보기</button><span id="gamaClueCount" role="status"></span><button id="gamaNext" class="btn primary" onclick="gamaNext()">'+(gamaOrder.indexOf(activeSource)<gamaOrder.length-1?'다음 자료 탐구하기 →':'특징 정리하기 →')+'</button>'+(gamaReturnPhase?'<button class="btn" onclick="gamaResume()">'+(gamaReturnPhase==='quiz'?'확인 퀴즈':'특징 정리')+'로 돌아가기 →</button>':'')+'</div>';renderGamaSource();gamaWeightTick();gamaUpdateNext();}
 if(gamaPhase==='conclude')gamaRenderSummary();
 if(gamaPhase==='quiz'){gamaRenderQuiz();host.classList.add('gama-quiz-panel');}else host.classList.remove('gama-quiz-panel');gamaNotebook();
}
function gamaSourceClueCount(j){return gamaCollected.filter(i=>gamaClues[i].source===j).length;}
function gamaUpdateNext(){if(gamaPhase!=='read')return;const n=gamaSourceClueCount(activeSource);document.querySelector('#gamaClueCount').textContent='이번 자료의 단서 '+n+' / 2개';document.querySelector('#gamaNext').disabled=n<2||(activeSource===3&&!gamaWeightRevealed);}
function gamaSelectSource(j){classroomPauseInlineVideos();if(!Number.isInteger(j)||j<0||gamaOrder.indexOf(j)>gamaUnlocked)return;activeSource=j;renderExplore();}
function gamaNext(){if(gamaSourceClueCount(activeSource)<2||(activeSource===3&&!gamaWeightRevealed))return;if(gamaMissingRequired().length){gamaShowMissing();return;}gamaPopupSource=activeSource;gamaPopupChoice=null;gamaOpenMini();}
function gamaOpenMini(){const q=gamaMiniQuiz[gamaPopupSource];modal.innerHTML='<section class="gama-popup gama-popup--question"><span class="gama-popup-badge">'+(q.inference?'단서로 생각하기':'자료 확인')+'</span><h2>'+(q.inference?'가마를 이용할 때의 어려움은?':'이번 자료에서 알게 된 점')+'</h2><p>'+q.q+'</p><div class="gama-popup-options">'+q.options.map((o,i)=>'<button class="btn '+(gamaPopupChoice===i?'selected':'')+'" aria-pressed="'+(gamaPopupChoice===i)+'" onclick="gamaPopupChoice='+i+';gamaOpenMini()">'+quizOptionNumber(i)+esc(o)+'</button>').join('')+'</div><p id="gamaMiniStatus" role="status"></p><div class="controls"><button class="btn" onclick="modal.close()">자료 더 읽기</button><button class="btn primary" onclick="gamaCheckMini()">선택 확인하기</button></div></section>';if(!modal.open)modal.showModal();}
function gamaCheckMini(){if(gamaPopupChoice===null){document.querySelector('#gamaMiniStatus').textContent='생각을 하나 골라 주세요.';return}const q=gamaMiniQuiz[gamaPopupSource];if(gamaPopupChoice!==q.answer){gamaWrong(q.source,q.hint);return}modal.innerHTML='<section class="gama-popup gama-popup--success"><span class="gama-popup-badge">✓ 정답 확인</span><h2>정답입니다.</h2><p>'+gamaEmphasizeExplanation(q)+'</p><button class="btn primary" onclick="gamaAdvanceMini()">'+(gamaOrder.indexOf(gamaPopupSource)<gamaOrder.length-1?'확인했어요 · 다음 자료 탐구하기 →':'확인했어요 · 특징 정리하기 →')+'</button></section>';}
function gamaAdvanceMini(){if(gamaPopupChoice!==gamaMiniQuiz[gamaPopupSource].answer)return;gamaPassed[gamaPopupSource]=true;modal.close();const position=gamaOrder.indexOf(gamaPopupSource);if(position<gamaOrder.length-1){gamaUnlocked=Math.max(gamaUnlocked,position+1);activeSource=gamaOrder[position+1];gamaPhase='read';}else gamaPhase='conclude';renderExplore();document.querySelector('#gamaActivity').scrollIntoView({behavior:'smooth',block:'start'});}
function gamaWrong(j,hint){if(gamaPhase!=='read')gamaReturnPhase=gamaPhase;modal.innerHTML='<section class="gama-popup gama-popup--retry"><span class="gama-popup-badge">! 다시 확인</span><h2>아직 알맞은 답이 아니에요.</h2><p>관련 자료를 다시 탐색해보세요.</p><p class="gama-retry-hint">'+esc(hint)+'</p><button class="btn primary" onclick="modal.close();gamaEvidence('+j+')">'+esc(gamaSourceName(j))+' 다시 탐색하기 →</button></section>';if(!modal.open)modal.showModal();}
function gamaRenderSummary(){document.querySelector('#gamaActivity').innerHTML='<section class="panel"><h2>핵심 낱말로 특징을 완성해요</h2><p>자료에서 찾은 낱말을 골라 가마의 특징을 모아 봅시다.</p>'+gamaSummary.map((q,i)=>'<fieldset class="quiz-question compact-summary"><legend>'+q.label+' · '+q.q+'</legend>'+q.options.map((o,j)=>'<label class="quiz-option"><input type="radio" name="summary'+i+'" '+(gamaSummaryChoices[i]===j?'checked':'')+' onchange="gamaSummaryPick('+i+','+j+')">'+quizOptionNumber(j)+esc(o)+'</label>').join('')+'</fieldset>').join('')+'<p id="gamaSummaryStatus" role="status"></p><div class="question-box"><h3>우리가 고른 핵심 낱말</h3><div id="gamaConclusion" aria-live="polite"></div></div><div class="activity-actions"><button class="btn" onclick="gamaSetPhase(\'read\')">← 자료 다시 보기</button><button class="btn primary" onclick="gamaCheckSummary()">특징 완성하고 탐구 마치기 →</button></div></section>';gamaShowConclusion();}

function gamaCheckSummary(){if(gamaSummary.some((_,i)=>!Number.isInteger(gamaSummaryChoices[i]))){document.querySelector('#gamaSummaryStatus').textContent='각 항목에서 핵심 낱말을 하나씩 골라 주세요.';return}const wrong=gamaSummary.find((q,i)=>gamaSummaryChoices[i]!==q.answer);if(wrong){gamaWrong(wrong.source,'선택한 특징을 뒷받침하는 내용을 자료에서 다시 찾아보세요.');return}gamaShowConclusion();showExplorationComplete('가마',gamaSummary.map(q=>q.label+' : '+q.options[q.answer]));}

function gamaShowConclusion(){document.querySelector('#gamaConclusion').innerHTML=summaryKeywordCards(gamaSummary,gamaSummaryChoices);}

function gamaRenderQuiz(){gamaPhase='conclude';gamaRenderSummary();}

function gamaClearFeedback(){}
function gamaCheckQuiz(){gamaCheckSummary();}

function gamaResume(){const p=gamaReturnPhase;gamaReturnPhase=null;if(p)gamaSetPhase(p);}
function gamaSummaryPick(i,j){gamaSummaryChoices[i]=j;gamaShowConclusion();document.querySelector('#gamaSummaryStatus').textContent='';}

const gamaParts={
 13:{name:'바탕',cx:284,cy:324,rx:91,ry:17,labelX:287,labelY:269},
 14:{name:'뚜껑',cx:271,cy:178,rx:102,ry:31,labelX:271,labelY:110},
 15:{name:'가마채',cx:469,cy:292,rx:65,ry:11,labelX:486,labelY:241}
};
function gamaPartOverlay(){return gamaShownParts.map(i=>{const p=gamaParts[i];return '<g><title>'+p.name+'</title><ellipse cx="'+p.cx+'" cy="'+p.cy+'" rx="'+p.rx+'" ry="'+p.ry+'" fill="none" stroke="#fff8df" stroke-width="5"/><ellipse cx="'+p.cx+'" cy="'+p.cy+'" rx="'+p.rx+'" ry="'+p.ry+'" fill="none" stroke="#b74430" stroke-width="2.8"/><path d="M '+p.labelX+' '+(p.labelY+25)+' L '+p.cx+' '+(p.cy-p.ry)+'" stroke="#b74430" stroke-width="2" fill="none"/><rect x="'+(p.labelX-42)+'" y="'+p.labelY+'" width="84" height="27" rx="5" fill="#9f3728" stroke="#fff4d4" stroke-width="1.2"/><text x="'+p.labelX+'" y="'+(p.labelY+19)+'" text-anchor="middle" fill="#fffaf0" font-family="Malgun Gothic,sans-serif" font-size="17" font-weight="700">'+p.name+'</text></g>';}).join('');}
function gamaOverlaySVG(){return gamaShownParts.length?'<svg viewBox="0 0 740 517" class="gama-part-overlay" role="img" aria-label="'+gamaShownParts.map(i=>gamaParts[i].name).join('·')+' 위치 표시">'+gamaPartOverlay()+'</svg>':'';}
function gamaPartPhoto(){return '<figure class="gama-part-figure"><button class="picture-button gama-marked-photo" onclick="gamaZoomParts()" aria-label="가마와 가마꾼 사진 확대"><img src="'+safe(representatives[0].image)+'" alt="가마꾼이 가마채를 메고 옮기는 모습, 촬영 시기 미상" referrerpolicy="no-referrer"><span id="gamaPartOverlay">'+gamaOverlaySVG()+'</span></button><figcaption id="gamaPartStatus" class="gama-part-status" aria-live="polite">'+gamaShownParts.map(i=>gamaParts[i].name).join(' · ')+'</figcaption></figure>';}
function gamaShowPart(i){if(!gamaParts[i])return;if(!gamaShownParts.includes(i))gamaShownParts.push(i);const overlay=document.querySelector('#gamaPartOverlay');if(overlay)overlay.innerHTML=gamaOverlaySVG();const status=document.querySelector('#gamaPartStatus');if(status)status.textContent=gamaShownParts.map(id=>gamaParts[id].name).join(' · ');}
function gamaZoomParts(){modal.innerHTML='<button class="btn" onclick="modal.close()">닫기 ×</button><h2>가마의 생김새</h2><div class="gama-zoom-photo">'+gamaPartPhoto().replaceAll('id="gamaPartOverlay"','class="gamaZoomOverlay"').replaceAll('id="gamaPartStatus"','')+'</div><p class="hint">사진 수록: 아이스크림 교과서 98쪽 · 원소장기관·촬영자·촬영 시기 확인 중<br>원과 이름은 학습을 위해 덧붙인 표시입니다.</p>';if(!modal.open)modal.showModal();}

const gamaDefinitions={
 '가마꾼':'가마를 메고 가는 사람.',
 '본체':'물건의 중심이 되는 몸 부분.',
 '내외':'어떤 수보다 조금 적거나 많은 정도.',
 '바탕':'가마에서 사람이 앉는 아래쪽 부분.',
 '가마채':'가마를 들어 옮기도록 앞뒤로 길게 붙인 막대.',
 '벼슬':'옛날에 나라의 일을 맡은 사람에게 주던 직위.',
 '관리':'나라의 일을 맡아 하던 사람.',
 '신분':'옛날 사회에서 태어난 집안 등에 따라 나뉘던 사람들의 사회적 위치.',
 '지위':'사회나 모임에서 한 사람이 차지하는 자리나 위치.',
 '혼례':'두 사람이 결혼하는 의식.',
 '행렬':'여러 사람이 줄을 지어 함께 가는 모습.',
 '소장':'자료나 물건을 가지고 보관하는 것.',
 '수집':'필요하거나 가치 있는 자료와 물건을 모으는 일.'
};
const gamaGlossaryTerms={0:['혼례','행렬'],1:['바탕','가마채','가마꾼','내외','벼슬','관리','신분','지위'],2:['소장'],3:['소장','본체']};
function gamaGlossary(j){return '<section class="gama-glossary"><h3>어려운 낱말 모음집</h3><div class="gama-glossary-words">'+gamaGlossaryTerms[j].map((word,i)=>'<button class="btn" id="gamaTerm'+i+'" aria-expanded="false" aria-controls="gamaDefinition" onclick="gamaDefine('+j+','+i+')">'+word+'</button>').join('')+'</div><p id="gamaDefinition" class="gama-word-definition" role="status" hidden></p></section>';}
function gamaDefine(j,i){const word=gamaGlossaryTerms[j]?.[i];if(!word)return;const box=document.querySelector('#gamaDefinition');box.textContent=word+' : '+gamaDefinitions[word];box.hidden=false;gamaGlossaryTerms[j].forEach((_,k)=>{const button=document.querySelector('#gamaTerm'+k);button.setAttribute('aria-expanded',String(k===i));button.classList.toggle('primary',k===i);});}

function gamaEmphasizeExplanation(q){const words=[...(q.emphasis||[])].sort((a,b)=>b.length-a.length);let html='',position=0;while(position<q.confirm.length){const word=words.find(w=>q.confirm.startsWith(w,position));if(word){html+='<strong class="gama-key-emphasis">'+esc(word)+'</strong>';position+=word.length;}else{html+=esc(q.confirm[position]);position++;}}return html;}

function gamaWeddingOverlay(){return gamaWeddingShown?'<svg class="gama-part-overlay" viewBox="0 0 415 317" role="img" aria-label="가마 속 신부 위치 표시"><title>가마 속 신부</title><ellipse cx="29" cy="151" rx="28" ry="30" fill="none" stroke="#fff7df" stroke-width="5"/><ellipse cx="29" cy="151" rx="28" ry="30" fill="none" stroke="#c63d29" stroke-width="3"/><rect x="4" y="87" width="123" height="29" rx="5" fill="#ae3021" stroke="#fff4d4" stroke-width="1.4"/><text x="65.5" y="107" text-anchor="middle" fill="#fffaf0" font-family="Malgun Gothic,sans-serif" font-size="16" font-weight="700">가마 속 신부</text></svg>':'';}
function gamaWeddingPhoto(){const s=window.TRANSPORT_SOURCES[0][0];return '<button class="picture-button gama-marked-photo" onclick="gamaWeddingZoom()" aria-label="혼례 사진 확대"><img src="'+safe(s.image)+'" alt="1958년 전통 혼례 행렬"><span id="gamaWeddingOverlay">'+gamaWeddingOverlay()+'</span></button>';}
function gamaShowWedding(){gamaWeddingShown=true;const overlay=document.querySelector('#gamaWeddingOverlay');if(overlay)overlay.innerHTML=gamaWeddingOverlay();}
function gamaWeddingZoom(){const s=window.TRANSPORT_SOURCES[0][0];modal.innerHTML='<button class="btn" onclick="modal.close()">닫기 ×</button><h2>혼례 행렬</h2><div class="gama-zoom-photo">'+gamaWeddingPhoto().replace('id="gamaWeddingOverlay"','class="gamaWeddingZoomOverlay"')+'</div><p class="hint">출처: '+esc(s.provider)+' · '+esc(s.created)+'<br>원과 이름은 가마 안에 신부가 타고 있다는 사진 설명을 바탕으로 덧붙인 학습용 표시입니다.</p>';modal.showModal();}

const gamaHistoricImage='https://image-apma.amorepacific.com/upload/exhibition/1682410062800_w9R2EDtzmn.jpg';
function gamaHistoricPhoto(){return '<button class="picture-button" onclick="gamaHistoricZoom()" aria-label="길을 지나는 가마 사진 확대"><img src="'+gamaHistoricImage+'" alt="가마가 지나가는 모습을 찍은 흑백사진, 1906~1907년경" referrerpolicy="no-referrer" onerror="this.parentElement.hidden=true;document.querySelector(\'#gamaHistoricFallback\').hidden=false"></button><div id="gamaHistoricFallback" class="gama-external" hidden><p>사진을 불러오지 못했습니다.</p><a class="btn" href="https://apma.amorepacific.com/contents/exhibition/1629173/view.do" target="_blank" rel="noopener">원본 사진 보기 ↗</a></div>';}
function gamaHistoricZoom(){modal.innerHTML='<button class="btn" onclick="modal.close()">닫기 ×</button><h2>길을 지나는 가마</h2><img src="'+gamaHistoricImage+'" alt="1906~1907년경 가마 이용 모습" referrerpolicy="no-referrer" style="display:block;width:100%;height:auto"><p class="hint">출처: 국립민속박물관 소장 · 헤르만 산더 수집 · 1906~1907년경<br>이미지 제공 페이지: 아모레퍼시픽미술관</p>';modal.showModal();}
function gamaToggleHints(){gamaHintsOpen=!gamaHintsOpen;document.querySelector('#gamaThinkingClues').hidden=!gamaHintsOpen;const button=document.querySelector('#gamaHintButton');button.setAttribute('aria-expanded',String(gamaHintsOpen));button.textContent=gamaHintsOpen?'생각 단서 접기':'생각 단서 보기';}





function quizOptionNumber(i){return '<span class="quiz-choice-number">'+(['①','②','③','④','⑤','⑥'][i]||String(i+1)+'.')+'</span>'; }

function showExplorationComplete(name,facts){modal.innerHTML='<section class="gama-popup gama-popup--success exploration-complete"><span class="gama-popup-badge">✓ 탐구 완료</span><h2>'+esc(name)+' 탐구를 마쳤어요!</h2><ul class="completion-facts">'+facts.map(f=>'<li>'+esc(f)+'</li>').join('')+'</ul><p class="completion-discussion">새롭게 알게 된 것을 친구와 이야기 나눠봅시다.</p><section class="completion-thinking"><strong>생각해 볼 질문</strong><p>오늘날의 교통수단과 비슷한 것이 있는지 떠올려봅시다.</p></section><p class="completion-compare">오늘 탐구해 본 교통수단과 가장 비슷한 특징을 가진 것으로 보이는 교통수단과 비교해 봅시다.</p><div class="controls"><button class="btn" onclick="modal.close()">정리한 내용 다시 보기</button><button class="btn primary" onclick="finishToComparison()">비교 탐구하기 →</button></div></section>';if(!modal.open)modal.showModal();}
function finishToComparison(){selected=[current];modal.close();compare();}


function gamaMissingRequired(){return (gamaRequired[activeSource]||[]).filter(i=>!gamaCollected.includes(i));}
function gamaShowMissing(){const missing=gamaMissingRequired();modal.innerHTML='<section class="gama-popup gama-popup--question"><span class="gama-popup-badge">중요한 단서</span><h2>이 내용도 찾아봅시다.</h2><ul>'+missing.map(i=>'<li>'+esc(gamaCluePrompts[i])+'</li>').join('')+'</ul><button class="btn primary" onclick="gamaReturnToRequired()">자료에서 단서 찾기 →</button></section>';if(!modal.open)modal.showModal();}
function gamaReturnToRequired(){modal.close();const missing=gamaMissingRequired();if(activeSource===2&&!gamaHintsOpen)gamaToggleHints();if(missing.length){const button=document.querySelector('#sourceView [data-clue="'+missing[0]+'"]');if(button){button.scrollIntoView({behavior:'smooth',block:'center'});button.focus();}}}
function gamaFirstPhoto(){return gamaPartPhoto()+'<span class="gama-artifact-credit">사진 수록: 아이스크림 교과서 98쪽 · 원소장기관·촬영자·촬영 시기 확인 중</span>';}
function gamaVideoCard(){return '<section class="gama-video-card"><span class="source-type">영상</span><h3>1925년 혼례 속 가마</h3><p>당시 촬영한 혼례 기록을 소개하는 뉴스 영상입니다.</p><button class="btn primary" onclick="gamaOpenVideo()">영상 보기 ▶</button><p class="gama-artifact-credit">MBC · 전동혁 기자 · 뉴스 2020.05.20 / 기록 촬영 1925년 · 노르베르트 베버 · 함경남도 안변군<br>영상 제공: 성 베네딕도회 왜관수도원 · 국외소재문화재재단</p></section>';}
function gamaOpenVideo(){modal.innerHTML='<section class="gama-popup"><button class="btn" onclick="gamaCloseVideo()">닫기 ×</button><h2>영상 · 1925년 혼례 속 가마</h2><p>1925년에 촬영한 혼례 기록을 소개하는 2020년 뉴스입니다.</p><iframe title="MBC 1925년 혼례 기록 소개 영상" src="https://tv.naver.com/embed/13893572?autoPlay=false" allow="fullscreen" allowfullscreen style="width:100%;aspect-ratio:16/9;border:0"></iframe><p class="gama-source-footer">출처: MBC · 전동혁 · 2020.05.20 보도 · 1925년 노르베르트 베버 촬영 기록 포함<br><a href="https://imnews.imbc.com/newszoomin/newsinsight/5782599_29123.html" target="_blank" rel="noopener">원본 기사와 영상 보기 ↗</a> · <a href="https://tv.naver.com/v/13893572" target="_blank" rel="noopener">재생이 안 되면 원본 영상 열기 ↗</a></p></section>';if(!modal.open)modal.showModal();}

function gamaCloseVideo(){modal.close();modal.innerHTML='';}


const gamaSituationRevealed={far:false,slope:false};
function gamaSituationWord(key){const item={far:{initial:'ㅁ ㄱ',word:'먼 길'},slope:{initial:'ㅂㅌㄱ',word:'비탈길'}}[key];const revealed=gamaSituationRevealed[key];return '<button type="button" class="gama-situation-word '+(revealed?'revealed':'')+'" data-situation="'+key+'" aria-label="'+(revealed?item.word:'초성 '+item.initial+' · 누르면 낱말 보기')+'" aria-expanded="'+revealed+'" onclick="gamaRevealSituation(\''+key+'\')">'+(revealed?item.word:item.initial)+'</button>';}
function gamaRevealSituation(key){if(!Object.hasOwn(gamaSituationRevealed,key))return;gamaSituationRevealed[key]=true;const button=document.querySelector('[data-situation="'+key+'"]');if(button){const word=key==='far'?'먼 길':'비탈길';button.textContent=word;button.classList.add('revealed');button.setAttribute('aria-label',word);button.setAttribute('aria-expanded','true');}}

function gamaWeddingDrawing(){return '<section class="gama-video-card"><span class="source-type">그림</span><h3>김준근의 시집가고</h3><button class="picture-button" onclick="gamaOpenWeddingDrawing()" aria-label="시집가고 그림 크게 보기"><img src="assets/history-wedding-kim.jpg" alt="4명이 메는 신부의 가마와 2명이 드는 보교를 그린 김준근의 시집가고" style="width:100%;height:auto"></button><p>신부가 탄 가마는 <strong>4명</strong>이 메고, 뒤의 보교는 <strong>2명</strong>이 들고 있습니다.</p><p class="gama-artifact-credit">그림: 김준근 · 조선시대(19세기 말 활동)<br>이미지 출처: 국립민속박물관 · 우리역사넷 한국사 이미지 자료 수록 · 공공누리 제1유형<br><a href="https://contents.history.go.kr/front/ki/searchResultList.do?q=%EA%B0%80%EB%A7%88&pageIndex=1&pageUnit=20&blockSize=10" target="_blank" rel="noopener">출처: 「시집가고(김준근)」 검색 결과 ↗</a></p></section>';}
function gamaOpenWeddingDrawing(){modal.innerHTML='<section class="gama-popup"><button class="btn" onclick="modal.close()">닫기 ×</button><h2>그림 · 시집가고</h2><img src="assets/history-wedding-kim.jpg" alt="김준근의 시집가고 전체 그림" style="display:block;max-width:100%;max-height:65vh;margin:auto;object-fit:contain"><p>이 그림에서 신부는 4명이 메는 가마를 탔습니다. 뒤의 보교에는 혼례를 돕는 사람이 타고 있습니다.</p><p class="gama-source-footer">김준근 · 조선 · 이미지 출처: 국립민속박물관 · 해설: 안선규 / 우리역사넷 · 공공누리 제1유형<br><a href="https://contents.history.go.kr/front/ki/searchResultList.do?q=%EA%B0%80%EB%A7%88&pageIndex=1&pageUnit=20&blockSize=10" target="_blank" rel="noopener">원본 출처에서 「시집가고(김준근)」 열기 ↗</a></p></section>';if(!modal.open)modal.showModal();}

function summaryKeywordCards(questions,choices){return '<div class="summary-keywords">'+questions.map((q,i)=>'<div class="summary-keyword"><small>'+esc(q.label)+'</small><strong>'+esc(Number.isInteger(choices[i])?q.options[choices[i]]:'낱말을 골라 보세요')+'</strong></div>').join('')+'</div>';}

function inquiryLensGuide(){return '<div class="inquiry-lenses" aria-label="네 가지 탐구 관점"><span><strong>교통로</strong> 어디로?</span><span><strong>이동 대상</strong> 누구나 무엇을?</span><span><strong>움직이는 힘</strong> 어떤 힘으로?</span><span><strong>만든 재료</strong> 무엇으로?</span></div>';}

gamaMiniQuiz[2]={q:"가마를 가볍게 만들면 가마꾼의 어떤 어려움을 줄일 수 있을까요?",options:["가마 안이 어두운 불편","무게를 견디며 걸어야 하는 부담","출발을 기다려야 하는 불편"],answer:1,source:2,inference:true,hint:"제작자가 가볍게 만드는 까닭과 가마꾼이 감당하는 무게를 연결해 보세요.",confirm:"가마꾼은 가마와 탄 사람의 무게를 함께 감당하며 걸었습니다. 가마 자체를 가볍게 만들면 가마꾼이 들어야 하는 무게를 줄일 수 있습니다.",emphasis:["가마꾼","가마와 탄 사람의 무게","가볍게"]};
