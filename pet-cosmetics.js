/* Fixed artwork colours keep clothing independent of the website theme. */
const PetCosmetics=(()=>{
  const items=[
    {id:'starlight-scarf',slot:'scarf',name:'Starlight scarf'},
    {id:'wizard-hat',slot:'hat',name:'Nebula wizard hat',art:'<path fill="#7257b7" d="M78 67L117 8 151 65Z"/><ellipse fill="#a28bd6" cx="118" cy="65" rx="51" ry="9"/><path fill="#ffe494" d="M116 30L119 37 127 37 121 42 123 49 116 45 110 49 112 42 107 37 114 37Z"/>'},
    {id:'explorer-hat',slot:'hat',name:'Woodland explorer hat',art:'<path fill="#bd965f" d="M83 61L90 31Q119 18 147 31L155 61Z"/><path fill="#795b40" d="M84 51H153V62H84Z"/><ellipse fill="#dfbb7c" cx="119" cy="66" rx="54" ry="9"/><path fill="#77ab57" d="M146 51Q144 15 166 19Q171 39 146 51Z"/>'},
    {id:'captain-hat',slot:'hat',name:'Ocean captain hat',art:'<path fill="#f0f7ff" d="M77 37Q118 12 161 37L151 64H88Z"/><path fill="#263e64" d="M87 52H152V67H87Z"/><path fill="#40618a" d="M85 67Q120 85 156 67Z"/><path fill="none" stroke="#efc764" stroke-width="4" d="M120 31V49M110 43Q120 57 130 43M113 36H127"/>'},
    {id:'rocket-boots',slot:'shoes',name:'Rocket boots',art:'<g fill="#d85854"><path d="M62 154H98V177H58V169Z"/><path d="M141 154H177L181 169V177H141Z"/></g><path fill="#e6e9ee" d="M59 174H99V181H57ZM140 174H181V181H140Z"/><path fill="#ffc958" d="M63 157H95V164H63ZM144 157H175V164H144Z"/>'},
    {id:'leaf-boots',slot:'shoes',name:'Moss trail boots',art:'<g fill="#5a8545"><path d="M66 154H98V179H56Q54 166 66 165Z"/><path d="M142 154H174V165Q187 166 184 179H142Z"/></g><path fill="#bdd583" d="M61 169Q74 155 87 169Q74 182 61 169ZM153 169Q166 155 179 169Q166 182 153 169Z"/>'},
    {id:'reef-flippers',slot:'shoes',name:'Coral reef flippers',art:'<path fill="#4cc7cb" d="M76 156H101L105 182 53 186ZM139 156H164L187 186 135 182Z"/><path fill="none" stroke="#207b91" stroke-width="3" d="M81 168L69 181M92 168L87 181M148 168L153 181M158 168L170 181"/>'},
    {id:'lab-jacket',slot:'jacket',name:'Research lab coat',art:'<path fill="#edf3fb" d="M81 126L103 132 120 138 137 132 159 126 170 146 155 151 158 168H82L85 151 70 146Z"/><path fill="#bfd1e1" d="M103 132L120 143 109 149ZM137 132L120 143 131 149Z"/><path fill="none" stroke="#6a87a3" d="M120 144V168M137 153H151V161H137Z"/>'},
    {id:'flight-jacket',slot:'jacket',name:'Solar flight jacket',art:'<path fill="#c97834" d="M81 126L102 132H139L160 126 171 147 154 152 157 168H83L86 151 69 146Z"/><path fill="#f5dbb5" d="M100 130L120 142 139 130 140 139 120 150 99 139Z"/><path fill="none" stroke="#734a2c" d="M120 149V168M89 157H108M132 157H152"/><circle fill="#ffdc65" cx="143" cy="148" r="5"/>'},
    {id:'ocean-jacket',slot:'jacket',name:'Deep sea jacket',art:'<path fill="#266d91" d="M82 126L103 133H137L158 126 173 148 156 153 159 168H81L84 153 67 148Z"/><path fill="none" stroke="#89eee1" stroke-width="4" d="M82 145L92 157H107M158 145L148 157H133M120 135V168"/>'},
    {id:'round-glasses',slot:'glasses',name:'Professor spectacles',art:'<g fill="#c0e7ff" fill-opacity=".18" stroke="#6c4532" stroke-width="4"><circle cx="95" cy="103" r="16"/><circle cx="145" cy="103" r="16"/><path fill="none" d="M111 101Q120 96 129 101M79 101L70 97M161 101L170 97"/></g>'},
    {id:'star-glasses',slot:'glasses',name:'Stargazer shades',art:'<path fill="#b493ea" fill-opacity=".45" stroke="#f2bc4d" stroke-width="4" d="M95 84L101 94 113 96 105 105 106 117 95 111 84 117 85 105 77 96 89 94ZM145 84L151 94 163 96 155 105 156 117 145 111 134 117 135 105 127 96 139 94Z"/><path fill="none" stroke="#f2bc4d" stroke-width="4" d="M111 101H129"/>'},
    {id:'dive-goggles',slot:'glasses',name:'Reef diving goggles',art:'<path fill="none" stroke="#ed9257" stroke-width="6" d="M69 100H78M162 100H171"/><rect fill="#a1e9ec" fill-opacity=".3" stroke="#286977" stroke-width="5" x="76" y="88" width="88" height="30" rx="11"/><path fill="none" stroke="#d8fcff" stroke-width="3" d="M84 96H98M134 96H153"/>'}
  ];
  const path=(d,fill,extra='')=>'<path d="'+d+'" fill="'+fill+'" '+extra+'/>';
  const line=(d,color,width=3)=>path(d,'none','stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round"');
  const circle=(x,y,r,fill)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'"/>';
  const add=(slot,id,name,art)=>items.push({slot,id,name,art});
  add('hat','lunar-helmet','Lunar helmet',path('M77 65V44Q82 9 120 10Q158 9 163 44V65H148V44H92V65Z','#e3edf5')+path('M85 43Q120 24 155 43L148 58H92Z','#75c7dc')+circle(79,54,10,'#df9159')+circle(161,54,10,'#df9159'));
  add('hat','copper-top-hat','Copper top hat',path('M86 63L80 16H154L148 63Z','#96643f')+path('M84 48H151V60H84Z','#3d6267')+'<ellipse cx="118" cy="67" rx="53" ry="9" fill="#c99658"/>'+circle(131,47,8,'#e7bf68'));
  add('hat','polar-beanie','Polar bobble hat',path('M80 62Q77 26 120 26Q163 26 160 62Z','#589abf')+path('M77 57H163V73H77Z','#d4eef5')+circle(120,19,12,'#e9f7ff')+line('M98 34V56M120 31V56M142 34V56','#d4eef5'));
  add('hat','pirate-hat','Treasure pirate hat',path('M65 62Q65 23 92 40Q120 4 148 40Q175 23 175 62Z','#3b4053')+line('M68 60Q120 46 172 60','#ebc268',5)+circle(120,39,9,'#f7e7ba')+line('M105 51L135 29M105 29L135 51','#f7e7ba',2));
  add('hat','mushroom-cap','Toadstool cap','<ellipse cx="120" cy="66" rx="53" ry="9" fill="#f3dec2"/>'+path('M65 61Q75 14 120 18Q165 14 175 61Z','#c55262')+circle(97,42,10,'#ffe9d3')+circle(138,36,9,'#ffe9d3')+circle(157,53,6,'#ffe9d3'));
  add('hat','crystal-tiara','Crystal tiara',path('M81 52L87 72H153L159 52 140 60 120 24 101 60Z','#a19ce4')+path('M108 49L120 29 132 49 120 66Z','#b7f6f7')+circle(91,62,5,'#fbe2ae')+circle(149,62,5,'#fbe2ae'));
  add('hat','engineer-hardhat','Engineer hard hat',path('M78 63Q79 22 120 22Q161 22 162 63Z','#e9b641')+path('M112 18H128V65H112Z','#f7d987')+path('M68 60H172V73H68Z','#e5a22e'));
  add('hat','comet-cap','Comet baseball cap',path('M81 62Q83 22 120 24Q151 26 154 63Z','#315c9d')+path('M118 61H160L182 75Q143 82 112 68Z','#6cace0')+path('M106 35L126 39 117 45 123 54 104 48Z','#ffdf82'));
  add('hat','botanical-beret','Botanical beret',path('M76 62Q61 26 108 23Q165 14 172 44Q175 67 132 69Z','#a26b9f')+path('M89 62H152V73H89Z','#674c7d')+line('M117 26L122 15','#674c7d',5)+path('M145 54Q151 31 168 36Q169 53 145 54Z','#b7ce79'));
  add('hat','sunflower-hat','Sunflower sunhat',path('M85 61L94 31Q121 19 147 34L154 61Z','#e5c487')+'<ellipse cx="120" cy="67" rx="59" ry="10" fill="#f2d79b"/>'+path('M142 44L148 33 154 44 166 42 161 53 168 61 155 64 151 74 143 64 132 66 136 55 130 47Z','#f4b939')+circle(149,54,7,'#785239'));

  // Footwear is drawn once and mirrored, keeping both shoes aligned on every pet.
  const pair=art=>art+'<g transform="translate(240 0) scale(-1 1)">'+art+'</g>';
  add('shoes','moon-boots','Moonwalker boots',pair(path('M64 151H100V180H54V170L64 165Z','#dce6ef')+line('M66 157H97M62 173H98','#7794b4',4)));
  add('shoes','rain-boots','Sunshine wellies',pair(path('M66 149H97V168H102V181H55V170L66 166Z','#f2bf41')+path('M63 148H100V156H63Z','#eb8e4a')));
  add('shoes','snow-boots','Polar snow boots',pair(path('M65 154H98V180H55V169L65 165Z','#86665e')+path('M61 151H102V160H61Z','#f5e5cf')+line('M73 163L89 171M89 163L73 171','#e9cda7',2)));
  add('shoes','galaxy-sneakers','Galaxy trainers',pair(path('M66 158H93L99 169V180H55V172Z','#8265ad')+path('M55 178H101V184H55Z','#ddd5f1')+line('M72 163H88M67 169H88','#ffc77a',2)));
  add('shoes','copper-greaves','Copper armour boots',pair(path('M66 150H98L95 169 102 173V182H55V170L65 165Z','#b7814e')+path('M70 155H94V166H70Z','#f0c78b')+circle(62,174,3,'#ece3c0')));
  add('shoes','cloud-slippers','Cloud slippers',pair(path('M56 181Q45 167 60 164Q66 150 79 159Q93 151 99 169V181Z','#e5f4fa')+circle(71,171,2,'#61829d')+circle(84,171,2,'#61829d')));
  add('shoes','ember-sandals','Ember sandals',pair(path('M55 171H99V181H55Z','#895743')+line('M66 171L84 157 95 171M66 159L84 173','#f4a45b',5)));
  add('shoes','mint-skates','Mint roller skates',pair(path('M65 154H96V170L103 174V180H55V170L65 166Z','#66c6b8')+circle(64,184,5,'#6c5b94')+circle(94,184,5,'#6c5b94')));
  add('shoes','royal-shoes','Royal buckle shoes',pair(path('M65 157H96V169Q106 178 100 182H54V170L65 167Z','#624b91')+path('M72 166H89V176H72Z','#efca64')+path('M77 169H84V173H77Z','#624b91')));
  add('shoes','coral-clogs','Coral clogs',pair(path('M55 179V170Q58 157 79 158Q100 157 102 171V180Z','#e78787')+circle(67,166,2,'#984654')+circle(77,164,2,'#984654')+circle(87,166,2,'#984654')));

  const coat=(fill,detail,shape='M81 126L101 132H139L159 126 173 148 157 153 160 170H80L83 153 67 148Z')=>path(shape,fill)+detail;
  add('jacket','lunar-suit','Lunar mission suit',coat('#e5edf5',path('M104 140H136V158H104Z','#6d93b4')+circle(112,148,3,'#f1be60')+circle(128,148,3,'#8edbc9')+line('M87 143H99M141 143H153','#cc8b5a',4)));
  add('jacket','raincoat','Sunshine raincoat',coat('#f0c449',line('M120 137V170','#b97836')+circle(125,145,2,'#b97836')+circle(125,155,2,'#b97836')+path('M89 154H108V163H89ZM133 154H151V163H133Z','#ffe48c')));
  add('jacket','polar-parka','Polar expedition parka',coat('#548dac',path('M99 129L120 143 141 129 147 138 120 154 93 138Z','#f5e8d3')+line('M120 151V169','#d5eff1')));
  add('jacket','galaxy-hoodie','Galaxy hoodie',coat('#7560a5',path('M105 156Q120 149 135 156V165H105Z','#a695cd')+line('M111 137V148M129 137V148','#fff0b8',2)+circle(144,143,3,'#ffe7a3')));
  add('jacket','copper-armour','Copper chest armour',coat('#aa784d',path('M94 137L120 143 146 137 142 160 120 169 98 160Z','#d5ab73')+line('M120 144V166M99 149H141','#76533f',2)));
  add('jacket','cloud-cardigan','Cloud cardigan',coat('#a8cadd',path('M106 132L120 155 134 132Z','#f7eedb')+line('M120 155V170','#6485a3')+circle(124,162,2,'#6485a3')));
  add('jacket','ember-vest','Ember trail vest',coat('#b95d45',path('M99 135L111 147 99 151ZM141 135L129 147 141 151Z','#edb178')+line('M120 141V170','#673e3c'), 'M90 128L107 136H133L150 128 155 170H85Z'));
  add('jacket','mint-tracksuit','Mint racing jacket',coat('#429f91',line('M80 136L91 151M160 136L149 151M120 136V170','#d9f1bc',4)+path('M90 156H109V164H90ZM131 156H150V164H131Z','#296c76')));
  add('jacket','royal-coat','Royal velvet coat',coat('#745398',path('M97 131L120 146 143 131 143 140 120 157 97 140Z','#e5c76a')+circle(119,161,3,'#f6dda0')));
  add('jacket','coral-waistcoat','Coral festival waistcoat',coat('#da8993',path('M105 134L120 148 135 134Z','#f9dcbe')+path('M90 148L97 141 104 148 97 155ZM136 148L143 141 150 148 143 155Z','#94d0c2'), 'M89 129L105 136H135L151 129 157 169 120 164 83 169Z'));

  const bridge=color=>line('M111 101H129M71 100H79M161 100H169',color,4);
  const lenses=(shape,color,detail='')=>'<g fill="#bce6ef" fill-opacity=".25" stroke="'+color+'" stroke-width="4">'+shape+'</g>'+bridge(color)+detail;
  add('glasses','moon-visor','Lunar visor',path('M75 88H165V115Q120 128 75 115Z','#9ccddd','fill-opacity=".5" stroke="#dae9f4" stroke-width="5"')+line('M85 94H110','#effbff',3));
  add('glasses','copper-goggles','Copper workshop goggles',lenses('<circle cx="95" cy="103" r="17"/><circle cx="145" cy="103" r="17"/>','#ad7845',circle(95,103,10,'#a7c9c9')+circle(145,103,10,'#a7c9c9')));
  add('glasses','snow-goggles','Polar ski goggles',path('M75 89H165L161 116H130L120 109 110 116H79Z','#9ab5e2','fill-opacity=".6" stroke="#f2e8dc" stroke-width="5"')+line('M85 96H105M133 96H152','#fff',2));
  add('glasses','pixel-glasses','Pixel explorer glasses',lenses('<path d="M77 90H112V114H77ZM128 90H163V114H128Z"/>','#65569c',line('M84 96H98M135 96H149','#e5d5ff',3)));
  add('glasses','hex-glasses','Crystal hexagon frames',lenses('<path d="M86 87H103L113 102 103 117H86L76 102ZM137 87H154L164 102 154 117H137L127 102Z"/>','#7cb4ca'));
  add('glasses','cloud-glasses','Cloud frames',lenses('<path d="M78 111Q67 99 80 95Q81 81 96 87Q111 81 113 100Q119 114 100 117H85ZM128 111Q117 99 130 95Q131 81 146 87Q161 81 163 100Q169 114 150 117H135Z"/>','#b8d4e5'));
  add('glasses','ember-aviators','Ember aviators',lenses('<path d="M78 90H112Q114 120 95 119Q76 116 78 90ZM128 90H162Q165 116 145 119Q125 120 128 90Z"/>','#d7a053'));
  add('glasses','mint-sports','Mint racing shades',path('M73 91H167L155 114H132L120 104 108 114H85Z','#77d8c0','fill-opacity=".55" stroke="#286f72" stroke-width="4"')+line('M83 96H103M137 96H157','#e6ffda',2));
  add('glasses','royal-monocle','Royal monocle','<circle cx="145" cy="103" r="18" fill="#dfd1f4" fill-opacity=".25" stroke="#e6c569" stroke-width="4"/>'+line('M159 116Q180 132 164 150','#e6c569',2));
  add('glasses','heart-glasses','Coral heart frames',lenses('<path d="M95 118L78 102Q68 84 86 87L95 94 104 87Q122 84 112 102ZM145 118L128 102Q118 84 136 87L145 94 154 87Q172 84 162 102Z"/>','#d77e92'));
  const slots={hat:'Hat',shoes:'Shoes',jacket:'Jacket',glasses:'Glasses'};
  const get=id=>items.find(item=>item.id===id);
  function layer(outfit,slot){const item=get(outfit?.[slot]);return item?.slot===slot&&item.art?'<g class="pet-cosmetic" data-cosmetic="'+item.id+'" stroke="#263448" stroke-width="2" stroke-linejoin="round">'+item.art+'</g>':'';}
  function preview(item){const box=item.id==='royal-monocle'?'65 78 115 78':{hat:'55 0 135 90',shoes:'45 145 150 48',jacket:'60 120 120 55',glasses:'65 78 110 48'}[item.slot]||'0 0 240 200';return '<svg viewBox="'+box+'" aria-hidden="true" focusable="false">'+layer({[item.slot]:item.id},item.slot)+'</svg>';}
  return {items,slots,get,layer,preview};
})();
