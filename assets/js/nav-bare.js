
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const firstSection = document.querySelector('.premier_section_after_navbar');

// Obtenir et appliquer dynamiquement la hauteur de la nav
const updateSectionMargin = () => {
    const navHeight = navbar.offsetHeight;
    const isVisible = navbar.style.transform !== "translateY(-100%)";
    firstSection.style.marginTop = isVisible ? `${navHeight}px` : '0';
};

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll vers le bas : cacher la navbar
        navbar.style.transform = "translateY(-100%)";
    } else {
        // Scroll vers le haut : afficher la navbar
        navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    updateSectionMargin();
});

// Initialiser la marge au chargement
window.addEventListener('load', updateSectionMargin);
window.addEventListener('resize', updateSectionMargin);

