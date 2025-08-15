(function(){
  // Identify English pages by path (not lang attr)
  var EN_PATHS = [
    'index.html','about-en.html','cases-en.html','faq-en.html','reviews-en.html','contact-en.html',
    'police-clearance.html','degree-verification.html','apostille-china.html'
  ];
  function isEnglishPage(){
    var p = (location.pathname.split('/').pop() || '').toLowerCase();
    if(!p) return false;
    if(p.endsWith('-en.html')) return true;
    if(EN_PATHS.indexOf(p)>=0) return true;
    return false;
  }
  if(!isEnglishPage()) return;

  try { document.documentElement.setAttribute('lang','en'); } catch(e){}

  var MAP = [
    {cn: /服务/, en: 'Services'},
    {cn: /外国人?无犯罪记录证明|无犯罪记录证明|无犯罪/, en: 'Police Clearance (PCC)'},
    {cn: /学历验证及认证|学历验证|学历认证/, en: 'Degree Verification'},
    {cn: /文书海牙认证及领事认证|海牙认证及领事认证|海牙认证|领事认证/, en: 'Apostille & Consular Legalization'}
  ];

  var TARGETS = 'a,button,li,span,div';

  function replaceNodeText(node){
    var t = (node.textContent || '').trim();
    if(!t) return;
    for(var i=0;i<MAP.length;i++){
      if(MAP[i].cn.test(t)){
        node.textContent = MAP[i].en;
        // adjust href if anchor
        if(node.tagName === 'A'){
          var en = MAP[i].en;
          if(en.indexOf('Police Clearance')===0) node.setAttribute('href','police-clearance.html');
          if(en.indexOf('Degree Verification')===0) node.setAttribute('href','degree-verification.html');
          if(en.indexOf('Apostille')===0) node.setAttribute('href','apostille-china.html');
        }else{
          // if parent is anchor, set text on parent
          var a = node.closest && node.closest('a');
          if(a){
            a.textContent = node.textContent;
            var en = node.textContent;
            if(en.indexOf('Police Clearance')===0) a.setAttribute('href','police-clearance.html');
            if(en.indexOf('Degree Verification')===0) a.setAttribute('href','degree-verification.html');
            if(en.indexOf('Apostille')===0) a.setAttribute('href','apostille-china.html');
          }
        }
        break;
      }
    }
  }

  function walkAndReplace(root){
    try{
      var nodes = root.querySelectorAll(TARGETS);
      nodes.forEach(replaceNodeText);
    }catch(e){}
  }

  function enforce(){
    try{
      walkAndReplace(document);
      // also specifically ensure top trigger shows Services if any Chinese remains
      var maybeTriggers = Array.prototype.slice.call(document.querySelectorAll('nav a, nav button'));
      maybeTriggers.forEach(function(a){
        var tx = (a.textContent||'').trim();
        if(/服务/.test(tx)) a.textContent = 'Services';
      });
    }catch(e){}
  }

  // Run now and continuously observe
  enforce();
  var mo;
  try{
    mo = new MutationObserver(function(muts){
      enforce();
    });
    mo.observe(document.documentElement, {subtree:true, childList:true, characterData:true});
  }catch(e){}

  // Also re-run periodically (as double safety)
  var i=0;
  var timer = setInterval(function(){
    enforce();
    i++;
    if(i>150){ clearInterval(timer); } // ~30s
  }, 200);
})();
