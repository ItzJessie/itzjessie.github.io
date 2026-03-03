// Slideshow/Carousel Controller
class CarouselSlideshow {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.cards = document.querySelectorAll('.carousel-card');
        this.shell = document.querySelector('.carousel-shell');
        this.prevBtn = null;
        this.nextBtn = null;
        this.currentIndex = 0;
        this.autoIntervalMs = 5000;
        this.autoTimer = null;
        this.cardWidth = 0;
        this.cardGap = 0;
        this.isTransitioning = false;

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
                this.resetAutoAdvance();
            });

            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
                this.resetAutoAdvance();
            });

            if (this.shell) {
                this.shell.addEventListener('mouseenter', () => {
                    this.stopAutoAdvance();
                });

                this.shell.addEventListener('mouseleave', () => {
                    this.startAutoAdvance();
                });

                this.shell.addEventListener('focusin', () => {
                    this.stopAutoAdvance();
                });

                this.shell.addEventListener('focusout', (event) => {
                    if (!this.shell.contains(event.relatedTarget)) {
                        this.startAutoAdvance();
                    }
                });

                this.shell.addEventListener('touchstart', () => {
                    this.stopAutoAdvance();
                }, { passive: true });

                this.shell.addEventListener('touchend', () => {
                    this.startAutoAdvance();
                }, { passive: true });

                this.shell.addEventListener('touchcancel', () => {
                    this.startAutoAdvance();
                }, { passive: true });
            }

            // Keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.previousSlide();
                    this.resetAutoAdvance();
                }
                if (e.key === 'ArrowRight') {
                    this.nextSlide();
                    this.resetAutoAdvance();
                }
            });

            window.addEventListener('resize', () => {
                this.updateMeasurements();
                this.updateCarousel();
            });

            this.setupInfiniteLoop();
            this.updateMeasurements();
            this.updateCarousel();
            this.startAutoAdvance();
        }
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.currentIndex += 1;
        this.updateCarousel();
    }

    previousSlide() {
        if (this.isTransitioning) return;
        this.currentIndex -= 1;
        this.updateCarousel();
    }

    updateCarousel() {
        this.isTransitioning = true;
        const offset = (this.cardWidth + this.cardGap) * this.currentIndex;
        this.track.style.transform = `translateX(-${offset}px)`;

        // Announce change for accessibility
        const normalizedIndex = this.getNormalizedIndex();
        const currentCard = this.cards[normalizedIndex];
        const cardText = currentCard.querySelector('span')?.textContent || 'Slide ' + (this.currentIndex + 1);
        
        // Update ARIA label
        if (this.prevBtn) {
            this.prevBtn.setAttribute('aria-label', `Previous - Currently viewing ${cardText}`);
        }
        if (this.nextBtn) {
            this.nextBtn.setAttribute('aria-label', `Next - Currently viewing ${cardText}`);
        }
    }

    setupInfiniteLoop() {
        if (this.cards.length < 2) return;

        const firstClone = this.cards[0].cloneNode(true);
        const lastClone = this.cards[this.cards.length - 1].cloneNode(true);
        firstClone.setAttribute('aria-hidden', 'true');
        lastClone.setAttribute('aria-hidden', 'true');

        this.track.appendChild(firstClone);
        this.track.insertBefore(lastClone, this.cards[0]);

        this.cards = document.querySelectorAll('.carousel-card');
        this.currentIndex = 1;

        this.track.addEventListener('transitionend', () => {
            const maxIndex = this.cards.length - 1;

            if (this.currentIndex === 0) {
                this.jumpToIndex(maxIndex - 1);
            } else if (this.currentIndex === maxIndex) {
                this.jumpToIndex(1);
            }

            this.isTransitioning = false;
        });
    }

    jumpToIndex(index) {
        this.track.style.transition = 'none';
        this.currentIndex = index;
        this.updateMeasurements();
        const offset = (this.cardWidth + this.cardGap) * this.currentIndex;
        this.track.style.transform = `translateX(-${offset}px)`;
        void this.track.offsetHeight;
        this.track.style.transition = '';
    }

    getNormalizedIndex() {
        if (this.cards.length <= 2) return 0;
        if (this.currentIndex === 0) return this.cards.length - 3;
        if (this.currentIndex === this.cards.length - 1) return 0;
        return this.currentIndex - 1;
    }

    updateMeasurements() {
        if (!this.track || this.cards.length === 0) return;
        const trackStyles = window.getComputedStyle(this.track);
        const gapValue = parseFloat(trackStyles.gap);
        this.cardGap = Number.isNaN(gapValue) ? 0 : gapValue;
        this.cardWidth = this.cards[0].getBoundingClientRect().width;
    }

    startAutoAdvance() {
        if (this.autoTimer) return;
        this.startProgressBar();
        this.autoTimer = window.setInterval(() => {
            this.nextSlide();
            this.startProgressBar();
        }, this.autoIntervalMs);
    }

    resetAutoAdvance() {
        if (this.autoTimer) {
            window.clearInterval(this.autoTimer);
            this.autoTimer = null;
        }
        this.startAutoAdvance();
    }

    stopAutoAdvance() {
        if (this.autoTimer) {
            window.clearInterval(this.autoTimer);
            this.autoTimer = null;
        }
        this.stopProgressBar();
    }

    startProgressBar() {
        if (!this.shell) return;
        this.shell.style.setProperty(
            '--carousel-interval',
            `${this.autoIntervalMs}ms`
        );
        this.shell.classList.remove('is-animating');
        void this.shell.offsetHeight;
        this.shell.classList.add('is-animating');
    }

    stopProgressBar() {
        if (!this.shell) return;
        this.shell.classList.remove('is-animating');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CarouselSlideshow();
});
