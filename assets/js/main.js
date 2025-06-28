const themeToggleDark = document.getElementById('theme-toggle-dark');


// Back to top button
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll animations
const animateOnScroll = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });

    slideLeftElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });

    slideRightElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// Animation au scroll
const observerAnimationScrollOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerAnimationScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerAnimationScrollOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observerAnimationScroll.observe(el);
});

// Effet hover sur les cartes de rôles
document.querySelectorAll('.decision-branch').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Dark/Light mode toggle
// Vérifier le thème actuel et appliquer la classe correspondante
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');

        if (themeToggleDark) {
            themeToggleDark.textContent = '🌙';
        }
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        if (themeToggleDark) {
            themeToggleDark.textContent = '☀️';
        }
    }
}

if (themeToggleDark) {
    themeToggleDark.addEventListener('click', toggleTheme);
}


// Initialiser le bon texte selon le thème au chargement
if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    document.documentElement.classList.add('dark');
    if (themeToggleDark) {
        themeToggleDark.textContent = '☀️';
    }
} else {
    if (themeToggleDark) {
        themeToggleDark.textContent = '🌙';
    }
}

// Mega Menu functionality
/** *******************
 **  Mega Menu : Nos services
 ** ********************/
const servicesMenu = document.getElementById('services-menu');
const servicesTrigger = document.getElementById('services-trigger');
const megaMenu = document.getElementById('mega-menu');
const servicesArrow = document.getElementById('services-arrow');

let megaMenuTimeout;

const showMegaMenu = () => {
    clearTimeout(megaMenuTimeout);
    megaMenu.classList.add('active');
    servicesArrow.style.transform = 'rotate(180deg)';
};

const hideMegaMenu = () => {
    megaMenuTimeout = setTimeout(() => {
        megaMenu.classList.remove('active');
        servicesArrow.style.transform = 'rotate(0deg)';
    }, 150);
};

// Desktop mega menu events
servicesMenu.addEventListener('mouseenter', showMegaMenu);
servicesMenu.addEventListener('mouseleave', hideMegaMenu);
megaMenu.addEventListener('mouseenter', showMegaMenu);
megaMenu.addEventListener('mouseleave', hideMegaMenu);

// Click outside to close mega menu
document.addEventListener('click', (e) => {
    if (!servicesMenu.contains(e.target)) {
        hideMegaMenu();
    }
});

// Mobile Services Menu
const mobileServicesBtn = document.getElementById('mobile-services-btn');
const mobileServicesMenu = document.getElementById('mobile-services-menu');
const mobileServicesArrow = document.getElementById('mobile-services-arrow');

mobileServicesBtn.addEventListener('click', () => {
    mobileServicesMenu.classList.toggle('hidden');
    if (mobileServicesMenu.classList.contains('hidden')) {
        mobileServicesArrow.style.transform = 'rotate(0deg)';
    } else {
        mobileServicesArrow.style.transform = 'rotate(180deg)';
    }
});


/** *******************
 ** Mega Menu: Rejoignez-nous
 ** ********************/
const joinusMenu = document.getElementById('joinus-menu');
const joinusTrigger = document.getElementById('joinus-trigger');
const joinusMegaMenu = document.getElementById('joinus-mega-menu');
const joinusArrow = document.getElementById('joinus-arrow');

let joinusMenuTimeout;

const showJoinusMenu = () => {
    clearTimeout(joinusMenuTimeout);
    joinusMegaMenu.classList.add('active');
    joinusArrow.style.transform = 'rotate(180deg)';
};

const hideJoinusMenu = () => {
    joinusMenuTimeout = setTimeout(() => {
        joinusMegaMenu.classList.remove('active');
        joinusArrow.style.transform = 'rotate(0deg)';
    }, 150);
};

// Évènements Desktop
joinusMenu.addEventListener('mouseenter', showJoinusMenu);
joinusMenu.addEventListener('mouseleave', hideJoinusMenu);
joinusMegaMenu.addEventListener('mouseenter', showJoinusMenu);
joinusMegaMenu.addEventListener('mouseleave', hideJoinusMenu);

// Fermer si clique dehors
document.addEventListener('click', (e) => {
    if (!joinusMenu.contains(e.target)) {
        hideJoinusMenu();
    }
});

// Mobile Join Us Menu
const mobileJoinusBtn = document.getElementById('mobile-joinus-btn');
const mobileJoinusMenu = document.getElementById('mobile-joinus-menu');
const mobileJoinusArrow = document.getElementById('mobile-joinus-arrow');

mobileJoinusBtn.addEventListener('click', () => {
    mobileJoinusMenu.classList.toggle('hidden');
    if (mobileJoinusMenu.classList.contains('hidden')) {
        mobileJoinusArrow.style.transform = 'rotate(0deg)';
    } else {
        mobileJoinusArrow.style.transform = 'rotate(180deg)';
    }
});


// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations for mega menu items
const observerMegaMenuOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerMegaMenu = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1}s`;
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerMegaMenuOptions);

// Observe mega menu items
document.querySelectorAll('.mega-menu-item').forEach(item => {
    observerMegaMenu.observe(item);
});

// Add hover effects to service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.15) rotate(10deg)';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: rgba(255, 255, 255, 0.6);
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            button {
                position: relative;
                overflow: hidden;
            }
        `;
document.head.appendChild(style);

// Apply ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add loading animation for service items
document.querySelectorAll('.mega-menu-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';

    setTimeout(() => {
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 100);
});

// Add search functionality (simulation)
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Rechercher un service...';
searchInput.className = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-zanma-blue focus:border-transparent transition-all duration-300';

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideMegaMenu();
        mobileMenu.classList.add('hidden');
    }

    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Add intersection observer for animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-icon').forEach(icon => {
    animationObserver.observe(icon);
});

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg pointer-events-none';
        tooltip.textContent = e.target.getAttribute('data-tooltip');

        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;

        e.target._tooltip = tooltip;
    });

    element.addEventListener('mouseleave', (e) => {
        if (e.target._tooltip) {
            e.target._tooltip.remove();
            e.target._tooltip = null;
        }
    });
});

console.log('🚀 ZANMA Driver Mega Menu initialisé avec succès!');