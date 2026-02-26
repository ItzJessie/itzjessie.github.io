// Complete anime database for all-influential-series
const allAnimeDatabase = [
    "Fullmetal Alchemist",
    "Hunter x Hunter",
    "One Punch Man",
    "Chainsaw Man",
    "JoJo's Bizarre Adventure",
    "Bleach",
    "Cyberpunk: Edgerunners",
    "Code Geass",
    "Princess Mononoke",
    "Cowboy Bebop",
    "Dandadan",
    "Dragon Ball Z",
    "Steins;Gate",
    "Spy x Family",
    "Ghost in the Shell",
    "Pokemon",
    "Mushoku Tensei",
    "Mob Psycho 100",
    "Tokyo Ghoul",
    "Hellsing"
];

class AllSeriesSearch {
    constructor() {
        this.searchInput = document.querySelector('.all-series-search input[type="search"]');
        this.seriesCards = document.querySelectorAll('.all-series-card');
        this.gridContainer = document.querySelector('.all-series-grid');
        this.noResultsMsg = null;

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        let visibleCount = 0;

        this.seriesCards.forEach(card => {
            const animeTitle = card.querySelector('h2')?.textContent || '';
            const matches = animeTitle.toLowerCase().includes(searchTerm);

            if (searchTerm.length === 0) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
                visibleCount++;
            } else if (matches) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
                visibleCount++;
            } else {
                card.style.opacity = '0.15';
                card.style.pointerEvents = 'none';
            }
        });

        this.updateNoResultsMessage(searchTerm, visibleCount);
    }

    updateNoResultsMessage(searchTerm, visibleCount) {
        let noResults = document.querySelector('.all-series-no-results');

        if (searchTerm.length > 0 && visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'all-series-no-results';
                noResults.innerHTML = `
                    <p>No anime found matching "<strong>${searchTerm}</strong>"</p>
                    <p>Try a different search term</p>
                `;
                this.gridContainer.appendChild(noResults);
            }
            noResults.style.display = 'block';
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
    new AllSeriesSearch();
});
