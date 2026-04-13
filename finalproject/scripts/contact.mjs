document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form input[type="tel"]');
    formInputs.forEach(input => {
        const saved = localStorage.getItem(`form-${input.id}`);
        if (saved) input.value = saved;
        
        input.addEventListener('input', () => {
            localStorage.setItem(`form-${input.id}`, input.value);
        });
    });
});
