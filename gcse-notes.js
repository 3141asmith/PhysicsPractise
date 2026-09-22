const GCSENotes=(()=>{
  const $=id=>document.getElementById(id),esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let topic='energy';
  const eligible=s=>($('notes-course').value==='physics'||!s.physicsOnly)&&($('notes-tier').value==='higher'||!s.higher);
  const matching=s=>eligible(s)&&[s.title,...s.paragraphs,...s.equations,s.example,s.practical,s.spec].join(' ').toLowerCase().includes($('notes-search').value.trim().toLowerCase());
  const badges=s=>`<span class="gcse-tag ${s.physicsOnly?'extra':''}">${s.physicsOnly?'Physics only':'Both courses'}</span><span class="gcse-tag ${s.higher?'higher':''}">${s.higher?'HT only':'Foundation & Higher'}</span>${s.practical?'<span class="gcse-tag">Required practical</span>':''}`;
  function render(){
    const topics=GCSE_NOTES.topics;
    $('notes-topic-nav').innerHTML=topics.map(t=>{const count=t.sections.filter(matching).length;return `<button type="button" class="topic-button ${t.id===topic?'active':''}" data-notes-topic="${t.id}" aria-current="${t.id===topic?'page':'false'}">${esc(t.title)} <small>${count}</small></button>`;}).join('');
    const selected=topics.find(t=>t.id===topic)||topics[0],sections=selected.sections.filter(matching);
    $('notes-title').textContent=selected.title;
    $('notes-count').textContent=`Paper ${selected.paper} · ${sections.length} of ${selected.sections.length} sections shown`;
    $('notes-content').innerHTML=sections.length?`<nav class="notes-toc" aria-label="Sections in this topic">${sections.map(s=>`<a href="#notes/${selected.id}/${s.id}">${esc(s.title)}</a>`).join('')}</nav>`+sections.map(s=>`<section class="note-section gcse-note-section ${s.physicsOnly?'physics-only':''} ${s.higher?'higher-only':''}" id="note-${s.id}" data-physics-only="${s.physicsOnly}" data-higher="${s.higher}">
      <div>${badges(s)}</div><h2>${esc(s.title)}</h2><p class="note-reference">AQA Physics ${esc(s.spec)}</p>
      ${s.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')}
      ${s.equations.length?'<div class="note-equation" aria-label="Key equations">'+s.equations.map(e=>'<p>'+esc(e)+'</p>').join('')+'</div>':''}
      ${s.example?'<div class="gcse-note-example"><h3>Worked example</h3><p>'+esc(s.example)+'</p></div>':''}
      ${s.practical?'<div class="gcse-note-practical"><h3>Required practical: method and evaluation</h3><p>'+esc(s.practical)+'</p></div>':''}
      </section>`).join(''):'<p class="empty">No notes match these filters in this topic. Choose another topic, clear your search, or change course/tier. Space physics is only available for separate GCSE Physics.</p>';
    $('notes-sources').innerHTML=`Scope checked ${GCSE_NOTES.checked}. <a href="${selected.source}">AQA Physics: ${esc(selected.title)}</a> · <a href="${GCSE_NOTES.combinedSource}">AQA Trilogy physics specification</a>. Section numbers above refer to Physics (8463); Trilogy uses different numbering. These are original revision explanations, not official AQA wording.`;
  }
  function open(){
    const [,slug,section]=location.hash.split('/');
    topic=GCSE_NOTES.topics.some(t=>t.id===slug)?slug:'energy';render();
    if(section){const target=$('note-'+section);if(target)target.scrollIntoView({block:'start'});}
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const params=new URLSearchParams(location.search);
    $('notes-course').value=(params.get('notesCourse')||params.get('course'))==='combined'?'combined':'physics';
    $('notes-tier').value=(params.get('notesTier')||params.get('tier'))==='foundation'?'foundation':'higher';
    $('notes-topic-nav').onclick=e=>{const button=e.target.closest('[data-notes-topic]');if(button){GCSEViews.show('notes/'+button.dataset.notesTopic);$('notes-title').focus();}};
    for(const id of ['notes-course','notes-tier'])$(id).onchange=()=>{
      const url=new URL(location.href);url.searchParams.set('notesCourse',$('notes-course').value);url.searchParams.set('notesTier',$('notes-tier').value);history.replaceState(null,'',url);render();
    };
    $('notes-search').oninput=render;
    $('notes-clear').onclick=()=>{$('notes-search').value='';render();};
  });
  return {open};
})();
