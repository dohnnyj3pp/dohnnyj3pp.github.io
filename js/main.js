// main.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const pageContent = document.getElementById("page-content");
  const heroContent = document.querySelector(".hero-content");
  const yearSpan = document.getElementById("year");

  // Set footer year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mark page as loaded (for CSS fade)
  body.classList.add("page-loaded");

  // Hero entrance
  if (heroContent) {
    heroContent.classList.add("hero-enter");
  }

  // Simple parallax on mouse move for hero
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  if (parallaxLayers.length > 0) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      parallaxLayers.forEach((layer) => {
        const depth = layer.classList.contains("depth-3")
          ? 18
          : layer.classList.contains("depth-2")
          ? 12
          : 8;

        const translateX = -x * depth;
        const translateY = -y * depth;

        layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    });
  }
});
