// Preserve existing study bookmarks and authentication return links.
if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && /^#(?:setup=|microsoft=|guest$|practice$|notes(?:\/|$)|challenge$|landing$)/.test(location.hash)) {
  location.replace('a-level.html' + location.search + location.hash);
}
if (new URLSearchParams(location.search).has('static')) {
  document.querySelectorAll('a[href="a-level.html"]').forEach(link => { link.href = 'a-level.html?static'; });
}
// Match the A Level theme controls and share their browser preferences.
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const button = document.getElementById('theme-palette-button');
  const menu = document.getElementById('theme-palette-menu');
  const options = [...document.querySelectorAll('.palette-option')];
  const get = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
  function theme(value) {
    root.dataset.theme = value;
    const label = 'Switch to ' + (value === 'dark' ? 'light' : 'dark') + ' mode';
    toggle.setAttribute('aria-label',label); toggle.title = label;
  }
  function palette(value) {
    root.dataset.palette = ['forge','amber','ocean','violet'].includes(value) ? value : 'forge';
    options.forEach(option => {
      const active = option.dataset.palette === root.dataset.palette;
      option.classList.toggle('active',active);
      option.setAttribute('aria-checked',String(active));
    });
  }
  function close() { menu.hidden = true; button.setAttribute('aria-expanded','false'); }
  const preferred = get('physics-theme');
  theme(preferred === 'dark' || (!preferred && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
  palette(get('physics-palette'));
  toggle.onclick = () => { theme(root.dataset.theme === 'dark' ? 'light' : 'dark'); save('physics-theme',root.dataset.theme); };
  button.onclick = () => { menu.hidden = !menu.hidden; button.setAttribute('aria-expanded',String(!menu.hidden)); };
  options.forEach(option => { option.onclick = () => { palette(option.dataset.palette); save('physics-palette',root.dataset.palette); close(); button.focus(); }; });
  document.addEventListener('click',event => { if (!event.target.closest('.theme-picker')) close(); });
  document.addEventListener('keydown',event => { if (event.key === 'Escape' && !menu.hidden) { close(); button.focus(); } });
})();
