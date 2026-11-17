const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {screenshots}=require('./artifacts.cjs');
const root=path.resolve(__dirname,'../mobile/www');
for(const name of ['server.cjs','data','.env','node_modules','bank.cjs'])assert.equal(fs.existsSync(path.join(root,name)),false,name);
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
(async()=>{
 let browser;
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],bad=[],api=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)bad.push(r.url());});
  await page.route('**/*',route=>{const url=route.request().url();if(url.includes('/api/'))api.push(url);return url.startsWith(base)?route.continue():route.abort();});
  await page.goto(base);await page.locator('a[href="a-level.html"]').click();
  await page.waitForFunction(()=>typeof School!=='undefined'&&School.practice&&School.staticMode);
  assert.equal(await page.evaluate(()=>window.PHYSICS_FORGE_MOBILE),true);
  await page.evaluate(()=>{School.setView('practice');School.practice.open('diagram-vectors-calc');});
  await page.locator('#answer').fill('123');await page.waitForTimeout(1000);await page.reload();
  await page.waitForFunction(()=>typeof School!=='undefined'&&School.practice);
  await page.evaluate(()=>{School.setView('practice');School.practice.open('diagram-vectors-calc');});
  assert.equal(await page.locator('#answer').inputValue(),'123');
  await page.locator('.question-diagram').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(screenshots,'mobile-app-practice.png')});
  await page.evaluate(()=>School.showNotes(13));assert.equal(await page.locator('.note-practical-group').count(),60);
  await page.evaluate(()=>Challenge.open());await page.locator('#challenge-form').waitFor();
  for(const name of ['index.html','combined-science.html','gcse.html','gcse-chemistry.html','gcse-biology.html']){
   await page.goto(base+'/'+name);await page.waitForTimeout(300);
   assert.ok(await page.evaluate(()=>document.body.innerText.length>50));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name);
  }
  assert.deepEqual(api,[]);assert.deepEqual(bad,[]);assert.deepEqual(errors,[]);
  console.log('Mobile bundle passed: public assets only, offline A Level practice/notes/challenge, persistent drafts and all course pages at phone size.');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e);process.exitCode=1;});
