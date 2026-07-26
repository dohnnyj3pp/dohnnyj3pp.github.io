// -------------------------------
// CINEMATIC VIDEO ENGINE
// -------------------------------

const introVideo = document.getElementById("intro-video");

// First-load video start logic
window.addEventListener("DOMContentLoaded", () => {
    const hasStarted = sessionStorage.getItem("videoStarted");

    if (!hasStarted) {
        // First time visitor → start at 0
        if (introVideo) introVideo.currentTime = 0;
        sessionStorage.setItem("videoStarted", "true");
    }
});

// -------------------------------
// HERO PARALLAX (with depth)
// -------------------------------

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    const hero = document.querySelector(".hero-content");
    if (hero) {
        hero.style.transform =
            `translate(-50%, -50%) translate(${x}px, ${y}px) translateZ(20px)`;
    }
});

// -------------------------------
// CURSOR HOVER REBIND
// -------------------------------

function bindCursorHover() {
    document.querySelectorAll("a, button, .project-card").forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}

// -------------------------------
// SPA SOFT NAVIGATION ENGINE
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("page-content");
    if (!container) return;

    function setActiveNav(urlPath) {
        document.querySelectorAll(".nav-links a").forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === urlPath);
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

                    // Restore body class + cursor class
                    document.body.className = newBodyClass + " page-loaded";
                    document.body.classList.add("custom-cursor-enabled");

                    // Rebind cursor hover
                    bindCursorHover();

                    // Reapply hero entrance animation
                    const hero = document.querySelector(".hero-content");
                    if (hero) {
                        hero.classList.add("hero-enter");
                        setTimeout(() => hero.classList.remove("hero-enter"), 1200);
                    }

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
    bindCursorHover();
});

// -------------------------------
// OPTIONAL PARALLAX MOTION BLUR
// -------------------------------

window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-layer").forEach(layer => {
        layer.classList.add("moving");
        setTimeout(() => layer.classList.remove("moving"), 150);
    });
});
