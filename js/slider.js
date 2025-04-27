// Testimonial Slider Functionality

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial slider
  initTestimonialSlider();
  
  // FAQ accordion
  initFaqAccordion();
});

// Initialize Testimonial Slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.depoimento-slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.slider-arrow.prev');
  const nextButton = document.querySelector('.slider-arrow.next');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Show the current slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide and activate current dot
    slides[index].classList.add('active');
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentSlide = index;
  }
  
  // Navigate to the next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) {
      next = 0;
    }
    showSlide(next);
  }
  
  // Navigate to the previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) {
      prev = slides.length - 1;
    }
    showSlide(prev);
  }
  
  // Start auto-slide
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  }
  
  // Stop auto-slide
  function stopSlideInterval() {
    clearInterval(slideInterval);
  }
  
  // Event listeners for navigation controls
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopSlideInterval();
      startSlideInterval();
    });
  });
  
  // Mouse events for slider container
  const sliderContainer = document.querySelector('.depoimentos-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlideInterval);
    sliderContainer.addEventListener('mouseleave', startSlideInterval);
  }
  
  // Swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    // Detect swipe direction
    if (touchEndX < touchStartX) {
      // Swipe left: next slide
      nextSlide();
    } else if (touchEndX > touchStartX) {
      // Swipe right: previous slide
      prevSlide();
    }
    
    // Reset auto-slide timer
    stopSlideInterval();
    startSlideInterval();
  }
  
  // Initialize the slider
  showSlide(0);
  startSlideInterval();
}

// Initialize FAQ Accordion
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // Toggle active class on the question
      question.classList.toggle('active');
      
      // Toggle answer visibility
      const answer = question.nextElementSibling;
      if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.querySelector('i').classList.replace('fa-plus', 'fa-minus');
      } else {
        answer.style.maxHeight = '0';
        question.querySelector('i').classList.replace('fa-minus', 'fa-plus');
      }
      
      // Close other opened items
      faqQuestions.forEach(q => {
        if (q !== question && q.classList.contains('active')) {
          q.classList.remove('active');
          q.nextElementSibling.style.maxHeight = '0';
          q.querySelector('i').classList.replace('fa-minus', 'fa-plus');
        }
      });
    });
  });
}