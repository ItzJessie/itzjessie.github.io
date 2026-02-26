// Filter functionality for Studios & Creators page

document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;
    const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const heroInner = document.querySelector('.studios-hero-inner');
    if (heroInner) {
        heroInner.classList.add('reveal');
    }

    const filterBar = document.querySelector('.filter-bar');
    if (filterBar) {
        filterBar.classList.add('reveal');
    }

    const filterDivider = document.querySelector('.filter-divider');
    if (filterDivider) {
        filterDivider.classList.add('reveal');
    }

    const columns = document.querySelectorAll('.studios-column');
    columns.forEach((column, index) => {
        const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
        const heading = column.querySelector('h2');
        if (heading) {
            heading.classList.add('reveal', direction);
        }

        const cards = column.querySelectorAll('.info-card');
        cards.forEach((card) => {
            card.classList.add('reveal', 'tilt-card', direction);
        });
    });

    const glow = document.querySelector('.mouse-glow');

    if (glow && !prefersReducedMotion && !prefersCoarsePointer) {
        let targetX = window.innerWidth * 0.5;
        let targetY = window.innerHeight * 0.4;
        let currentX = targetX;
        let currentY = targetY;
        let rafId = null;

        const update = () => {
            const ease = 0.08;
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;
            glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            rafId = requestAnimationFrame(update);
        };

        const onMove = (event) => {
            targetX = event.clientX;
            targetY = event.clientY;

            if (!rafId) {
                rafId = requestAnimationFrame(update);
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
    }

    const revealItems = document.querySelectorAll('.reveal');

    if (revealItems.length) {
        if (prefersReducedMotion) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.2,
                    rootMargin: '0px 0px -10% 0px',
                }
            );

            revealItems.forEach((item) => observer.observe(item));
        }
    }

    const tiltCards = document.querySelectorAll('.tilt-card');

    if (tiltCards.length && !prefersReducedMotion) {
        tiltCards.forEach((card) => {
            let rafId = null;
            let rect = null;

            const updateTilt = (event) => {
                if (!rect) {
                    rect = card.getBoundingClientRect();
                }

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const tiltX = (0.5 - y) * 8;
                const tiltY = (x - 0.5) * 10;

                card.style.setProperty('--tilt-x', `${tiltX}deg`);
                card.style.setProperty('--tilt-y', `${tiltY}deg`);
                rafId = null;
            };

            const onMove = (event) => {
                if (rafId) {
                    return;
                }

                rafId = window.requestAnimationFrame(() => updateTilt(event));
            };

            const onLeave = () => {
                rect = null;
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            };

            card.addEventListener('pointermove', onMove);
            card.addEventListener('pointerleave', onLeave);
            card.addEventListener('pointerdown', onLeave);
        });
    }

    const parallaxItems = document.querySelectorAll('[data-parallax]');

    if (parallaxItems.length && !prefersReducedMotion) {
        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            parallaxItems.forEach((item) => {
                const speed = Number.parseFloat(
                    item.getAttribute('data-parallax') || '0.1'
                );
                const rect = item.getBoundingClientRect();
                const offsetTop = rect.top + scrollY;
                const progress = scrollY - offsetTop + viewportHeight * 0.5;
                const translateY = progress * speed;

                item.style.setProperty('--parallax-y', `${translateY}px`);
            });

            ticking = false;
        };

        const onScroll = () => {
            if (ticking) {
                return;
            }

            ticking = true;
            window.requestAnimationFrame(updateParallax);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        updateParallax();
    }

    const filterToggles = document.querySelectorAll('.filter-toggle');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const filterMenus = document.querySelectorAll('.filter-menu');
    
    // Store active filters
    let activeFilters = {
        era: null,
        role: null,
        studio: null
    };

    // Toggle dropdown menus
    filterToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            const filterDropdown = this.closest('.filter-dropdown');
            const filterMenu = filterDropdown.querySelector('.filter-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Close all other menus
            filterMenus.forEach(menu => {
                if (menu !== filterMenu) {
                    menu.classList.remove('is-open');
                    menu.parentElement.querySelector('.filter-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current menu
            this.setAttribute('aria-expanded', !isExpanded);
            filterMenu.classList.toggle('is-open');
            e.stopPropagation();
        });
    });

    // Handle filter menu item selection
    filterMenus.forEach(menu => {
        const items = menu.querySelectorAll('[role="menuitem"]');
        items.forEach(item => {
            item.addEventListener('click', function (e) {
                const filterDropdown = menu.closest('.filter-dropdown');
                const toggle = filterDropdown.querySelector('.filter-toggle');
                
                // Determine filter type
                let filterType = '';
                if (toggle.id === 'era-toggle') {
                    filterType = 'era';
                    activeFilters.era = this.getAttribute('data-era');
                    updateButtonLabel(toggle, this.textContent);
                } else if (toggle.id === 'creator-role-toggle') {
                    filterType = 'role';
                    activeFilters.role = this.getAttribute('data-role');
                    updateButtonLabel(toggle, this.textContent);
                } else if (toggle.id === 'studio-toggle') {
                    filterType = 'studio';
                    activeFilters.studio = this.getAttribute('data-studio');
                    updateButtonLabel(toggle, this.textContent);
                }

                // Mark as selected
                items.forEach(i => i.classList.remove('is-selected'));
                this.classList.add('is-selected');

                // Close the menu
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');

                // Apply filters
                applyFilters();
                e.stopPropagation();
            });
        });
    });

    // Clear filters button
    clearFiltersBtn.addEventListener('click', function () {
        activeFilters = {
            era: null,
            role: null,
            studio: null
        };

        // Reset button labels
        document.getElementById('era-toggle').textContent = 'Filter by Era';
        document.getElementById('creator-role-toggle').textContent = 'Filter by Role';
        document.getElementById('studio-toggle').textContent = 'Filter by Studio';

        // Remove selected states
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        menuItems.forEach(item => item.classList.remove('is-selected'));

        // Close all dropdowns
        filterMenus.forEach(menu => {
            menu.classList.remove('is-open');
            menu.parentElement.querySelector('.filter-toggle').setAttribute('aria-expanded', 'false');
        });

        // Reset display
        applyFilters();
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.filter-dropdown') && !e.target.closest('.filter-toggle')) {
            filterMenus.forEach(menu => {
                menu.classList.remove('is-open');
                menu.parentElement.querySelector('.filter-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Update button label with selected option
    function updateButtonLabel(button, selectedText) {
        button.textContent = selectedText;
    }

    // Apply filters to content
    function applyFilters() {
        const studioCards = document.querySelectorAll('.studio-card');
        const creatorCards = document.querySelectorAll('.creator-card');

        console.log('Active Filters:', activeFilters);

        // Filter studio cards
        studioCards.forEach(card => {
            let shouldShow = true;

            // Check era filter
            if (activeFilters.era) {
                const cardEra = card.getAttribute('data-era');
                if (cardEra !== activeFilters.era) {
                    shouldShow = false;
                }
            }

            // Check studio filter
            if (activeFilters.studio && shouldShow) {
                const cardStudio = card.getAttribute('data-studio');
                if (cardStudio !== activeFilters.studio) {
                    shouldShow = false;
                }
            }

            card.style.display = shouldShow ? 'block' : 'none';
        });

        // Filter creator cards
        creatorCards.forEach(card => {
            let shouldShow = true;

            // Check era filter
            if (activeFilters.era) {
                const cardEra = card.getAttribute('data-era');
                if (cardEra !== activeFilters.era) {
                    shouldShow = false;
                }
            }

            // Check role filter
            if (activeFilters.role && shouldShow) {
                const cardRoles = card.getAttribute('data-roles');
                if (cardRoles && cardRoles.includes(activeFilters.role)) {
                    shouldShow = true;
                } else if (activeFilters.role) {
                    shouldShow = false;
                }
            }

            // Check studio filter
            if (activeFilters.studio && shouldShow) {
                const cardStudios = card.getAttribute('data-studios');
                if (cardStudios && cardStudios.includes(activeFilters.studio)) {
                    shouldShow = true;
                } else if (activeFilters.studio) {
                    shouldShow = false;
                }
            }

            card.style.display = shouldShow ? 'block' : 'none';
        });
    }
});

