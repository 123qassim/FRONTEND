/*
 * Gentle Smiles 2.0
 * Author: World-Class Web Designer (Gemini)
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ======== 1. MOBILE NAVIGATION TOGGLE ======== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Toggle the 'active' class on the menu to show/hide it
            navMenu.classList.toggle('active');
            
            // Toggle the icon (bars to times)
            navToggle.classList.toggle('fa-times');
            navToggle.classList.toggle('fa-bars');
        });
    }

    // Close the mobile menu when a link is clicked
    // This is useful for one-page navigation or just a better mobile UX
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('fa-times');
                navToggle.classList.add('fa-bars');
            }
        });
    });

    /* ======== 2. STICKY HEADER ON SCROLL ======== */
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            // Add 'scrolled' class to header when user scrolls past 50px
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ======== 3. (Optional) FAREWELL CONSOLE LOG ======== */
    console.log("Gentle Smiles 2.0 JavaScript loaded successfully. 🦷");

});

/*
 * Gentle Smiles 2.0
 * Additional JavaScript for Carousel, Lightbox, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ======== 4. TESTIMONIAL CAROUSEL ======== */
    // Check if we are on a page with the carousel
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const nextButton = document.getElementById('carousel-next');
        const prevButton = document.getElementById('carousel-prev');
        const dotsNav = document.getElementById('carousel-dots');
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

        // Function to move to a specific slide
        const moveToSlide = (targetIndex) => {
            carouselTrack.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
            currentIndex = targetIndex;
            updateNavButtons();
        };

        // Update nav button visibility
        const updateNavButtons = () => {
            prevButton.style.display = (currentIndex === 0) ? 'none' : 'block';
            nextButton.style.display = (currentIndex === slides.length - 1) ? 'none' : 'block';
        };

        // Next button click
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                moveToSlide(currentIndex + 1);
            }
        });

        // Prev button click
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        });

        // Recalculate slide width on window resize
        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            moveToSlide(currentIndex); // Re-align current slide
        });

        // Initialize button states
        updateNavButtons();
    }

    /* ======== 5. GALLERY LIGHTBOX ======== */
    // Check if we are on the gallery page
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const imgSrc = item.getAttribute('href');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightboxImg.setAttribute('src', ''); // Clear src
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };

        // Close by clicking 'x'
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close by clicking outside the image
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    /* ======== 6. AOS-STYLE SCROLL ANIMATIONS ======== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When the element is in view
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Observe each element
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

});

/*
 * Gentle Smiles 2.0 - MAIN
 * Core site scripts:
 * 1. Mobile Navigation Toggle
 * 2. Sticky Header on Scroll
 * 3. AOS-Style Scroll Animations
 * 4. Scroll-to-Top Button
 * 5. Appointment Form - Min Date
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ======== 1. MOBILE NAVIGATION TOGGLE ======== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('fa-times');
            navToggle.classList.toggle('fa-bars');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('fa-times');
                    navToggle.classList.add('fa-bars');
                }
            });
        });
    }

    /* ======== 2. STICKY HEADER ON SCROLL ======== */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ======== 3. AOS-STYLE SCROLL ANIMATIONS ======== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    /* ======== 4. SCROLL-TO-TOP BUTTON ======== */
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /* ======== 5. APPOINTMENT FORM - MIN DATE ======== */
    const dateInput = document.getElementById('appt-date');
    if (dateInput) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    console.log("Gentle Smiles 2.0 MAIN JavaScript loaded. 🦷");
});

/*
 * Gentle Smiles 2.0 - MAIN (Updates)
 * 6. Dark/Light Mode Toggle
 * 7. Animated Counters
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ======== 6. DARK/LIGHT MODE TOGGLE ======== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Target <html> tag

    // Get the saved theme from localStorage, default to 'light'
    let currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    // Apply the saved theme on load
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle the theme
            if (htmlElement.getAttribute('data-theme') === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* ======== 7. ANIMATED STATS COUNTER ======== */
    const statsSection = document.querySelector('.stats-section');

    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        let hasBeenAnimated = false;

        const countUp = (counter) => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 16ms per frame
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            requestAnimationFrame(updateCounter);
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When the section is in view and hasn't been animated yet
                if (entry.isIntersecting && !hasBeenAnimated) {
                    counters.forEach(countUp);
                    hasBeenAnimated = true; // Only animate once
                    observer.unobserve(entry.target); // Stop observing
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });

        statsObserver.observe(statsSection);
    }
    
    // Lazy-loading fallback for browsers that don't support it
    if ('loading' in HTMLImageElement.prototype === false) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

});