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
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      parallaxLayers.forEach((layer) => {
        const depth = layer.classList.contains("depth-3")
          ? 10
          : layer.classList.contains("depth-2")
          ? 6
          : 3;

        const translateX = -x * depth;
        const translateY = -y * depth;

        layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });
  }
});
