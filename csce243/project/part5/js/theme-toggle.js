(() => {
    const storageKey = "jah-theme";
    const body = document.body;
    const toggleButton = document.querySelector(".theme-toggle");

    const label = toggleButton
        ? toggleButton.querySelector(".theme-toggle__label")
        : null;

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
        return;
    }

    toggleButton.addEventListener("click", () => {
        const nextTheme = body.classList.contains("theme-dark")
            ? "light"
            : "dark";
        applyTheme(nextTheme, true);
    });
})();
