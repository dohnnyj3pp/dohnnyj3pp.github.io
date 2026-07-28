// main.js — persistent video, soft navigation, and hero motion
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const video = document.getElementById("intro-video");
  const yearSpan = document.getElementById("year");
  let pageContent = document.getElementById("page-content");
  let activeRequest;

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (video) video.play().catch(() => {});

  function revealContent(content) {
    if (!content) return;

    content.classList.add("is-entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => content.classList.remove("is-entering"));
    });
  }

  function setActiveNav(url) {
    const filename = url.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === filename);
    });
  }

  function isHomePage(url) {
    return (url.pathname.split("/").pop() || "index.html") === "index.html";
  }

  function startBackgroundTransition(url) {
    body.classList.toggle("hero-page", isHomePage(url));
    body.classList.toggle("subpage", !isHomePage(url));
  }

  function enterHero() {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) heroContent.classList.add("hero-enter");
  }

function setPageMode(nextBody) {

  body.classList.toggle(
    "hero-page",
    nextBody.classList.contains("hero-page")
  );

  body.classList.toggle(
    "subpage",
    nextBody.classList.contains("subpage")
  );

}

  async function loadPage(url, { pushState = false } = {}) {
    if (activeRequest) activeRequest.abort();

    const controller = new AbortController();
    activeRequest = controller;
    startBackgroundTransition(url);
    body.classList.add("transitioning");

    try {
      const response = await fetch(url.href, { signal: controller.signal });
      if (!response.ok) throw new Error(`Could not load ${url.pathname}`);

      const documentText = await response.text();
      if (activeRequest !== controller) return;

      // Let the outgoing content fade while the video starts its new treatment.
      await new Promise((resolve) => window.setTimeout(resolve, 180));
      if (activeRequest !== controller) return;

      const nextDocument = new DOMParser().parseFromString(documentText, "text/html");
      const nextContent = nextDocument.getElementById("page-content");
      if (!nextContent) throw new Error("The requested page has no page content.");

      // Keep this document and its video alive; only replace the changing main content.
      setPageMode(nextDocument.body);
      nextContent.classList.add("is-entering");
      pageContent.replaceWith(nextContent);
      pageContent = nextContent;
      document.title = nextDocument.title;
      setActiveNav(url);

      if (pushState) history.pushState({}, "", url.href);

      requestAnimationFrame(() => {
        body.classList.remove("transitioning");
        requestAnimationFrame(() => nextContent.classList.remove("is-entering"));
      });

      enterHero();
    } catch (error) {
      if (error.name !== "AbortError") window.location.assign(url.href);
    } finally {
      if (activeRequest === controller) activeRequest = undefined;
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download")
    ) {
      return;
    }

    const url = new URL(link.href, window.location.href);
    const isSitePage =
      url.origin === window.location.origin &&
      (url.pathname.endsWith(".html") || url.pathname.endsWith("/"));

    if (!isSitePage || url.hash || url.href === window.location.href) return;

    event.preventDefault();
    loadPage(url, { pushState: true });
  });

  window.addEventListener("popstate", () => {
    loadPage(new URL(window.location.href));
  });

  body.classList.add("page-loaded");
  revealContent(pageContent);
  enterHero();
  startHeroSequence();

  function enterHero() {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) heroContent.classList.add("hero-enter");
}

function startHeroSequence() {

  if (!body.classList.contains("hero-page")) return;

  const video = document.getElementById("intro-video");

  const run = () => {

    setTimeout(() => body.classList.add("nav-ready"), 200);
    setTimeout(() => body.classList.add("hero-ready"), 550);
    setTimeout(() => body.classList.add("buttons-ready"), 950);
    setTimeout(() => body.classList.add("cursor-visible"), 1200);

  };

  if (!video || video.readyState >= 2) {
    run();
  } else {
    video.addEventListener("loadeddata", run, { once:true });
  }

}

  let parallaxFrame;
  document.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const offsetX = (event.clientX / window.innerWidth - 0.5) * -6;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * -6;

    if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
    parallaxFrame = requestAnimationFrame(() => {
      const heroInner = document.querySelector(".hero-content-inner");
      if (heroInner) {
        heroInner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 20px)`;
      }
    });
  });
});
