// Update exact footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        darkModeToggle.textContent = '🌒';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.textContent = '☀️';
    }
});

// Hamburger Menu
const hamburgerBtn = document.getElementById('hamburger-menu');
const navList = document.getElementById('nav-list');
hamburgerBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
    if (navList.classList.contains('show')) {
        hamburgerBtn.textContent = '✖';
    } else {
        hamburgerBtn.textContent = '☰';
    }
});

// Grid and List View Toggle
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const membersContainer = document.getElementById('members-container');

// Only run directory logic if we are on the directory page
if (membersContainer) {
    // Fetch and display members
    async function getMembers() {
        try {
            const response = await fetch('data/members.json');
            if (response.ok) {
                const members = await response.json();
                displayMembers(members);
            } else {
                console.error('Failed to fetch members data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website.replace('http://', '').replace('https://', '').replace(/\/$/, '')}</a></p>
            `;
            membersContainer.appendChild(card);
        });
    }

    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });

    // Initialize fetching
    getMembers();
}
