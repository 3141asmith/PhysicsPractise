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
  const slots={hat:'Hat',shoes:'Shoes',jacket:'Jacket',glasses:'Glasses'};
  const get=id=>items.find(item=>item.id===id);
  function layer(outfit,slot){const item=get(outfit?.[slot]);return item?.slot===slot&&item.art?'<g class="pet-cosmetic" data-cosmetic="'+item.id+'" stroke="#263448" stroke-width="2" stroke-linejoin="round">'+item.art+'</g>':'';}
  function preview(item){const box={hat:'55 0 135 90',shoes:'45 145 150 48',jacket:'60 120 120 55',glasses:'65 78 110 48'}[item.slot]||'0 0 240 200';return '<svg viewBox="'+box+'" aria-hidden="true" focusable="false">'+layer({[item.slot]:item.id},item.slot)+'</svg>';}
  return {items,slots,get,layer,preview};
})();
