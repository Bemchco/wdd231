export function setupNavigation() {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuButton.textContent = navMenu.classList.contains('open') ? '✖' : '☰';
        });
    }

    // Wayfinding
    const activePage = window.location.pathname;
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        if (link.href.includes(`${activePage}`)) {
            if (activePage !== '/' && !activePage.endsWith('index.html') || 
                (activePage.endsWith('index.html') && link.href.endsWith('index.html'))) {
                link.classList.add('active');
            } else if (activePage === '/' && link.href.endsWith('index.html')) {
                 link.classList.add('active');
            }
        }
    });
}
