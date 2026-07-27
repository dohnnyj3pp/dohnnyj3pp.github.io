// cursor.js — class‑based custom cursor
document.addEventListener("DOMContentLoaded", () => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const body = document.body;

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Move cursor
  let cursorTicking = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!cursorTicking) {
      requestAnimationFrame(() => {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ring.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        cursorTicking = false;
      });
      cursorTicking = true;
    }
  });

  // Hover feedback
  const hoverSelectors = ["a", "button", ".btn-primary", ".btn-secondary", ".nav-links a"];
  hoverSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", () => body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => body.classList.remove("cursor-hover"));
    });
  });

  // Click feedback
  document.addEventListener("mousedown", () => (ring.style.opacity = "0.6"));
  document.addEventListener("mouseup", () => (ring.style.opacity = "1"));

  // Enable cursor styling
  body.classList.add("custom-cursor-enabled");
});
