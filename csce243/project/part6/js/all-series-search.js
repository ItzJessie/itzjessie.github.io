class AllSeriesSearch {
    constructor() {
        this.searchInput = document.querySelector('.all-series-search input[type="search"]');
        this.seriesCards = [];
        this.gridContainer = document.querySelector('.all-series-grid');
        this.searchForm = document.querySelector('.all-series-search');
        this.noResultsMsg = null;
        this.suggestionBox = null;
        this.selectedSuggestionIndex = -1;

        this.createSuggestionBox();
        this.refreshSeriesCards();
        this.checkHashNavigation();

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
                this.handleKeyNavigation(e);
            });
            this.searchInput.addEventListener('focus', (e) => this.handleSearch(e));
        }

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchForm?.contains(e.target)) {
                this.hideSuggestions();
            }
        });

        document.addEventListener('allSeriesRendered', () => {
            this.refreshSeriesCards();
            this.checkHashNavigation();
        });
    }

    get animeDatabase() {
        return window.allAnimeDatabase || [];
    }

    refreshSeriesCards() {
        this.seriesCards = Array.from(document.querySelectorAll('.all-series-card'));
    }

    createSuggestionBox() {
        this.suggestionBox = document.createElement('div');
        this.suggestionBox.className = 'search-suggestions';
        this.suggestionBox.style.display = 'none';
        if (this.searchForm) {
            this.searchForm.appendChild(this.suggestionBox);
        }
    }

    checkHashNavigation() {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1); // Remove the #
            const targetCard = document.getElementById(targetId);
            
            if (targetCard) {
                setTimeout(() => {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.classList.add('highlight-anime');
                    
                    // Remove highlight after animation
                    setTimeout(() => {
                        targetCard.classList.remove('highlight-anime');
                    }, 3000);
                }, 300);
            }
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase().trim();
        let visibleCount = 0;

        this.refreshSeriesCards();

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
        this.showSuggestions(searchTerm);
    }

    showSuggestions(searchTerm) {
        if (searchTerm.length < 1) {
            this.hideSuggestions();
            return;
        }

        const matches = this.animeDatabase.filter(anime => 
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
                const selectedAnime = this.animeDatabase.filter(anime => 
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
        const targetCard = document.getElementById(anime.id);
        if (targetCard) {
            this.hideSuggestions();
            this.searchInput.value = '';
            this.handleSearch({ target: this.searchInput });
            
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('highlight-anime');
            
            setTimeout(() => {
                targetCard.classList.remove('highlight-anime');
            }, 3000);
        }
    }

    updateNoResultsMessage(searchTerm, visibleCount) {
        let noResults = document.querySelector('.all-series-no-results');

        if (searchTerm.length > 0 && visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'all-series-no-results';
                noResults.innerHTML = `
                    <p>No anime found matching "<strong>${searchTerm}</strong>"</p>
                    <p class="coming-soon">New anime series adding soon! Check back later 🎬</p>
                `;
                this.gridContainer.appendChild(noResults);
            } else {
                noResults.innerHTML = `
                    <p>No anime found matching "<strong>${searchTerm}</strong>"</p>
                    <p class="coming-soon">New anime series adding soon! Check back later 🎬</p>
                `;
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
