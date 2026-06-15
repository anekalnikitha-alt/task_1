
document.addEventListener('DOMContentLoaded', () => {
 
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

 
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  toggle && toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  const closeMenuOnResize = () => {
    if (!menu || !toggle) return;
    if (window.innerWidth > 768 && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  };
  window.addEventListener('resize', closeMenuOnResize);

  const header = document.querySelector('.site-header');
  const setHeaderHeight = () => {
    if (!header) return;
    const h = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', h + 'px');
    document.body.style.paddingTop = h + 'px';
  };
  setHeaderHeight();
  let lastScroll = 0;
  const onScrollHeader = () => {
    if (!header) return;
    const sc = window.scrollY || window.pageYOffset;
    if (sc > 12) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    lastScroll = sc;
  };
  window.addEventListener('scroll', onScrollHeader, {passive:true});
  window.addEventListener('resize', setHeaderHeight);

  document.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));

  const typed = document.getElementById('typed');
  if (typed) {
    const words = ['learning Web Development', 'practicing Java', 'building small projects'];
    let wi = 0, ci = 0, deleting = false;
    const step = () => {
      const current = words[wi];
      if (!deleting) {
        typed.textContent = current.slice(0, ++ci);
        if (ci === current.length) { deleting = true; setTimeout(step, 900); return; }
        setTimeout(step, 80);
      } else {
        typed.textContent = current.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(step, 300); return; }
        setTimeout(step, 40);
      }
    };
    step();
  }

  const cards = document.querySelectorAll('.skill-card');
  if ('IntersectionObserver' in window && cards.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, {threshold:0.15});
    cards.forEach(c => obs.observe(c));
  }

  

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.menu a');
  const spy = () => {
    const fromTop = window.scrollY + 120;
    sections.forEach(sec => {
      if (sec.offsetTop <= fromTop && (sec.offsetTop + sec.offsetHeight) > fromTop) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector('.menu a[href="#' + sec.id + '"]');
        active && active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', spy, {passive:true});
  spy();
});
