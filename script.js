const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const archiveItems = document.querySelectorAll('.archive-item');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  archiveItems.forEach(item => {
    const show = filter === 'all' || item.dataset.category === filter;
    item.classList.toggle('hide', !show);
  });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxTitle = lightbox?.querySelector('.lightbox-title');
const closeLightbox = () => {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden','true');
  document.body.classList.remove('lock');
  if (lightboxImg) lightboxImg.src = '';
};
document.querySelectorAll('[data-lightbox]').forEach(btn => btn.addEventListener('click', () => {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = btn.dataset.lightbox;
  lightboxImg.alt = btn.dataset.title || 'Portfolio artwork';
  if (lightboxTitle) lightboxTitle.textContent = btn.dataset.title || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lock');
}));
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
