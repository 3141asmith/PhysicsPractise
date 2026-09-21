const test=require('node:test');
const assert=require('node:assert/strict');
const {topics,questions}=require('../gcse-bank.js');
test('400 complete, unique GCSE questions, 50 per topic',()=>{
  assert.equal(questions.length,400);
  assert.equal(new Set(questions.map(q=>q.id)).size,400);
  assert.equal(new Set(questions.map(q=>q.prompt)).size,400);
  topics.forEach((_,i)=>assert.equal(questions.filter(q=>q.topic===i).length,50));
  for(const q of questions){
    assert.equal(q.hints.length,3);assert.ok(q.steps.length);assert.match(q.spec,/^4\.[1-8]\./);
    assert.equal(q.paper,q.topic<4?1:2);
    assert.equal(typeof q.physicsOnly,'boolean');assert.equal(typeof q.higher,'boolean');
    if(q.type==='numeric'){assert.ok(Number.isFinite(q.answer));assert.ok(q.unit);}
    else assert.equal(q.type,'written');
  }
});
test('AQA course and tier boundaries are independent',()=>{
  const get=id=>questions.find(q=>q.id===id);
  for(const q of questions.filter(q=>q.topic===7))assert.equal(q.physicsOnly,true);
  for(const id of ['gcse-0-insulation-test','gcse-1-static-transfer','gcse-2-gas-1','gcse-3-fission','gcse-4-moment-1','gcse-5-magnification-1']){
    assert.equal(get(id).physicsOnly,true,id);assert.equal(get(id).higher,false,id);
  }
  for(const id of ['gcse-3-halflife-1','gcse-4-momentum-1','gcse-5-refraction','gcse-6-motor-force-1']){
    assert.equal(get(id).higher,true,id);assert.equal(get(id).physicsOnly,false,id);
  }
  for(const id of ['gcse-2-pump','gcse-4-airbag','gcse-5-echo-1','gcse-6-turns-1','gcse-7-velocity']){
    assert.equal(get(id).higher,true,id);assert.equal(get(id).physicsOnly,true,id);
  }
});
test('Independent first/last variant answer checks for every calculation family',()=>{
  const expected={
    '0-kinetic':[9,245],'0-height':[60,420],'0-spring':[2,10],'0-power':[200,3000/7],'0-efficiency':[40,80],'0-heating':[2250,20250],
    '1-charge':[10,250],'1-voltage':[1.5,17.5],'1-resistance':[6,14],'1-series':[8,20],'1-power':[1.2,6],'1-energy':[2400,36000],
    '2-density':[1000,3000],'2-mass':[0.8,4],'2-volume':[17,25],'2-latent':[33400,167000],'2-heat-capacity':[100,500],'2-gas':[180,260],
    '3-neutrons':[12,16],'3-protons':[15,19],'3-electrons':[7,15],'3-alpha':[218,226],'3-beta':[12,16],'3-halflife':[40,200],
    '4-weight':[29.4,68.6],'4-force':[5,125],'4-acceleration':[1,5],'4-spring':[5,25],'4-momentum':[6,18],'4-moment':[5,25],
    '5-speed':[1.2,2.8],'5-frequency':[10,50],'5-period':[0.2,0.04],'5-count':[5,25],'5-magnification':[2,10],'5-echo':[75,375],
    '6-motor-force':[0.08,0.4],'6-motor-current':[1,5],'6-turns':[20,100],'6-secondary-current':[1,5],'6-field':[0.1,0.5],
    '7-orbit-distance':[960,2880],'7-redshift-data':[20,60]
  };
  for(const [family,values] of Object.entries(expected))for(const [index,variant] of [1,5].entries()){
    const q=questions.find(q=>q.id===`gcse-${family}-${variant}`);assert.ok(q,family);
    assert.ok(Math.abs(q.answer-values[index])<1e-8,`${q.id}: ${q.answer} vs ${values[index]}`);
  }
  assert.equal(Object.keys(expected).length,questions.filter(q=>q.type==='numeric').length/5);
});
