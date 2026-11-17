const railRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_016_0060_0010_0010';
const railHeroPhoto = 'assets/steam-mika-161.jpg';
const railHeroSource = 'https://commons.wikimedia.org/wiki/File:Korean_steam_locomotive_no._161.JPG';
const railHeroCredit = () => railLink(railHeroSource,'사진 · Pluskwa, 철도박물관 미카 3-161호 전시 사진 · 2014년')+' · '+railLink('https://creativecommons.org/licenses/by-sa/3.0/','CC BY-SA 3.0');
const seatRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_022_0040_0010_0030';
const railMuseum = steamSources[2];
const railPasi = 'https://digital.khs.go.kr/heri/heriDetail.do?ctptNo=4413104170000&ctptUid=13918099550072000085';
const railLink = (url, label) => `<a href="${url}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
const railImage = (url, label) => `<button class="picture-button" onclick="zoomRailPhoto(this.firstElementChild)"><img class="evidence-image" src="${url}" alt="${esc(label)}"></button>`;
function zoomRailPhoto(img) {
  modal.innerHTML = `<button class="btn" onclick="modal.close()">닫기 ×</button><img src="${img.src}" alt="${esc(img.alt)}" style="display:block;max-width:100%;max-height:78vh;margin:auto">`;
  modal.showModal();
}

Object.assign(steamSources[0], {
  body: '국가기록원 전시 자료에서는 옛날 사람들이 증기기차를 [[쇠당나귀]]라고 불렀다고 소개합니다. [[당나귀]]는 [[등]]에 [[사람]]과 [[짐]]을 싣고, [[쇠로 된 기차]]는 뒤에 연결한 [[칸]]에 [[사람]]과 [[짐]]을 실었습니다.\n\n증기기관차는 [[석탄 같은 연료]]를 태워 [[물]]을 끓였습니다. [[1899년]] 경인선 사진에도 [[기관차에 물을 채우는 모습]]이 담겨 있습니다.\n\n물을 끓여 만든 [[수증기]]의 힘으로 기관차의 바퀴를 돌렸습니다. 바퀴가 어떻게 함께 돌았는지는 다음 자료의 사진과 영상에서 살펴봅시다.\n\n김기수는 [[1876년]] 일본에서 기차를 타 본 뒤 『일동기유』에 기차를 [[화륜거]]라고 적었습니다.',
  title: '쇠당나귀는 어떻게 달렸을까요?',
  extra: railRecord,
  question:'당나귀와 증기기차는 둘 다 무엇을 옮겼나요?',
  options:['사람만 옮겼어요.','사람과 짐을 옮겼어요.','짐만 옮겼어요.'], answer:1
});
steamSources[3].title = '경인선이 바꾼 이동과 운반';
steamSources[3].body = '경인선이 처음 열렸을 때 [[객차 6량]]과 [[화차 28량]]이 있었습니다. 객차에는 [[사람]], 화차에는 [[짐]]을 실었습니다.';
steamSources[3].extra = seatRecord;
steamSources[3].question = '경인선이 처음 열렸을 때, 사람을 태우는 칸보다 더 많이 마련한 칸은 무엇인가요?';
steamSources[3].options = ['사람을 태우는 객차','짐을 싣는 화차','기차를 끄는 기관차'];
steamSources[3].answer = 1;



steamSources[0].body += '\n\n1829년에 만든 로켓호의 소장품 기록에는 [[철과 강철]], [[나무와 황동]]이 재료로 적혀 있습니다.';
steamSources.splice(2, 1);

function revealRailTravelTime(button, index) {
  button.textContent = ['약 12시간','약 1시간 40분'][index];
  button.setAttribute('aria-pressed','true');
}
function railTravelMap() {
  return `<figure class="rail-travel-map"><figcaption><strong>서울과 인천을 이은 철길</strong> · 위치와 경로를 간략히 그린 지도</figcaption>
    <svg viewBox="0 0 520 280" role="img" aria-label="서쪽 인천항에서 부평과 부천을 지나 동쪽 서울 노량진으로 이어지는 경인선 지도" style="display:block;width:100%;height:auto;margin-top:.75rem;border-radius:12px">
      <rect width="520" height="280" fill="#f8f3df"/>
      <path d="M0 0H70L84 35 61 60 76 93 56 119 74 143 62 173 92 205 80 230 111 252 112 280H0Z" fill="#b5d9e7"/>
      <path d="M520 100C460 91 449 154 404 148S348 101 317 98 270 121 223 103 189 73 150 78 122 100 76 92" fill="none" stroke="#b5d9e7" stroke-width="17"/>
      <path d="M80 180Q105 200 134 188T190 166Q215 159 239 177T295 182Q321 193 349 180T405 171" fill="none" stroke="#a53c2c" stroke-width="6"/>
      <path d="M405 171Q433 150 448 134T470 114" fill="none" stroke="#345a74" stroke-width="5" stroke-dasharray="7 6"/>
      <g fill="#a53c2c" stroke="#fff" stroke-width="2"><circle cx="80" cy="180" r="7"/><circle cx="190" cy="166" r="5"/><circle cx="239" cy="177" r="5"/><circle cx="405" cy="171" r="7"/></g>
      <circle cx="470" cy="114" r="7" fill="#345a74" stroke="#fff" stroke-width="2"/>
      <g fill="#302617" font-family="sans-serif" font-weight="700" font-size="17"><text x="90" y="139">인천</text><text x="427" y="68">서울</text><text x="36" y="211">제물포·인천역 일대</text><text x="174" y="148">부평</text><text x="226" y="207">부천</text><text x="381" y="200">노량진</text><text x="452" y="99">서울역</text><text x="20" y="46">서해</text><text x="301" y="79">한강</text></g>
      <g font-family="sans-serif" font-size="14" fill="#302617"><path d="M130 250h28" stroke="#a53c2c" stroke-width="5"/><text x="165" y="255">1899년 개통 구간</text><path d="M310 250h28" stroke="#345a74" stroke-width="5" stroke-dasharray="6 4"/><text x="345" y="255">서울역 방향</text></g>
    </svg>
    <p><strong>1899년</strong> 제물포(인천) ↔ 노량진<br><strong>오늘날 비교</strong> 인천역 ↔ 서울역</p>
    <p>${railLink('https://www.openstreetmap.org/#map=11/37.497/126.800','지도 크게 보기')}</p>
    <p>지하철(수도권 1호선) 약 <strong>1시간 10분</strong> · 자동차 약 <strong>31분</strong></p><small>자동차는 경로 검색 예시이며 도로 상황에 따라 달라져요. ${railLink('https://www.rome2rio.com/s/Seoul-Station/Incheon-Station','이동 시간 출처')}</small>
  </figure>`;
}
let railCargoReady = false;
function startRailCargoTimer(button) {
  if (button.getAttribute('aria-disabled') === 'true') return;
  button.setAttribute('aria-disabled','true');
  const deadline = performance.now() + 10000;
  const countdown = setInterval(() => {
    if (!button.isConnected) { clearInterval(countdown); return; }
    const remaining = Math.max(0, deadline - performance.now());
    button.style.setProperty('--cargo-fill', (100 - remaining / 100) + '%');
    button.querySelector('small').textContent = Math.ceil(remaining / 1000) + '초';
    if (remaining > 0) return;
    clearInterval(countdown);
    railCargoReady = true;
    button.querySelector('small').textContent = '';
    document.querySelector('#railCargoEvidence').hidden = false;
  },100);
}
function railArchiveVideos() {
  const videos = [
    ['lLNmbTxLGbw','증기기관차에서의 경로잔치','당시 사람들이 증기기관차를 이용하는 모습을 살펴보세요.'],
    ['7t0fUfO8WDA','발전하는 교통시설','석탄을 캐는 모습을 살펴보세요.']
  ];
  return videos.map(([id,title,task])=>`<details><summary>${title}</summary><p>${task}</p>
    ${location.protocol==='file:'?'':`<iframe referrerpolicy="strict-origin-when-cross-origin" loading="lazy" title="${title}" src="https://www.youtube-nocookie.com/embed/${id}" style="display:block;width:100%;aspect-ratio:16/9;border:0" allowfullscreen></iframe>`}
    <p>${railLink('https://youtu.be/'+id,'유튜브에서 처음부터 보기')}</p></details>`).join('');
}
function railRunningClips() {
  return `<section class="rail-running-clips">
    <h3>달리는 증기기차 관찰하기</h3>
    <p>바퀴와 연결 막대가 어떻게 움직이는지 살펴보세요.</p>
    ${[[186,241,'3:06–4:01'],[291,307,'4:51–5:07']].map(([start,end,label])=>`<details>
      <summary>기영이네 · ${label}</summary>
      ${location.protocol==="file:"?"":`<iframe referrerpolicy="strict-origin-when-cross-origin" loading="lazy" title="기영이네 증기기차 장면 ${label}" src="https://www.youtube-nocookie.com/embed/Oy-Zb0IRQZU?start=${start}&amp;end=${end}" style="display:block;width:100%;aspect-ratio:16/9;border:0" allowfullscreen></iframe>`}
      <p>${railLink('https://www.youtube.com/watch?v=Oy-Zb0IRQZU&t='+start+'s','유튜브에서 이 장면부터 보기')}</p>
    </details>`).join('')}
  </section>`;
}
function revealRailWord(button, index) {
 button.textContent = ['석탄','물','수증기'][index];
 button.setAttribute('aria-pressed','true');
}
const railMaterials = [
  {type:'사진과 글', task:'당나귀와 증기기차는 어떤 일을 비슷하게 했나요?', visual:()=>railImage('assets/inquiry-train.jpg','철길을 달리는 증기기차')+'<p>사진 · 수업용 제공 자료 99쪽</p>'+railLink(steamSources[0].url,'김기수 『일동기유』 번역문 열기'), terms:{화륜거:'김기수가 기록에서 기차를 가리킨 말', 쇠당나귀:'쇠로 된 기차를 당나귀에 빗댄 표현'}, groups:[3,0,3,3,3,0,3,3,3,4,3,1,4,4,1,3,3,3]},
  {type:'사진과 글', task:'사진을 확대해 큰 바퀴들의 옆면을 보세요. 어느 바퀴들이 같은 막대로 이어져 있나요? 한 바퀴가 돌 때 막대로 이어진 바퀴는 어떻게 움직일까요?', visual:()=>railImage(railHeroPhoto,'미카형 증기기관차의 바퀴와 연결 막대')+'<p>'+railHeroCredit()+'</p><p>'+railLink(railPasi,'국가유산청 · 파시형 증기기관차 23호')+'</p><p>'+railLink('https://www.youtube.com/watch?v=ghfYcIJDOgU','증기기관차 작동 원리 영상')+'</p>', terms:{철길:'기차 바퀴가 달리는 길', 수증기:'물이 기체로 바뀐 것', 연료:'태워서 열을 얻는 물질'}, groups:[3,4,2]},
  {type:'사진과 기록', task:'경인선 차량 기록에서 객차와 화차의 수를 비교해 보세요. 어느 종류의 칸을 더 많이 마련했나요? 그 까닭을 친구와 이야기해 보세요.', visual:()=>railImage('assets/inquiry-train.jpg','기차 칸을 연결한 증기기차')+'<p class="rail-photo-credit">사진 · 수업용 제공 자료 99쪽</p>'+railLink(seatRecord,'우리역사넷 경인선 차량 기록')+'<p>'+railLink('https://www.korea.kr/news/policyNewsView.do?newsId=148873973','1899년 경인선 개통 기록')+'</p>', terms:{객차:'사람을 태우는 기차 칸', 화차:'짐을 싣는 기차 칸', 량:'기차의 칸 수를 세는 단위'}, groups:[3,3,3,3]},
];
steamNotes = steamSources.map(() => new Set());
const railPocketLabels = ['누가','언제','어디서','무엇을','어떻게','왜'];
let railUnlocked = 0;

const railName = Array.from('증기기차');
const railRevealedLetters = new Set();
function revealRailLetter(index) {
  railRevealedLetters.add(index);
  renderSteamReveal();
  modal.querySelector('.primary')?.focus();
}
const openRailPuzzle = openSteamReveal;
openSteamReveal = function () {
  railRevealedLetters.clear();
  openRailPuzzle();
};

renderSteamReveal = function () {
  const complete = steamPieces === 3;
  const railNameRevealed = railRevealedLetters.size === railName.length;
  modal.innerHTML = `<section class="rail-reveal">
    <div class="rail-dialog-head"><h2>${railNameRevealed?'증기기차':'이 교통수단은 무엇일까요?'}</h2><button class="btn" onclick="modal.close()">닫기 ×</button></div>
    <div class="rail-picture"><img src="assets/inquiry-train.jpg" alt="${complete?'수업 자료의 증기기차':'공개 중인 사진'}">
    ${[0,1,2].map(i=>i<steamPieces?'':`<span style="top:${i*100/3}%" aria-hidden="true"></span>`).join('')}</div>
    <div class="controls">${railNameRevealed?railLink(steamVideo,'달리는 모습 보기 · 1989년 기록 48초')+'<button class="btn primary" onclick="showRailIntro()">증기기차를 탐구해 봅시다 →</button>':complete?`<p style="word-break:keep-all">과연 이 교통수단의 이름은 무엇일까요? </p><div class="rail-name-slots" role="group" aria-label="교통수단 이름 글자 칸">${railName.map((letter,i)=>railRevealedLetters.has(i)?`<span class="btn">${letter}</span>`:`<button id="railLetter${i}" class="btn primary" aria-label="${i+1}번째 글자 열기" onclick="revealRailLetter(${i})">0</button>`).join('')}</div>`:`<button class="btn primary" onclick="steamPieces++;renderSteamReveal();modal.querySelector('.primary')?.focus()">사진 조각 열기 · ${steamPieces}/3</button>`}</div>
    ${complete?`<p class="hint">사진 · 수업용 제공 자료 99쪽</p>`:''}
  </section>`;
};

function showRailIntro() {
  modal.close();
  move('steamIntro');
  render();
}
function renderRailIntro() {
  app.innerHTML = `<section class="transport-intro"><div class="intro-photo">${railImage('assets/inquiry-train.jpg','철길을 달리는 증기기차')}<p class="intro-credit">사진 · 수업용 제공 자료 99쪽</p></div><div class="intro-copy"><h1>증기기차</h1><p class="intro-definition">증기기관차는 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,0)">ㅅㅌ</button>으로 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,1)">ㅁ</button>을 끓여 만든 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,2)">ㅅㅈㄱ</button>의 힘으로 움직이며 뒤에 연결한 기차 칸을 끌었습니다.</p><p class="intro-credit">${railLink(steamSources[1].url,'뜻 출처 · 증기철도에서 물이 중요한 까닭')}</p><button class="btn primary intro-start" onclick="startRailStudy()">자료 탐구 시작하기 →</button></div></section>`;
}
function startRailStudy() {
  railUnlocked = 0;
  railCargoReady = false;
  startSteamStudy();
}
function selectRailSource(i) {
  if (i > railUnlocked) return;
  steamDone = false;
  steamIndex = i;
  renderSteamStudy();
  document.querySelector('.rail-tabs')?.scrollIntoView({block:'nearest'});
}
function railWords(source) {
  return [...source.body.matchAll(/\[\[([^\]]+)\]\]/g)].map(match=>match[1]);
}
const originalSteamSummary = renderSteamStudy;
renderSteamStudy = function (focusId) {
  if (steamDone) {
    originalSteamSummary(focusId);
    return;
  }
  const source = steamSources[steamIndex];
  const material = railMaterials[steamIndex];
  const words = railWords(source);
  const pockets = railPocketLabels.map((label, group)=>{
    const saved = steamSources.flatMap((s,j)=>railWords(s).map((word,i)=> steamNotes[j].has(i)&&railMaterials[j].groups[i]===group?`<button class="notebook-word" onclick="selectRailSource(${j})">${esc(word)}</button>`:''));
    return `<section class="clue-pocket"><h3>${label}</h3><div class="pocket-words">${saved.join('')||'아직 없음'}</div></section>`;
  }).join('');
  let clueIndex = 0;
  const body = esc(source.body).split('\n\n').map(p=>'<p>'+p.replace(/\[\[([^\]]+)\]\]/g,(_,word)=>{
    const i = clueIndex++;
    const saved = steamNotes[steamIndex].has(i);
    return `<button id="steamClue${i}" class="clue-word essential-clue ${saved?'found':''}" aria-pressed="${saved}" onclick="collectSteamClue(${i})">${word}</button>`;
  })+'</p>').join('');
  const glossary = Object.entries(material.terms).map(([word,meaning])=>`<details><summary>${word}</summary><p>${meaning}</p></details>`).join('');
  const tabs = steamSources.map((item,i)=>`<button class="btn ${i===steamIndex?'primary':''}" ${i>railUnlocked?'disabled':''} onclick="selectRailSource(${i})"><small>${railMaterials[i].type}</small> ${esc(item.title)}</button>`).join('');
  app.innerHTML = `<h1>증기기차</h1>
    <section class="panel gama-top"><div>${railImage(railHeroPhoto,'철도박물관에 전시된 미카형 증기기관차')}<p class="hint">사진 · 수업용 제공 자료 99쪽</p></div><div class="gama-notebook"><h2>탐구 수첩</h2><div class="rail-pockets" aria-live="polite">${pockets}</div></div></section>
    ${inquiryLensGuide()}<div class="rail-tabs">${tabs}</div>
    <section class="rail-reading"><div class="gama-source-heading"><h2>${esc(source.title)}</h2><span>${steamIndex+1} / ${steamSources.length}</span></div>
    <div class="gama-document-body"><div class="gama-source-visual">${material.visual()}<section class="gama-glossary"><h3>어려운 낱말 모음집</h3><div class="rail-terms">${glossary}</div></section></div>
    <div class="reading">${steamIndex===0?body:""}${steamIndex===2?"":`<p class="rail-observation">${material.task}</p>`}${steamIndex===1?body:""}${steamIndex===2?`<button class="btn rail-cargo-question" onclick="startRailCargoTimer(this)" aria-disabled="${railCargoReady}" style="--cargo-fill:${railCargoReady?100:0}%">옛날 증기기차에는 사람과 짐 중 어떤 것을 많이 실었을까요? <small></small></button><div id="railCargoEvidence" ${railCargoReady?"":"hidden"}><section class="rail-cargo-record"><h3>경인선 차량 기록</h3>${body}</section><div class="rail-time-highlight"><p>걸어서 약 몇 시간 걸렸을까요? <button class="rail-word" aria-pressed="false" onclick="revealRailTravelTime(this,0)">(&nbsp;&nbsp;)시간</button></p><p>증기기차로 이동하면서 몇 시간으로 줄었을까요? <button class="rail-word" aria-pressed="false" onclick="revealRailTravelTime(this,1)">(&nbsp;&nbsp;)시간 (&nbsp;&nbsp;)분</button></p></div>${railTravelMap()}</div>`:""}${steamIndex===1?`<details><summary>바퀴를 막대로 연결한 까닭</summary><p>증기가 피스톤을 앞뒤로 밀면, 막대가 그 움직임을 바퀴에 전달해요. 큰 바퀴들을 잇는 막대는 여러 바퀴가 함께 돌게 해서 철길을 밀며 나아갈 수 있게 해요.</p></details><h3>영상으로 알아보기 · 증기는 무엇일까요?</h3><p>영상을 보면서 물을 데우면 어떤 변화가 생기는지 찾아보세요. 기차 안에서는 그 변화로 어떻게 바퀴를 움직였을까요?</p><p>${railLink('https://youtu.be/9XmvGHQr194?t=94','영상 1:34부터 보기')}</p><details><summary>찾은 단서 확인하기</summary><p>물이 끓으면 기체 상태인 수증기가 생겨요. 보일러에서 만들어진 증기의 압력은 피스톤을 움직일 수 있어요.</p></details>${railRunningClips()}${railArchiveVideos()}`:''}</div></div>
    <div class="gama-source-footer">${esc(source.source)} · ${railLink(source.url,'원본 출처')}${source.extra?' · '+railLink(source.extra,'관련 원자료'):''}${steamIndex===0?' · '+railLink('https://contents.history.go.kr/front/km/view.do?levelId=km_004_0030_0020_0020','김기수 『일동기유』 번역문')+' · '+railLink('https://theme.archives.go.kr/next/railroad/page2.do','국가기록원 전시 해설')+' · '+railLink(railMuseum.url,'로켓호 소장품과 재료'):''}</div>
    <div class="controls"><button class="btn primary" ${steamNotes[steamIndex].size<2?'disabled':''} onclick="openSteamQuiz()">단서 ${steamNotes[steamIndex].size}개 · 자료 확인하기 →</button></div></section>`;
  if (focusId) document.querySelector('#'+focusId)?.focus();
}
advanceSteam = function () {
  modal.close();
  if (steamIndex === steamSources.length-1) {
    steamDone = true;
    renderSteamStudy();
    window.scrollTo(0,0);
    return;
  }
  railUnlocked = Math.max(railUnlocked, steamIndex+1);
  selectRailSource(steamIndex+1);
};
