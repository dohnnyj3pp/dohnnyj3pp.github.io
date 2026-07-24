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
