(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  const closeMenu = () => {
    if (!menu || !menuToggle) return;
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    body.classList.remove('menu-open');
  };
  const toggleMenu = () => {
    if (!menu || !menuToggle) return;
    const open = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    body.classList.toggle('menu-open', open);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  menuToggle?.addEventListener('click', toggleMenu);
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  if (reduceMotion) {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealItems.forEach(item => observer.observe(item));
})();
