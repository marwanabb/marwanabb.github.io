// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
let isDarkMode = true; // Default is dark mode

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  isDarkMode = !isDarkMode;
  
  // Update theme toggle icon
  themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update navigation links
  document.querySelectorAll('.nav-links a, .mobile-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a, .mobile-links a, a.btn, .logo').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        mobileMenu.style.display = 'none';
      }
    }
  });
});

// Add placeholder for profile image if it fails to load
document.querySelector('.profile-image img').addEventListener('error', function() {
  this.src = 'https://via.placeholder.com/400';
});