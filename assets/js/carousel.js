// Hero Carousel
const heroCarousel = document.getElementById('hero-carousel');
if (heroCarousel) {
    const heroSlides = heroCarousel.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.carousel-indicator');
    let currentHeroSlide = 0;
    
    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
        
        heroIndicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('bg-opacity-100');
                indicator.classList.remove('bg-opacity-50');
            } else {
                indicator.classList.remove('bg-opacity-100');
                indicator.classList.add('bg-opacity-50');
            }
        });
        
        currentHeroSlide = index;
    }
    
    heroIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showHeroSlide(index);
        });
    });
    
    // Auto-advance hero carousel
    setInterval(() => {
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(currentHeroSlide);
    }, 5000);
    
    // Initialize
    showHeroSlide(0);
}

// Testimonials Carousel
const testimonialsCarousel = document.getElementById('testimonials-carousel');
if (testimonialsCarousel) {
    const testimonialSlides = testimonialsCarousel.querySelectorAll('div');
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicator');
    let currentTestimonialSlide = 0;
    const slideWidth = 100; // 100%
    
    function showTestimonialSlide(index) {
        testimonialsCarousel.style.transform = `translateX(-${index * slideWidth}%)`;
        
        testimonialIndicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('bg-zanma-blue');
                indicator.classList.remove('bg-gray-300');
            } else {
                indicator.classList.remove('bg-zanma-blue');
                indicator.classList.add('bg-gray-300');
            }
        });
        
        currentTestimonialSlide = index;
    }
    
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonialSlide(index);
        });
    });
    
    // Auto-advance testimonials carousel
    setInterval(() => {
        currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlides.length;
        showTestimonialSlide(currentTestimonialSlide);
    }, 6000);
    
    // Initialize
    showTestimonialSlide(0);
}