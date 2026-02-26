// Anime data for filtering
const animeDatabase = [
    // Archive Highlights
    { name: "Attack on Titan", alt: "Attack on Titan" },
    { name: "Frieren", alt: "Frieren" },
    { name: "One Piece", alt: "One Piece" },
    { name: "Death Note", alt: "Death Note" },
    { name: "Vinland Saga", alt: "Vinland Saga" },
    { name: "Psycho Pass", alt: "Psycho Pass" },
    // Carousel
    { name: "Demon Slayer", alt: "Demon Slayer" }
];

class InfluentialSeriesSearch {
    constructor() {
        this.searchInput = document.querySelector('.series-search input[type="search"]');
        this.seriesCards = document.querySelectorAll('.series-card');
        this.carouselCards = document.querySelectorAll('.carousel-card');
        this.noResultsMsg = null;

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            this.searchInput.addEventListener('submit', (e) => e.preventDefault());
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        this.filterCards(this.seriesCards, searchTerm);
        this.filterCards(this.carouselCards, searchTerm);
        this.updateNoResultsMessage(searchTerm);
    }

    filterCards(cardList, searchTerm) {
        let visibleCount = 0;

        cardList.forEach(card => {
            const animeTitle = card.querySelector('span')?.textContent || 
                              card.querySelector('h2')?.textContent || '';
            const matches = animeTitle.toLowerCase().includes(searchTerm);

            if (matches && searchTerm.length > 0) {
                card.style.display = '';
                card.style.opacity = '1';
                visibleCount++;
            } else if (searchTerm.length === 0) {
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.2';
                card.style.pointerEvents = 'none';
            }
        });
    }

    updateNoResultsMessage(searchTerm) {
        let noResults = document.querySelector('.series-no-results');
        
        if (searchTerm.length > 0) {
            const hasVisibleCards = Array.from(this.seriesCards).some(card => {
                const title = (card.querySelector('span')?.textContent || '').toLowerCase();
                return title.includes(searchTerm);
            });

            if (!hasVisibleCards) {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.className = 'series-no-results';
                    noResults.textContent = `No anime found matching "${searchTerm}"`;
                    
                    const archiveSection = document.querySelector('.series-archive');
                    archiveSection.appendChild(noResults);
                }
                noResults.style.display = 'block';
            } else if (noResults) {
                noResults.style.display = 'none';
            }
        } else if (noResults) {
            noResults.style.display = 'none';
        }
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new InfluentialSeriesSearch();
});
