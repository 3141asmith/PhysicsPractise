/* One router controls the three study panels, including bookmarks and Back. */
const GCSEViews=(()=>{
  function render(){
    const name=location.hash.slice(1).split('/')[0],view=['notes','challenge'].includes(name)?name:'practice';
    for(const v of ['practice','notes','challenge']){
      document.getElementById('gcse-'+v+'-view').hidden=v!==view;
      document.getElementById('gcse-'+v+'-tab').setAttribute('aria-current',v===view?'page':'false');
    }
    if(view==='notes')GCSENotes.open();
    else if(view==='challenge')GCSEChallenge.activate();
    else GCSEPractice.refresh();
  }
  function show(path){history.pushState(null,'',location.pathname+location.search+'#'+path);render();}
  document.addEventListener('DOMContentLoaded',()=>{
    for(const v of ['practice','notes','challenge'])document.getElementById('gcse-'+v+'-tab').onclick=()=>show(v);
    window.addEventListener('hashchange',render);window.addEventListener('popstate',render);
    render();
  });
  return {show};
})();
