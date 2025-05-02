// Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Loader animation
  setTimeout(function() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1500);

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('show') && !event.target.closest('nav')) {
      navLinks.classList.remove('show');
    }
  });

  // Sticky header
  const header = document.getElementById('header');
  
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Initial check
  
  // Back to top button
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
          }
        }
      }
    });
  });

  // Number counter animation
  const counterElements = document.querySelectorAll('.numero-counter');
  
  function animateCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // ms
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
          counter.classList.add('counted');
        }
      };
      
      updateCounter();
    });
  }

  // Intersection Observer for scroll animations
  const animatedElements = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right, .reveal-text');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        
        // If it's a counter, animate it
        if (entry.target.classList.contains('numero-item')) {
          animateCounters();
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
  });

  // Also observe counter items
  document.querySelectorAll('.numero-item').forEach(item => {
    observer.observe(item);
  });

  // Initialize particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  // Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('mensagem').value;
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      // Simulate Ajax request
      setTimeout(function() {
        // Reset form
        contactForm.reset();
        
        // Show success message
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
        
        formGroup.appendChild(alert);
        contactForm.appendChild(formGroup);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Remove success message after 5 seconds
        setTimeout(function() {
          contactForm.removeChild(formGroup);
        }, 5000);
      }, 2000);
    });
  }

  // Modal handling
  const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
  const modalContainers = document.querySelectorAll('.modal-container');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  
  if (modalButtons) {
    modalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetModal = button.getAttribute('data-target');
        const modal = document.getElementById(targetModal);
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }
  
  if (modalCloseButtons) {
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal-container');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }
  
  if (modalContainers) {
    modalContainers.forEach(container => {
      container.addEventListener('click', (e) => {
        if (e.target === container) {
          container.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      if (!email) {
        alert('Por favor, informe seu e-mail.');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        newsletterForm.reset();
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
        
        alert('Obrigado por se inscrever em nossa newsletter!');
      }, 1500);
    });
  }

  // FAQ accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (faqQuestions) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const parent = question.parentElement;
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== parent) {
            item.classList.remove('active');
            const q = item.querySelector('.faq-question');
            if (q) q.classList.remove('active');
          }
        });
        
        // Toggle current FAQ
        parent.classList.toggle('active');
        question.classList.toggle('active');
      });
    });
  }

  // FAQ Categories (if on FAQ page)
  const faqCategories = document.querySelectorAll('.faq-category');
  if (faqCategories.length > 0) {
    faqCategories.forEach(category => {
      category.addEventListener('click', () => {
        // Remove active class from all categories
        faqCategories.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Hide all FAQ groups
        document.querySelectorAll('.faq-group').forEach(group => {
          group.classList.remove('active');
        });
        
        // Show the corresponding FAQ group
        const targetGroup = document.querySelector(`.faq-group[data-category="${category.dataset.category}"]`);
        if (targetGroup) {
          targetGroup.classList.add('active');
          
          // Animate FAQ items
          const faqItems = targetGroup.querySelectorAll('.faq-item');
          faqItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animated');
            }, index * 100);
          });
        }
      });
    });
  }

  // Services filter (if on Services page)
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get filter value
        const filter = tab.getAttribute('data-filter');
        
        // Filter items
        document.querySelectorAll('.servico-item').forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Form file input enhancement
  const fileInputs = document.querySelectorAll('input[type="file"]');
  if (fileInputs) {
    fileInputs.forEach(input => {
      const label = input.nextElementSibling;
      const labelVal = label ? label.innerHTML : '';
      
      input.addEventListener('change', (e) => {
        let fileName = '';
        
        if (input.files && input.files.length > 1) {
          fileName = (input.getAttribute('data-multiple-caption') || '{count} arquivos selecionados').replace('{count}', input.files.length);
        } else if (e.target.value) {
          fileName = e.target.value.split('\\').pop();
        }
        
        if (fileName && label) {
          label.innerHTML = fileName;
        } else if (label) {
          label.innerHTML = labelVal;
        }
      });
    });
  }

  // Configurações dos bots do Telegram
  const telegramConfig = {
    trabalheConosco: {
      botToken: '7614453414:AAGipAxDosslP9-AeGsa4HRHqEMc5YYjEDA',
      chatId: '5581669828'
    },
    faleConosco: {
      botToken: '7808898649:AAFn3a2nKfdyg4DW6g4V1XGcUMlLzlkoMu0',
      chatId: '5581669828'
    }
  };

  // Função para enviar mensagem para o Telegram
  async function sendToTelegram(botToken, chatId, message) {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar para Telegram:', error);
      return null;
    }
  }

  // Formulário Trabalhe Conosco
  const talentoForm = document.getElementById('talentoForm');
  if (talentoForm) {
    talentoForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      
      // Coletar dados do formulário
      const formData = new FormData(this);
      const nome = formData.get('nome');
      const idade = formData.get('idade');
      const cidade = formData.get('cidade');
      const uf = formData.get('uf');
      const mensagem = formData.get('mensagem');
      
      // Criar mensagem para o Telegram
      const telegramMessage = `
<b>NOVA CANDIDATURA - TRABALHE CONOSCO</b>

<b>Nome:</b> ${nome}
<b>Idade:</b> ${idade}
<b>Localização:</b> ${cidade}/${uf}

<b>Mensagem:</b>
${mensagem}
      `;
      
      // Enviar para o Telegram
      const result = await sendToTelegram(
        telegramConfig.trabalheConosco.botToken,
        telegramConfig.trabalheConosco.chatId,
        telegramMessage
      );
      
      if (result && result.ok) {
        // Mostrar mensagem de sucesso no próprio formulário
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Candidatura enviada com sucesso! Entraremos em contato em breve.';
        
        // Inserir antes do botão de submit
        const submitContainer = submitBtn.parentElement;
        submitContainer.insertBefore(successDiv, submitBtn);
        
        // Resetar formulário
        this.reset();
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
          successDiv.remove();
        }, 5000);
      } else {
        alert('Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
      }
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  }

  // Formulário Fale Conosco (presente no footer)
  const footerForms = document.querySelectorAll('.footer-form');
  if (footerForms.length) {
    footerForms.forEach(form => {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Coletar dados do formulário
        const nome = this.querySelector('input[type="text"]').value;
        const telefone = this.querySelector('input[type="tel"]').value;
        const mensagem = this.querySelector('textarea').value;
        
        // Criar mensagem para o Telegram
        const telegramMessage = `
<b>NOVA MENSAGEM - FALE CONOSCO</b>

<b>Nome:</b> ${nome}
<b>Telefone:</b> ${telefone}

<b>Mensagem:</b>
${mensagem}
        `;
        
        // Enviar para o Telegram
        const result = await sendToTelegram(
          telegramConfig.faleConosco.botToken,
          telegramConfig.faleConosco.chatId,
          telegramMessage
        );
        
        if (result && result.ok) {
          // Mostrar mensagem de sucesso
          const successDiv = document.createElement('div');
          successDiv.className = 'form-success-message';
          successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
          
          // Inserir no formulário
          this.appendChild(successDiv);
          
          // Resetar formulário
          this.reset();
          
          // Remover mensagem após 5 segundos
          setTimeout(() => {
            successDiv.remove();
          }, 5000);
        } else {
          alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.');
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  }

  // Job application forms (alternativo)
  const jobForms = document.querySelectorAll('.trabalhe-form');
  if (jobForms.length > 0) {
    jobForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
          // Mostrar mensagem de sucesso
          const successDiv = document.createElement('div');
          successDiv.className = 'form-success-message';
          successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Sua candidatura foi enviada com sucesso! Em breve entraremos em contato.';
          
          // Inserir no formulário
          form.appendChild(successDiv);
          
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // Remover mensagem após 5 segundos
          setTimeout(() => {
            successDiv.remove();
          }, 5000);
          
          // If in a modal, close it
          const modal = form.closest('.modal-container');
          if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 2000);
      });
    });
  }
});