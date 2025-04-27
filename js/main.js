// Main JavaScript for QG.Digital Website

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const faqItems = document.querySelectorAll('.faq-item');
const detailButtons = document.querySelectorAll('.btn-outline');

// Video URLs for each system
const systemVideos = {
  'pesquisador': 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
  'barra-lateral': 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
  'telegram': 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3'
};

// Header Scroll Effect
function scrollHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('open');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Close Mobile Menu
function closeMobileMenu() {
  mobileMenuBtn.classList.remove('open');
  navMenu.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// FAQ Accordion
function toggleFaq(e) {
  const faqItem = this;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  faqItems.forEach(item => {
    item.classList.remove('active');
    item.querySelector('.faq-question').classList.remove('active');
  });
  
  // If clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add('active');
    faqItem.querySelector('.faq-question').classList.add('active');
  }
}

// Modal Functions
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="video-container">
        <iframe frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.querySelector('iframe').src = '';
    modal.classList.remove('active');
  });
  
  return modal;
}

function showVideoModal(videoUrl) {
  const modal = document.querySelector('.modal') || createModal();
  const iframe = modal.querySelector('iframe');
  iframe.src = videoUrl;
  modal.classList.add('active');
}

// Handle system detail buttons
function handleDetailClick(e) {
  const button = e.target;
  const card = button.closest('.sistema-card');
  const systemType = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
  
  if (systemVideos[systemType]) {
    showVideoModal(systemVideos[systemType]);
  }
}

// Scroll Reveal Effect for Elements
function revealElements() {
  const elementsToReveal = document.querySelectorAll('.section-header, .sistema-card, .diferencial-item, .valor-card');
  
  elementsToReveal.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 50) {
      element.classList.add('fade-in');
    }
  });
}

// Event Listeners
window.addEventListener('load', () => {
  // Initialize header state
  scrollHeader();
  
  // Add event listeners
  window.addEventListener('scroll', scrollHeader);
  window.addEventListener('scroll', revealElements);
  
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  faqItems.forEach(item => {
    item.addEventListener('click', toggleFaq);
  });
  
  detailButtons.forEach(button => {
    button.addEventListener('click', handleDetailClick);
  });
  
  // Initial reveal check for elements already in viewport
  revealElements();
});