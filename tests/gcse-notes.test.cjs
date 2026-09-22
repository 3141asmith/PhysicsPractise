const {test}=require('node:test'),assert=require('node:assert/strict');
const {topics}=require('../gcse-notes-data');
const sections=topics.flatMap(t=>t.sections),find=id=>sections.find(s=>s.id===id);
test('GCSE notes have complete topic navigation, unique anchors and all ten practicals',()=>{
  assert.equal(topics.length,8);assert.equal(new Set(sections.map(s=>s.id)).size,sections.length);
  assert.equal(sections.filter(s=>s.practical).length,10);
  for(const t of topics){assert.match(t.source,/^https:\/\/www.aqa.org.uk\//);assert.ok(t.sections.length>=4);
    for(const s of t.sections){assert.match(s.spec,/^4\./);assert.equal(typeof s.physicsOnly,'boolean');assert.equal(typeof s.higher,'boolean');assert.ok(s.paragraphs.join(' ').length>150);}}
});
test('Specification boundaries distinguish course from tier, including mixed subtopics',()=>{
  for(const id of ['static','boyle','moments','pressure','reflection','lenses','black-body','devices','stopping-graphs']){assert.equal(find(id).physicsOnly,true,id);assert.equal(find(id).higher,false,id);}
  for(const id of ['momentum','motor-effect','motors','vectors','half-life-ratios','efficiency-improvements']){assert.equal(find(id).physicsOnly,false,id);assert.equal(find(id).higher,true,id);}
  for(const id of ['collision-calculations','gas-work','upthrust','hearing','ultrasound','radiation-balance','transformers','impact']){assert.equal(find(id).physicsOnly,true,id);assert.equal(find(id).higher,true,id);}
  assert.ok(topics[7].sections.every(s=>s.physicsOnly));
  assert.equal(sections.filter(s=>s.practical&&!s.physicsOnly).length,8);
});
