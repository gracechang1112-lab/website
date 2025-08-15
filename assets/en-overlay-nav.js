(function () {
  function txt(el) { return (el && (el.textContent||'').trim()) || ''; }
  function setTxt(el, s){ if(!el) return; el.textContent=s; }
  function setTxtHTML(el, s){ if(!el) return; el.innerHTML=s; }
  function includesZh(t){ return /[\u4e00-\u9fa5]/.test(t||''); }

  function rewriteNav(){
    const nav = document.querySelector('nav') || document.querySelector('header') || document;
    if(!nav) return;

    const mapping = [
      {zh:/^首页$|Home\s*$/, en:'Home'},
      {zh:/^服务$|^服务：?$/, en:'Services'},
      {zh:/^案例$|^案例集$/, en:'Cases'},
      {zh:/^关于$|^关于我们$/, en:'About'},
      {zh:/^常见问题$|^常见问答$|^FAQ$/, en:'FAQ'},
      {zh:/^客户评价$|^评价$|^口碑$/, en:'Reviews'},
      {zh:/^联系$|^联系我们$|^联络$/, en:'Contact'}
    ];

    // Top-level nav links
    const anchors = nav.querySelectorAll('a,button');
    anchors.forEach(a=>{
      const t = txt(a);
      mapping.forEach(m=>{
        if (m.zh.test(t)) setTxt(a, m.en);
      });
      // Also sanitize the language pills if needed
      if (/^中文$/.test(t)) setTxt(a, '中文');
      if (/^EN$/.test(t)) setTxt(a, 'EN');
    });

    // Services dropdown (common text seen in screenshots)
    const svcItems = [
      {zh:/外国人无犯罪记录证明/, en:'Police Clearance (PCC)'},
      {zh:/学历验证及认证|学位验证|学历认证/, en:'Degree Verification'},
      {zh:/海牙认证|领事认证|文书海牙认证及领事认证/, en:'Apostille & Consular Legalization'}
    ];

    const dropdown = nav.querySelectorAll('a, li, button, span');
    dropdown.forEach(el=>{
      const t = txt(el);
      svcItems.forEach(mi=>{
        if(mi.zh.test(t)) setTxt(el, mi.en);
      });
    });
  }

  // Run after DOM ready & also after a tick (for late render)
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', rewriteNav);
  } else {
    rewriteNav();
  }
  setTimeout(rewriteNav, 400);
  setTimeout(rewriteNav, 1200);
})();
