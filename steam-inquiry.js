const railRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_016_0060_0010_0010';
const railHeroPhoto = 'assets/steam-mika-161.jpg';
const railHeroSource = 'https://commons.wikimedia.org/wiki/File:Korean_steam_locomotive_no._161.JPG';
const railHeroCredit = () => railLink(railHeroSource,'사진 · Pluskwa, 철도박물관 미카 3-161호 전시 사진 · 2014년')+' · '+railLink('https://creativecommons.org/licenses/by-sa/3.0/','CC BY-SA 3.0');
const seatRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_022_0040_0010_0030';
const railMuseum = steamSources[2].url;
const railPasi = 'https://digital.khs.go.kr/heri/heriDetail.do?ctptNo=4413104170000&ctptUid=13918099550072000085';
const railLink = (url, label) => `<a href="${url}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
const railImage = (url, label) => `<button class="picture-button" onclick="zoomRailPhoto(this.firstElementChild)"><img class="evidence-image" src="${url}" alt="${esc(label)}"></button>`;
function zoomRailPhoto(img) {
  modal.innerHTML = `<button class="btn" onclick="modal.close()">닫기 ×</button><img src="${img.src}" alt="${esc(img.alt)}" style="display:block;max-width:100%;max-height:78vh;margin:auto">`;
  modal.showModal();
}

steamSources.splice(0, 1);
Object.assign(steamSources[0], {
  body: '김기수는 1876년 일본에서 기차를 타 보고, 여행 기록 『일동기유』에 이 탈것을 [[화륜거]]라고 적었습니다. 앞차의 바퀴가 돌자 뒤에 이어진 [[여러 칸]]의 바퀴도 함께 돌았다고 했습니다.\n\n국가기록원 전시에서는 기차를 ‘쇠당나귀’라고도 소개합니다. 이 표현이 기차를 가리킨 당시 문헌은 아직 확인하지 못했습니다.\n\n1899년 경인선 개통 당시 사진에는 기관차에 [[물]]을 채우는 모습이 담겨 있습니다.\n\n증기기관차는 [[석탄 같은 연료]]를 태워 물을 끓였습니다. 이때 생긴 [[수증기]]가 기관차 안의 부품을 밀었습니다. 부품이 앞뒤로 움직이면 [[연결 막대]]가 그 움직임을 바퀴에 전달했습니다. 바퀴는 [[철길]] 위를 굴렀습니다.',
  extra: railRecord,
  question:'김기수의 『일동기유』에는 기차를 무엇이라고 적었나요?',
  options:['쇠당나귀','화륜거','달구지'], answer:1
});
steamSources[2].body = '경인선이 처음 열렸을 때 [[객차 6량]]과 [[화차 28량]]이 있었습니다. 객차에는 [[사람]], 화차에는 [[짐]]을 실었습니다.\n\n철도가 이어진 뒤 서울과 인천 사이를 오가는 시간이 줄었습니다. 국가기록원은 걸어서 약 12시간 걸리던 길을 기차로 약 1시간 40분에 갈 수 있었다고 소개합니다.';
steamSources[2].extra = seatRecord;
steamSources[2].question = '경인선이 처음 열렸을 때, 사람을 태우는 칸보다 더 많이 마련한 칸은 무엇인가요?';
steamSources[2].options = ['사람을 태우는 객차','짐을 싣는 화차','기차를 끄는 기관차'];
steamSources[2].answer = 1;



function revealRailWord(button, index) {
 button.textContent = ['석탄','물','수증기'][index];
 button.setAttribute('aria-pressed','true');
}
const railMaterials = [
  {type:'문헌', task:'번역문에서 김기수가 기차를 가리킨 말과 창밖 풍경을 묘사한 부분을 찾아보세요.', visual:()=>railLink(steamSources[0].url,'김기수 『일동기유』 번역문 열기'), terms:{화륜거:'김기수가 기록에서 기차를 가리킨 말'}, groups:[3,4]},
  {type:'사진과 글', task:'사진을 확대해 큰 바퀴 옆에 길게 이어진 막대를 찾아보세요. 기관차 안에서 부품이 앞뒤로 움직이면, 이 막대는 바퀴를 어떻게 움직이게 할까요?', visual:()=>railImage(railHeroPhoto,'미카형 증기기관차의 바퀴와 연결 막대')+'<p>'+railHeroCredit()+'</p><p>'+railLink(railPasi,'국가유산청 · 파시형 증기기관차 23호')+'</p><p>'+railLink('https://www.youtube.com/watch?v=ghfYcIJDOgU','증기기관차 작동 원리 영상')+'</p>', terms:{철길:'기차 바퀴가 달리는 길', 수증기:'물이 기체로 바뀐 것', 연료:'태워서 열을 얻는 물질'}, groups:[3,4,2]},
  {type:'유물', task:'먼저 로켓호의 모양을 관찰하고, 박물관의 재료 목록을 읽어 무엇으로 만들었는지 확인해요.', visual:()=>railLink(railMuseum,'영국 과학박물관에서 로켓호 사진과 재료 보기'), terms:{황동:'구리와 아연을 섞어 만든 금속', 강철:'철을 바탕으로 만든 단단한 금속'}, groups:[3,3]},
  {type:'사진과 기록', task:'경인선 차량 기록에서 객차와 화차의 수를 비교해 보세요. 어느 종류의 칸을 더 많이 마련했나요? 그 까닭을 친구와 이야기해 보세요.', visual:()=>'<dl class="clue-pocket"><dt>증기기관차</dt><dd>4대</dd><dt>객차</dt><dd>6량</dd><dt>화차</dt><dd>28량</dd></dl>'+railLink(seatRecord,'우리역사넷 경인선 차량 기록')+'<p>'+railLink('https://www.korea.kr/news/policyNewsView.do?newsId=148873973','1899년 제물포~노량진 · 약 1시간 40분')+'</p>', terms:{객차:'사람을 태우는 기차 칸', 화차:'짐을 싣는 기차 칸', 량:'기차의 칸 수를 세는 단위'}, groups:[3,3,1]},
];
const railPocketLabels = ['누가','언제','어디서','무엇을','어떻게','왜'];
let railUnlocked = 0;

renderSteamReveal = function () {
  const complete = steamPieces === 3;
  modal.innerHTML = `<section class="rail-reveal">
    <div class="rail-dialog-head"><h2>${complete?'증기기차':'어떤 교통수단일까요?'}</h2><button class="btn" onclick="modal.close()">닫기 ×</button></div>
    <div class="rail-picture"><img src="assets/inquiry-train.jpg" alt="${complete?'수업 자료의 증기기차':'공개 중인 사진'}">
    ${[0,1,2].map(i=>i<steamPieces?'':`<span style="bottom:${i*100/3}%" aria-hidden="true"></span>`).join('')}</div>
    <div class="controls">${complete?railLink(steamVideo,'달리는 모습 보기 · 1989년 기록 48초')+'<button class="btn primary" onclick="showRailIntro()">증기기차를 탐구해 봅시다 →</button>':`<button class="btn primary" onclick="steamPieces++;renderSteamReveal();modal.querySelector('.primary').focus()">사진 조각 열기 · ${steamPieces}/3</button>`}</div>
    ${complete?`<p class="hint">사진 · 수업용 제공 자료 99쪽</p>`:''}
  </section>`;
};

function showRailIntro() {
  modal.close();
  move('steamIntro');
  render();
}
function renderRailIntro() {
  app.innerHTML = `<section class="transport-intro"><div class="intro-photo">${railImage(railHeroPhoto,'철도박물관에 전시된 미카형 증기기관차')}<p class="intro-credit">${railHeroCredit()}</p></div><div class="intro-copy"><h1>증기기차</h1><p class="intro-definition">증기기관차는 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,0)">ㅅㅌ</button>으로 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,1)">ㅁ</button>을 끓여 만든 <button class="rail-word" aria-pressed="false" onclick="revealRailWord(this,2)">ㅅㅈㄱ</button>의 힘으로 움직이며 뒤에 연결한 기차 칸을 끌었습니다.</p><p class="intro-credit">${railLink(steamSources[1].url,'뜻 출처 · 증기철도에서 물이 중요한 까닭')}</p><button class="btn primary intro-start" onclick="startRailStudy()">자료 탐구 시작하기 →</button></div></section>`;
}
function startRailStudy() {
  railUnlocked = 0;
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
  const body = esc(source.body).split('\n\n').map(p=>'<p>'+p.replace(/\[\[([^\]]+)\]\]/g,(_,word)=>{
    const i = words.indexOf(word);
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
    <div class="reading"><p class="rail-observation">${material.task}</p>${body}</div></div>
    <div class="gama-source-footer">${esc(source.source)} · ${railLink(source.url,'원본 출처')}${source.extra?' · '+railLink(source.extra,'관련 원자료'):''}${steamIndex===0?' · '+railLink('https://contents.history.go.kr/front/km/view.do?levelId=km_004_0030_0020_0020','김기수 『일동기유』 번역문')+' · '+railLink('https://theme.archives.go.kr/next/railroad/page2.do','국가기록원 전시 해설'):''}</div>
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
