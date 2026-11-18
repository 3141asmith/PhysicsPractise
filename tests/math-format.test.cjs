const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const katex=require('../vendor/katex/dist/katex.min.js');
const context=vm.createContext({window:{katex},katex});
for(const file of ['math-format.js','practicals-data.js','gcse-notes-data.js','gcse-bank.js','notes.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
const math=vm.runInContext('PhysicsMath',context),practicals=context.window.requiredPracticals;
test('all GCSE and required-practical text renders valid mathematics',()=>{
 let count=0;
 function check(value){
  if(typeof value==='string'){assert.doesNotThrow(()=>math.format(value),value);assert.doesNotThrow(()=>math.prose(value),value);count++;}
  else if(Array.isArray(value))value.forEach(check);
  else if(value&&typeof value==='object')Object.values(value).forEach(check);
 }
 check(practicals);check(vm.runInContext('GCSE_NOTES',context));check(vm.runInContext('GCSE_BANK',context));
 check(vm.runInContext('NOTES',context));
 assert.ok(count>10000);
 for(const p of practicals){
  assert.match(math.format(p.theory.join(' ')),/katex-display/,`RP ${p.id} key equations`);
  assert.match(math.format(p.analysis),/katex-display/,`RP ${p.id} worked analysis`);
  assert.match(math.format(p.questions[0][2]),/katex/,`RP ${p.id} numerical mark scheme`);
 }
 for(const topic of vm.runInContext('GCSE_NOTES.topics',context))for(const section of topic.sections)for(const equation of section.equations)assert.match(math.equation(equation),/katex-display/,equation);
});
test('Unicode quantities and arithmetic preserve powers, units and numerical values',()=>{
 for(const [plain,tex] of [['5.0 × 10⁻⁴ kg m⁻¹',String.raw`5.0\times10^{-4}\,\mathrm{kg}\,\mathrm{m}^{-1}`],['0.5 × 0.80 × 3.0² = 3.6 J',String.raw`0.5 \times  0.80 \times  3.0^{2} = 3.6\,\mathrm{J}`]]){
  const rendered=math.format(plain);
  assert.match(rendered,/katex/);
  assert.ok(rendered.includes(tex.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')),plain);
 }
 assert.match(math.unit('kg/m³'),/katex/);
 assert.doesNotMatch(math.format('<img src=x onerror=alert(1)>'),/<img/);
 assert.match(math.equation('Eₖ = ½mv²'),/katex-display/);
 assert.doesNotMatch(math.format('Eₖ = ½mv²'),/katex-display/);
 const grouped=math.prose(String.raw`\(v=f\lambda\), \(T=1/f\), and \(\Delta\phi=2\pi x/\lambda\).`);
 assert.equal((grouped.match(/class="katex-display"/g)||[]).length,1);
});

test('g alternatives have consistent timing data and an angle-corrected ramp model',()=>{
 const setups=practicals.find(p=>p.id===3).setups;
 assert.equal(setups.length,3);
 const hand=setups.find(s=>s.slug==='hand-timed');
 for(const row of hand.tables[0].rows){
  const mean=row.slice(1,6).reduce((a,b)=>a+b,0)/5;
  assert.ok(Math.abs(mean-row[6])<1e-9);
  assert.ok(Math.abs(mean**2-row[7])<.0001);
 }
 const ramp=setups.find(s=>s.slug==='ramp'),row=ramp.tables[0].rows[0];
 assert.ok(Math.abs(.0500/row[0]-row[2])<.001);
 assert.ok(Math.abs(.0500/row[1]-row[3])<.001);
 assert.ok(Math.abs((row[3]-row[2])/row[4]-row[5])<.002);
 for(const [angle,sine,,, ,mean] of ramp.tables[1].rows){
  assert.ok(Math.abs(Math.sin(angle*Math.PI/180)-sine)<.00001);
  assert.ok(Math.abs(mean-(9.80*sine-.040))<.002);
 }
});
