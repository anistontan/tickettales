// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Save to localStorage (this part is kept for data persistence)
      saveContactToStorage(name, email, message);
      
      // Show success message
      formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
      formStatus.className = 'form-status success';
      
      // Reset the form
      contactForm.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    });
  }
  
  // Function to save contact to localStorage
  function saveContactToStorage(name, email, message) {
    // Get existing contacts or initialize empty array
    const contacts = JSON.parse(localStorage.getItem('ticketTalesContacts') || '[]');
    
    // Add new contact with timestamp
    contacts.push({
      name: name,
      email: email,
      message: message,
      date: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('ticketTalesContacts', JSON.stringify(contacts));
    
    // Log to console for debugging
    console.log('Contact saved:', { name, email, message });
  }
}); 