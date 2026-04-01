document.addEventListener('DOMContentLoaded', () => {
    // Grab the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Get specific parameters
    const firstName = urlParams.get('first-name') || '';
    const lastName = urlParams.get('last-name') || '';
    const email = urlParams.get('email') || '';
    const phone = urlParams.get('phone') || '';
    const bizName = urlParams.get('biz-name') || '';
    const timestamp = urlParams.get('timestamp') || '';
    
    // Elements to display
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');
    const displayBiz = document.getElementById('display-biz');
    const displayDate = document.getElementById('display-date');
    
    // Populate elements
    if (displayName) displayName.textContent = `${firstName} ${lastName}`;
    if (displayEmail) {
        displayEmail.textContent = email;
        displayEmail.href = `mailto:${email}`;
    }
    if (displayPhone) displayPhone.textContent = phone;
    if (displayBiz) displayBiz.textContent = bizName;
    
    if (displayDate && timestamp) {
        // Format the timestamp to be readable
        try {
            const dateObj = new Date(timestamp);
            displayDate.textContent = dateObj.toLocaleString();
        } catch(e) {
            displayDate.textContent = timestamp;
        }
    }
});
