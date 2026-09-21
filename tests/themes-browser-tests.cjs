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
   // Exercise shared component states even when their course view is hidden.
   await page.evaluate(()=>{
    const fixture=document.createElement('section');fixture.id='theme-components';
    fixture.innerHTML=`<button class="secondary">Secondary</button><a class="primary" href="#">Primary link</a>
      <div class="segmented"><button aria-pressed="true">Selected filter</button></div>
      <button class="topic-button active">Topic</button><button class="question-link active">Question</button>
      <label class="choice"><input type="radio" checked>Selected answer</label>
      <span class="badge Standard">Standard</span><span class="badge Challenge">Challenge</span>
      <span class="gcse-tag extra">Physics only</span><span class="gcse-tag higher">Higher</span>
      <div class="coin-box">Coins</div><div class="feedback correct">Correct</div>
      <div class="note-example"><span class="note-number">1</span><div class="note-body">Example</div></div>
      <div class="landing-card"><span class="landing-icon">Icon</span></div><div class="note-equation">Equation</div>`;
    document.body.append(fixture);
   });
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
     const components=await page.evaluate(()=>{
      const fixture=document.getElementById('theme-components');
      const probe=document.createElement('span');fixture.append(probe);
      const resolve=value=>{probe.style.color=value;return getComputedStyle(probe).color;};
      const expected={accent:resolve('var(--green)'),soft:resolve('var(--accent-soft)'),on:resolve('var(--on-accent)')};probe.remove();
      const read=(selector,property)=>getComputedStyle(fixture.querySelector(selector))[property];
      return {expected,foreground:['.secondary','.topic-button.active','.question-link.active','.choice','.coin-box','.feedback.correct','.note-number','.gcse-tag.extra'].map(s=>[s,read(s,'color')]),
       fills:['.segmented button','.landing-icon','.badge.Challenge','.gcse-tag.higher'].map(s=>[s,read(s,'backgroundColor')]),
       soft:['.question-link.active','.choice','.coin-box','.feedback.correct','.note-equation'].map(s=>[s,read(s,'backgroundColor')]),
       on:['a.primary','.segmented button','.landing-icon','.badge.Challenge','.gcse-tag.higher'].map(s=>[s,read(s,'color')]),
       borders:['.note-body','.note-equation','.secondary','.question-link.active'].map(s=>[s,read(s,'borderLeftColor')])};
     });
     for(const [group,expected] of [['foreground','accent'],['fills','accent'],['soft','soft'],['on','on'],['borders','accent']]){
      for(const [selector,value] of components[group])assert.equal(value,components.expected[expected],`${file} ${mode}/${palette} ${selector} ${group}`);
     }
     const secondary=page.locator('#theme-components .secondary');await secondary.hover();
     assert.equal(await secondary.evaluate(el=>getComputedStyle(el).backgroundColor),components.expected.soft);
     await secondary.focus();assert.equal(await secondary.evaluate(el=>getComputedStyle(el).outlineColor),actual.accent);
     await page.mouse.move(0,0);
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
