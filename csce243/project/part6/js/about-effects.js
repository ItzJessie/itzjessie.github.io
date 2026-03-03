(() => {
    const glow = document.querySelector(".mouse-glow");

    if (!glow) {
        return;
    }

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

    window.addEventListener("mousemove", onMove, { passive: true });
})();
