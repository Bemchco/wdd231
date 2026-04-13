export function addVisitCount() {
    const statsContainer = document.getElementById('visit-stats');
    
    if (statsContainer) {
        let visitCount = localStorage.getItem('remis-visit-count');
        
        if (!visitCount) {
            visitCount = 1;
        } else {
            visitCount = parseInt(visitCount) + 1;
        }
        
        localStorage.setItem('remis-visit-count', visitCount);
        
        const message = `Welcome to REMIS! You have visited this site ${visitCount} time${visitCount > 1 ? 's' : ''}.`;
        statsContainer.innerHTML = `<p><strong>${message}</strong></p>`;
    }
}
