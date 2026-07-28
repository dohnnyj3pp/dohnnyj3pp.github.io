// cursor.js — dot cursor with delayed ring trail
document.addEventListener("DOMContentLoaded", () => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const ringInner = document.querySelector(".cursor-ring-inner");
  const body = document.body;
  if (
    !dot ||
    !ring ||
    !ringInner ||
    !window.matchMedia("(pointer:fine)").matches
  ) return;
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hasMoved = false;
  let isSnapped = false;
  let currentTarget = null;
  body.classList.add("custom-cursor-enabled");
  function renderCursor() {
    dot.style.transform =
      `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
    if (!isSnapped) {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform =
        `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
  document.addEventListener("pointermove", event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!hasMoved) {
      hasMoved = true;
      body.classList.add("cursor-visible");
    }
    if (
      isSnapped &&
      currentTarget
    ) {
      const rect = currentTarget.getBoundingClientRect();
      ring.style.transform =
        `translate(${rect.left + rect.width / 2}px,${rect.top + rect.height / 2}px) translate(-50%,-50%)`;
    }
  });
  document.addEventListener("pointerover", event => {
    const target = event.target.closest(
      "a,button,input,textarea,select,[role='button'],.btn-primary,.btn-secondary"
    );
    if (!target) return;
    body.classList.add("cursor-hover");
    isSnapped = true;
    currentTarget = target;
    target.classList.add("snap-active");
    const rect = target.getBoundingClientRect();
    ring.style.width = `${rect.width + 4}px`;
    ring.style.height = `${rect.height + 4}px`;
    ring.style.transform =
      `translate(${rect.left + rect.width / 2}px,${rect.top + rect.height / 2}px) translate(-50%,-50%)`;
    ring.classList.add("snap");
  });
  document.addEventListener("pointerout", event => {
    const leaving = event.target.closest(
      "a,button,input,textarea,select,[role='button'],.btn-primary,.btn-secondary"
    );
    if (!leaving) return;
    body.classList.remove("cursor-hover");
    ring.classList.remove("snap");
    ring.style.width = "32px";
    ring.style.height = "32px";
    isSnapped = false;
    currentTarget = null;
    leaving.classList.remove("snap-active");
  });
  // button click pulse only
  document.addEventListener("click", event => {
    const button = event.target.closest(
      ".btn-primary,.btn-secondary"
    );
    if (!button) return;
    ring.classList.remove("snap");
    body.classList.remove("cursor-hover");
    isSnapped = false;
    currentTarget = null;
    ring.style.width = "32px";
    ring.style.height = "32px";
    ring.style.transform =
      `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
  });
  ring.style.transition =
    "opacity .25s ease-out,width .25s ease-out,height .25s ease-out";
  // same-page nav click reset
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", event => {
      const currentURL =
        window.location.href.split("#")[0];
      const targetURL =
        link.href.split("#")[0];
      if (currentURL !== targetURL) return;
      event.preventDefault();
      ring.style.opacity = "0";
      setTimeout(() => {
        body.classList.remove("cursor-hover");
        ring.classList.remove("snap");
        isSnapped = false;
        currentTarget = null;
        document
          .querySelectorAll(".nav-links a")
          .forEach(a => a.classList.remove("snap-active"));
        ring.style.opacity = "1";
      }, 250);
    });
  });
  document.addEventListener("mousedown", () => {
    ringInner.style.opacity = ".6";
  });
  document.addEventListener("mouseup", () => {
    ringInner.style.opacity = "";
  });
  window.addEventListener("beforeunload", () => {
    ring.classList.remove("snap");
    ring.style.width = "32px";
    ring.style.height = "32px";
  });
});