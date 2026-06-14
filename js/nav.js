/* ============================================================
   NAVIGATION — drawer partagé + utilitaires
   ============================================================ */

(function () {

  /* ---- Injection du drawer ---- */
  function buildDrawer() {
    const root = document.documentElement;
    const base = root.dataset.base || '';   // '' = racine, '../' = pages/

    const links = [
      { href: base + 'index.html',                  icon: '⌂',  label: 'Accueil' },
      { href: base + 'pages/qui-suis-je.html',      icon: '◉',  label: 'Qui suis-je ?' },
      { href: base + 'pages/projets.html',           icon: '◈',  label: 'Projets' },
      { href: base + 'pages/competences.html',       icon: '⚡', label: 'Compétences' },
      { href: base + 'pages/formation.html',         icon: '🎓', label: 'Formation Universitaire' },
      { href: base + 'pages/certifications.html',    icon: '✦',  label: 'Certifications' },
      { href: base + 'pages/contact.html',           icon: '✉',  label: 'Contact' },
    ];

    const current = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = links.map(l => {
      const active = current === l.href.split('/').pop() ? 'active' : '';
      return `<a href="${l.href}" class="${active}">
        <span class="nav-icon">${l.icon}</span>
        <span>${l.label}</span>
      </a>`;
    }).join('');

    const html = `
      <div class="overlay" id="overlay"></div>
      <aside class="drawer" id="drawer">
        <div class="drawer-logo">
          <strong>_PORTFOLIO</strong>
          <span>Menu Principal</span>
        </div>
        <nav>
          ${navHTML}
          <a href="${base}cv/cv.pdf" class="nav-cv" target="_blank">
            <span class="nav-icon">📄</span>
            <span>Télécharger CV</span>
          </a>
        </nav>
        <div class="drawer-footer">
          © 2025 — Portfolio Personnel
        </div>
      </aside>`;

    document.body.insertAdjacentHTML('afterbegin', html);
  }

  /* ---- Burger ---- */
  function initBurger() {
    const burger  = document.getElementById('burger');
    const drawer  = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');
    if (!burger || !drawer || !overlay) return;

    const open = () => {
      burger.classList.add('open');
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      burger.classList.remove('open');
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ---- Animation barres compétences ---- */
  function animateSkills() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.w;
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    fills.forEach(fill => {
      fill.dataset.w = fill.style.width;
      fill.style.width = '0';
      obs.observe(fill);
    });
  }

  /* ---- Tabs ---- */
  function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    if (!buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildDrawer();
    initBurger();
    animateSkills();
    initTabs();
  });

})();
