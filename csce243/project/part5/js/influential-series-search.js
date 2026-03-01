// Complete anime database for autocomplete
const animeDatabase = [
    { name: "Attack on Titan", id: "series-attack-on-titan" },
    { name: "Frieren", id: "series-frieren" },
    { name: "One Piece", id: "series-one-piece" },
    { name: "Death Note", id: "series-death-note" },
    { name: "Vinland Saga", id: "series-vinland-saga" },
    { name: "Psycho Pass", id: "series-psycho-pass" },
    { name: "Demon Slayer", id: "series-demon-slayer" },
    { name: "Fullmetal Alchemist", id: "series-fullmetal-alchemist" },
    { name: "Hunter x Hunter", id: "series-hunter-x-hunter" },
    { name: "One Punch Man", id: "series-one-punch-man" },
    { name: "Chainsaw Man", id: "series-chainsaw-man" },
    { name: "JoJo's Bizarre Adventure", id: "series-jojo-bizarre-adventure" },
    { name: "Bleach", id: "series-bleach" },
    { name: "Cyberpunk: Edgerunners", id: "series-cyberpunk-edgerunners" },
    { name: "Code Geass", id: "series-code-geass" },
    { name: "Princess Mononoke", id: "series-princess-mononoke" },
    { name: "Cowboy Bebop", id: "series-cowboy-bebop" },
    { name: "Dandadan", id: "series-dandadan" },
    { name: "Dragon Ball Z", id: "series-dragon-ball-z" },
    { name: "Steins;Gate", id: "series-steins-gate" },
    { name: "Spy x Family", id: "series-spy-family" },
    { name: "Ghost in the Shell", id: "series-ghost-in-the-shell" },
    { name: "Pokemon", id: "series-pokemon" },
    { name: "Mushoku Tensei", id: "series-mushoku-tensei" },
    { name: "Mob Psycho 100", id: "series-mob-psycho-100" },
    { name: "Tokyo Ghoul", id: "series-tokyo-ghoul" },
    { name: "Hellsing", id: "series-hellsing" }
];

class InfluentialSeriesSearch {
    constructor() {
        this.searchForm = document.querySelector('.series-search');
        this.searchInput = document.querySelector('.series-search input[type="search"]');
        this.seriesCards = document.querySelectorAll('.series-card');
        this.carouselCards = document.querySelectorAll('.carousel-card');
        this.noResultsMsg = null;
        this.suggestionBox = null;
        this.selectedSuggestionIndex = -1;

        this.createSuggestionBox();
        this.makeArchiveCardsClickable();

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            this.searchInput.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
            this.searchInput.addEventListener('focus', (e) => this.handleSearch(e));
        }

        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleSearch({ target: this.searchInput });
            });
        }

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchForm?.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    createSuggestionBox() {
        this.suggestionBox = document.createElement('div');
        this.suggestionBox.className = 'search-suggestions';
        this.suggestionBox.style.display = 'none';
        if (this.searchForm) {
            this.searchForm.appendChild(this.suggestionBox);
        }
    }

    makeArchiveCardsClickable() {
        if (!this.seriesCards.length) {
            return;
        }

        this.seriesCards.forEach((card) => {
            const rawTitle = card.querySelector('span')?.textContent || '';
            const destination = 'all-influential-series.html';

            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'link');
            card.setAttribute('aria-label', `Open ${rawTitle || 'series'} in archive`);

            const openDestination = () => {
                window.location.href = destination;
            };

            card.addEventListener('click', openDestination);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDestination();
                }
            });
        });
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        this.filterCards(this.seriesCards, searchTerm);
        this.filterCards(this.carouselCards, searchTerm);
        this.updateNoResultsMessage(searchTerm);
        this.showSuggestions(searchTerm);
    }

    showSuggestions(searchTerm) {
        if (searchTerm.length < 1) {
            this.hideSuggestions();
            return;
        }

        const matches = animeDatabase.filter(anime => 
            anime.name.toLowerCase().includes(searchTerm)
        ).slice(0, 6); // Limit to 6 suggestions

        if (matches.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.suggestionBox.innerHTML = '';
        this.selectedSuggestionIndex = -1;

        matches.forEach((anime, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = anime.name;
            suggestionItem.dataset.animeId = anime.id;
            suggestionItem.dataset.animeName = anime.name;
            
            suggestionItem.addEventListener('click', () => {
                this.navigateToAnime(anime);
            });

            suggestionItem.addEventListener('mouseenter', () => {
                this.selectedSuggestionIndex = index;
                this.updateSelectedSuggestion();
            });

            this.suggestionBox.appendChild(suggestionItem);
        });

        this.suggestionBox.style.display = 'block';
    }

    hideSuggestions() {
        if (this.suggestionBox) {
            this.suggestionBox.style.display = 'none';
            this.selectedSuggestionIndex = -1;
        }
    }

    handleKeyNavigation(event) {
        const suggestions = this.suggestionBox?.querySelectorAll('.suggestion-item');
        if (!suggestions || suggestions.length === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.selectedSuggestionIndex = Math.min(
                this.selectedSuggestionIndex + 1,
                suggestions.length - 1
            );
            this.updateSelectedSuggestion();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
            this.updateSelectedSuggestion();
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (this.selectedSuggestionIndex >= 0) {
                const selectedAnime = animeDatabase.filter(anime => 
                    anime.name.toLowerCase().includes(this.searchInput.value.toLowerCase().trim())
                )[this.selectedSuggestionIndex];
                
                if (selectedAnime) {
                    this.navigateToAnime(selectedAnime);
                }
            }
        } else if (event.key === 'Escape') {
            this.hideSuggestions();
        }
    }

    updateSelectedSuggestion() {
        const suggestions = this.suggestionBox?.querySelectorAll('.suggestion-item');
        if (!suggestions) return;

        suggestions.forEach((item, index) => {
            if (index === this.selectedSuggestionIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    navigateToAnime(anime) {
        // Navigate to all-influential-series page with anime ID in hash
        window.location.href = `all-influential-series.html#${anime.id}`;
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
                card.style.pointerEvents = 'auto';
                visibleCount++;
            } else if (searchTerm.length === 0) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            } else {
                card.style.opacity = '0.2';
                card.style.pointerEvents = 'none';
            }
        });
    }

    updateNoResultsMessage(searchTerm) {
        let noResults = document.querySelector('.series-no-results');
        
        if (searchTerm.length > 0) {
            const hasVisibleSeriesCards = Array.from(this.seriesCards).some(card => {
                const title = (card.querySelector('span')?.textContent || '').toLowerCase();
                return title.includes(searchTerm);
            });
            
            const hasVisibleCarouselCards = Array.from(this.carouselCards).some(card => {
                const title = (card.querySelector('span')?.textContent || '').toLowerCase();
                return title.includes(searchTerm);
            });
            
            const hasVisibleCards = hasVisibleSeriesCards || hasVisibleCarouselCards;

            if (!hasVisibleCards) {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.className = 'series-no-results';
                    noResults.innerHTML = `
                        <p>No anime found matching "<strong>${searchTerm}</strong>"</p>
                        <p class="coming-soon">New anime series coming soon! Stay tuned 🎬</p>
                    `;
                    
                    const archiveSection = document.querySelector('.series-archive');
                    if (archiveSection) {
                        archiveSection.appendChild(noResults);
                    }
                } else {
                    noResults.innerHTML = `
                        <p>No anime found matching "<strong>${searchTerm}</strong>"</p>
                        <p class="coming-soon">New anime series coming soon! Stay tuned 🎬</p>
                    `;
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
