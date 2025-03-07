// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  // Create a download button for accumulated CSV data
  const downloadSection = document.createElement('div');
  downloadSection.className = 'download-section';
  downloadSection.innerHTML = `
    <p>Admin: Download all contact submissions</p>
    <button id="downloadCsv" class="download-button">Download CSV</button>
  `;
  
  // Add the download section after the form
  if (contactForm) {
    contactForm.parentNode.appendChild(downloadSection);
    
    // Set up the download button
    document.getElementById('downloadCsv').addEventListener('click', function() {
      downloadAllContactsAsCsv();
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Save to accumulated data in localStorage
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
  
  // Function to save contact to localStorage as part of accumulated data
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
    
    // Log to console for demonstration
    console.log('Contact saved:', { name, email, message });
    console.log('All contacts:', contacts);
  }
  
  // Function to download all contacts as a single CSV file
  function downloadAllContactsAsCsv() {
    // Get contacts from localStorage
    const contacts = JSON.parse(localStorage.getItem('ticketTalesContacts') || '[]');
    
    if (contacts.length === 0) {
      alert('No contacts found to download.');
      return;
    }
    
    // Create CSV content with headers
    let csvContent = 'Name,Email,Message,Date\n';
    
    // Add each contact as a row
    contacts.forEach(contact => {
      // Escape quotes and format CSV row
      const name = contact.name.replace(/"/g, '""');
      const email = contact.email.replace(/"/g, '""');
      const message = contact.message.replace(/"/g, '""');
      const date = contact.date;
      
      csvContent += `"${name}","${email}","${message}","${date}"\n`;
    });
    
    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'all_contact_submissions.csv');
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}); 