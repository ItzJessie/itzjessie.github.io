(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal animation for feedback items
    const revealItems = document.querySelectorAll(".feedback-card, .summary-item");
    if (revealItems.length) {
        if (prefersReducedMotion) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
        } else {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.2,
                    rootMargin: "0px 0px -10% 0px",
                }
            );
            revealItems.forEach((item) => observer.observe(item));
        }
    }

    // Tilt effect for feedback cards
    const tiltCards = document.querySelectorAll(".feedback-card");
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
                card.style.setProperty("--tilt-x", `${tiltX}deg`);
                card.style.setProperty("--tilt-y", `${tiltY}deg`);
                rafId = null;
            };
            const onMove = (event) => {
                if (rafId) return;
                rafId = window.requestAnimationFrame(() => updateTilt(event));
            };
            const onLeave = () => {
                rect = null;
                card.style.setProperty("--tilt-x", "0deg");
                card.style.setProperty("--tilt-y", "0deg");
            };
            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
            card.addEventListener("pointerdown", onLeave);
        });
    }
})();
