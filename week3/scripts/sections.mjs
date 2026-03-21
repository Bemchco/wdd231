export function setSectionSelection(sections) {
    const selectElement = document.querySelector("#sectionNumber");
    selectElement.innerHTML = '';
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;
        selectElement.appendChild(option);
    });
}
