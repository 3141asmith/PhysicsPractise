const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-diffraction-')),app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/a-level.html?static');await page.locator('button.secondary[data-landing="notes"]').click();await page.locator('[data-note="1"]').click();
  const iframe=page.locator('.electron-diffraction-frame');await iframe.scrollIntoViewIfNeeded();const frame=page.frameLocator('.electron-diffraction-frame');await frame.locator('#play').click();
  await page.waitForTimeout(1200);assert(await frame.locator('#count').innerText()!=='0');await frame.locator('#play').click();
  await frame.locator('#slits').fill('5');await frame.locator('#slits').dispatchEvent('input');assert.equal(await frame.locator('#slitsValue').innerText(),'5');assert.equal(await frame.locator('#count').innerText(),'0');await frame.locator('#measure').check();
  assert.equal(await frame.locator('#resultTitle').innerText(),'The fringes disappear.');
  assert.match(await iframe.locator('..').innerText(),/crystal lattice/);
  for(const width of [1280,390]){await page.setViewportSize({width,height:900});await page.waitForTimeout(250);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const child=page.frames().find(f=>f.url().includes('?embedded'));assert(await child.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert(await child.evaluate(()=>document.querySelector('main').getBoundingClientRect().height<=innerHeight+2));}
  const response=await page.request.get(base+'/assets/electron-diffraction/index.html');assert.equal(response.headers()['x-frame-options'],'SAMEORIGIN');assert.equal((await page.request.get(base+'/assets/electron-diffraction/README.md')).status(),404);
  await page.locator('#notes-home').click();assert.equal(await page.locator('.electron-diffraction-frame').count(),0);assert.deepEqual(errors,[]);console.log('Passed: notes placement, embedded assets, start/pause, slit count, measurement, auto-height, desktop/mobile overflow and navigation cleanup.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
