// cursor.js — dot cursor with a delayed ring trail
document.addEventListener("DOMContentLoaded", () => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const ringInner = document.querySelector(".cursor-ring-inner");
  const body = document.body;

  if (!dot || !ring || !ringInner || !window.matchMedia("(pointer: fine)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hasMoved = false;

  body.classList.add("custom-cursor-enabled");

  let isSnapped = false; // 🔧 new flag

function renderCursor() {
  // Only move ring if not snapped
  if (!isSnapped) {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  }

  dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  requestAnimationFrame(renderCursor);
}

requestAnimationFrame(renderCursor);

// Hover logic
document.addEventListener("pointerover", (event) => {
  const target = event.target.closest(
    "a, button, input, textarea, select, [role='button'], .btn-primary, .btn-secondary"
  );

  if (target) {
    body.classList.add("cursor-hover");
    isSnapped = true; // 🔧 freeze ring movement

    const rect = target.getBoundingClientRect();
    ring.style.width = `${rect.width + 2}px`;
    ring.style.height = `${rect.height + 2}px`;
    ring.style.transform = `translate(${rect.left + rect.width / 2}px, ${
      rect.top + rect.height / 2
    }px) translate(-50%, -50%)`;

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
    isSnapped = false; // 🔧 unfreeze ring movement
  }
});


  // Opacity feedback
  document.addEventListener("mousedown", () => (ringInner.style.opacity = "0.6"));
  document.addEventListener("mouseup", () => (ringInner.style.opacity = ""));

  // Reset on page unload
  window.addEventListener("beforeunload", () => {
    ring.classList.remove("snap");
    ring.style.width = "32px";
    ring.style.height = "32px";
  });
});

