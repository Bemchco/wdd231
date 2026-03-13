// Navigation Toggle
const hamButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
// Event listener for the hamburger button
hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
    navLinks.classList.toggle('show');
})


