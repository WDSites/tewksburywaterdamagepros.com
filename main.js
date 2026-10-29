(function () {
  var doc = document;
  /* mobile drawer: breakpoint 900px, same number as main.css */
  var t = doc.getElementById('mob-toggle'),
    d = doc.getElementById('mob-drawer'),
    o = doc.getElementById('mob-overlay'),
    c = doc.getElementById('drawer-close');
  function openMenu() {
    d.removeAttribute('hidden');
    o.classList.add('visible');
    t.setAttribute('aria-expanded', 'true');
    t.setAttribute('aria-label', 'Close navigation menu');
    doc.documentElement.style.overflow = 'hidden';
  }
  function closeMenu() {
    d.setAttribute('hidden', '');
    o.classList.remove('visible');
    t.setAttribute('aria-expanded', 'false');
    t.setAttribute('aria-label', 'Open navigation menu');
    doc.documentElement.style.overflow = '';
  }
  if (t && d && o) {
    t.addEventListener('click', function () {
      if (t.getAttribute('aria-expanded') === 'true') { closeMenu(); } else { openMenu(); }
    });
    if (c) { c.addEventListener('click', closeMenu); }
    o.addEventListener('click', closeMenu);
    var links = d.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) { links[i].addEventListener('click', closeMenu); }
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); } });
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 901px)');
      var onChange = function (e) { if (e.matches) { closeMenu(); } };
      if (mq.addEventListener) { mq.addEventListener('change', onChange); } else if (mq.addListener) { mq.addListener(onChange); }
    }
  }
  /* FAQ accordion: max-height toggle */
  var qs = doc.querySelectorAll('.faq-q');
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener('click', function () {
      var item = this.parentNode;
      var isOpen = item.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  /* floating call button hides when the footer is in view */
  var fc = doc.querySelector('.floatcall'), ft = doc.querySelector('.site-footer');
  if (fc && ft && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fc.classList.toggle('hide', en.isIntersecting); });
    }).observe(ft);
  }
})();
