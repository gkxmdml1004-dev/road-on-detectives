const railRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_016_0060_0010_0010';
const railPhoto = 'https://contents.history.go.kr/data/img/km/km_016/km_016_224_01.jpg';
const seatRecord = 'https://contents.history.go.kr/mobile/km/view.do?levelId=km_022_0040_0010_0030';
const railMuseum = steamSources[2].url;
const railLink = (url, label) => `<a href="${url}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
const railImage = (url, label) => `<button class="picture-button" onclick="zoomRailPhoto(this.firstElementChild)"><img class="evidence-image" src="${url}" alt="${esc(label)}"></button>`;
function zoomRailPhoto(img) {
  modal.innerHTML = `<button class="btn" onclick="modal.close()">닫기 ×</button><img src="${img.src}" alt="${esc(img.alt)}" style="display:block;max-width:100%;max-height:78vh;margin:auto">`;
  modal.showModal();
}

[steamSources[0], steamSources[1]] = [steamSources[1], steamSources[0]];
Object.assign(steamSources[0], {
  body: '1899년 경인선 개통 당시 사진에는 기관차에 [[물]]을 채우는 모습이 담겨 있습니다.\n\n증기기관차는 [[석탄 같은 연료]]를 태워 물을 끓였습니다. 이때 생긴 [[수증기]]가 기관차 안의 부품을 밀자 바퀴가 돌았습니다. 바퀴는 [[철길]] 위를 굴렀습니다.',
  extra: railRecord
});
steamSources[1].body = '[[1876년]] [[김기수]]는 일본에서 기차를 탔습니다. 그는 『일동기유』에 앞 차의 바퀴가 돌자 뒤에 이어진 [[여러 칸]]의 바퀴도 함께 돌았다고 적었습니다. 기차 안은 편안하게 느껴졌지만 창밖의 집과 나무는 [[너무 빨리 지나가]] 자세히 볼 수 없었습니다.';
steamSources[3].body = '경인선이 처음 열렸을 때 [[객차 6량]]과 [[화차 28량]]이 있었습니다. 객차에는 [[사람]], 화차에는 [[짐]]을 실었습니다.\n\n철도가 이어진 뒤 서울과 인천 사이를 오가는 시간이 줄었습니다. 국가기록원은 걸어서 약 12시간 걸리던 길을 기차로 약 1시간 40분에 갈 수 있었다고 소개합니다.';
steamSources[3].extra = seatRecord;
steamSources.push({
  title: '증기기차를 타고 나들이를 가요',
  body: '이 영상은 [[1989년]] 서울역에서 금곡까지 증기기차를 타고 [[관광]]을 한 기록입니다. 영상에서 기차가 달리는 모습과 사람들이 기차 안에서 도시락을 먹는 모습을 찾아보세요.',
  source: 'e영상역사관 · 미공개 대한뉴스 · 1989년 5월 10일 · 48초',
  url: steamVideo,
  question: '영상에서 이 기차에 사람이 탔다는 근거는 무엇인가요?',
  options: ['철길이 보였어요.', '기차 안에서 사람들이 도시락을 먹었어요.', '기관차가 움직였어요.'],
  answer: 1
});

const railMaterials = [
  {type:'사진과 글', task:'사진을 확대해 바퀴가 놓인 곳을 찾아보세요. 사진 설명에서 기관차에 무엇을 채우는지 확인하고, 물이 왜 필요한지 먼저 짐작해 봅시다.', visual:()=>railImage(railPhoto,'1899년 경인선 기관차')+railLink(railRecord,'우리역사넷 사진 설명'), terms:{철길:'기차 바퀴가 달리는 길', 수증기:'물이 기체로 바뀐 것', 연료:'태워서 열을 얻는 물질'}, groups:[3,4,4,2]},
  {type:'여행 기록', task:'기차 안에서 느낀 점과 창밖에서 본 모습을 각각 찾아보세요.', visual:()=>'<blockquote>우레와 번개처럼 달리고</blockquote><p>김기수 『일동기유』 · 우리역사넷 수록 번역 일부</p>', terms:{화륜거:'옛 기록에서 증기기차를 가리킨 말'}, groups:[1,0,4,4]},
  {type:'유물', task:'먼저 로켓호의 모양을 관찰하고, 박물관의 재료 목록을 읽어 무엇으로 만들었는지 확인해요.', visual:()=>railLink(railMuseum,'영국 과학박물관에서 로켓호 사진과 재료 보기'), terms:{황동:'구리와 아연을 섞어 만든 금속', 강철:'철을 바탕으로 만든 단단한 금속'}, groups:[3,3]},
  {type:'사진과 기록', task:'1등 객차와 3등 객차 사진의 좌석과 통로를 비교하세요. 이어 기록에서 객차와 화차가 각각 몇 칸 있었는지 찾아보세요.', visual:()=>[2,3].map((n,i)=>railImage('https://contents.history.go.kr/data/img/km/km_022/km_022_072_0'+n+'.jpg',i?'3등 객차':'1등 객차')+`<p>${i?'3등':'1등'} 객차</p>`).join('')+railLink(seatRecord,'우리역사넷 객차 사진과 차량 기록'), terms:{객차:'사람을 태우는 기차 칸', 화차:'짐을 싣는 기차 칸', 량:'기차의 칸 수를 세는 단위'}, groups:[3,3,3,3]},
  {type:'영상', task:'달리는 기관차와 도시락을 먹는 사람들이 나오는 장면을 각각 찾아보세요.', visual:()=>railLink(steamVideo,'운행 기록 영상 보기 · 48초'), terms:{관광:'다른 곳을 찾아가 구경하는 일'}, groups:[1,5]}
];
const railPocketLabels = ['누가','언제','어디서','무엇을','어떻게','왜'];
let railUnlocked = 0;

renderSteamReveal = function () {
  const complete = steamPieces === 3;
  modal.innerHTML = `<section class="rail-reveal">
    <div class="rail-dialog-head"><h2>${complete?'증기기차':'어떤 교통수단일까요?'}</h2><button class="btn" onclick="modal.close()">닫기 ×</button></div>
    <div class="rail-picture"><img src="${railPhoto}" alt="${complete?'1899년 경인선 기관차':'공개 중인 사진'}">
    ${[0,1,2].map(i=>i<steamPieces?'':`<span style="bottom:${i*100/3}%" aria-hidden="true"></span>`).join('')}</div>
    <div class="controls">${complete?railLink(steamVideo,'달리는 모습 보기 · 1989년 기록 48초')+'<button class="btn primary" onclick="showRailIntro()">증기기차를 탐구해 봅시다 →</button>':`<button class="btn primary" onclick="steamPieces++;renderSteamReveal();modal.querySelector('.primary').focus()">사진 조각 열기 · ${steamPieces}/3</button>`}</div>
    ${complete?`<p class="hint">${railLink(railRecord,'사진 · 우리역사넷 「경인선 기관차」 · 1899년')}</p>`:''}
  </section>`;
};

function showRailIntro() {
  modal.close();
  move('steamIntro');
  render();
}
function renderRailIntro() {
  app.innerHTML = `<section class="transport-intro"><div class="intro-photo">${railImage(railPhoto,'1899년 경인선 기관차')}<p class="intro-credit">${railLink(railRecord,'사진 · 우리역사넷 「경인선 기관차」 · 1899년')}</p></div><div class="intro-copy"><h1>증기기차</h1><p class="intro-definition">증기기관차는 물을 끓여 만든 <strong>수증기의 힘</strong>으로 움직이며 뒤에 연결한 기차 칸을 끕니다.</p><p class="intro-credit">${railLink(steamSources[0].url,'뜻 출처 · 증기철도에서 물이 중요한 까닭')}</p><button class="btn primary intro-start" onclick="startRailStudy()">자료 탐구 시작하기 →</button></div></section>`;
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
    <section class="panel gama-top"><div>${railImage(railPhoto,'1899년 경인선 기관차')}<p class="hint">${railLink(railRecord,'사진 · 우리역사넷, 1899년')}</p></div><div class="gama-notebook"><h2>탐구 수첩</h2><div class="rail-pockets" aria-live="polite">${pockets}</div></div></section>
    ${inquiryLensGuide()}<div class="rail-tabs">${tabs}</div>
    <section class="rail-reading"><div class="gama-source-heading"><h2>${esc(source.title)}</h2><span>${steamIndex+1} / ${steamSources.length}</span></div>
    <div class="gama-document-body"><div class="gama-source-visual">${material.visual()}<section class="gama-glossary"><h3>어려운 낱말 모음집</h3><div class="rail-terms">${glossary}</div></section></div>
    <div class="reading"><p class="rail-observation">${material.task}</p>${body}</div></div>
    <div class="gama-source-footer">${esc(source.source)} · ${railLink(source.url,'원본 출처')}${source.extra?' · '+railLink(source.extra,'관련 원자료'):''}</div>
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
