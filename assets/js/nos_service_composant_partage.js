function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function () {
    // Animate stats numbers
    const statsElements = document.querySelectorAll('.stats-card-increment .stats-item-increment');
    const nbrSecondesAnimation = 30;

    statsElements.forEach(el => {
        const finalText = el.textContent;
        let finalValue, suffix = '';
        
        // Parse different formats
        if (finalText.includes('/')) {
            // Handle formats like "4.8/5" or "24/7"
            const parts = finalText.split('/');
            finalValue = parseFloat(parts[0]);
            suffix = '/' + parts[1];
        } else if (finalText.includes('.')) {
            // Handle decimal format like "4.8"
            finalValue = parseFloat(finalText);
            suffix = '';
        } else if (finalText.includes('K+')) {
            // Handle thousands format like "50K+"
            finalValue = parseInt(finalText.replace('K+', '')) * 1000;
            suffix = 'K+';
        } else if (finalText.includes('+')) {
            // Handle simple plus format like "1,200+"
            finalValue = parseInt(finalText.replace(/[,+]/g, ''));
            suffix = '+';
        } else if (finalText.includes('%')) {
            // Handle percentage format
            finalValue = parseInt(finalText.replace('%', ''));
            suffix = '%';
        } else if (finalText.includes('min')) {
            // Handle minutes format
            finalValue = parseInt(finalText.replace('min', ''));
            suffix = 'min';
        } else {
            // Default case
            finalValue = parseInt(finalText);
        }
        
        let current = 0;
        const isDecimal = finalText.includes('/') && !finalText.includes('/7');
        const isSupport = finalText.includes('/7'); 
        const isSimpleDecimal = finalText.includes('.') && !finalText.includes('/');
        const increment = () => {
            if (current < finalValue) {
                if (isSupport) {
                    // For support format "24/7" - animate to 24 then add /7
                    current += Math.ceil(24 / 48);
                    if (current > 24) current = 24;
                    el.textContent = current + '/7';
                } else if (isDecimal || isSimpleDecimal) {
                    // For decimal values like ratings or simple decimals like "4.8"
                    current += finalValue / 48; // Smoother animation for decimals
                    if (current > finalValue) current = finalValue;
                    el.textContent = current.toFixed(1) + suffix;
                } else if (suffix === 'K+') {
                    // For thousands
                    current += Math.ceil(finalValue / 50);
                    if (current > finalValue) current = finalValue;
                    el.textContent = Math.floor(current / 1000) + 'K+';
                } else {
                    // For regular numbers
                    current += Math.ceil(finalValue / 50);
                    if (current > finalValue) current = finalValue;
                    
                    // Format with commas for large numbers
                    let displayValue = current;
                    if (current >= 1000) {
                        displayValue = current.toLocaleString();
                    }
                    el.textContent = displayValue + suffix;
                }
                setTimeout(increment, nbrSecondesAnimation);
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    increment();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el.parentElement);
    });
});