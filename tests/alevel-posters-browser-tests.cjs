const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-alevel-posters-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/a-level.html?static');await page.locator('button.secondary[data-landing="notes"]').click();await page.locator('[data-note="0"]').waitFor();
  const topics={0:'measurements',1:'particles',2:'waves',3:'mechanics',4:'electricity',5:'further-mechanics',6:'fields',7:'nuclear',8:'astrophysics',13:'practical-skills'};
  for(const [id,file] of Object.entries(topics)){
   await page.locator(`[data-note="${id}"]`).click();
   const img=page.locator('.alevel-topic-poster img');await img.scrollIntoViewIfNeeded();await img.evaluate(img=>img.decode());
   assert.equal(await img.getAttribute('src'),`assets/alevel-posters/${file}.png`);assert.equal(await img.evaluate(img=>img.naturalWidth),1448);
   assert.ok(await page.locator('.notes-reading>:last-child').evaluate(el=>el.classList.contains('alevel-topic-poster')));
   const response=await page.request.get(base+`/assets/alevel-posters/${file}.png`);assert.equal(response.status(),200);assert.equal(response.headers()['content-type'],'image/png');
   await page.setViewportSize({width:390,height:844});assert.ok(await img.evaluate(el=>el.getBoundingClientRect().width<=innerWidth));
   await page.setViewportSize({width:1280,height:900});await page.locator('#notes-home').click();
  }
  await page.locator('[data-note="9"]').click();assert.equal(await page.locator('.alevel-topic-poster').count(),0);
  assert.deepEqual(errors,[]);console.log('All ten A Level posters passed: topic mapping, image loading, full-size routes, end placement and mobile sizing.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
