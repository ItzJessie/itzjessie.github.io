(() => {
    const storageKey = "jah-theme";
    const body = document.body;
    const toggleButton = document.querySelector(".theme-toggle");
    const siteHeader = document.querySelector(".site-header");
    const mainNav = document.querySelector(".main-nav");

    const label = toggleButton
        ? toggleButton.querySelector(".theme-toggle__label")
        : null;

    const navMediaQuery = window.matchMedia("(max-width: 720px)");

    const updateNavAria = (button, isOpen) => {
        button.setAttribute("aria-expanded", String(isOpen));
        button.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        button.textContent = isOpen ? "✕" : "☰";
    };

    const closeNav = (button) => {
        if (!siteHeader || !button) {
            return;
        }

        siteHeader.classList.remove("nav-open");
        updateNavAria(button, false);
    };

    const applyTheme = (theme, persist) => {
        const isDark = theme === "dark";
        body.classList.toggle("theme-dark", isDark);
        if (toggleButton) {
            toggleButton.setAttribute("aria-pressed", String(isDark));
            toggleButton.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            if (label) {
                label.textContent = isDark ? "Light Mode" : "Dark Mode";
            }
        }

        if (persist) {
            localStorage.setItem(storageKey, theme);
        }
    };

    const storedTheme = localStorage.getItem(storageKey);
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(storedTheme || (prefersDark ? "dark" : "light"), false);

    if (!toggleButton) {
        if (!siteHeader || !mainNav) {
            return;
        }
    } else {
        toggleButton.addEventListener("click", () => {
            const nextTheme = body.classList.contains("theme-dark")
                ? "light"
                : "dark";
            applyTheme(nextTheme, true);
        });
    }

    if (!siteHeader || !mainNav) {
        return;
    }

    const navToggleButton = document.createElement("button");
    navToggleButton.type = "button";
    navToggleButton.className = "nav-toggle";
    navToggleButton.setAttribute("aria-controls", "primary-navigation");
    updateNavAria(navToggleButton, false);

    if (!mainNav.id) {
        mainNav.id = "primary-navigation";
    }

    siteHeader.classList.add("has-nav-toggle");
    siteHeader.querySelector(".header-inner")?.appendChild(navToggleButton);

    navToggleButton.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("nav-open");
        updateNavAria(navToggleButton, isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMediaQuery.matches) {
                closeNav(navToggleButton);
            }
        });
    });

    navMediaQuery.addEventListener("change", (event) => {
        if (!event.matches) {
            closeNav(navToggleButton);
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNav(navToggleButton);
        }
    });
})();
