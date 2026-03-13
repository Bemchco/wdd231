// Dynamically update the current year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.innerHTML = new Date().getFullYear();
}

// Dynamically update the last modified date
const lastModifiedElement = document.getElementById('last-modified');
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = document.lastModified;
}
