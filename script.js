(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Aperçu des certificats : page entière, sans barre d'outils
  document.querySelectorAll('object[type="application/pdf"]').forEach(function (o) {
    var url = o.getAttribute('data').split('#')[0];
    o.setAttribute('data', url + '#view=Fit&toolbar=0&navpanes=0&scrollbar=0');
  });

  // Les blocs remontent quand ils arrivent à l'écran
  var items = document.querySelectorAll('.head, .card');
  items.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.setProperty('--d', (i % 3) * 0.12 + 's');
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
// barre de progression
var bar = document.createElement('div');
bar.className = 'progress';
document.body.appendChild(bar);
function onScroll() {
  var h = document.documentElement;
  var p = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
  bar.style.transform = 'scaleX(' + p + ')';
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// lien actif selon la section visible
var links = document.querySelectorAll('.nav a[href^="#"]');
var spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(function (a) {
  var s = document.querySelector(a.getAttribute('href'));
  if (s) spy.observe(s);
});