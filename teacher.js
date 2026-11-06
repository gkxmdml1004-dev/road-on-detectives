// 수업 마무리: 학생용 답 입력 없이 사진과 핵심 특징을 함께 확인.
const teacherFlipped=Array(6).fill(false);
const teacherHighlights=[
 '가마꾼이 가마와 탄 사람의 무게를 함께 감당했습니다.',
 '혼례 때나 나랏일로 이동할 때에도 말을 이용했습니다.',
 '바퀴를 굴리는 달구지와, 바퀴 없이 미끄러지는 발구를 구분해요.',
 '동물의 등에 사람을 태우거나 짐을 실어 옮겼습니다.',
 '목재 운반에 쓰인 이 뗏목은 교통수단이자 옮겨야 할 짐이었습니다.',
 '나룻배는 강으로 나뉜 마을과 학교·시장을 이어 주었습니다.'
];
function teacher(){if(typeof classroomPauseInlineVideos==='function')classroomPauseInlineVideos();move('teacher');render();}
function teacherFacts(i){return (i===0?gamaSummary:window.STUDY_DATA[i].summary).map(q=>({label:q.label,value:q.options[q.answer]})).concat(i===1||i===3?[{label:'만든 재료',value:'해당 없음'}]:[]);}
function teacherCard(i){const r=representatives[i],flipped=teacherFlipped[i];return '<article id="teacher-card-'+i+'" class="teacher-flip-card '+(flipped?'is-flipped':'')+'" aria-label="'+esc(names[i])+' 정리 카드"><div class="teacher-card-inner"><section class="teacher-face teacher-front" aria-hidden="'+flipped+'" '+(flipped?'inert':'')+'><h2>'+esc(names[i])+'</h2><button class="teacher-photo-button" onclick="teacherPhoto('+i+')" aria-label="'+esc(names[i])+' 사진 크게 보기"><img src="'+safe(r.image)+'" alt="'+esc(r.title)+'"><span>사진 크게 보기 ⤢</span></button><button id="teacher-front-toggle-'+i+'" class="btn primary teacher-flip-button" onclick="teacherFlip('+i+')">정리해 볼까요? ↻</button></section><section class="teacher-face teacher-back" aria-hidden="'+(!flipped)+'" '+(!flipped?'inert':'')+'><h2>'+esc(names[i])+'</h2><dl class="teacher-facts">'+teacherFacts(i).map(f=>'<div><dt>'+esc(f.label)+'</dt><dd>'+esc(f.value)+'</dd></div>').join('')+'</dl><div class="teacher-back-actions"><button class="btn" onclick="teacherPhoto('+i+')">사진 크게 보기 ⤢</button><button id="teacher-back-toggle-'+i+'" class="btn primary" onclick="teacherFlip('+i+')">사진 카드로 ↻</button></div></section></div></article>';}
function renderTeacher(){app.innerHTML='<section class="teacher-heading"><h1>함께 정리해 볼까요?</h1><div class="controls"><button class="btn" onclick="teacherReset()">모두 사진으로 ↻</button><button class="btn" onclick="settings()">자료 노출 설정</button></div></section><p id="teacherStatus" class="teacher-status" aria-live="polite"></p><div class="teacher-grid">'+[1,2,4,0,3,5].map(i=>teacherCard(i)).join('')+'</div>';}
function teacherFlip(i){if(!Number.isInteger(i)||i<0||i>=names.length)return;teacherFlipped[i]=!teacherFlipped[i];const card=document.querySelector('#teacher-card-'+i),on=teacherFlipped[i];card.classList.toggle('is-flipped',on);const front=card.querySelector('.teacher-front'),back=card.querySelector('.teacher-back');front.setAttribute('aria-hidden',String(on));back.setAttribute('aria-hidden',String(!on));front.inert=on;back.inert=!on;document.querySelector('#teacherStatus').textContent=names[i]+(on?'의 핵심 특징을 함께 정리해요.':' 사진을 살펴봐요.');document.querySelector('#teacher-'+(on?'back':'front')+'-toggle-'+i).focus();}
function teacherReset(){teacherFlipped.fill(false);renderTeacher();document.querySelector('#teacherStatus').textContent='모든 카드를 사진으로 돌렸어요.';}
function teacherPhoto(i){if(!Number.isInteger(i)||i<0||i>=names.length)return;const r=representatives[i];modal.classList.add('teacher-image-dialog');modal.innerHTML='<section class="teacher-photo-view"><div class="teacher-photo-heading"><h2>'+esc(names[i])+'</h2><button class="btn primary" onclick="teacherClosePhoto()">카드로 돌아가기 ×</button></div><img class="teacher-enlarged-photo" src="'+safe(r.image)+'" alt="'+esc(r.title)+'"></section>';if(!modal.open)modal.showModal();}
function teacherClosePhoto(){modal.close();modal.classList.remove('teacher-image-dialog');}
if(typeof modal.addEventListener==='function')modal.addEventListener('close',()=>modal.classList.remove('teacher-image-dialog'));
