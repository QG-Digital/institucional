// Slider and Accordion JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Testimonials slider
  function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.depoimento-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const maxSlide = slides.length - 1;
    
    // Set initial state
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.classList.remove('active');
      } else {
        slide.classList.add('active');
      }
    });
    
    // Function to change slide
    function goToSlide(index) {
      // Handle wrapping
      if (index < 0) index = maxSlide;
      if (index > maxSlide) index = 0;
      
      // Hide all slides
      slides.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(50px)';
        setTimeout(() => {
          slide.classList.remove('active');
        }, 300);
      });
      
      // Deactivate all dots
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide with animation
      setTimeout(() => {
        slides[index].classList.add('active');
        setTimeout(() => {
          slides[index].style.opacity = '1';
          slides[index].style.transform = 'translateX(0)';
        }, 50);
      }, 300);
      
      // Activate current dot
      dots[index].classList.add('active');
      
      // Update current index
      currentSlide = index;
    }
    
    // Set up click events for controls
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
    
    // Set up click events for dots
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
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      }
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        goToSlide(currentSlide - 1);
      }
    };
    
    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', handleTouchStart, false);
      sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    }
  }
  
  // Initialize testimonials slider
  initTestimonialsSlider();

  // FAQ Accordion
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.faq-item');
    
    if (!accordionItems.length) return;
    
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.faq-question');
      const content = item.querySelector('.faq-answer');
      
      if (!trigger || !content) return;
      
      trigger.addEventListener('click', () => {
        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        trigger.classList.toggle('active');
        
        // Add animation for icon
        const icon = trigger.querySelector('i');
        if (icon) {
          if (item.classList.contains('active')) {
            icon.style.transform = 'rotate(45deg)';
          } else {
            icon.style.transform = 'rotate(0)';
          }
        }
      });
    });
    
    // Open first item by default
    if (accordionItems[0]) {
      setTimeout(() => {
        accordionItems[0].classList.add('active');
        const trigger = accordionItems[0].querySelector('.faq-question');
        if (trigger) {
          trigger.classList.add('active');
          const icon = trigger.querySelector('i');
          if (icon) {
            icon.style.transform = 'rotate(45deg)';
          }
        }
      }, 500);
    }
  }
  
  // Initialize accordion
  initAccordion();

  // Services Filter
  function initServicesFilter() {
    const filterButtons = document.querySelectorAll('.filter-tab');
    const serviceItems = document.querySelectorAll('.servico-item');
    
    if (!filterButtons.length || !serviceItems.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter items with animation
        serviceItems.forEach(item => {
          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 50);
            }, 300);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Initialize services filter
  initServicesFilter();

  // FAQ Category Tabs
  function initFaqTabs() {
    const categoryTabs = document.querySelectorAll('.faq-category');
    const faqGroups = document.querySelectorAll('.faq-group');
    
    if (!categoryTabs.length || !faqGroups.length) return;
    
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get target category
        const targetCategory = tab.getAttribute('data-category');
        
        // Hide all groups with animation
        faqGroups.forEach(group => {
          group.style.transition = 'opacity 0.3s ease';
          group.style.opacity = '0';
          
          setTimeout(() => {
            group.classList.remove('active');
            
            // Show target group
            if (group.getAttribute('data-category') === targetCategory) {
              group.classList.add('active');
              setTimeout(() => {
                group.style.opacity = '1';
                
                // Animate FAQ items
                const faqItems = group.querySelectorAll('.faq-item');
                faqItems.forEach((item, index) => {
                  item.style.transform = 'translateY(20px)';
                  item.style.opacity = '0';
                  item.style.transition = 'transform 0.3s ease ' + (index * 0.1) + 's, opacity 0.3s ease ' + (index * 0.1) + 's';
                  
                  setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                    item.classList.add('animated');
                  }, 100);
                });
              }, 50);
            }
          }, 300);
        });
      });
    });
  }
  
  // Initialize FAQ tabs
  initFaqTabs();

  // Modal Video Handler
  function initModalVideo() {
    const modalButtons = document.querySelectorAll('[data-toggle="modal"]');
    
    if (!modalButtons.length) return;
    
    modalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetModal = document.getElementById(button.getAttribute('data-target'));
        
        if (targetModal) {
          // Show modal
          targetModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          // Handle iframe loading if exists
          const iframe = targetModal.querySelector('iframe');
          if (iframe && !iframe.src.includes('youtube.com')) {
            iframe.src = iframe.getAttribute('data-src') || iframe.src;
          }
        }
      });
    });
    
    // Close modal and stop video
    const modalClose = document.querySelectorAll('.modal-close');
    
    modalClose.forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal-container');
        
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          
          // Stop video if exists
          const iframe = modal.querySelector('iframe');
          if (iframe) {
            const iframeSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
              iframe.src = iframeSrc;
            }, 500);
          }
        }
      });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal-container');
    
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          
          // Stop video if exists
          const iframe = modal.querySelector('iframe');
          if (iframe) {
            const iframeSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
              iframe.src = iframeSrc;
            }, 500);
          }
        }
      });
    });
  }
  
  // Initialize modal video
  initModalVideo();
});