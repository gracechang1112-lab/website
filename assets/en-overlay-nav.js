
(function(){
  // Apply only on EN pages by path
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

  document.documentElement.setAttribute('lang','en');

  // Try to visually hide the original top nav/header (without reflow)
  try {
    var hdr = document.querySelector('header') || document.querySelector('nav');
    if(hdr){
      hdr.style.opacity = '0';
      hdr.style.pointerEvents = 'none';
    }
  } catch(e){}

  // Build overlay nav
  var html = `
  <style id="enOverlayNavStyle">
    .en-overlay-nav{position:fixed;z-index:99999;top:0;left:0;right:0;height:64px;background:#0b1320;color:#fff;display:flex;
      align-items:center;justify-content:space-between;padding:0 24px;box-shadow:0 2px 6px rgba(0,0,0,.2);font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial;}
    .en-overlay-left{display:flex;align-items:center;gap:28px;}
    .en-brand{font-weight:700;font-size:20px;white-space:nowrap;}
    .en-nav{display:flex;align-items:center;gap:24px;}
    .en-nav a{color:#fff;text-decoration:none;font-size:18px;opacity:.92}
    .en-nav a:hover{opacity:1}
    .en-pill{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:24px;background:#009b9b;color:#fff;font-weight:700;}
    .en-lang{display:flex;gap:12px;align-items:center;}
    .en-lang a{color:#fff;text-decoration:none;opacity:.9}
    .en-dropdown{position:relative;}
    .en-drop-btn{cursor:pointer}
    .en-menu{position:absolute;top:44px;left:0;background:#2a2f39;border-radius:12px;min-width:340px;padding:14px 18px;display:none;box-shadow:0 10px 30px rgba(0,0,0,.35);}
    .en-menu a{display:block;padding:10px 6px;font-size:16px;color:#fff;border-radius:8px;}
    .en-menu a:hover{background:rgba(255,255,255,.08)}
    .en-dropdown:hover .en-menu{display:block}
    /* push page down to avoid overlap */
    body{margin-top:64px !important;}
    @media (max-width:900px){
      .en-nav{gap:16px}
      .en-brand{font-size:18px}
      .en-menu{min-width:260px}
    }
  </style>
  <div class="en-overlay-nav" role="navigation" aria-label="Main">
    <div class="en-overlay-left">
      <div class="en-brand"><a href="index.html" style="color:#fff;text-decoration:none">Global EDU Offer Limited</a></div>
      <div class="en-nav">
        <a href="index.html">Home</a>
        <div class="en-dropdown">
          <a class="en-drop-btn">Services ▾</a>
          <div class="en-menu">
            <a href="police-clearance.html">Police Clearance (PCC)</a>
            <a href="degree-verification.html">Degree Verification</a>
            <a href="apostille-china.html">Apostille & Consular Legalization</a>
          </div>
        </div>
        <a href="cases-en.html">Cases</a>
        <a href="about-en.html">About</a>
        <a href="faq-en.html">FAQ</a>
        <a href="reviews-en.html">Reviews</a>
        <a href="contact-en.html">Contact</a>
      </div>
    </div>
    <div class="en-lang">
      <a href="index-zh.html">中文</a>
      <div class="en-pill">EN</div>
    </div>
  </div>`;

  var wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.prepend(wrap);
})();
