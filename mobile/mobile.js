// This bundle is deliberately offline/local: it does not impersonate a school login.
window.PHYSICS_FORGE_MOBILE=true;
document.addEventListener('DOMContentLoaded',()=>{
 const app=window.Capacitor?.Plugins?.App;
 app?.addListener('backButton',()=>{
  const dialog=document.querySelector('dialog[open]');
  if(dialog){dialog.close();return;}
  if(!location.pathname.endsWith('/index.html')&&location.pathname!=='/')location.href='index.html';
  else app.exitApp();
 });
});
