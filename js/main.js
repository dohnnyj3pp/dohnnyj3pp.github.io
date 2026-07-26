// Resume video playback across pages
const introVideo = document.getElementById("intro-video");

window.addEventListener("beforeunload", () => {
    if (introVideo) {
        localStorage.setItem("videoTime", introVideo.currentTime);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const t = localStorage.getItem("videoTime");
    if (introVideo && t) {
        introVideo.currentTime = parseFloat(t);
    }
});

// SPA soft navigation engine
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("page-content");
    if (!container) return;

    function setActiveNav(urlPath) {
        document.querySelectorAll(".nav-links a").forEach(link => {
            const href = link.getAttribute("href");
            if (href === urlPath) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function loadPage(url) {
        document.body.classList.add("transitioning");

        fetch(url)
            .then(res => res.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");

                const newContent = doc.getElementById("page-content");
                const newBodyClass = doc.body.className;

                if (!newContent) return;

                container.style.opacity = 0;

                setTimeout(() => {
                    container.innerHTML = newContent.innerHTML;
                    document.body.className = newBodyClass + " page-loaded";
                    setActiveNav(url);
                    container.style.opacity = 1;

                    setTimeout(() => {
                        document.body.classList.remove("transitioning");
                    }, 400);
                }, 250);
            })
            .catch(err => {
                console.error("SPA load error", err);
                window.location.href = url;
            });
    }

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", e => {
            const url = link.getAttribute("href");
            if (!url || url.startsWith("http")) return;

            e.preventDefault();
            history.pushState(null, "", url);
            loadPage(url);
        });
    });

    window.addEventListener("popstate", () => {
        const path = location.pathname.replace(/^\//, "") || "index.html";
        loadPage(path);
    });

    document.body.classList.add("page-loaded");
});

// Simple parallax motion blur hook (optional JS tie-in)
window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-layer").forEach(layer => {
        layer.classList.add("moving");
        setTimeout(() => layer.classList.remove("moving"), 150);
    });
});
