// nav-orbit.js — active navigation perimeter system

document.addEventListener("DOMContentLoaded", () => {

  const orbitRing =
    document.querySelector(".nav-orbit-ring");

  const targets =
    document.querySelectorAll(".nav-target");


  if (!orbitRing || !targets.length) {
    return;
  }


  let activeTarget = null;


  function positionOrbit(target) {

    if (!target) {
      return;
    }


    const nav =
      target.closest("nav");


    if (!nav) {
      return;
    }


    const rect =
      target.getBoundingClientRect();


    const navRect =
      nav.getBoundingClientRect();


    orbitRing.style.width =
      `${rect.width + 4}px`;


    orbitRing.style.height =
      `${rect.height + 4}px`;


    orbitRing.style.left =
      `${rect.left - navRect.left - 2}px`;


    orbitRing.style.top =
      `${rect.top - navRect.top - 2}px`;

  }


  function normalizePath(path) {

    let normalized =
      path.replace(/\/+$/, "");


    if (
      normalized === "" ||
      normalized === "/"
    ) {

      return "/index.html";

    }


    if (
      !normalized.endsWith(".html")
    ) {

      normalized += "/index.html";

    }


    return normalized;

  }


  function getCurrentTarget() {

    const currentPath =
      normalizePath(
        window.location.pathname
      );


    let match = null;


    targets.forEach(target => {

      const targetPath =
        normalizePath(
          new URL(
            target.getAttribute("href"),
            window.location.href
          ).pathname
        );


      if (
        targetPath === currentPath
      ) {

        match = target;

      }

    });


    return match;

  }


  function showOrbit(target) {

    if (!target) {
      return;
    }


    activeTarget =
      target;


    positionOrbit(target);


    orbitRing.classList.add(
      "orbit-active"
    );

  }


  function activateOrbit(target) {

    if (
      !target ||
      target === activeTarget
    ) {

      return;

    }


    orbitRing.classList.remove(
      "orbit-active"
    );


    setTimeout(() => {

      showOrbit(target);

    }, 350);

  }


  function initializeCurrentPage() {

    const currentTarget =
      getCurrentTarget();


    if (!currentTarget) {
      return;
    }


    activeTarget =
      currentTarget;


    requestAnimationFrame(() => {

      positionOrbit(currentTarget);


      orbitRing.classList.add(
        "orbit-active"
      );

    });

  }


  targets.forEach(target => {

    target.addEventListener(
      "click",
      event => {

        const currentPath =
          normalizePath(
            window.location.pathname
          );


        const targetPath =
          normalizePath(
            new URL(
              target.getAttribute("href"),
              window.location.href
            ).pathname
          );


        if (
          currentPath === targetPath
        ) {

          event.preventDefault();

          return;

        }


        activateOrbit(target);

      }
    );

  });


  window.addEventListener(
    "resize",
    () => {

      if (activeTarget) {

        positionOrbit(
          activeTarget
        );

      }

    }
  );


  initializeCurrentPage();

});