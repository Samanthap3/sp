function setMode(mode){
  const creator = document.getElementById('view-creator');
  const eng = document.getElementById('view-engineering');
  const cBtn = document.querySelector('.creator-btn');
  const eBtn = document.querySelector('.eng-btn');
  if(mode === 'creator'){
    creator.style.display = '';
    eng.style.display = 'none';
    cBtn.classList.add('active');
    eBtn.classList.remove('active');
    document.title = 'Sammy Pan — Content Creator Portfolio';
  } else {
    creator.style.display = 'none';
    eng.style.display = '';
    cBtn.classList.remove('active');
    eBtn.classList.add('active');
    document.title = 'Samantha Pan — Engineering Portfolio';
  }
  window.scrollTo({top:0, behavior:'instant'});
}
