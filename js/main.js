// Main JavaScript File

// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const loader = document.getElementById('loader');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const numberCounters = document.querySelectorAll('.numero-counter');

// Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after page loads
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      
      // Trigger reveal animations after loader disappears
      revealElements();
    }, 500);
  }, 1500);
  
  // Initialize Particles.js for hero background
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
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          animation: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          animation: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
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
  
  // Start counter animation when in viewport
  startCountersOnScroll();
});

// Scroll events
window.addEventListener('scroll', () => {
  // Header background changes on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Reveal elements as they come into view
  revealElements();
  
  // Start counter animation when in viewport
  startCountersOnScroll();
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Back to top button functionality
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

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
      }
    }
  });
});

// Contact form submission (placeholder for actual form handling)
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Simple validation
    let isValid = true;
    const requiredFields = ['nome', 'email', 'mensagem'];
    
    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      if (!formValues[field] || formValues[field].trim() === '') {
        input.style.borderColor = '#dc3545';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (isValid) {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formValues);
      
      // Show success message (placeholder)
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success';
      successMessage.innerHTML = '<i class="fas fa-check-circle alert-icon"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
      
      contactForm.parentNode.insertBefore(successMessage, contactForm);
      contactForm.reset();
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

// Number counter animation
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const step = (target / duration) * 10;
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      clearInterval(timer);
      counter.textContent = target;
    } else {
      counter.textContent = Math.floor(current);
    }
  }, 10);
}

// Start counter animation when elements are in viewport
function startCountersOnScroll() {
  numberCounters.forEach(counter => {
    const position = counter.getBoundingClientRect();
    
    // Check if element is in viewport
    if (position.top >= 0 && position.bottom <= window.innerHeight && !counter.classList.contains('animated')) {
      counter.classList.add('animated');
      animateCounter(counter);
    }
  });
}

// Reveal elements when they enter the viewport
function revealElements() {
  const elements = document.querySelectorAll('.reveal-text, .reveal-top, .reveal-bottom, .reveal-left, .reveal-right, .reveal-scale');
  
  elements.forEach(element => {
    const position = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // If element is in viewport
    if (position.top < windowHeight * 0.85) {
      if (element.classList.contains('reveal-text')) {
        element.classList.add('revealed');
      } else {
        element.classList.add('revealed');
      }
    }
  });
}