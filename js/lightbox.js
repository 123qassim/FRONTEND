/*
 * Gentle Smiles 2.0 - LIGHTBOX
 * Handles functionality for the gallery lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        if (!lightbox || !lightboxImg || !lightboxClose) {
            console.warn('Lightbox elements not found. Lightbox will not initialize.');
            return;
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const imgSrc = item.getAttribute('href');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightboxImg.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});