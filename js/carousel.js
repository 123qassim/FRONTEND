/*
 * Gentle Smiles 2.0 - CAROUSEL
 * Handles functionality for the testimonials carousel.
 */

document.addEventListener('DOMContentLoaded', () => {

    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const nextButton = document.getElementById('carousel-next');
        const prevButton = document.getElementById('carousel-prev');
        const dotsNav = document.getElementById('carousel-dots');
        
        // Check if essential elements exist
        if (!nextButton || !prevButton || !dotsNav || slides.length === 0) {
            console.warn('Carousel elements not found. Carousel will not initialize.');
            return;
        }

        let slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;

        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
            dotsNav.appendChild(dot);
        });
        const dots = Array.from(dotsNav.children);

        const moveToSlide = (targetIndex) => {
            carouselTrack.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
            currentIndex = targetIndex;
            updateNavButtons();
        };

        const updateNavButtons = () => {
            prevButton.style.display = (currentIndex === 0) ? 'none' : 'block';
            nextButton.style.display = (currentIndex === slides.length - 1) ? 'none' : 'block';
        };

        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                moveToSlide(currentIndex + 1);
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        });

        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            moveToSlide(currentIndex);
        });

        updateNavButtons();
    }
});