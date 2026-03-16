    // ============ PAGE NAVIGATION ============
    function showPage(page) {
      // Hide all pages
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      // Show target page
      const target = document.getElementById(page + '-page');
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // Update nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
      });
      // Close mobile menu
      document.getElementById('navLinks').classList.remove('open');
    }

    // ============ MOBILE MENU ============
    document.getElementById('menuToggle').addEventListener('click', function() {
      document.getElementById('navLinks').classList.toggle('open');
    });

    // ============ HEADER SCROLL ============
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // ============ FAQ ACCORDION ============
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) item.classList.add('open');
      });
    });

    // ============ SCROLL ANIMATIONS ============
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ============ CONTACT FORM ============
    document.getElementById('contatoForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const whatsapp = document.getElementById('whatsapp').value;
      const interesse = document.getElementById('interesse').value;
      const mensagem = document.getElementById('mensagem').value;

      const texto = `Olá! Sou ${nome}.\n\nInteresse: ${interesse || 'Não especificado'}\n\n${mensagem}`;
      const url = `https://wa.me/5543996349824?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    });

    // ============ TYPING ANIMATION ============
    // A animação agora é controlada puramente via CSS para evitar quebra de layout
    const typing = document.querySelector('.wpp-typing');
    if (typing) {
      typing.style.display = 'flex';
    }

    // ============ COUNTER ANIMATION ============
    function animateCounter(el, target, suffix = '') {
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 25);
    }
