// Year in footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Page fade-in
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loaded");
});

// Scroll-triggered animations
const scrollElements = document.querySelectorAll(".scroll-fade");

const handleScrollAnimation = () => {
    const triggerBottom = window.innerHeight * 0.85;

    scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// Parallax effect
const parallaxLayers = document.querySelectorAll(".parallax-layer");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    parallaxLayers.forEach((layer, index) => {
        const strength = 0.03 + index * 0.01;
        const translateY = scrollY * strength;
        layer.style.transform = `translateY(${translateY}px)`;
    });
});
