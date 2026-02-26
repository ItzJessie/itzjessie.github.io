// Slideshow/Carousel Controller
class CarouselSlideshow {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.cards = document.querySelectorAll('.carousel-card');
        this.prevBtn = null;
        this.nextBtn = null;
        this.currentIndex = 0;

        if (this.cards.length > 0) {
            this.initializeCarousel();
        }
    }

    initializeCarousel() {
        // Get buttons from parent shell
        const shell = document.querySelector('.carousel-shell');
        const buttons = shell.querySelectorAll('.carousel-arrow');
        
        if (buttons.length >= 2) {
            this.prevBtn = buttons[0];
            this.nextBtn = buttons[1];

            // Add click listeners
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousSlide();
            });

            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });

            // Keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });

            this.updateCarousel();
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
    }

    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCarousel();
    }

    updateCarousel() {
        this.track.style.transform = `translateX(calc(-${this.currentIndex} * (100% + var(--carousel-gap))))`;

        // Announce change for accessibility
        const currentCard = this.cards[this.currentIndex];
        const cardText = currentCard.querySelector('span')?.textContent || 'Slide ' + (this.currentIndex + 1);
        
        // Update ARIA label
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', `Previous - Currently viewing ${cardText}`);
        }
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', `Next - Currently viewing ${cardText}`);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CarouselSlideshow();
});
