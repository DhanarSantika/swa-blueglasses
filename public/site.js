(() => {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  let themeTransitionTimer;

  document.querySelectorAll('[data-locale-link]').forEach((localeLink) => {
    localeLink.addEventListener('click', (event) => {
      const hash = window.location.hash;
      if (!hash) return;
      event.preventDefault();
      window.location.href = `${localeLink.href.split('#')[0]}${hash}`;
    });
  });

  function readTheme() {
    try {
      return localStorage.getItem('blueglasses-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle?.setAttribute('aria-pressed', String(theme === 'light'));
    const language = document.documentElement.lang;
    themeToggle?.setAttribute(
      'aria-label',
      theme === 'dark'
        ? language === 'id' ? 'Aktifkan tema terang' : 'Switch to light theme'
        : language === 'id' ? 'Aktifkan tema gelap' : 'Switch to dark theme',
    );
  }

  applyTheme(readTheme());

  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.themeTransition = 'on';
    window.clearTimeout(themeTransitionTimer);
    themeTransitionTimer = window.setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
    }, 320);
    applyTheme(next);
    try {
      localStorage.setItem('blueglasses-theme', next);
    } catch {
      // Theme remains usable when storage is blocked.
    }
  });

  function closeMenu(returnFocus = false) {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', document.documentElement.lang === 'id' ? 'Buka navigasi' : 'Open navigation');
    mobileNav.hidden = true;
    if (returnFocus) menuToggle.focus();
  }

  menuToggle?.addEventListener('click', () => {
    if (!mobileNav) return;
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen
      ? document.documentElement.lang === 'id' ? 'Tutup navigasi' : 'Close navigation'
      : document.documentElement.lang === 'id' ? 'Buka navigasi' : 'Open navigation');
    mobileNav.hidden = !willOpen;
    if (willOpen) mobileNav.querySelector('a')?.focus();
  });

  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 761px)').matches) closeMenu();
  });
})();
