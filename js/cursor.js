const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

if (cursorDot && cursorRing) {
    document.body.classList.add("custom-cursor-enabled");

    window.addEventListener("mousemove", e => {
        const { clientX, clientY } = e;
        cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
        cursorRing.style.transform = `translate(${clientX - 16}px, ${clientY - 16}px)`;
        cursorDot.style.opacity = 1;
        cursorRing.style.opacity = 1;
    });

    window.addEventListener("mousedown", () => {
        document.body.classList.add("cursor-down");
    });

    window.addEventListener("mouseup", () => {
        document.body.classList.remove("cursor-down");
    });

    document.querySelectorAll("a, button, .project-card").forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}
