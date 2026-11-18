(() => {
  const practicals = window.requiredPracticals;
  const content = document.getElementById('practical-content');
  const list = document.getElementById('practical-list');
  const search = document.getElementById('practical-search');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let selected;
  const paragraphs = values => values.map(value => `<p>${escape(value)}</p>`).join('');
  function renderDiagram(diagram,id,index) {
    const key = `diagram-${id}-${index}`;
    return `<figure class="practical-diagram"><div class="diagram-toolbar"><span>FIGURE ${id}.${index+1}</span><button type="button" class="secondary" data-enlarge-diagram="${index}" aria-label="Enlarge diagram: ${escape(diagram.title)}">Enlarge diagram</button></div><div class="diagram-scroll" tabindex="0" role="region" aria-label="${escape(diagram.title)}; scroll horizontally on small screens"><svg viewBox="${diagram.viewBox}" role="img" aria-labelledby="${key}-title" aria-describedby="${key}-desc"><title id="${key}-title">${escape(diagram.title)}</title><desc id="${key}-desc">${escape(diagram.description)}</desc>${diagram.svg}</svg></div><figcaption><strong>${escape(diagram.title)}</strong><span>Schematic, not to scale. Dashed lines show reference positions or alternate phases.</span><span class="diagram-mobile-help">Swipe sideways to see the whole diagram, or choose Enlarge diagram.</span></figcaption><details class="diagram-text"><summary>Read the diagram description</summary><p>${escape(diagram.description)}</p></details></figure>`;
  }
  const diagramDialog = document.createElement('dialog');
  diagramDialog.className = 'diagram-dialog';
  diagramDialog.setAttribute('aria-label','Enlarged apparatus diagram');
  document.body.append(diagramDialog);
  content.addEventListener('click',event => {
    const button = event.target.closest('[data-enlarge-diagram]');
    if (!button) return;
    const diagram = selected.diagrams[Number(button.dataset.enlargeDiagram)];
    // Prefix accessibility IDs so they remain unique while the original is visible.
    const figure = button.closest('figure').cloneNode(true);
    figure.querySelector('.diagram-toolbar').remove();
    figure.querySelectorAll('[id]').forEach(node => { node.id = `enlarged-${node.id}`; });
    const svg = figure.querySelector('svg');
    for (const attribute of ['aria-labelledby','aria-describedby']) svg.setAttribute(attribute,`enlarged-${svg.getAttribute(attribute)}`);
    diagramDialog.innerHTML = `<div class="diagram-dialog-heading"><h2>${escape(diagram.title)}</h2><button type="button" class="secondary" autofocus>Close diagram</button></div>`;
    diagramDialog.append(figure);
    diagramDialog.querySelector('button').onclick = () => diagramDialog.close();
    diagramDialog.showModal();
  });
  function navigation() {
    const term = search.value.trim().toLowerCase();
    const filtered = practicals.filter(p => `${p.id} ${p.title} ${p.topic}`.toLowerCase().includes(term));
    list.innerHTML = filtered.map(p => `<a href="#rp-${p.id}" ${p.id === selected.id ? 'aria-current="page"' : ''}><span>RP ${p.id}</span>${escape(p.title)}</a>`).join('');
    document.getElementById('practical-count').textContent = `${filtered.length} of 12 practicals${filtered.length ? '' : ' — try another search'}`;
  }
  function render() {
    const match = /^#rp-(\d+)(?:-(theory|method|data|evaluation|questions))?$/.exec(location.hash);
    selected = practicals.find(p => p.id === Number(match?.[1])) || practicals[0];
    const p = selected;
    document.title = `RP ${p.id}: ${p.title} | Physics Forge`;
    navigation();
    content.innerHTML = `<div class="practical-heading"><div class="section-label">REQUIRED PRACTICAL ${p.id} · ${escape(p.topic)} · ${p.id <= 6 ? 'AS AND A LEVEL' : 'A LEVEL'}</div><h2 id="practical-title" tabindex="-1">${escape(p.title)}</h2><nav class="practical-jumps" aria-label="Sections of this practical">${['Theory','Method','Data','Evaluation','Questions'].map(section => `<a href="#rp-${p.id}-${section.toLowerCase()}">${section === 'Data' ? 'Exemplar data' : section === 'Questions' ? 'Exam practice' : section}</a>`).join('')}</nav></div>
      <section class="practical-section" id="rp-${p.id}-theory"><h3>The theory</h3>${paragraphs(p.theory)}</section>
      <section class="practical-section" id="rp-${p.id}-method"><h3>Apparatus and detailed method</h3><p>${escape(p.apparatus)}</p>${p.diagrams.map((diagram,index) => renderDiagram(diagram,p.id,index)).join('')}<ol>${p.method.map(step => `<li>${escape(step)}</li>`).join('')}</ol><div class="practical-callout"><strong>Control variables</strong><p>${escape(p.controls)}</p></div><h4>Safety</h4><p>${escape(p.safety)}</p></section>
      <section class="practical-section" id="rp-${p.id}-data"><h3>Exemplar data and worked analysis</h3><p>Illustrative values for learning the analysis. Record your own raw readings, units, repeats and instrument uncertainties in the laboratory.</p>${p.tables.map(table => `<div class="practical-table-wrap" tabindex="0" role="region" aria-label="${escape(table.caption)}"><table><caption>${escape(table.caption)}</caption><thead><tr>${table.headers.map(h => `<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(v => `<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`).join('')}<h4>How to process the results</h4><p>${escape(p.analysis)}</p></section>
      <section class="practical-section" id="rp-${p.id}-evaluation"><h3>Uncertainty and evaluation</h3><p>${escape(p.uncertainty)}</p><p>For a graph, label axes with units, plot a suitable spread of readings and use a best-fit line rather than joining points. Quote an uncertainty and assess whether the expected relationship is consistent with the data. Repeating measurements helps assess random scatter; a consistent calibration or zero error needs a separate correction.</p></section>
      <section class="practical-section" id="rp-${p.id}-questions"><h3>Exam-style practice</h3><p>Write your answer before revealing the marking points. These original questions are self-assessed; the bracketed marks indicate the available points.</p>${p.questions.map(([question,marks,answer],i) => `<div class="practical-question"><label for="rp-${p.id}-answer-${i}">${i+1}. ${escape(question)} [${marks} marks]</label><textarea id="rp-${p.id}-answer-${i}" rows="4" placeholder="Include equations, working and units where appropriate."></textarea><details><summary>Reveal mark scheme · ${marks} marks</summary><p>${escape(answer)}</p></details></div>`).join('')}<small>Answers are kept while this guide is open. They are not saved when you change practical or reload, and do not award course coins or completion credit.</small></section>
      <nav class="practical-pager" aria-label="Previous and next practical">${p.id > 1 ? `<a href="#rp-${p.id-1}">← RP ${p.id-1}: ${escape(practicals[p.id-2].title)}</a>` : '<span></span>'}${p.id < 12 ? `<a href="#rp-${p.id+1}">RP ${p.id+1}: ${escape(practicals[p.id].title)} →</a>` : '<a href="a-level.html">Back to A Level study space →</a>'}</nav>`;
    if (match?.[2]) document.getElementById(`rp-${p.id}-${match[2]}`).scrollIntoView();
  }
  search.addEventListener('input',navigation);
  window.addEventListener('hashchange', () => {
    const id = Number(/^#rp-(\d+)/.exec(location.hash)?.[1]);
    if (id !== selected.id) { render(); document.getElementById('practical-title').focus({preventScroll:true}); content.scrollIntoView(); }
    else document.getElementById(location.hash.slice(1))?.scrollIntoView();
  });
  render();
})();
