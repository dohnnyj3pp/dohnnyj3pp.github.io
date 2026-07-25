// Modern site JS: nav toggle and simple accessibility helpers
(function(){
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('primary-navigation');
  if(navToggle){
    navToggle.addEventListener('click',function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // Close mobile nav when link clicked
  document.querySelectorAll('.nav-list a').forEach(function(link){
    link.addEventListener('click',function(){
      if(navList.classList.contains('show')) navList.classList.remove('show');
    });
  });

  // Simple focus-visible polyfill for older browsers
  (function(){
    var keyboardMode = false;
    window.addEventListener('keydown',function(e){ if(e.key==="Tab") keyboardMode=true; },true);
    window.addEventListener('mousedown',function(){ keyboardMode=false; },true);
    document.addEventListener('focusin',function(e){ if(keyboardMode){ e.target.classList.add('focus-visible'); } });
    document.addEventListener('focusout',function(e){ e.target.classList.remove('focus-visible'); });
  })();

})();
// Small enhancement: add/remove focused class for inputs to enable JS-driven interactions if needed
(function(){
  var inputs = document.querySelectorAll('.rsvp, .contact-form input, .contact-form textarea');
  inputs.forEach(function(el){
    el.addEventListener('focus', function(){ el.classList.add('is-focused'); });
    el.addEventListener('blur',  function(){ el.classList.remove('is-focused'); });
  });
})();
// Reservation panel toggle behaviour (modal-style to match other modals)
(function(){
  var toggle = document.getElementById('contact-toggle');
  var panel = document.getElementById('reservationPanel');
  var closeBtn = document.getElementById('reservationClose');
  var backdropId = 'reservationBackdrop';

  function createBackdrop(){
    var existing = document.getElementById(backdropId);
    if(existing) return existing;
    var b = document.createElement('div');
    b.id = backdropId;
    b.className = 'modal-backdrop';
    document.body.appendChild(b);
    // allow click on backdrop to close
    b.addEventListener('click', closePanel);
    return b;
  }

  function openPanel(){
    // ensure panel exists
    if(!panel) return;
    createBackdrop().classList.add('open');
    panel.classList.add('modal');
    // small delay to allow DOM paint then open
    requestAnimationFrame(function(){ panel.classList.add('open'); });
    panel.setAttribute('aria-hidden','false');
    // mark contact toggle active
    if(toggle) toggle.classList.add('active');
    // also set body class for modal-open (used for custom cursor if needed)
    document.body.classList.add('has-modal-open');
  }
  function closePanel(){
    if(!panel) return;
    var b = document.getElementById(backdropId);
    if(b) b.classList.remove('open');
    panel.classList.remove('open');
    // remove modal class after transition
    setTimeout(function(){ panel.classList.remove('modal'); if(b && b.parentNode) b.parentNode.removeChild(b); }, 300);
    panel.setAttribute('aria-hidden','true');
    if(toggle) toggle.classList.remove('active');
    document.body.classList.remove('has-modal-open');
  }

  if(toggle && panel){
    toggle.addEventListener('click',function(e){
      e.preventDefault();
      if(panel.classList.contains('open')) closePanel(); else openPanel();
    });
  }

  if(closeBtn){
    closeBtn.addEventListener('click', function(){ closePanel(); });
  }

  // close when pressing Escape
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closePanel(); } });

  // close when clicking outside the panel handled by backdrop click above

})();

// Scrollspy: mark nav items active based on section in view
(function(){
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));
  var sectionLinks = navLinks.filter(function(a){ return a.getAttribute('href') && a.getAttribute('href').indexOf('#')===0 && a.id !== 'contact-toggle'; });

  var sections = sectionLinks.map(function(a){ var id = a.getAttribute('href').slice(1); return document.getElementById(id); }).filter(Boolean);
  var linkById = {};
  sectionLinks.forEach(function(a){ linkById[a.getAttribute('href').slice(1)] = a; });

  function clearActive(){ navLinks.forEach(function(a){ a.classList.remove('active'); }); }
  function setActiveById(id){ clearActive(); var a = linkById[id]; if(a) a.classList.add('active'); }

  // IntersectionObserver to detect section in view
  if(window.IntersectionObserver && sections.length){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          setActiveById(entry.target.id);
        }
      });
    },{ root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    sections.forEach(function(s){ observer.observe(s); });
  }

  // clicking a nav link sets active (and smooth-scroll behavior for internal links)
  navLinks.forEach(function(a){
    var href = a.getAttribute('href') || '';
    if(href.indexOf('#')===0 && href.length>1){
      a.addEventListener('click', function(e){
        e.preventDefault();
        var target = document.getElementById(href.slice(1));
        if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); setActiveById(target.id); }
        // close mobile nav if open
        var navList = document.getElementById('primary-navigation'); if(navList && navList.classList.contains('show')) navList.classList.remove('show');
      });
    }
  });

  // Make CONTACT toggle set active state while open
  var contactToggle = document.getElementById('contact-toggle');
  var panel = document.getElementById('reservationPanel');
  if(contactToggle && panel){
    contactToggle.addEventListener('click', function(){
      if(panel.classList.contains('active')){ contactToggle.classList.remove('active'); }
      else{ clearActive(); contactToggle.classList.add('active'); }
    });
    // when panel closes via other means, remove active from contact-toggle
    var closePanelObserver = new MutationObserver(function(){ if(!panel.classList.contains('active')) contactToggle.classList.remove('active'); });
    closePanelObserver.observe(panel, { attributes:true, attributeFilter:['class'] });
  }
})();
// Modal handling and intro flow
(function(){
  // Open modal by id, manage aria-hidden and focus
  function openModal(id){
    var m = document.getElementById(id);
    if(!m) return;
    m.setAttribute('aria-hidden','false');
    var focusable = m.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if(focusable) focusable.focus();
  }
  function closeModal(m){
    if(!m) return;
    m.setAttribute('aria-hidden','true');
  }

  // Attach modal triggers from nav
  document.querySelectorAll('.nav-list a[data-modal]').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var id = a.getAttribute('data-modal');
      if(id) openModal(id);
    });
  });

  // Fallback: if nav links use href #home etc, map to modal ids
  document.querySelectorAll('.nav-list a[href^="#"]').forEach(function(a){
    var href = a.getAttribute('href');
    if(!href || href.length<=1) return;
    var modalId = 'modal-' + href.slice(1);
    a.addEventListener('click', function(e){
      e.preventDefault();
      openModal(modalId);
    });
  });

  // close buttons and outside clicks
  document.querySelectorAll('.modal').forEach(function(m){
    m.addEventListener('click', function(e){
      if(e.target === m){ closeModal(m); }
    });
    var btn = m.querySelector('.modal-close');
    if(btn) btn.addEventListener('click', function(){ closeModal(m); });
  });

  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ document.querySelectorAll('.modal[aria-hidden="false"]').forEach(function(m){ closeModal(m); }); } });

  // Intro enter
  var enter = document.getElementById('enterSite');
  var intro = document.getElementById('intro');
  var siteRoot = document.getElementById('site-root');
  if(enter && intro && siteRoot){
    // Delay sequence: show intro-inner elements after a short delay so video begins
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced){
      setTimeout(function(){ document.querySelector('.intro-inner').classList.add('show'); }, 500);
    } else {
      document.querySelector('.intro-inner').classList.add('show');
    }

    enter.addEventListener('click', function(){
      // hide intro with fade
      intro.style.opacity = '0';
      intro.setAttribute('aria-hidden','true');
      siteRoot.classList.remove('hidden');
      setTimeout(function(){ intro.style.display='none'; }, 550);
    });
  }
})();

/* Custom cursor: dot + trailing ring that reacts to hover on clickable elements */
(function(){
  try{
    if(('ontouchstart' in window) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) return; // don't enable on touch
    var dot = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    if(!dot || !ring) return;

    document.body.classList.add('custom-cursor-enabled');

    var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    var visible = false;
    var lastMove = 0;

    function onPointerMove(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = 'translate('+mouseX+'px, '+mouseY+'px) translate(-50%,-50%)';
      // ensure visible
      if(!visible){ dot.style.opacity='1'; ring.style.opacity='1'; visible=true; }
      lastMove = Date.now();
    }

    window.addEventListener('pointermove', onPointerMove, {passive:true});

    // trailing ring animation (lerp)
    function raf(){
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = 'translate('+ringX+'px, '+ringY+'px) translate(-50%,-50%)';
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hover states for clickable elements
    var clickables = document.querySelectorAll('a, button, input[type="submit"], [role="button"]');
    clickables.forEach(function(el){
      el.addEventListener('pointerenter', function(){ document.body.classList.add('cursor-hover'); });
      el.addEventListener('pointerleave', function(){ document.body.classList.remove('cursor-hover'); });
      el.addEventListener('pointerdown', function(){ document.body.classList.add('cursor-down'); });
      el.addEventListener('pointerup', function(){ document.body.classList.remove('cursor-down'); });
    });

    // hide when not moving for a while
    setInterval(function(){ if(Date.now() - lastMove > 2200){ dot.style.opacity='0'; ring.style.opacity='0'; visible=false; } }, 1000);

  }catch(e){ console.error('cursor init error', e); }
})();
