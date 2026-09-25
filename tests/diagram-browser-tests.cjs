const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const {loadBank}=require('../bank.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {screenshots}=require('./artifacts.cjs');
(async()=>{
 const banks=['diagram-alice','diagram-bob','diagram-carol'].map(loadBank);
 for(const bank of banks){
  const questions=bank.questions.filter(q=>q.id.startsWith('diagram-'));
  assert.equal(questions.length,12);
  assert.equal(questions.filter(q=>q.type==='written').length,6);
  for(const q of questions){assert.equal(q.level,'Challenge');assert.equal(q.hints.length,3);assert.ok(q.diagram);}
  const find=key=>questions.find(q=>q.id===`diagram-${key}-calc`);
  const motion=find('motion'),v=motion.diagram.points[1][1];assert.equal(motion.answer,5*v);
  const elastic=find('elastic');assert.ok(Math.abs(elastic.answer-elastic.diagram.points.slice(1).reduce((sum,p,i)=>sum+(p[1]+elastic.diagram.points[i][1])*(p[0]-elastic.diagram.points[i][0])/2000,0))<1e-10);
  const cell=find('cell'),p=cell.diagram.points;assert.equal(cell.answer,2.25*(p[0][1]-p[2][1])/2);
 }
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-diagrams-')),app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+app.server.address().port+'/a-level.html?static');
  await page.waitForFunction(()=>School.practice&&School.bank);
  const ids=await page.evaluate(()=>School.bank.questions.filter(q=>q.id.startsWith('diagram-')).map(q=>q.id));
  assert.equal(ids.length,12);
  for(const [type,label] of Object.entries({numeric:'Numerical',choice:'Multiple choice',written:'Written response'})){
   const id=await page.evaluate(type=>School.bank.questions.find(q=>q.type===type).id,type);
   await page.evaluate(id=>School.practice.open(id),id);
   assert.equal(await page.locator('#question .question-type').innerText(),label);
   assert.equal(await page.locator('[data-id="'+id+'"] .question-type').innerText(),label);
  }
  for(const width of [1440,390])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:900});await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
   for(const id of ids){
    await page.evaluate(id=>School.practice.open(id),id);
    assert.equal(await page.locator('.question-diagram svg').count(),1);
    assert.equal(await page.locator('#question .question-type').innerText(),id.endsWith('-calc')?'Numerical':'Written response');
    assert.ok((await page.locator('.question-diagram svg').getAttribute('aria-label')).length>50);
    assert.equal(await page.locator('.katex-error').count(),0);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   }
   await page.evaluate(()=>School.practice.open('diagram-vectors-calc'));
   await page.locator('.question-diagram').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(screenshots,`question-vectors-${width}-${theme}.png`)});
   await page.evaluate(()=>School.practice.open('diagram-motion-calc'));
   await page.locator('.question-diagram').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(screenshots,`question-graph-${width}-${theme}.png`)});
  }
  await page.evaluate(()=>School.practice.open('diagram-motion-calc'));
  const answer=await page.evaluate(()=>STATIC_BANK.questions.find(q=>q.id==='diagram-motion-calc').answer);
  await page.locator('#answer').fill(String(answer));await page.locator('#answer-form [type=submit]').click();
  await page.waitForFunction(()=>document.querySelector('#feedback').textContent.includes('Correct'));
  await page.evaluate(async()=>{
   const api=School.api;
   School.api=async(url,...args)=>url==='/api/challenge'?{score:0,extreme:false,includeOptional:false,answer:'',answered:false,question:School.bank.questions.find(q=>q.id==='diagram-cell-calc')}:api.call(School,url,...args);
   try{await Challenge.open();}finally{School.api=api;}
  });
  assert.equal(await page.locator('#challenge-view .question-diagram svg').count(),1);
  assert.equal(await page.locator('#challenge-view .question-type').innerText(),'Numerical');
  assert.deepEqual(errors,[]);console.log('Diagram questions passed: bank, area calculations, all 12 diagrams, marking, challenge rendering, accessible descriptions and responsive themes.');
 }finally{await browser?.close();await app.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
