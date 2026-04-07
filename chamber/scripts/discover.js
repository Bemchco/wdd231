import { places } from '../data/places.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Visit Message Logic
    const visitorMessage = document.getElementById('visitor-message');
    const msToDays = 86400000;
    const now = Date.now();
    let lastVisit = window.localStorage.getItem('lastVisit-chamber');

    if (!lastVisit) {
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        let diffMs = now - parseInt(lastVisit);
        let diffDays = Math.floor(diffMs / msToDays);
        if (diffDays < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            let dayWord = diffDays === 1 ? "day" : "days";
            visitorMessage.textContent = `You last visited ${diffDays} ${dayWord} ago.`;
        }
    }
    // Update last visit date
    window.localStorage.setItem('lastVisit-chamber', now.toString());

    // 2. Generate Cards
    const cardsContainer = document.querySelector('.cards-container');
    
    places.forEach((place, index) => {
        let card = document.createElement('div');
        card.classList.add('discover-card');
        // Setting inline grid-area to easily map them in CSS
        card.style.gridArea = `c${index + 1}`; 
        
        let h2 = document.createElement('h2');
        h2.textContent = place.name;
        
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.src = place.image;
        img.alt = place.name;
        img.loading = "lazy";
        // To prevent layout shift
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);
        
        let address = document.createElement('address');
        address.textContent = place.address;
        
        let p = document.createElement('p');
        p.textContent = place.description;
        
        let button = document.createElement('button');
        button.textContent = "Learn More";
        button.classList.add('cta-button');
        // Ensure the button spans appropriately if we want
        button.style.marginTop = 'auto'; // pushes it to bottom in a flex column
        
        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.appendChild(h2);
        cardContent.appendChild(address);
        cardContent.appendChild(p);
        cardContent.appendChild(button);
        
        card.appendChild(figure);
        card.appendChild(cardContent);
        
        cardsContainer.appendChild(card);
    });
});
