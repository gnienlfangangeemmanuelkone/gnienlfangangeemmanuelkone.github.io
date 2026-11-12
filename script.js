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