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

// -------------- Weather API -------------- //
const weatherData = document.querySelector('#weather-data');
const weatherForecast = document.querySelector('#weather-forecast');

// UPDATE YOUR API KEY HERE:
const apiKey = 'fdce6ac1590c49228e919e0c05af6d88';
const lat = 14.6349;
const lon = -90.5069;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            weatherData.innerHTML = `<p>Error loading weather (Check API key).</p>`;
        }
    } catch (error) {
        weatherData.innerHTML = `<p>Cannot connect to weather service.</p>`;
    }

    try {
        const fResponse = await fetch(forecastUrl);
        if (fResponse.ok) {
            const fData = await fResponse.json();
            displayForecast(fData);
        } else {
            weatherForecast.innerHTML = `<p>Error loading forecast (Check API key).</p>`;
        }
    } catch (error) {
        weatherForecast.innerHTML = `<p>Cannot connect to forecast service.</p>`;
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherData.innerHTML = `
        <figure style="margin: 0; display: flex; align-items: center; gap: 10px;">
            <img src="${icon}" alt="${desc}">
            <figcaption style="font-size: 1.2rem; font-weight: bold;">${temp}&deg;C - <span style="text-transform: capitalize;">${desc}</span></figcaption>
        </figure>
    `;
}

function displayForecast(data) {
    let forecastHTML = '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let today = new Date().getDay();
    // Getting one forecast every 24 hours (roughly every 8 intervals)
    for (let i = 1; i <= 3; i++) {
        let listIndex = i * 8 - 1;
        if (data.list[listIndex]) {
            let dayName = days[(today + i) % 7];
            let listTemp = Math.round(data.list[listIndex].main.temp);
            forecastHTML += `<p><strong>${dayName}:</strong> ${listTemp}&deg;C</p>`;
        }
    }
    weatherForecast.innerHTML = forecastHTML;
}

fetchWeather();

// -------------- Spotlights -------------- //
const spotlightContainer = document.querySelector('#spotlight-container');

async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        spotlightContainer.innerHTML = `<p>Spotlights unavailable.</p>`;
    }
}

function displaySpotlights(members) {
    // Filter Gold (3) and Silver (2)
    const qualified = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle
    qualified.sort(() => 0.5 - Math.random());

    // Pick exactly 3. (Or 2 if only 2 available).
    const selected = qualified.slice(0, 3);

    spotlightContainer.innerHTML = '';
    selected.forEach(m => {
        const levelName = m.membershipLevel === 3 ? '&#127352; Gold Member' : '&#127352; Silver Member';
        const levelClass = m.membershipLevel === 3 ? 'level-gold-tag' : 'level-silver-tag';

        spotlightContainer.innerHTML += `
            <div class="spotlight-card">
                <img src="${m.image}" alt="${m.name} Logo">
                <h4>${m.name}</h4>
                <p><strong>Phone:</strong> ${m.phone}</p>
                <p><strong>Address:</strong> ${m.address}</p>
                <p><strong>Website:</strong> <a href="${m.website}" target="_blank">${m.website.replace('http://', '').replace('https://', '').replace(/\/$/, '')}</a></p>
                <p class="membership-badge ${levelClass}">${levelName}</p>
            </div>
        `;
    });
}

fetchSpotlights();
