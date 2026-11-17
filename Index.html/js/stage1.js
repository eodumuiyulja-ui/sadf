/* ORBIS STAGE 1 — shared interaction polish */
(() => {
  const intro = document.getElementById('intro');
  if (intro && !intro.querySelector('.ambient-particles')) {
    const field = document.createElement('div');
    field.className = 'ambient-particles';
    field.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 34; i++) {
      const dot = document.createElement('i');
      dot.style.left = `${(i * 37 + 11) % 100}%`;
      dot.style.top = `${(i * 53 + 7) % 100}%`;
      dot.style.setProperty('--duration', `${9 + (i % 8) * 1.7}s`);
      dot.style.setProperty('--delay', `${-(i % 13) * 1.2}s`);
      field.appendChild(dot);
    }
    intro.appendChild(field);
  }

  // Honor reduced-motion preferences for the decorative particle field.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const particleField = intro?.querySelector('.ambient-particles');
  const syncMotion = () => { if (particleField) particleField.hidden = reduceMotion.matches; };
  syncMotion();
  reduceMotion.addEventListener?.('change', syncMotion);

  // Make the brand return to HOME without requiring a page reload.
  document.querySelector('.brand')?.addEventListener('click', event => {
    event.preventDefault();
    const homeButton = document.querySelector('.nav-item[data-page="home"]');
    homeButton?.click();
  });

  // Keep navigation usable with browser back/forward and direct #page links.
  window.addEventListener('hashchange', () => {
    const key = location.hash.replace(/^#/, '');
    if (!key) return;
    const target = document.querySelector(`.nav-item[data-page="${CSS.escape(key)}"]`);
    if (target && !document.getElementById('site')?.classList.contains('hidden')) target.click();
  });

  // Close the mobile directory after tapping outside it.
  document.addEventListener('click', event => {
    const sidebar = document.getElementById('sidebar');
    const menu = document.getElementById('mobileMenu');
    if (!sidebar?.classList.contains('open')) return;
    if (!sidebar.contains(event.target) && !menu?.contains(event.target)) sidebar.classList.remove('open');
  });
})();
