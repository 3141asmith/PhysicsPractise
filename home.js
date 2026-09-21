// Preserve existing study bookmarks and authentication return links.
if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && /^#(?:setup=|microsoft=|guest$|practice$|notes(?:\/|$)|challenge$|landing$)/.test(location.hash)) {
  location.replace('a-level.html' + location.search + location.hash);
}
if (new URLSearchParams(location.search).has('static')) {
  document.querySelectorAll('a[href="a-level.html"]').forEach(link => { link.href = 'a-level.html?static'; });
}
// Shared theme controller for every public page.
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const button = document.getElementById('theme-palette-button');
  const menu = document.getElementById('theme-palette-menu');
  const options = [...document.querySelectorAll('.palette-option')];
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const get = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key,value) => { try { localStorage.setItem(key,value); } catch {} };
  function theme(value) {
    root.dataset.theme = value;
    const label = 'Switch to ' + (value === 'dark' ? 'light' : 'dark') + ' mode';
    toggle.setAttribute('aria-label',label); toggle.title = label;
    if (toggle.dataset.textLabel === 'true') toggle.textContent = value === 'dark' ? 'Light mode' : 'Dark mode';
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
  theme(preferred === 'dark' || (preferred !== 'light' && systemTheme.matches) ? 'dark' : 'light');
  palette(get('physics-palette'));
  toggle.onclick = () => { theme(root.dataset.theme === 'dark' ? 'light' : 'dark'); save('physics-theme',root.dataset.theme); };
  button.onclick = () => { menu.hidden = !menu.hidden; button.setAttribute('aria-expanded',String(!menu.hidden)); };
  options.forEach(option => { option.onclick = () => { palette(option.dataset.palette); save('physics-palette',root.dataset.palette); close(); button.focus(); }; });
  document.addEventListener('click',event => { if (!event.target.closest('.theme-picker')) close(); });
  document.addEventListener('keydown',event => { if (event.key === 'Escape' && !menu.hidden) { close(); button.focus(); } });
  button.addEventListener('keydown',event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); menu.hidden=false; button.setAttribute('aria-expanded','true'); options.find(option=>option.getAttribute('aria-checked')==='true').focus(); }
  });
  menu.addEventListener('keydown',event => {
    const index=options.indexOf(document.activeElement);
    if (index<0) return;
    if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:-1)+options.length)%options.length;
      options[next].focus();
    }
  });
  window.addEventListener('storage',event => {
    if (event.key==='physics-theme' || event.key===null) {
      const value=get('physics-theme');theme(value==='dark'||(value!=='light'&&systemTheme.matches)?'dark':'light');
    }
    if (event.key==='physics-palette' || event.key===null) palette(get('physics-palette'));
  });
  systemTheme.addEventListener('change',()=>{if(!['light','dark'].includes(get('physics-theme')))theme(systemTheme.matches?'dark':'light');});
})();
