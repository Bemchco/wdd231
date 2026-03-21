export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
    const tbody = document.querySelector("#sections");
    tbody.innerHTML = "";
    sections.forEach((section) => {
        tbody.innerHTML += `<tr>
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
            <td>${section.instructor}</td>
        </tr>`;
    });
}
