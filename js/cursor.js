(function () {
    try {
        // Disable on touch devices
        if (
            "ontouchstart" in window ||
            (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
        ) {
            return;
        }

        const dot = document.getElementById("cursor-dot");
        const ring = document.getElementById("cursor-ring");

        if (!dot || !ring) return;

        document.body.classList.add("custom-cursor-enabled");

        let mouseX = 0,
            mouseY = 0,
            ringX = 0,
            ringY = 0;
        let visible = false;
        let lastMove = 0;

        // Move dot instantly
        function onPointerMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;

            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

            if (!visible) {
                dot.style.opacity = "1";
                ring.style.opacity = "1";
                visible = true;
            }

            lastMove = Date.now();
        }

        window.addEventListener("pointermove", onPointerMove, { passive: true });

        // Smooth trailing ring
        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateRing);
        }

        requestAnimationFrame(animateRing);

        // Hover states
        const clickables = document.querySelectorAll(
            "a, button, input[type='submit'], [role='button']"
        );

        clickables.forEach((el) => {
            el.addEventListener("pointerenter", () =>
                document.body.classList.add("cursor-hover")
            );
            el.addEventListener("pointerleave", () =>
                document.body.classList.remove("cursor-hover")
            );
            el.addEventListener("pointerdown", () =>
                document.body.classList.add("cursor-down")
            );
            el.addEventListener("pointerup", () =>
                document.body.classList.remove("cursor-down")
            );
        });

        // Auto-hide when idle
        setInterval(() => {
            if (Date.now() - lastMove > 1200) {
                dot.style.opacity = "0";
                ring.style.opacity = "0";
                visible = false;
            }
        }, 600);
    } catch (e) {
        console.error("cursor init error", e);
    }
})();
