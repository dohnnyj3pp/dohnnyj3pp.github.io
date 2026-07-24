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
// Reservation panel toggle behaviour
(function(){
  var toggle = document.getElementById('contact-toggle');
  var panel = document.getElementById('reservationPanel');
  var closeBtn = document.getElementById('reservationClose');

  function openPanel(){
    panel.classList.add('active');
    panel.setAttribute('aria-hidden','false');
  }
  function closePanel(){
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden','true');
  }

  if(toggle && panel){
    toggle.addEventListener('click',function(e){
      e.preventDefault();
      if(panel.classList.contains('active')) closePanel(); else openPanel();
    });
  }

  if(closeBtn){
    closeBtn.addEventListener('click', function(){ closePanel(); });
  }

  // close when pressing Escape
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closePanel(); } });

  // close when clicking outside the panel
  document.addEventListener('click', function(e){
    if(!panel.classList.contains('active')) return;
    var inside = e.target.closest && e.target.closest('.reservation');
    var clickedToggle = e.target.closest && e.target.closest('#contact-toggle');
    if(!inside && !clickedToggle) closePanel();
  });

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
