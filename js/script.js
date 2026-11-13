// menu mobile
document.getElementById('menuToggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () { document.getElementById('navLinks').classList.remove('open'); });
});

// cabeçalho ao rolar
window.addEventListener('scroll', function () {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

// perguntas frequentes
document.querySelectorAll('.faq-question').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = this.closest('.faq-item');
    var aberto = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
    if (!aberto) item.classList.add('open');
  });
});

// animação de entrada
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () { entry.target.classList.add('visible'); }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(function (el) { observer.observe(el); });

// item ativo do menu conforme a rolagem
var secoes = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
var links = document.querySelectorAll('.nav-links a.nav-link[href^="#"]');
function marcarMenu() {
  var y = window.scrollY + 140, atual = 'topo';
  secoes.forEach(function (s) { if (s.offsetTop <= y) atual = s.id; });
  if (window.scrollY < 200) atual = 'topo';
  links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + atual); });
}
window.addEventListener('scroll', marcarMenu);
marcarMenu();
