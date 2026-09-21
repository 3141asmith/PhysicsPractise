const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-themes-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const context=await browser.newContext({colorScheme:'light'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const colours={};
  for(const file of ['index.html','a-level.html?static','combined-science.html','gcse.html']){
   await page.goto(base+'/'+file);
   if(file.startsWith('a-level'))await page.locator('#landing-screen').waitFor();
   for(const mode of ['light','dark']){
    if(await page.evaluate(()=>document.documentElement.dataset.theme)!==mode)await page.locator('#theme-toggle').click();
    assert.equal(await page.locator('#theme-toggle').innerText(),mode==='dark'?'Light mode':'Dark mode');
    for(const palette of ['forge','amber','ocean','violet']){
     await page.locator('#theme-palette-button').click();await page.locator('.palette-option[data-palette='+palette+']').click();
     const actual=await page.evaluate(()=>{
      const root=document.documentElement,probe=document.createElement('span');probe.style.background='var(--green)';document.body.append(probe);const accent=getComputedStyle(probe).backgroundColor;probe.remove();
      const primary=[...document.querySelectorAll('.primary')].find(el=>el.getClientRects().length);
      return {accent,primary:primary?getComputedStyle(primary).backgroundColor:null,header:getComputedStyle(document.querySelector('header')).backgroundColor,swatch:getComputedStyle(document.querySelector('.theme-palette-dot')).backgroundColor};
     });
     assert.equal(actual.swatch,actual.accent);
     if(actual.primary)assert.equal(actual.primary,actual.accent);
     const key=mode+palette;
     if(colours[key])assert.equal(actual.accent,colours[key]);else colours[key]=actual.accent;
     assert.equal(await page.locator('.palette-option[aria-checked=true]').getAttribute('data-palette'),palette);
    }
   }
   await page.reload();assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme+':'+document.documentElement.dataset.palette),'dark:violet');
   await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.setViewportSize({width:1440,height:1000});
  }
  assert.equal(new Set(Object.values(colours)).size,8);
  const other=await context.newPage();await other.goto(base+'/index.html');
  await page.locator('#theme-toggle').click();await page.locator('#theme-palette-button').click();await page.locator('.palette-option[data-palette=ocean]').click();
  await other.waitForFunction(()=>document.documentElement.dataset.theme==='light'&&document.documentElement.dataset.palette==='ocean');
  await other.locator('#theme-palette-button').focus();await other.keyboard.press('ArrowDown');await other.keyboard.press('ArrowDown');await other.keyboard.press('Enter');
  assert.equal(await other.evaluate(()=>document.documentElement.dataset.palette),'violet');
  await other.locator('#theme-palette-button').click();await other.keyboard.press('Escape');assert.equal(await other.locator('#theme-palette-menu').isVisible(),false);
  assert.deepEqual(errors,[]);console.log('Theme checks passed: all four pages × two modes × four palettes, primary/swatch colours, persistence, cross-tab sync, keyboard and mobile.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
