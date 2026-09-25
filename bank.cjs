const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createHmac} = require('node:crypto');

function loadBank(seed) {
  const context = vm.createContext({
    STUDENT_VARIANT(topic, key, index) {
      const hash = createHmac('sha256',seed).update(`${topic}:${key}:${index}`).digest().readUInt32BE();
      const discrete = ['binary','nucleons','counts','induction','activity'];
      return discrete.includes(key) ? 1+hash%10 : 1+(hash%7201)/800;
    }
  });
  for (const file of ['questions.js','extra-calculations.js','extra-explanations.js','practical-questions.js','diagram-questions.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context,{timeout:5000,filename:file});
  }
  const bank = vm.runInContext('({topics:TOPICS,questions:QUESTIONS})',context);
  // Older fixed-value calculations use a validated family of the same topic and level online.
  for (const q of bank.questions) {
    if (/^q\d+$/.test(q.id) && q.type==='numeric') {
      const candidates=bank.questions.filter(item=>item.id.startsWith('calc-') && item.topic===q.topic && item.level===q.level);
      const hash=createHmac('sha256',seed).update(q.id).digest().readUInt32BE();
      const replacement=candidates[hash%candidates.length];
      Object.assign(q,{...replacement,id:q.id});
    }
    const tidy = text=>text.replace(/\b\d+\.\d{9,}\b/g,value=>Number(Number(value).toPrecision(7)).toString());
    q.prompt=tidy(q.prompt);
    q.steps=q.steps.map(tidy);
    q.hints = q.hints || (q.type==='written' ? [
      'Identify the physical principle and define the key terms in the question.',
      `Start by considering this point: ${q.steps[0]}`,
      `Develop the explanation further: ${q.steps[Math.min(1,q.steps.length-1)]}`
    ] : [
      `Identify the unknown and list the supplied quantities. Give your final answer in ${q.unit || 'the requested form'}.`,
      q.steps[0],
      q.steps.length>2 ? q.steps[1] : 'Rearrange the relationship for the unknown, substitute consistently, and check the size of your result.'
    ]);
  }
  return JSON.parse(JSON.stringify(bank));
}

function parseNumber(raw) {
  const value=String(raw).trim().replace(/\u2212/g,'-').replace(/\s+/g,'').replace(/[x\u00d7*]10\^/i,'e');
  if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value))return NaN;
  return Number(value);
}
module.exports={loadBank,parseNumber};
