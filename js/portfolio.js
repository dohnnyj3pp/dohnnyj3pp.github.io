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
