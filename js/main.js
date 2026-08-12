// main.js — persistent video, soft navigation, hero motion

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const video = document.getElementById("intro-video");
  const yearSpan = document.getElementById("year");

  let pageContent = document.getElementById("page-content");
  let activeRequest;
  let heroStarted = false;
  let heroTimers = [];
  let parallaxFrame;
  let mobileNavGlobalsBound = false;

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (video) {
    video.play().catch(() => { });
  }

  function revealContent(content) {
    if (!content) return;

    content.classList.add("is-entering");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        content.classList.remove("is-entering");
      });
    });
  }

  function loadPageAssets(nextDocument) {
    const styles =
      nextDocument.querySelectorAll(
        "link[rel='stylesheet']"
      );

    styles.forEach(style => {
      const href = style.href;

      if (href.includes("portfolio.css")) {
        return;
      }

      if (
        !document.querySelector(
          `link[href="${href}"]`
        )
      ) {
        const link =
          document.createElement("link");

        link.rel = "stylesheet";
        link.href = href;

        document.head.appendChild(link);
      }
    });

    const scripts =
      nextDocument.querySelectorAll(
        "script[src]"
      );

    scripts.forEach(script => {
      const src = script.src;

      if (
        src.includes("main.js") ||
        src.includes("cursor.js") ||
        src.includes("nav-orbit.js")
      ) {
        return;
      }

      if (
        document.querySelector(
          `script[src="${src}"]`
        )
      ) {
        return;
      }

      const newScript =
        document.createElement("script");

      newScript.src = src;

      newScript.onload = () => {
        initializePageModule();
      };

      document.body.appendChild(newScript);
    });
  }

  function clearHeroTimers() {
    heroTimers.forEach(timer => {
      clearTimeout(timer);
    });

    heroTimers = [];
  }

  function resetHeroState() {
    clearHeroTimers();

    body.classList.remove(
      "hero-ready",
      "title-ready",
      "text-ready",
      "platform-ready"
    );

    document
      .querySelector(".hero-content")
      ?.classList.remove(
        "hero-enter"
      );

    heroStarted = false;
  }

  function setActiveNav(url) {
    const filename =
      url.pathname.split("/").pop() ||
      "index.html";

    document
      .querySelectorAll(".nav-links a")
      .forEach(link => {
        const href =
          link.getAttribute("href");

        link.classList.toggle(
          "active",
          href === filename
        );
      });
  }

  function closeMobileNav() {
    const toggle =
      document.querySelector(
        ".mobile-nav-toggle"
      );

    const menu =
      document.querySelector(
        "#mobile-nav-menu"
      );

    if (!toggle || !menu) {
      return;
    }

    menu.classList.remove(
      "mobile-open"
    );

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  function initMobileNav() {
    const toggle =
      document.querySelector(
        ".mobile-nav-toggle"
      );

    const menu =
      document.querySelector(
        "#mobile-nav-menu"
      );

    if (!toggle || !menu) {
      return;
    }

    if (
      toggle.dataset.mobileNavBound ===
      "true"
    ) {
      return;
    }

    toggle.dataset.mobileNavBound = "true";

    toggle.addEventListener(
      "click",
      event => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen =
          menu.classList.toggle(
            "mobile-open"
          );

        toggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );
      }
    );

    menu
      .querySelectorAll("a")
      .forEach(link => {
        link.addEventListener(
          "click",
          () => {
            closeMobileNav();
          }
        );
      });

    // Ways to close the mobile menu.
    //
    // Before this, the only way to close the menu was to tap the
    // hamburger again or follow a link, so tapping anywhere else on
    // the page left it stuck open on top of the content.
    //
    // These three listeners live on the whole document rather than on
    // the button, so they are only ever attached once. This function
    // runs again each time you move between pages, and without this
    // guard we would stack up a duplicate set of listeners every time.
    if (mobileNavGlobalsBound) {
      return;
    }

    mobileNavGlobalsBound = true;

    // 1. Tapping anywhere outside the menu closes it.
    document.addEventListener(
      "click",
      event => {
        const openMenu =
          document.querySelector(
            "#mobile-nav-menu.mobile-open"
          );

        if (!openMenu) {
          return;
        }

        // Taps on the menu itself, or on the hamburger, are not
        // "outside", so they are ignored here.
        if (
          event.target.closest(
            "#mobile-nav-menu, .mobile-nav-toggle"
          )
        ) {
          return;
        }

        closeMobileNav();
      }
    );

    // 2. The Escape key closes it, which people expect from any
    //    pop-out panel and which keyboard users rely on.
    document.addEventListener(
      "keydown",
      event => {
        if (event.key === "Escape") {
          closeMobileNav();
        }
      }
    );

    // 3. If the window is widened back to the full desktop menu while
    //    the mobile one is open, the "open" state would otherwise stay
    //    stuck on and interfere with the desktop bar.
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 1080) {
          closeMobileNav();
        }
      }
    );
  }

  function restartProjectBeam() {
    const beam =
      document.querySelector(
        ".project-beam"
      );

    if (!beam) {
      return;
    }

    beam.style.animation = "none";

    void beam.offsetWidth;

    beam.style.animation =
      "projectBeamRise 1.8s cubic-bezier(.22,.61,.36,1) 6.05s forwards";
  }

  function setPageMode(nextBody) {
    body.classList.toggle(
      "hero-page",
      nextBody.classList.contains(
        "hero-page"
      )
    );

    body.classList.toggle(
      "subpage",
      nextBody.classList.contains(
        "subpage"
      )
    );

    body.classList.toggle(
      "projects-page",
      nextBody.classList.contains(
        "projects-page"
      )
    );

    if (
      nextBody.classList.contains(
        "projects-page"
      )
    ) {
      body.classList.remove(
        "platform-ready"
      );
    } else {
      body.classList.add(
        "platform-ready"
      );
    }
  }

  function initializePageModule() {
    initMobileNav();

    if (
      body.classList.contains(
        "projects-page"
      ) &&
      typeof window.initProjects ===
      "function"
    ) {
      window.initProjects();
    }
  }

  function enterHero() {
    const heroContent =
      document.querySelector(
        ".hero-content"
      );

    if (heroContent) {
      heroContent.classList.add(
        "hero-enter"
      );
    }
  }

  function startHeroSequence() {
    if (
      !body.classList.contains(
        "hero-page"
      ) ||
      heroStarted
    ) {
      return;
    }

    heroStarted = true;

    const run = () => {
      clearHeroTimers();

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "nav-ready"
          );
        }, 700)
      );

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "hero-ready"
          );

          enterHero();
        }, 1300)
      );

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "title-ready"
          );
        }, 1700)
      );

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "text-ready"
          );
        }, 2300)
      );

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "platform-ready"
          );
        }, 3000)
      );

      heroTimers.push(
        setTimeout(() => {
          body.classList.add(
            "cursor-visible"
          );
        }, 3800)
      );
    };

    if (
      !video ||
      video.readyState >= 2
    ) {
      run();
    } else {
      video.addEventListener(
        "loadeddata",
        run,
        {
          once: true
        }
      );
    }
  }

  async function loadPage(
    url,
    {
      pushState = false
    } = {}
  ) {
    if (activeRequest) {
      activeRequest.abort();
    }

    const controller =
      new AbortController();

    activeRequest = controller;

    const enteringHome =
      url.pathname.endsWith(
        "index.html"
      ) ||
      url.pathname.endsWith("/");

    if (
      body.classList.contains(
        "hero-page"
      )
    ) {
      resetHeroState();
    }

    body.classList.add(
      "transitioning"
    );

    try {
      const response =
        await fetch(
          url.href,
          {
            signal:
              controller.signal
          }
        );

      if (!response.ok) {
        throw new Error(
          `Could not load ${url.pathname}`
        );
      }

      const html =
        await response.text();

      if (
        activeRequest !== controller
      ) {
        return;
      }

      const nextDocument =
        new DOMParser()
          .parseFromString(
            html,
            "text/html"
          );

      const nextContent =
        nextDocument.getElementById(
          "page-content"
        );

      if (!nextContent) {
        throw new Error(
          "Missing page-content"
        );
      }

      setPageMode(
        nextDocument.body
      );

      nextContent.classList.add(
        "is-entering"
      );

      pageContent.replaceWith(nextContent);

      pageContent = nextContent;

      if (
        body.classList.contains("hero-page") &&
        typeof window.refreshProjectBeam === "function"
      ) {
        window.refreshProjectBeam();
      }

      loadPageAssets(nextDocument);

      document.title = nextDocument.title;

      setActiveNav(url);

      if (pushState) {
        history.pushState(
          {},
          "",
          url.href
        );
      }

      requestAnimationFrame(() => {
        body.classList.remove(
          "transitioning"
        );

        nextContent.classList.remove(
          "is-entering"
        );

        requestAnimationFrame(() => {
          initializePageModule();

          if (
            enteringHome &&
            body.classList.contains(
              "hero-page"
            )
          ) {
            restartProjectBeam();
          }
        });
      });

      startHeroSequence();
    } catch (error) {
      if (
        error.name !==
        "AbortError"
      ) {
        window.location.assign(
          url.href
        );
      }
    } finally {
      if (
        activeRequest ===
        controller
      ) {
        activeRequest =
          undefined;
      }
    }
  }

  document.addEventListener(
    "click",
    event => {
      const link =
        event.target.closest(
          "a[href]"
        );

      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target ||
        link.hasAttribute(
          "download"
        )
      ) {
        return;
      }

      const url =
        new URL(
          link.href,
          window.location.href
        );

      const isSitePage =
        url.origin ===
        window.location.origin &&
        (
          url.pathname.endsWith(
            ".html"
          ) ||
          url.pathname.endsWith(
            "/"
          )
        );

      if (
        !isSitePage ||
        url.hash ||
        url.href ===
        window.location.href
      ) {
        return;
      }

      event.preventDefault();

      closeMobileNav();

      loadPage(
        url,
        {
          pushState: true
        }
      );
    }
  );

  window.addEventListener(
    "popstate",
    () => {
      loadPage(
        new URL(
          window.location.href
        )
      );
    }
  );

  document.addEventListener(
    "pointermove",
    event => {
      if (
        !window.matchMedia(
          "(pointer:fine)"
        ).matches
      ) {
        return;
      }

      const offsetX =
        (
          event.clientX /
          window.innerWidth -
          0.5
        ) * -6;

      const offsetY =
        (
          event.clientY /
          window.innerHeight -
          0.5
        ) * -6;

      if (parallaxFrame) {
        cancelAnimationFrame(
          parallaxFrame
        );
      }

      parallaxFrame =
        requestAnimationFrame(() => {
          const heroInner =
            document.querySelector(
              ".hero-description"
            );

          if (heroInner) {
            heroInner.style.transform =
              `translate3d(${offsetX}px, ${offsetY}px, 20px)`;
          }
        });
    }
  );

  body.classList.add(
    "page-loaded"
  );

  if (
    !body.classList.contains(
      "hero-page"
    )
  ) {
    body.classList.add(
      "nav-ready",
      "platform-ready"
    );
  }

  revealContent(
    pageContent
  );

  initializePageModule();

  startHeroSequence();
});