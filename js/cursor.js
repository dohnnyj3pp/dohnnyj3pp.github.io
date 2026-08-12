// cursor.js — desktop custom cursor with responsive state

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const ringInner = document.querySelector(".cursor-ring-inner");
  const brackets = document.querySelector(".cursor-brackets");
  const body = document.body;

  if (!dot || !ring || !ringInner) {
    return;
  }

  const CURSOR_BREAKPOINT = 1610;

  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  let hasMoved = false;
  let isSnapped = false;

  let currentTarget = null;
  let currentBracketTarget = null;

  let desktopCursorActive =
    window.innerWidth > CURSOR_BREAKPOINT;

  function isDesktopMode() {
    return window.innerWidth > CURSOR_BREAKPOINT;
  }

  function resetCursorState() {
    isSnapped = false;
    currentTarget = null;
    currentBracketTarget = null;

    body.classList.remove(
      "cursor-visible",
      "cursor-hover",
      "inspect-active"
    );

    ring.classList.remove("snap");

    ring.style.width = "16px";
    ring.style.height = "16px";

    document
      .querySelectorAll(".snap-active")
      .forEach(element => {
        element.classList.remove("snap-active");
      });

    if (brackets) {
      brackets.style.opacity = "0";
    }
  }

  function enableDesktopCursor() {
    desktopCursorActive = true;

    body.classList.add(
      "custom-cursor-enabled"
    );

    dot.style.opacity = "";
    ring.style.opacity = "1";
    ringInner.style.opacity = "";

    mouseX = innerWidth / 2;
    mouseY = innerHeight / 2;

    ringX = mouseX;
    ringY = mouseY;

    hasMoved = false;

    resetCursorState();

    dot.style.transform =
      `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;

    ring.style.transform =
      `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
  }

  function disableDesktopCursor() {
    desktopCursorActive = false;

    resetCursorState();

    body.classList.remove(
      "custom-cursor-enabled"
    );

    dot.style.opacity = "0";
    ring.style.opacity = "0";
    ringInner.style.opacity = "0";
  }

  function syncCursorMode() {
    const shouldBeActive =
      isDesktopMode();

    if (
      shouldBeActive ===
      desktopCursorActive
    ) {
      return;
    }

    if (shouldBeActive) {
      enableDesktopCursor();
    } else {
      disableDesktopCursor();
    }
  }

  function moveBrackets(target) {
    if (!brackets || !target) {
      return;
    }

    const rect =
      target.getBoundingClientRect();

    brackets.style.width =
      `${rect.width}px`;

    brackets.style.height =
      `${rect.height}px`;

    brackets.style.left =
      `${rect.left}px`;

    brackets.style.top =
      `${rect.top}px`;

    brackets.style.opacity = "1";
  }

  function renderCursor() {
    if (desktopCursorActive) {
      dot.style.transform =
        `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;

      if (!isSnapped) {
        ringX +=
          (mouseX - ringX) * 0.15;

        ringY +=
          (mouseY - ringY) * 0.15;

        ring.style.transform =
          `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`;
      }
    }

    requestAnimationFrame(
      renderCursor
    );
  }

  if (desktopCursorActive) {
    enableDesktopCursor();
  } else {
    disableDesktopCursor();
  }

  requestAnimationFrame(
    renderCursor
  );

  document.addEventListener(
    "pointermove",
    event => {
      if (!desktopCursorActive) {
        return;
      }

      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!hasMoved) {
        hasMoved = true;

        body.classList.add(
          "cursor-visible"
        );
      }

      if (
        isSnapped &&
        currentTarget
      ) {
        const rect =
          currentTarget.getBoundingClientRect();

        ring.style.transform =
          `translate(${rect.left + rect.width / 2}px,${rect.top + rect.height / 2}px) translate(-50%,-50%)`;
      }

      if (currentBracketTarget) {
        moveBrackets(
          currentBracketTarget
        );
      }
    }
  );

  document.addEventListener(
    "pointerover",
    event => {
      if (!desktopCursorActive) {
        return;
      }

      const inspectTarget =
        event.target.closest(
          ".example-card"
        );

      if (
        inspectTarget &&
        brackets
      ) {
        currentBracketTarget =
          inspectTarget;

        body.classList.add(
          "inspect-active"
        );

        moveBrackets(
          inspectTarget
        );

        return;
      }

      const target =
        event.target.closest(
          "a,button,input,textarea,select,[role='button'],.btn-primary,.btn-secondary"
        );

      if (!target) {
        return;
      }

      body.classList.add(
        "cursor-hover"
      );

      isSnapped = true;
      currentTarget = target;

      target.classList.add(
        "snap-active"
      );

      const rect =
        target.getBoundingClientRect();

      ring.style.width =
        `${rect.width + 4}px`;

      ring.style.height =
        `${rect.height + 4}px`;

      ring.style.transform =
        `translate(${rect.left + rect.width / 2}px,${rect.top + rect.height / 2}px) translate(-50%,-50%)`;

      ring.classList.add(
        "snap"
      );
    }
  );

  document.addEventListener(
    "pointerout",
    event => {
      if (!desktopCursorActive) {
        return;
      }

      const inspectLeaving =
        event.target.closest(
          ".example-card"
        );

      if (inspectLeaving) {
        currentBracketTarget =
          null;

        body.classList.remove(
          "inspect-active"
        );

        if (brackets) {
          brackets.style.opacity =
            "0";
        }
      }

      const leaving =
        event.target.closest(
          "a,button,input,textarea,select,[role='button'],.btn-primary,.btn-secondary"
        );

      if (!leaving) {
        return;
      }

      body.classList.remove(
        "cursor-hover"
      );

      ring.classList.remove(
        "snap"
      );

      ring.style.width =
        "16px";

      ring.style.height =
        "16px";

      isSnapped = false;
      currentTarget = null;

      leaving.classList.remove(
        "snap-active"
      );
    }
  );

  document.addEventListener(
    "click",
    event => {
      if (!desktopCursorActive) {
        return;
      }

      if (
        event.target.closest(
          ".example-card"
        )
      ) {
        currentBracketTarget =
          null;

        body.classList.remove(
          "inspect-active"
        );

        if (brackets) {
          brackets.style.opacity =
            "0";
        }

        return;
      }

      const transitionButton =
        event.target.closest(
          ".project-initialize,.project-return"
        );

      if (!transitionButton) {
        return;
      }

      setTimeout(() => {
        resetCursorState();

        ringX = mouseX;
        ringY = mouseY;

        ring.style.transform =
          `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
      }, 50);
    }
  );

  ring.style.transition =
    "opacity .25s ease-out,width .25s ease-out,height .25s ease-out";

  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(link => {
      link.addEventListener(
        "click",
        event => {
          if (!desktopCursorActive) {
            return;
          }

          const currentURL =
            window.location.href.split(
              "#"
            )[0];

          const targetURL =
            link.href.split(
              "#"
            )[0];

          if (
            currentURL !== targetURL
          ) {
            return;
          }

          event.preventDefault();

          ring.style.opacity =
            "0";

          setTimeout(() => {
            resetCursorState();

            ringX = mouseX;
            ringY = mouseY;

            ring.style.width =
              "16px";

            ring.style.height =
              "16px";

            ring.style.transform =
              `translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;

            ring.style.opacity =
              "1";
          }, 250);
        }
      );
    });

  document.addEventListener(
    "mousedown",
    () => {
      if (desktopCursorActive) {
        ringInner.style.opacity =
          ".6";
      }
    }
  );

  document.addEventListener(
    "mouseup",
    () => {
      ringInner.style.opacity =
        "";
    }
  );

  window.addEventListener(
    "scroll",
    () => {
      if (!desktopCursorActive) {
        return;
      }

      resetCursorState();
    }
  );

  window.addEventListener(
    "resize",
    () => {
      syncCursorMode();
    }
  );

  window.addEventListener(
    "beforeunload",
    () => {
      ring.classList.remove(
        "snap"
      );

      ring.style.width =
        "16px";

      ring.style.height =
        "16px";
    }
  );
});

