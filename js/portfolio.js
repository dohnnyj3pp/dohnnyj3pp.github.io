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

// Intro enter (simplified for page-based navigation)
(function(){
  var enter = document.getElementById('enterSite');
  var intro = document.getElementById('intro');
  var siteRoot = document.getElementById('site-root');
  if(enter && intro && siteRoot){
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced){
      setTimeout(function(){ var inner = document.querySelector('.intro-inner'); if(inner) inner.classList.add('show'); }, 500);
    } else {
      var inner = document.querySelector('.intro-inner'); if(inner) inner.classList.add('show');
    }

    enter.addEventListener('click', function(){
      // Move the intro video out so it remains playing in the page background
      try{
        var video = document.getElementById('introVideo');
        if(video){
          video.classList.add('fixed-bg-video');
          document.body.appendChild(video);
        }
      }catch(e){console.warn('move video failed', e);}      

      // Hide the intro overlay so it no longer blocks the page
      intro.style.opacity = '0';
      intro.setAttribute('aria-hidden','true');
      setTimeout(function(){ try{ intro.style.display='none'; }catch(e){} }, 420);

      // show the site content (site-root) that now contains the Home content
      siteRoot.classList.remove('hidden');
      siteRoot.classList.add('open');
      siteRoot.setAttribute('aria-hidden','false');
      try{ var focusable = siteRoot.querySelector('h3, [tabindex], button, a'); if(focusable) focusable.focus(); }catch(e){console.warn('focus site-root failed', e);}      
      document.body.classList.add('site-open');
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
      ringX += (mouseX - ringX) * 0.5;
      ringY += (mouseY - ringY) * 0.5;
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

    // hide when not moving for a short time
    setInterval(function(){ if(Date.now() - lastMove > 1200){ dot.style.opacity='0'; ring.style.opacity='0'; visible=false; } }, 600);

  }catch(e){ console.error('cursor init error', e); }
})();
