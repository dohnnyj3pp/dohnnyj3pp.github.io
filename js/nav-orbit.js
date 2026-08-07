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


    return normalized;

  }


  function getCurrentTarget() {

    const currentPath =
      normalizePath(
        window.location.pathname
      );


    let match = null;


    targets.forEach(target => {

      if (
        target.classList.contains(
          "nav-external"
        )
      ) {

        return;

      }


      const href =
        target.getAttribute("href");


      if (
        !href ||
        href === "#"
      ) {

        return;

      }


      const targetPath =
        normalizePath(
          new URL(
            href,
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


    positionOrbit(target);


    activeTarget =
      target;


    orbitRing.classList.add(
      "orbit-active"
    );

  }


  function activateOrbit(target) {

    if (
      !target ||
      target.classList.contains(
        "nav-external"
      )
    ) {

      return;

    }


    orbitRing.classList.remove(
      "orbit-active"
    );


    activeTarget =
      null;


    setTimeout(() => {

      showOrbit(target);

    }, 350);

  }


  /*
  Wait for fonts before measuring
  navigation dimensions.
  */

  document.fonts.ready.then(() => {

    const currentTarget =
      getCurrentTarget();


    const currentPath =
      normalizePath(
        window.location.pathname
      );


    /*
    Fresh homepage load:
    HOME starts without a border.
    */

    if (
      currentPath === "/index.html"
    ) {

      activeTarget =
        null;

      orbitRing.classList.remove(
        "orbit-active"
      );

    }


    /*
    Internal subpages:
    show the current page border.
    */

    else if (currentTarget) {

      requestAnimationFrame(() => {

        showOrbit(
          currentTarget
        );

      });

    }


    /*
    Navigation clicks.
    */

    targets.forEach(target => {

      target.addEventListener(
        "click",
        event => {

          const href =
            target.getAttribute("href");


          if (
            !href ||
            href === "#"
          ) {

            return;

          }


          /*
          GitHub:
          no navigation orbit.
          */

          if (
            target.classList.contains(
              "nav-external"
            )
          ) {

            orbitRing.classList.remove(
              "orbit-active"
            );

            activeTarget =
              null;

            return;

          }


          const currentPath =
            normalizePath(
              window.location.pathname
            );


          const targetPath =
            normalizePath(
              new URL(
                href,
                window.location.href
              ).pathname
            );


          /*
          Already on this page.
          */

          if (
            currentPath === targetPath
          ) {

            event.preventDefault();

            return;

          }


          /*
          Internal navigation:
          remove the old border,
          then place the new one.
          */

          activateOrbit(
            target
          );

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

  });

});