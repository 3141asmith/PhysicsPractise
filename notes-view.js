const NotesView=(()=>{
  const diagrams={
    '0:2':{kind:'graph',title:'A best-fit line, not dot-to-dot',caption:'Vertical bars show measurement uncertainty. Use widely separated points on the best-fit line to calculate its gradient.'},
    '1:2':{kind:'levels',title:'An emission transition',caption:'An electron moves to a lower energy level. The emitted photon has energy equal to the difference between the two levels.'},
    '2:0':{kind:'wave',title:'One wavelength',caption:'A snapshot of displacement against distance. Wavelength is the distance between adjacent points in phase; amplitude is the maximum displacement from equilibrium.'},
    '6:1':{kind:'decay',title:'Discharging a capacitor',caption:'At one time constant, t = RC, the voltage is about 37% of its initial value. The curve approaches zero without reaching it in the ideal model.'}
  };
  const esc=value=>School.escapeHtml(value);
  function practicalGuide(section){
    if(!section.groups)return '';
    return '<p class="note-practical-source">'+esc(section.sourceReference)+'</p>'+section.groups.map(group=>{
      const tag=group.ordered?'ol':'ul';
      return '<div class="note-practical-group"><h3>'+esc(group.title)+'</h3><'+tag+'>'+group.points.map(point=>'<li>'+PhysicsMath.format(point)+'</li>').join('')+'</'+tag+'></div>';
    }).join('');
  }
  function index(topics){
    return '<div class="notes-heading"><div class="section-label">REVISION LIBRARY</div><h1>Topic notes</h1></div><div class="notes-index">'+topics.map((title,i)=>'<button data-note="'+i+'" class="note-topic"><span class="note-number">'+String(i+1).padStart(2,'0')+'</span><span><strong>'+esc(title)+'</strong><small>'+esc(NOTES[i].sections.slice(0,3).map(s=>s.title).join(' · '))+'</small><span class="note-topic-meta">'+NOTES[i].sections.length+' sections</span></span><span aria-hidden="true">&rarr;</span></button>').join('')+'</div>';
  }
  function topic(note,title,topic,returnQuestion){
    return '<button id="notes-home" class="notes-back">&larr; All topic notes</button><div class="heading notes-heading"><div><div class="section-label">TOPIC '+String(topic+1).padStart(2,'0')+' &middot; REVISION NOTES</div><h1>'+esc(title)+'</h1></div><button id="return-practice" class="secondary">'+(returnQuestion?'Back to question':'Practise this topic')+'</button></div><nav class="notes-toc" aria-label="Note sections">'+note.sections.map((s,i)=>'<a href="#note-section-'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(s.title)+'</a>').join('')+'</nav><div class="notes-reading">'+note.sections.map((section,i)=>{
      const example=/worked example/i.test(section.title),diagram=diagrams[topic+':'+i];
      const guide=practicalGuide(section);
      return '<section class="note-section '+(example?'note-example':'')+'" id="note-section-'+i+'"><div class="note-section-heading"><span class="note-number">'+String(i+1).padStart(2,'0')+'</span><h2>'+esc(section.title)+'</h2></div><div class="note-body">'+(section.reference?'<p class="note-reference">Specification '+esc(section.reference)+'</p>':'')+section.points.map(point=>'<div class="'+(point.startsWith('\\(')?'note-equation':'note-point')+'">'+PhysicsMath.format(point)+'</div>').join('')+guide+(diagram?'<figure class="note-figure"><h3>'+esc(diagram.title)+'</h3><canvas data-note-diagram="'+diagram.kind+'" role="img" aria-label="'+esc(diagram.title+'. '+diagram.caption)+'"></canvas><figcaption>'+esc(diagram.caption)+'</figcaption></figure>':'')+'</div></section>';
    }).join('')+'</div><details class="notes-source"><summary>Sources and further reading</summary><p>'+esc(note.source)+'</p></details>';
  }
  function draw(canvas){
    const w=600,h=280,dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;
    const c=canvas.getContext('2d');c.scale(dpr,dpr);
    const dark=document.documentElement.dataset.theme==='dark',ink=dark?'#dce9e2':'#31483e',muted=dark?'#9aaea1':'#6c7d74',accent=dark?'#76d6b1':'#156b59',warm=dark?'#f1c66f':'#9c6314';
    c.font=(canvas.clientWidth<450?'19':'15')+'px Arial';c.lineWidth=2;c.lineCap='round';
    const line=(x,y,x2,y2,color=muted)=>{c.strokeStyle=color;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();};
    const text=(s,x,y,color=ink)=>{c.fillStyle=color;c.fillText(s,x,y);};
    const arrow=(x,y,x2,y2,color=accent)=>{line(x,y,x2,y2,color);const a=Math.atan2(y2-y,x2-x);line(x2,y2,x2-9*Math.cos(a-.45),y2-9*Math.sin(a-.45),color);line(x2,y2,x2-9*Math.cos(a+.45),y2-9*Math.sin(a+.45),color);};
    const curve=(fn,x0,x1,color=accent)=>{c.strokeStyle=color;c.lineWidth=3;c.beginPath();for(let x=x0;x<=x1;x++){const y=fn(x);if(x===x0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();c.lineWidth=2;};
    switch(canvas.dataset.noteDiagram){
      case 'wave':
        arrow(55,145,560,145,muted);arrow(55,225,55,30,muted);text('Displacement',65,28);text('Distance',490,252);
        curve(x=>145-60*Math.sin((x-65)*Math.PI*2/220),65,550);
        arrow(120,55,340,55,warm);arrow(340,55,120,55,warm);text('Wavelength',187,43,warm);
        c.setLineDash([4,5]);line(120,60,120,85);line(340,60,340,85);c.setLineDash([]);
        c.setLineDash([4,5]);line(340,85,395,85);c.setLineDash([]);arrow(395,145,395,85,warm);text('Amplitude',405,100,warm);text('0',35,150);break;
      case 'levels':
        line(100,65,440,65,accent);line(100,205,440,205,accent);text('Higher energy, E2',105,45);text('Lower energy, E1',105,238);
        arrow(235,72,235,198,warm);text('Electron',125,132);text('transition',125,151);
        curve(x=>133+9*Math.sin((x-270)/8),270,440,warm);arrow(440,133,475,133,warm);text('Emitted photon',325,173);text('Energy = E2 - E1',325,195);
        arrow(65,220,65,45,muted);c.save();c.translate(35,175);c.rotate(-Math.PI/2);text('Energy',0,0);c.restore();break;
      case 'decay':{
        arrow(65,220,555,220,muted);arrow(65,220,65,32,muted);text('Voltage / V0',75,27);text('Time / RC',478,265);
        curve(x=>220-170*Math.exp(-(x-65)/110),65,535);
        c.setLineDash([5,5]);const y=220-170/Math.E;line(65,y,175,y,warm);line(175,y,175,220,warm);c.setLineDash([]);
        text('1',40,55);text('0',40,225);text('0.37',20,y+5,warm);
        for(let i=1;i<=4;i++){line(65+110*i,220,65+110*i,225);text(String(i),60+110*i,243);}
        text('After one time constant',260,92);text('V = V0 / e',260,115,warm);break;}
      case 'graph':
        arrow(65,225,550,225,muted);arrow(65,225,65,32,muted);text('Measured y',75,28);text('Independent variable x',360,260);
        [[115,195],[200,162],[290,126],[375,103],[465,67]].forEach(([x,y])=>{line(x,y-15,x,y+15,warm);line(x-6,y-15,x+6,y-15,warm);line(x-6,y+15,x+6,y+15,warm);c.fillStyle=ink;c.beginPath();c.arc(x,y,4,0,Math.PI*2);c.fill();});
        line(90,207,510,51,accent);text('Best fit',360,45,accent);text('Arbitrary units',82,249);break;
    }
  }
  const drawAll=()=>document.querySelectorAll('[data-note-diagram]').forEach(draw);
  new MutationObserver(drawAll).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return {index,topic,drawAll};
})();
