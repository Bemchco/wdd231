// Set timestamp in hidden input
document.addEventListener('DOMContentLoaded', () => {
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // Modal Logic
    const modals = document.querySelectorAll('.membership-modal');
    const modalLinks = document.querySelectorAll('.modal-link');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open modals
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modals via close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.membership-modal').close();
        });
    });

    // Close modals when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
});
