// cursor.js — dot cursor with a delayed ring trail
document.addEventListener("DOMContentLoaded", () => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const body = document.body;

  if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hasMoved = false;

  body.classList.add("custom-cursor-enabled");

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  document.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!hasMoved) {
      hasMoved = true;
      body.classList.add("cursor-visible");
    }
  });

  // Hover logic
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest(
      "a, button, input, textarea, select, [role='button'], .btn-primary, .btn-secondary"
    );

    if (target) {
      body.classList.add("cursor-hover");

      const rect = target.getBoundingClientRect();

      ring.style.width = `${rect.width + 1}px`;
      ring.style.height = `${rect.height + 1}px`;
      ring.style.transform = `translate(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px) translate(-50%, -50%)`;
      ring.classList.add("snap");
    }
  });

  // Pointer out logic
  document.addEventListener("pointerout", (event) => {
    const leaving = event.target.closest(
      "a, button, input, textarea, select, [role='button'], .btn-primary, .btn-secondary"
    );

    if (leaving) {
      body.classList.remove("cursor-hover");
      ring.classList.remove("snap");
      ring.style.width = "32px";
      ring.style.height = "32px";
    }
  });

  // Opacity feedback
  document.addEventListener("mousedown", () => (ring.style.opacity = "0.6"));
  document.addEventListener("mouseup", () => (ring.style.opacity = ""));

  // 🔧 Reset ring on click
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      ring.classList.remove("snap");
      ring.style.width = "32px";
      ring.style.height = "32px";
    });
  });
});
