let lastScrollTop = 0;
let ticking = false;
let isNavbarHidden = false;
const scrollDelta = 10; // seuil de tolérance
const hideThreshold = 131; // ne pas cacher la navbar avant ce scroll
const navbar = document.getElementById('navbar');
const firstSection = document.querySelector('.premier_section_after_navbar');

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

window.addEventListener('load', updateSectionMargin);
window.addEventListener('resize', updateSectionMargin);
