// Animations JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Animate logo on load
  const logoAnimation = document.querySelector('.logo-animation');
  if (logoAnimation) {
    logoAnimation.style.opacity = '0';
    setTimeout(() => {
      logoAnimation.style.opacity = '1';
      logoAnimation.style.animation = 'logoAnimation 1s ease forwards';
    }, 300);
  }

  // Animate elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add('animated');
      }
    });
  }

  // Initialize all elements with animation classes
  function initAnimations() {
    const elements = document.querySelectorAll('.reveal-bottom, .reveal-left, .reveal-right, .reveal-text, .reveal-zoom');
    
    elements.forEach((element, index) => {
      // Add animate-on-scroll class
      element.classList.add('animate-on-scroll');
      
      // Initial state before animation
      if (element.classList.contains('reveal-bottom')) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
      } else if (element.classList.contains('reveal-left')) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
      } else if (element.classList.contains('reveal-right')) {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
      } else if (element.classList.contains('reveal-text')) {
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
      } else if (element.classList.contains('reveal-zoom')) {
        element.style.transform = 'scale(0.9)';
        element.style.opacity = '0';
      }
    });
    
    // Run animation check once on load
    animateOnScroll();
  }

  // Run animation check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Initialize animations
  initAnimations();

  // Counter animations
  function animateCounters() {
    const counters = document.querySelectorAll('.numero-counter');
    const speed = 200;
    
    counters.forEach(counter => {
      if (!counter.classList.contains('counted')) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCounters, 1);
        } else {
          counter.innerText = target;
          counter.classList.add('counted');
        }
      }
    });
  }

  // Create intersection observer for counters
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.numero-counter');
        if (counter && !counter.classList.contains('counted')) {
          counter.innerText = '0';
          setTimeout(animateCounters, 400);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Observe counter elements
  document.querySelectorAll('.numero-item').forEach(counter => {
    counterObserver.observe(counter);
  });

  // Animate floating elements
  function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-badge, .experience-badge');
    
    floatingElements.forEach(element => {
      element.style.animation = 'float 3s ease-in-out infinite';
    });
  }
  
  initFloatingElements();

  // Setup testimonial animation
  function initTestimonialSlider() {
    const slides = document.querySelectorAll('.depoimento-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const maxSlide = slides.length - 1;
    
    // Function to change slide
    function goToSlide(index) {
      // Validate index
      if (index < 0) index = maxSlide;
      if (index > maxSlide) index = 0;
      
      // Deactivate all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Activate current slide and dot
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      
      currentSlide = index;
    }
    
    // Event listeners for controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.depoimentos-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, 5000);
      });
    }
  }
  
  initTestimonialSlider();

  // Animate FAQ items
  function animateFaqItems() {
    const faqItems = document.querySelectorAll('.faq-group.active .faq-item');
    
    faqItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animated');
      }, index * 100);
    });
  }
  
  animateFaqItems();

  // Animate services on filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        const items = document.querySelectorAll('.servico-item');
        
        // Reset animations
        items.forEach(item => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
        });
        
        // Animate filtered items
        setTimeout(() => {
          items.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.display = 'block';
              }, index * 100);
            } else {
              item.style.display = 'none';
            }
          });
        }, 300);
      });
    });
  }

  // Animated typing effect for hero section
  function setupTypingEffect() {
    const heroTitle = document.querySelector('.hero h2');
    
    if (heroTitle && window.innerWidth > 768) {
      const text = heroTitle.textContent;
      heroTitle.innerHTML = '';
      heroTitle.style.borderRight = '0.08em solid #fa8700';
      
      let charIndex = 0;
      
      function type() {
        if (charIndex < text.length) {
          heroTitle.innerHTML += text.charAt(charIndex);
          charIndex++;
          setTimeout(type, 50);
        } else {
          heroTitle.style.borderRight = 'none';
        }
      }
      
      // Slight delay before starting
      setTimeout(type, 500);
    }
  }
  
  // Only use typing effect on homepage
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    //setupTypingEffect();
  }

  // Timeline scrolling animations
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      timelineItems.forEach(item => {
        observer.observe(item);
      });
    }
  }
  
  initTimelineAnimations();

  // Animate process items
  function animateProcessItems() {
    const items = document.querySelectorAll('.processo-item');
    
    if (items.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, Array.from(items).indexOf(entry.target) * 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      items.forEach(item => {
        observer.observe(item);
      });
    }
  }
  
  animateProcessItems();

  // Modal animations
  function setupModalAnimations() {
    const modals = document.querySelectorAll('.modal-container');
    
    modals.forEach(modal => {
      modal.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity' && modal.style.opacity === '0') {
          modal.style.visibility = 'hidden';
        }
      });
    });
  }
  
  setupModalAnimations();

  // Animated badges
  function setupBadgeAnimations() {
    const badges = document.querySelectorAll('.badge-primary, .badge-secondary, .badge-info');
    
    badges.forEach(badge => {
      badge.style.transition = 'transform 0.3s ease';
      
      badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.1)';
      });
      
      badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1)';
      });
    });
  }
  
  setupBadgeAnimations();

  // Logo span animation
  function setupLogoAnimation() {
    const logoSpan = document.querySelector('.logo span');
    
    if (logoSpan) {
      logoSpan.style.display = 'inline-block';
      logoSpan.style.animation = 'pulse 2s infinite';
    }
  }
  
  setupLogoAnimation();
});