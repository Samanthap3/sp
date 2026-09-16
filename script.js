function setMode(mode, options){
  options = options || {};
  const creator = document.getElementById('view-creator');
  const eng = document.getElementById('view-engineering');
  const cBtns = document.querySelectorAll('.mode-switch .creator-btn');
  const eBtns = document.querySelectorAll('.mode-switch .eng-btn');
  const showEl = mode === 'creator' ? creator : eng;
  const hideEl = mode === 'creator' ? eng : creator;

  if(mode === 'creator'){
    cBtns.forEach(b => b.classList.add('active'));
    eBtns.forEach(b => b.classList.remove('active'));
    document.title = 'Sammy Pan — Content Creator Portfolio';
  } else {
    cBtns.forEach(b => b.classList.remove('active'));
    eBtns.forEach(b => b.classList.add('active'));
    document.title = 'Samantha Pan — Engineering Portfolio';
  }

  if(!options.skipHistory){
    history.pushState({mode: mode}, '', mode === 'creator' ? 'creator' : '.');
  }

  if(options.instant){
    hideEl.style.transition = 'none';
    showEl.style.transition = 'none';
    hideEl.style.display = 'none';
    hideEl.style.opacity = '0';
    showEl.style.display = '';
    showEl.style.opacity = '1';
    window.scrollTo({top:0, behavior:'instant'});
    requestAnimationFrame(() => {
      hideEl.style.transition = '';
      showEl.style.transition = '';
    });
    return;
  }

  hideEl.style.opacity = '0';
  setTimeout(() => {
    hideEl.style.display = 'none';
    showEl.style.display = '';
    window.scrollTo({top:0, behavior:'instant'});
    showEl.style.opacity = '0';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { showEl.style.opacity = '1'; });
    });
  }, 300);
}

function initRouting(){
  const params = new URLSearchParams(location.search);
  let initialMode = null;
  if(params.get('view') === 'creator') initialMode = 'creator';
  else if(params.get('view') === 'engineering') initialMode = 'engineering';
  else if(/\/creator(\.html)?\/?$/.test(location.pathname)) initialMode = 'creator';
  else if(/\/engineering(\.html)?\/?$/.test(location.pathname)) initialMode = 'engineering';

  if(initialMode){
    setMode(initialMode, {skipHistory:true, instant:true});
    const cleanPath = initialMode === 'creator' ? 'creator' : '.';
    history.replaceState({mode: initialMode}, '', cleanPath + location.hash);
  } else {
    history.replaceState({mode: 'engineering'}, '', location.href);
  }

  window.addEventListener('popstate', (e) => {
    const mode = (e.state && e.state.mode) || (/\/creator(\.html)?\/?$/.test(location.pathname) ? 'creator' : 'engineering');
    setMode(mode, {skipHistory:true, instant:true});
  });
}

function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  items.forEach(el => observer.observe(el));
}

function initNavHighlight(){
  if(!('IntersectionObserver' in window)) return;
  [document.getElementById('view-creator'), document.getElementById('view-engineering')].forEach(view => {
    const links = view.querySelectorAll('nav a[href^="#"]');
    const map = new Map();
    links.forEach(a => {
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if(el) map.set(el, a);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = map.get(entry.target);
        if(!link || !entry.isIntersecting) return;
        links.forEach(a => a.classList.remove('current'));
        link.classList.add('current');
      });
    }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
    map.forEach((_, el) => observer.observe(el));
  });
}

const MATCHA_STICKERS = [
  'assets/matcha/matcha-cutout-1.png',
  'assets/matcha/matcha-cutout-2.png',
  'assets/matcha/matcha-cutout-3.png',
  'assets/matcha/matcha-cutout-4.png',
  'assets/matcha/matcha-cutout-5.png',
  'assets/matcha/matcha-cutout-6.png',
  'assets/matcha/matcha-cutout-7.png',
  'assets/matcha/matcha-cutout-8.png',
  'assets/matcha/matcha-cutout-9.png',
  'assets/matcha/matcha-cutout-10.png',
  'assets/matcha/matcha-cutout-11.png',
  'assets/matcha/matcha-cutout-12.png',
  'assets/matcha/matcha-cutout-13.png',
  'assets/matcha/matcha-cutout-14.png',
  'assets/matcha/matcha-cutout-15.png',
  'assets/matcha/matcha-cutout-16.png',
  'assets/matcha/matcha-cutout-17.png',
  'assets/matcha/matcha-cutout-18.png',
  'assets/matcha/matcha-cutout-19.png',
  'assets/matcha/matcha-cutout-20.png',
  'assets/matcha/matcha-cutout-21.png',
  'assets/matcha/matcha-cutout-22.png',
  'assets/matcha/matcha-cutout-23.png',
  'assets/matcha/matcha-cutout-24.png'
];

function spawnMatchaSticker(x, y){
  const layer = document.getElementById('matcha-burst-layer');
  if(!layer) return;
  const img = document.createElement('img');
  img.src = MATCHA_STICKERS[Math.floor(Math.random() * MATCHA_STICKERS.length)];
  img.className = 'matcha-sticker';
  const size = 60 + Math.random() * 20;
  const rot = Math.random() * 44 - 22;
  img.style.width = size + 'px';
  img.style.left = (x - size / 2) + 'px';
  img.style.top = (y - size / 2) + 'px';
  img.style.setProperty('--rot', rot + 'deg');
  layer.appendChild(img);
  img.addEventListener('animationend', () => img.remove());
  setTimeout(() => img.remove(), 2500);
}

function initMatchaClickEffect(){
  document.addEventListener('click', (e) => {
    if(e.target.closest('.mode-switch')) return;
    const creator = document.getElementById('view-creator');
    if(!creator || getComputedStyle(creator).display === 'none') return;
    spawnMatchaSticker(e.clientX, e.clientY);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRouting();
  initScrollReveal();
  initNavHighlight();
  initMatchaClickEffect();
});
