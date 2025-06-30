let lastScrollTop = 0;
let ticking = false;
let isNavbarHidden = false;
const scrollDelta = 10;
let hideThreshold = 131;
const navbar = document.getElementById('navbar');
const firstSection = document.querySelector('.premier_section_after_navbar');

function updateHideThreshold() {
  if (window.innerWidth < 768) {
    hideThreshold = 80;
  } else {
    hideThreshold = 150; // valeur desktop
  }
}

const updateSectionMargin = () => {
    if (!navbar || !firstSection) return;
    if (!isNavbarHidden) {
        firstSection.classList.add('mt-navbar');
        firstSection.classList.remove('mt-none');
    } else {
        firstSection.classList.add('mt-none');
        firstSection.classList.remove('mt-navbar');
    }
};

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = scrollTop - lastScrollTop;

    // Ignorer les petits mouvements
    if (Math.abs(scrollDiff) < scrollDelta) {
        ticking = false;
        return;
    }

    if (scrollDiff > 0 && !isNavbarHidden && scrollTop >= hideThreshold) {
        // Scroll vers le bas ET dépasse le seuil → cacher navbar
        navbar.classList.add('nav-hidden');
        isNavbarHidden = true;
    } else if (scrollDiff < 0 && isNavbarHidden) {
        // Scroll vers le haut → afficher navbar
        navbar.classList.remove('nav-hidden');
        isNavbarHidden = false;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
};

// Scroll optimisé
window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
});

updateHideThreshold();
window.addEventListener('resize', updateHideThreshold);
window.addEventListener('load', updateSectionMargin);
window.addEventListener('resize', updateSectionMargin);




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



/** *******************
 ** Mega Menu: Assistance
 ** ********************/
const assistanceMenu = document.getElementById('assistance-menu');
const assistanceTrigger = document.getElementById('assistance-trigger');
const assistanceMegaMenu = document.getElementById('assistance-mega-menu');
const assistanceArrow = document.getElementById('assistance-arrow');

let assistanceMenuTimeout;

const showAssistanceMenu = () => {
    clearTimeout(assistanceMenuTimeout);
    assistanceMegaMenu.classList.add('active');
    assistanceArrow.style.transform = 'rotate(180deg)';
};

const hideAssistanceMenu = () => {
    assistanceMenuTimeout = setTimeout(() => {
        assistanceMegaMenu.classList.remove('active');
        assistanceArrow.style.transform = 'rotate(0deg)';
    }, 150);
};

// Évènements Desktop
assistanceMenu.addEventListener('mouseenter', showAssistanceMenu);
assistanceMenu.addEventListener('mouseleave', hideAssistanceMenu);
assistanceMegaMenu.addEventListener('mouseenter', showAssistanceMenu);
assistanceMegaMenu.addEventListener('mouseleave', hideAssistanceMenu);

// Fermer si clique dehors
document.addEventListener('click', (e) => {
    if (!assistanceMenu.contains(e.target)) {
        hideAssistanceMenu();
    }
});

// Mobile Assistance Menu
const mobileAssistanceBtn = document.getElementById('mobile-assistance-btn');
const mobileAssistanceMenu = document.getElementById('mobile-assistance-menu');
const mobileAssistanceArrow = document.getElementById('mobile-assistance-arrow');

mobileAssistanceBtn.addEventListener('click', () => {
    mobileAssistanceMenu.classList.toggle('hidden');
    if (mobileAssistanceMenu.classList.contains('hidden')) {
        mobileAssistanceArrow.style.transform = 'rotate(0deg)';
    } else {
        mobileAssistanceArrow.style.transform = 'rotate(180deg)';
    }
});

// Observe les nouveaux éléments du mega menu
document.querySelectorAll('#assistance-mega-menu .mega-menu-item').forEach(item => {
    observerMegaMenu.observe(item);
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