import { setupModal, openModal } from './modal.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setupModal();

    const projectsContainer = document.getElementById('projects-container');
    const filters = document.querySelectorAll('.filter-btn');

    if (projectsContainer) {
        let allProjects = [];

        async function fetchProjects() {
            try {
                const response = await fetch('data/projects.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                allProjects = data;
                displayProjects(data);
            } catch (error) {
                console.error("Could not fetch projects:", error);
                projectsContainer.innerHTML = '<p>Error loading projects data.</p>';
            }
        }

        function displayProjects(projects) {
            projectsContainer.innerHTML = '';

            // Array Method: map
            const projectHTML = projects.map(project => {
                // Template Literals
                return `
                    <div class="project-card" data-id="${project.id}">
                        <img src="${project.image}" alt="${project.type} project: ${project.name}" width="475" height="317" loading="lazy">
                        <div class="project-info">
                            <span class="badge">${project.type}</span>
                            <h2>${project.name}</h2>
                            <p><strong>Client:</strong> ${project.client}</p>
                            <p><strong>Date:</strong> ${project.date}</p>
                        </div>
                    </div>
                `;
            }).join('');

            projectsContainer.innerHTML = projectHTML;

            // DOM Manipulation & Event Handling
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const id = card.getAttribute('data-id');
                    const project = allProjects.find(p => p.id == id);
                    if (project) {
                        openModal(project);
                    }
                });
            });
        }

        filters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const type = btn.getAttribute('data-filter');
                if (type === 'All') {
                    displayProjects(allProjects);
                } else {
                    // Array Method: filter
                    const filtered = allProjects.filter(p => p.type === type);
                    displayProjects(filtered);
                }
            });
        });

        fetchProjects();
    }
});
