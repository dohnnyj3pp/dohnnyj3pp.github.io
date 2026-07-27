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
  let isSnapped = false;

  body.classList.add("custom-cursor-enabled");

  function renderCursor() {
    // Always update dot
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    // Move ring only when not snapped
    if (!isSnapped) {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }

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

    // If snapped, keep ring centered on target
    if (isSnapped && currentTarget) {
      const rect = currentTarget.getBoundingClientRect();
      ring.style.transform = `translate(${rect.left + rect.width / 2}px, ${
        rect.top + rect.height / 2
      }px) translate(-50%, -50%)`;
    }
  });

  let currentTarget = null;

// Hover logic
document.addEventListener("pointerover", (event) => {
  const target = event.target.closest(
    "a, button, input, textarea, select, [role='button'], .btn-primary, .btn-secondary"
  );

  if (target) {
    body.classList.add("cursor-hover");
    isSnapped = true;
    currentTarget = target;

    // Add wave trigger class for snapped link
    target.classList.add("snap-active");

    const rect = target.getBoundingClientRect();
    ring.style.width = `${rect.width + 4}px`;
    ring.style.height = `${rect.height + 4}px`;
    ring.style.transform = `translate(${rect.left + rect.width / 2}px, ${
      rect.top + rect.height / 2
    }px) translate(-50%, -50%)`;

    ring.classList.add("snap");
  }
});

// Pointer out logic
document.addEventListener("pointerout", (event) => {
  const leaving = event.target.closest("a, button, input, textarea, select, [role='button'], .btn-primary, .btn-secondary");
  if (leaving) {
    body.classList.remove("cursor-hover");
    ring.classList.remove("snap");
    ring.style.width = "32px";
    ring.style.height = "32px";
    isSnapped = false;
    currentTarget = null;
    leaving.classList.remove("snap-active");
  }
});

// ✅ Reset cursor when clicking a nav link (even same page)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("cursor-hover");
    ring.classList.remove("snap");
    isSnapped = false;
    currentTarget = null;
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("snap-active"));
  });
});

// Reset cursor when clicking a nav link (even same page)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    // Fade out the ring
    ring.style.opacity = "0";
    setTimeout(() => {
      // Clear stuck cursor states
      document.body.classList.remove("cursor-hover");
      ring.classList.remove("snap");
      isSnapped = false;
      currentTarget = null;
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("snap-active"));

      // Fade back in
      ring.style.opacity = "1";
    }, 250); // matches transition duration
  });
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

