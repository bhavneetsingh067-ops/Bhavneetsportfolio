// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('gone');
    document.getElementById('hero-bg').classList.add('rdy');
  }, 2200);
});

// CURSOR
const cur = document.getElementById('cur');
const curf = document.getElementById('cur-f');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

(function animCursor() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  curf.style.left = fx + 'px';
  curf.style.top = fy + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.port-item,.vid-card,.why-card,.svc-card,.brand-n').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '14px'; cur.style.height = '14px';
    cur.style.background = 'var(--gold)';
    curf.style.width = '48px'; curf.style.height = '48px';
    curf.style.borderColor = 'var(--gold)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '9px'; cur.style.height = '9px';
    cur.style.background = 'var(--charcoal)';
    curf.style.width = '34px'; curf.style.height = '34px';
    curf.style.borderColor = 'rgba(26,26,26,.25)';
  });
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('sc', window.scrollY > 50);
}, { passive: true });

// MOBILE MENU
const mob = document.getElementById('mob-menu');
const hbg = document.getElementById('hbg');
let mOpen = false;

function toggleMenu() {
  mOpen = !mOpen;
  mob.classList.toggle('open', mOpen);
  hbg.setAttribute('aria-expanded', mOpen);
  document.body.style.overflow = mOpen ? 'hidden' : '';
}

function closeMenu() {
  mOpen = false;
  mob.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Close menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); closeLb(); }
});

// SCROLL REVEAL
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// COUNT UP
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const target = +e.target.dataset.t;
    const dur = 1800, step = target / (dur / 16);
    let c = 0;
    const iv = setInterval(() => {
      c += step;
      if (c >= target) { c = target; clearInterval(iv); }
      e.target.textContent = Math.floor(c);
    }, 16);
    co.unobserve(e.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.cnt').forEach(el => co.observe(el));

// PORTFOLIO FILTER
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.port-item').forEach(item => {
      const show = f === 'all' || item.dataset.c === f;
      item.style.display = show ? '' : 'none';
    });
  });
});

// PORTFOLIO keyboard accessibility
document.querySelectorAll('.port-item').forEach(item => {
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLb(item.querySelector('img').src);
    }
  });
  item.addEventListener('click', () => openLb(item.querySelector('img').src));
});

// LIGHTBOX
const lb = document.getElementById('lb');
const lbImg = document.getElementById('lb-img');

function openLb(src) {
  lbImg.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lb-close').focus();
}

function closeLb() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lb-close').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

// HERO PARALLAX (only on non-reduced-motion)
const heroBg = document.getElementById('hero-bg');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = 'translateY(' + window.scrollY * 0.28 + 'px) scale(1)';
    }
  }, { passive: true });
}

// CONTACT FORM
function sendForm(e) {
  e.preventDefault();
  const name = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const brand = document.getElementById('fb').value.trim();
  const msg = document.getElementById('fm').value.trim();
  if (!name || !email || !msg) {
    alert('Please fill in your name, email and message.');
    return;
  }
  const sub = encodeURIComponent('Collaboration Enquiry — ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Brand: ' + (brand || 'Not specified') + '\n\n' +
    'Message:\n' + msg
  );
  window.location.href = 'mailto:bhavneetsingh067@gmail.com?subject=' + sub + '&body=' + body;
}
