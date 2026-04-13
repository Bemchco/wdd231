document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dataDisplay = document.getElementById('submitted-data');
    
    if (params.has('firstname')) {
        let html = '<ul>';
        for (const [key, value] of params.entries()) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += '</ul>';
        if (dataDisplay) dataDisplay.innerHTML = html;
    } else {
        if (dataDisplay) dataDisplay.innerHTML = '<p>No data submitted.</p>';
    }
});
