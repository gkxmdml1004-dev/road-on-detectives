const newTransport = {
  1: {
    photo:'inquiry-steamship.jpg', intro:'증기선은 수증기의 힘으로 움직이며 여러 항구를 오가면서 사람과 짐을 옮겼어요.',
    facts:['항구를 잇는 물길','승객과 쌀 같은 화물','물을 끓여 얻은 수증기의 힘','배에 따라 나무나 철을 사용했어요. 엽서 속 배의 정확한 재료는 제작 기록을 찾아야 알 수 있어요.'],
    sources:[
      ['엽서','인천항 선거 부두','https://history.ice.go.kr/sub/archive.php?mn=archive&md=v&bn=hana_board_02&contents_idx=603','화도진도서관 · 1933년 엽서','배가 정박한 곳과 쌀을 옮기는 사람들이 있는 곳은 얼마나 가까운가요? 배에서 내린 물건은 부두에서 어디로 갔을까요?','부두|쌀'],
      ['승선권','박람회에 가는 배표','https://history.ice.go.kr/sub/archive.php?mn=archive&md=v&bn=hana_board_02&contents_idx=431','화도진도서관 · 1915년 박람회 승선권','이 표를 가진 사람은 왜 배를 탔을까요? 왕복 표라면 어떤 두 번의 이동에 썼을까요?','박람회|왕복 승선권'],
      ['기록','배가 오간 항구들','https://contents.history.go.kr/front/tg/view.do?levelId=tg_004_0270&treeId=0200','우리역사넷 · 대한 협동 우선 회사','기선이 오간 항구 이름을 찾아보세요. 인천, 군산, 목포, 부산은 왜 배로 연결할 수 있었을까요?','항구|사람과 화물']
    ]
  },
  2: {
    photo:'inquiry-car.jpg', intro:'초기 자동차는 마차와 비슷했어요. 휘발유를 쓰는 엔진이 바퀴를 돌려 도로를 달렸어요.',
    facts:['도로','승객 · 황실에서 쓰였고 이후 영업용 자동차에도 승객이 탔어요.','석유에서 얻은 휘발유로 엔진을 움직였어요.','초기 자동차에는 금속과 나무 등이 쓰였고 고무 타이어를 사용한 차도 있었어요.'],
    sources:[
      ['유물','마차를 닮은 순종황제어차','https://www.gogung.go.kr/gogung/pgm/psgudMng/view.do?psgudSn=362643','국립고궁박물관 · 순종황제어차','바퀴, 운전석, 승객이 앉는 곳을 찾아보세요. 마차를 닮은 부분과 다른 부분은 어디인가요?','순종|운전석과 승객 자리'],
      ['전시와 영상','말 없는 마차','https://www.stm.or.kr/kor/online/1880s_1900s/exhibition_benz.html','삼성화재 모빌리티뮤지엄 · 벤츠 온라인 전시','전시 자동차의 바퀴를 세어 보세요. 말이 끌던 마차에서 말의 역할을 대신하게 된 장치는 무엇일까요?','휘발유|엔진'],
      ['사진과 글','돈을 내고 자동차를 타다','https://contents.history.go.kr/front/km/view.do?levelId=km_004_0060_0010_0010','우리역사넷 · 자동차의 등장과 보급','1912년 여객 수송 구간의 두 지명을 찾아보세요. 황제의 자동차와 영업용 자동차는 누가 어떻게 이용했나요?','마산과 삼천포|영업용 자동차']
    ]
  },
  3: {
    photo:'inquiry-plane.jpg', intro:'초기 프로펠러 비행기는 엔진으로 프로펠러를 돌려 앞으로 나아갔어요. 이후 비행기가 정해진 노선으로 지역을 이어 주었어요.',
    facts:['하늘길 · 비행장에서 뜨고 내렸어요.','초기 공개 비행에는 조종사가 탔고, 이후 정기편은 승객을 태웠어요.','휘발유를 쓰는 엔진이 프로펠러를 돌렸어요.','초기 기종에는 나무 뼈대와 천으로 만든 날개가 쓰였어요. 기종에 따라 재료는 달랐어요.'],
    sources:[
      ['영상','금강호의 날개와 프로펠러','https://www.youtube.com/watch?v=e129NXRIW68','국립항공박물관 · K 항공유산 금강호','영상에서 날개, 프로펠러, 조종석을 찾아보세요. 비행기를 앞으로 나아가게 하는 부분은 어디인가요?','프로펠러|조종석'],
      ['글','안창남이 서울 하늘을 날다','https://encykorea.aks.ac.kr/Article/E0035048','한국학중앙연구원 · 안창남','1922년 고국 방문 비행 기록을 살펴보세요. 금강호가 뜨자 사람들이 모여 무엇을 보았을까요?','안창남|1922년 공개 비행'],
      ['연표','정해진 노선으로 날다','https://www.airportal.go.kr/library/history.do','항공정보포털 · 우리나라 항공역사','1936년 정기 노선에서 연결한 세 지역을 찾아보세요. 공개 비행과 정기 운항은 목적이 어떻게 달랐나요?','서울·이리·광주|정기 운항']
    ]
  }
};

let transportPiece = 0;
function openNewTransport(i) {
  transportPiece = 0;
  renderTransportReveal(i);
  modal.showModal();
}
function renderTransportReveal(i) {
  const topic = newTransport[i];
  const name = modernTopics[i][0];
  const complete = transportPiece === 3;
  modal.innerHTML = `<div class="rail-dialog-head"><h2>${complete?name:'어떤 교통수단일까요?'}</h2><button class="btn" onclick="modal.close()">닫기 ×</button></div>
    <div class="rail-picture"><img src="assets/${topic.photo}" alt="${complete?name:'공개 중인 사진'}">${[0,1,2].map(j=>j<transportPiece?'':`<span style="top:${j*100/3}%" aria-hidden="true"></span>`).join('')}</div>
    ${complete?'<p class="hint">사진 · 수업용 제공 자료 99쪽</p>':''}
    <button class="btn primary" onclick="${complete?`showTransportIntro(${i})`:`transportPiece++;renderTransportReveal(${i});modal.querySelector('.primary').focus()`}">${complete?name+' 탐구하기 →':'사진 조각 열기 · '+transportPiece+'/3'}</button>`;
}
function showTransportIntro(i) {
  modal.close();
  move('modernTopic'+i);
  render();
}
function renderTransportIntro(i) {
  const topic = newTransport[i];
  app.innerHTML = `<section class="transport-intro"><div class="intro-photo">${railImage('assets/'+topic.photo,modernTopics[i][0])}<p class="intro-credit">사진 · 수업용 제공 자료 99쪽</p></div><div class="intro-copy"><h1>${modernTopics[i][0]}</h1><p class="intro-definition">${topic.intro}</p><button class="btn primary intro-start" onclick="move('modernStudy'+${i});render()">자료 탐구 시작하기 →</button></div></section>`;
}
const transportNotes = {};
function renderTransportStudy(i, step=0, focusId) {
  const topic = newTransport[i];
  const notes = transportNotes[i] ??= new Set();
  const titles = ['교통로','이동 대상','움직이는 힘','만든 재료'];
  const notebook = `<section class="panel"><h2>탐구 수첩</h2><div class="rail-pockets" aria-live="polite">${Array.from(notes,word=>`<span class="clue-pocket">${word}</span>`).join('')||'아직 모은 단서가 없어요.'}</div></section>`;
  const source = topic.sources[step];
  app.innerHTML = `<h1>${modernTopics[i][0]}</h1>${notebook}${inquiryLensGuide()}
    <div class="rail-tabs">${topic.sources.map(([type,title],j)=>`<button class="btn ${step===j?'primary':''}" onclick="renderTransportStudy(${i},${j},'transportTab${j}')" id="transportTab${j}"><small>${type}</small>${title}</button>`).join('')}</div>
    ${source?renderTransportSource(source,notes,i,step):`<section class="rail-reading"><h2>네 관점으로 정리해 봅시다</h2>${titles.map((title,j)=>`<details><summary>${title}</summary><p>${topic.facts[j]}</p></details>`).join('')}<button class="btn primary" onclick="move('modern');render()">다른 교통수단 보기</button></section>`}`;
  if (focusId) document.getElementById(focusId)?.focus();
}
function renderTransportSource(source,notes,i,step) {
  const [type,title,url,credit,question,words] = source;
  return `<section class="rail-reading"><div class="gama-source-heading"><h2>${title}</h2><span>${step+1} / 3</span></div>
    <p>${railLink(url,type==='영상'?'영상 보기':'원자료 크게 보기')} · ${credit}</p><p class="rail-observation">${question}</p>
    <details><summary>자료에서 찾은 단서 확인하기</summary><div class="rail-terms">${words.split('|').map((word,j)=>`<button id="topicWord${j}" class="clue-word essential-clue ${notes.has(word)?'found':''}" aria-pressed="${notes.has(word)}" onclick="saveTransportWord(${i},${step},${j})">${word}</button>`).join('')}</div></details>
    ${i===2&&step===1?`<h3>영상으로 살펴보는 자동차의 역사</h3><p>말이 끄는 수레와 벤츠 자동차를 보면서, 바퀴를 움직이는 힘이 어떻게 달라졌는지 찾아보세요.</p><p>${railLink("https://youtu.be/9N9ru8eYzpQ","YTN 사이언스 · 현대인의 필수품 자동차의 역사")}</p>`:''}<div class="controls"><button class="btn primary" onclick="renderTransportStudy(${i},${step+1},'transportTab${step+1}')">${step===2?'네 관점으로 정리하기':'다음 자료 →'}</button></div></section>`;
}
function saveTransportWord(i,step,j) {
  transportNotes[i].add(newTransport[i].sources[step][5].split('|')[j]);
  renderTransportStudy(i,step);
  const button = document.getElementById('topicWord'+j);
  button.closest('details').open = true;
  button.focus();
}
