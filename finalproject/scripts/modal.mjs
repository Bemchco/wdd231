export function setupModal() {
    const dialog = document.getElementById('project-modal');
    if (!dialog) return;

    const closeBtn = document.getElementById('close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            dialog.close();
        });
    }

    // Click outside to close
    dialog.addEventListener('click', (e) => {
        const dialogDimensions = dialog.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.close();
        }
    });
}

export function openModal(project) {
    const dialog = document.getElementById('project-modal');
    if (!dialog) return;

    const modalTitle = document.getElementById('modal-title');
    const modalClient = document.getElementById('modal-client');
    const modalType = document.getElementById('modal-type');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalDesc = document.getElementById('modal-desc');

    modalTitle.textContent = project.name;
    modalClient.textContent = `Client: ${project.client}`;
    modalType.textContent = `Type: ${project.type}`;
    modalDate.textContent = `Date: ${project.date}`;
    modalImage.src = project.image;
    modalImage.alt = project.name;
    modalDesc.textContent = project.description;

    dialog.showModal();
}
