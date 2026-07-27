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
    ringX += (mouseX - ringX) * 0.06;
    ringY += (mouseY - ringY) * 0.06;

    const ringScale = body.classList.contains("cursor-hover") ? 1.4 : 1;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;

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

  // Delegation keeps hover feedback working after page content is replaced.
  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, input, textarea, select, [role='button']")) {
      body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    const leavingInteractive = event.target.closest("a, button, input, textarea, select, [role='button']");
    const enteringInteractive = event.relatedTarget?.closest?.(
      "a, button, input, textarea, select, [role='button']"
    );

    if (leavingInteractive && !enteringInteractive) body.classList.remove("cursor-hover");
  });

  document.addEventListener("mousedown", () => (ring.style.opacity = "0.6"));
  document.addEventListener("mouseup", () => (ring.style.opacity = ""));
});
