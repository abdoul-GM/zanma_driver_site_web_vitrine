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



// // Add scroll effect to navbar
// let lastScrollTop = 0;
// const navbar = document.getElementById('navbar');

// window.addEventListener('scroll', () => {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     if (scrollTop > lastScrollTop && scrollTop > 100) {
//         // Scrolling down
//         navbar.style.transform = 'translateY(-100%)';
//     } else {
//         // Scrolling up
//         navbar.style.transform = 'translateY(0)';
//     }

//     // Add backdrop blur effect when scrolling
//     if (scrollTop > 50) {
//         navbar.classList.add('bg-white/95', 'dark:bg-gray-900/95');
//         navbar.classList.remove('bg-white', 'dark:bg-gray-900');
//     } else {
//         navbar.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
//         navbar.classList.add('bg-white', 'dark:bg-gray-900');
//     }

//     lastScrollTop = scrollTop;
// });