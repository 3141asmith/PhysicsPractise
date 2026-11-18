const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-practicals-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 try {
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  await page.goto(base+'/a-level.html');
  await page.getByRole('link',{name:'Browse required practicals without signing in'}).click();
  assert.equal(await page.locator('#practical-list a').count(),12);
  const diagramCounts=[1,2,1,1,1,1,2,2,1,2,2,1];
  const screenshots=process.argv.includes('--screenshots');
  const screenshotDir=path.join(__dirname,'..','artifacts','practical-diagrams');
  if(screenshots)fs.mkdirSync(screenshotDir,{recursive:true});
  for(let id=1;id<=12;id++){
   await page.locator(`#practical-list a[href="#rp-${id}"]`).click();
   await page.waitForFunction(id=>document.title.startsWith(`RP ${id}:`),id);
   assert.match(await page.title(),new RegExp(`RP ${id}:`));
   assert.equal(await page.locator('.practical-section').count(),5);
   assert.equal(await page.locator('#practical-content svg[role=img]').count(),diagramCounts[id-1]);
   const diagramProblems=await page.locator('#practical-content svg[role=img]').evaluateAll(svgs=>svgs.flatMap((svg,index)=>{
    const problems=[];
    if(!svg.querySelector('title')?.textContent||!svg.querySelector('desc')?.textContent)problems.push('Missing accessible title/description');
    for(const text of svg.querySelectorAll('text')){
     const b=text.getBBox();if(b.x<0||b.y<0||b.x+b.width>800||b.y+b.height>440)problems.push(`Figure ${index+1}: clipped label ${text.textContent}`);
    }
    const labels=[...svg.querySelectorAll('text')];
    for(let a=0;a<labels.length;a++)for(let b=a+1;b<labels.length;b++){
     const x=labels[a].getBBox(),y=labels[b].getBBox();
     if(Math.min(x.x+x.width,y.x+y.width)-Math.max(x.x,y.x)>2&&Math.min(x.y+x.height,y.y+y.height)-Math.max(x.y,y.y)>2)problems.push(`Figure ${index+1}: overlapping labels ${labels[a].textContent} / ${labels[b].textContent}`);
    }
    return problems;
   }));
   assert.deepEqual(diagramProblems,[],`RP ${id} diagram checks`);
   if(screenshots)for(let index=0;index<diagramCounts[id-1];index++)await page.locator('.practical-diagram').nth(index).screenshot({path:path.join(screenshotDir,`rp-${id}-${index+1}.png`)});
   await page.getByRole('button',{name:/Enlarge diagram:/}).first().click();
   assert.ok(await page.locator('dialog[open] svg').isVisible());
   assert.equal(await page.locator('[id]').evaluateAll(nodes=>new Set(nodes.map(n=>n.id)).size===nodes.length),true);
   await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
   assert.ok(await page.locator('tbody tr').count()>=5);
   assert.equal(await page.locator('.practical-question').count(),3);
   await page.locator('.practical-question textarea').first().fill('My answer with working.');
   await page.getByRole('link',{name:'Exam practice',exact:true}).click();
   assert.equal(await page.locator('.practical-question textarea').first().inputValue(),'My answer with working.');
   const mark=page.locator('.practical-question details').first();await mark.locator('summary').click();
   assert.ok(await mark.locator('p').isVisible());
  }
  await page.locator('#practical-search').fill('waves');assert.equal(await page.locator('#practical-list a').count(),2);
  await page.locator('#practical-search').fill('nothing-matches');assert.match(await page.locator('#practical-count').innerText(),/0 of 12/);
  await page.locator('#practical-search').fill('');
  await page.goto(base+'/practicals.html#rp-8-data');
  assert.match(await page.locator('#practical-title').innerText(),/Gas laws/);
  await page.reload();assert.match(await page.locator('#practical-title').innerText(),/Gas laws/);
  await page.getByRole('button',{name:'Switch to dark mode'}).click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.setViewportSize({width:390,height:844});
  for(let id=1;id<=12;id++){
   await page.locator(`#practical-list a[href="#rp-${id}"]`).click();
   await page.waitForFunction(id=>document.title.startsWith(`RP ${id}:`),id);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Mobile overflow RP ${id}`);
  }
  await page.getByRole('button',{name:/Enlarge diagram:/}).first().click();
  assert.ok(await page.locator('dialog[open] svg').isVisible());
  await page.getByRole('button',{name:'Close diagram'}).click();
  if(screenshots)await page.locator('.practical-diagram').first().screenshot({path:path.join(screenshotDir,'mobile-dark.png')});
  await page.goBack();await page.waitForFunction(()=>document.title.startsWith('RP 11:'));
  assert.deepEqual(errors,[]);
  console.log('All 12 guides and 17 diagrams: labels, accessible descriptions, enlargement, navigation, tables, questions, search, history, theme and mobile layout passed.');
 } finally {if(browser)await browser.close();app.server.close();app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(error=>{console.error(error);process.exitCode=1;});
