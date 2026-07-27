// main.js — cinematic hero + parallax + SPA fade
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const heroContent = document.querySelector(".hero-content");
  const yearSpan = document.getElementById("year");

  // Footer year
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Page fade‑in
  body.classList.add("page-loaded");

  // Hero entrance
  if (heroContent) heroContent.classList.add("hero-enter");

  // Parallax movement
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  if (parallaxLayers.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!ticking) {
        requestAnimationFrame(() => {
          parallaxLayers.forEach((layer) => {
            const depth = layer.classList.contains("depth-3")
              ? 10
              : layer.classList.contains("depth-2")
              ? 6
              : 3;

            const translateX = -mouseX * depth;
            const translateY = -mouseY * depth;

            layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }
});
