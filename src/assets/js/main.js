// Mobile Navigation Toggle
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  // Toggle Navigation
  if (burger) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');

      // Animate Links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });

      // Burger Animation
      burger.classList.toggle('toggle');
    });
  }
};

// Smooth Scrolling for Navigation Links
const smoothScroll = () => {
  const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if the link is an anchor link
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          const mobileNav = document.querySelector('.nav-links');
          if (mobileNav.classList.contains('active')) {
            document.querySelector('.burger').click();
          }
          
          // Scroll to the element
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });
};

// Form Submission Handling
const handleFormSubmission = () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      // Simple form validation
      if (name && email && message) {
        // Here you would normally send data to a server
        alert('Thanks for your message! We\'ll get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill all fields before submitting.');
      }
    });
  }
};

// Scroll Animations with IntersectionObserver
const scrollAnimation = () => {
  const sections = document.querySelectorAll('section');
  
  const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  sections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
  });
};

// Add CSS for the fade animations
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .fade-out {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  navSlide();
  smoothScroll();
  handleFormSubmission();
  addAnimationStyles();
  scrollAnimation();
  
  // Add toggle class to burger for animation
  const burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('toggle');
    });
  }
});

// Add event listeners to service cards for a hover effect
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
  });
});

// Simple JavaScript for TicketTales Custom Prints

document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to product items
  const productItems = document.querySelectorAll('.product-item');
  
  productItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.02)';
      item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1)';
    });
  });
  
  // Buy button functionality
  const buyButton = document.querySelector('.buy-button');
  if (buyButton) {
    buyButton.addEventListener('click', () => {
      alert('Thank you for your interest! This item has been added to your cart.');
    });
  }
  
  // Navigation smooth scrolling
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if the link is an anchor link
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}); 