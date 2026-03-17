const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data);
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let birthDate = document.createElement("p");
        let birthPlace = document.createElement("p");
        let portrait = document.createElement("img");
        // Builds the h2 content out to show the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        // Builds the p content out to show the prophet's birth date
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        // Builds the p content out to show the prophet's birth place
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        // Builds the image portrait by setting all the relevant attributes
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "200");

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}