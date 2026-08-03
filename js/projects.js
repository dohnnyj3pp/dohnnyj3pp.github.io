const PLATFORM = {
    state: "carousel",
    project: 1
};
let initializingTimer;
let typingTimer;
let currentCategory = "languages";
let currentModule = null;
let platform;
let cards;
let previous;
let next;
let initialize;
let returnButton;
let status;
let statusText;
let loadingFill;
let loadingPercent;
function cacheDOM() {
    platform = document.querySelector(".project-platform");
    cards = document.querySelectorAll(".project-card");
    previous = document.querySelector(".carousel-prev");
    next = document.querySelector(".carousel-next");
    initialize = document.querySelector(".project-initialize");
    returnButton = document.querySelector(".project-return");
    status = document.querySelector(".project-status");
    statusText = document.querySelector(".status-text");
    loadingFill = document.querySelector(".loading-fill");
    loadingPercent = document.querySelector(".loading-percent");
}
function setPlatformState(nextState) {
    PLATFORM.state = nextState;
    platform.classList.remove(
        "carousel",
        "booting",
        "deploying",
        "online",
        "shutdown"
    );
    platform.classList.add(
        nextState
    );
}
function bootProject() {
    console.log(activeModuleAvailable());
    if (!activeModuleAvailable()) return;
    setPlatformState("booting");
    startDocumentationBoot();
}
function initProjects() {
    cacheDOM();
    const viewer = document.querySelector(".documentation-viewer");
    viewer?.classList.add("deploy-hidden");
    if (!platform) return;
    setPlatformState("carousel");
    renderCarousel();
    bindEvents();
    setOffline();
    console.log("Portfolio Platform Online");
}
function renderCarousel() {
    const total = cards.length;
    cards.forEach((card, index) => {
        card.classList.remove(
            "active",
            "previous",
            "next",
            "hidden"
        );
        if (index === PLATFORM.project) {
            card.classList.add("active");
        }
        else if (index === (PLATFORM.project - 1 + total) % total) {
            card.classList.add("previous");
        }
        else if (index === (PLATFORM.project + 1) % total) {
            card.classList.add("next");
        }
        else {
            card.classList.add("hidden");
        }
    });
}
function rotateCarousel(direction) {
    if (PLATFORM.state !== "carousel") return;
    PLATFORM.project += direction;
    if (PLATFORM.project < 0) {
        PLATFORM.project = cards.length - 1;
    }
    if (PLATFORM.project >= cards.length) {
        PLATFORM.project = 0;
    }
    renderCarousel();
}
function activeModuleAvailable() {
    const card = cards[PLATFORM.project];
    return (
        card &&
        card.dataset.module === "available"
    );
}
function bootProject() {
    if (!activeModuleAvailable()) return;
    setPlatformState("booting");
    startDocumentationBoot();
}
function startDocumentationBoot() {
    status.className = "project-status booting";
    statusText.className =
        "status-text initializing-text";
    statusText.textContent = "";
    statusText.style.visibility = "hidden";
    const loader = document.querySelector(".loading-container");
    const fill = document.querySelector(".loading-fill");
    const percent = document.querySelector(".loading-percent");
    const loadingLabel = document.querySelector(".loading-label");
    loader.style.display = "flex";
    fill.style.width = "0%";
    percent.textContent = "0%";
    if (loadingLabel) {
        loadingLabel.textContent = "LOADING DATA";
        loadingLabel.style.backgroundImage =
            "linear-gradient(90deg, #f6f9fa 0%, #f7f5f3 0%, #ffffff 0%, #ffffff 100%)";
    }
    let progress = 0;
    clearInterval(initializingTimer);
    function update() {
        progress += Math.floor(
            Math.random() * 4
        ) + 2;
        if (progress >= 99) {
            progress = 99;
        }
        if (loadingFill) {
            loadingFill.style.width =
                progress + "%";
        }
        if (loadingPercent) {
            loadingPercent.textContent =
                progress + "%";
        }
        if (loadingLabel) {
            loadingLabel.style.backgroundImage =
                `linear-gradient(90deg, #a705cf 0%, #0824a1, ${progress}%, #ffffff ${progress}%, #ffffff 100%)`;
        }
        if (progress >= 99) {
            clearInterval(initializingTimer);
            initializeDocumentation();
            setTimeout(() => {
                deployDocumentation();
            }, 350);
        }
    }
    update();
    initializingTimer = setInterval(
        update,
        120
    );
}
function initializeDocumentation() {
    currentCategory = "summary";
    currentModule = null;
    buildCategories();
    clearModules();
    clearDocumentation();
}
function getPortfolioData() {
    return window.PROJECT_DATA?.portfolio?.categories || projectData;
}
function clearModules() {
    const container = document.querySelector(".module-navigation");
    if (!container) return;
    container.innerHTML = "";
}
function clearDocumentation() {
    const content = document.querySelector(".documentation-content");
    if (!content) return;
    content.innerHTML = "";
}
function deployDocumentation() {
    setPlatformState("deploying");
    const viewer = document.querySelector(".documentation-viewer");
    viewer?.classList.remove(
        "deploy-hidden"
    );
    viewer?.classList.add(
        "deploy-seed"
    );
    setTimeout(() => {
        viewer?.classList.remove(
            "deploy-seed"
        );
        viewer?.classList.add(
            "deploy-expand"
        );
    }, 600);
    setTimeout(() => {
        finishBoot();
    }, 900);
}
function finishBoot() {
    setPlatformState("online");
    status.className = "project-status online";
    const loader = document.querySelector(".loading-container");
    if (loader) {
        loader.style.display = "none";
    }
    statusText.className = "status-text online-text";
    statusText.style.visibility = "visible";
    statusText.textContent = "ONLINE";
    document.querySelector(".terminal-cursor")
        ?.style.setProperty(
            "display",
            "inline-block"
        );
    showDocumentationSystem();
    setTimeout(() => {
        loadDocumentation();
    }, 900);
}
function loadCategoryIntroduction() {
    const content = document.querySelector(".documentation-content");
    if (!content) return;
    const dataSource = getPortfolioData();
    const category = dataSource[currentCategory];
    if (!category) {
        return;
    }
    content.innerHTML = `
        <h2>${category.title}</h2>
        <div class="typed-overview"></div>
    `;
    const typedElement =
        content.querySelector(".typed-overview");
    if (category.introduction) {
        typeWriter(
            category.introduction,
            typedElement
        );
    }
}
function showDocumentationSystem() {
    const documentationSystem = document.querySelector(".documentation-system");
    const buttons = document.querySelectorAll(".project-category");
    if (!documentationSystem) return;
    documentationSystem.classList.add("visible");
    buttons.forEach((button, index) => {
        button.classList.remove(
            "show",
            "enter-left",
            "enter-right"
        );
        button.classList.add(
            index % 2 === 0 ? "enter-left" : "enter-right"
        );
        setTimeout(() => {
            button.classList.add("show");
        }, 220 * index + 180);
    });
}
function buildCategories() {
    const buttons = document.querySelectorAll(".project-category");
    const documentationSystem = document.querySelector(".documentation-system");
    buttons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === currentCategory
        );
    });
    buttons.forEach(button => {
        button.onclick = () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentCategory = button.dataset.category;
            currentModule = null;
            buildModules();
            loadCategoryIntroduction();
            if (documentationSystem) {
                documentationSystem.classList.remove(
                    "popout-closed"
                );
                documentationSystem.classList.add(
                    "popout-active"
                );
            }
        };
    });
}
function animateModuleTransition(callback) {
    const container = document.querySelector(".module-navigation");
    if (!container) return callback();
    const buttons = container.querySelectorAll(".technology-item");
    if (!buttons.length) return callback();
    buttons.forEach((button, idx) => {
        button.classList.remove("show");
        button.classList.add("exit");
        setTimeout(() => {
            if (button.parentNode) {
                button.parentNode.removeChild(button);
            }
        }, 160 + idx * 40);
    });
    setTimeout(callback, 220);
}
function buildModules() {
    const container = document.querySelector(".module-navigation");
    if (!container) return;
    animateModuleTransition(() => {
        container.innerHTML = "";
        const dataSource = getPortfolioData();
        const category = dataSource?.[currentCategory];
        if (currentCategory === "summary") {
            currentModule = null;
            loadDocumentation();
            return;
        }
        const modules = category?.modules;
        if (!modules || Object.keys(modules).length === 0) {
            container.innerHTML = `
                <div class="technology-item empty-state show">
                    No modules available for this category yet.
                </div>
            `;
            return;
        }
        Object.keys(modules).forEach((module, idx) => {
            const button = document.createElement("button");
            button.className = "technology-item";
            if (currentModule === module) {
                button.classList.add("active");
            }
            button.textContent = module;
            button.onclick = () => {
                const siblings = container.querySelectorAll(".technology-item");
                siblings.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                currentModule = module;
                loadDocumentation();
            };
            container.appendChild(button);
            setTimeout(() => {
                button.classList.add("show");
            }, 70 * idx + 80);
        });
    });
}
function loadDocumentation() {
    const content = document.querySelector(".documentation-content");
    const documentationSystem = document.querySelector(".documentation-system");
    if (!content) return;
    content.classList.remove("animate-in");
    void content.offsetWidth;
    if (currentCategory !== "summary" && !currentModule) {
        content.innerHTML = `
            <h2>Portfolio Documentation</h2>
            <p>Select a technology module.</p>
        `;
        return;
    }
    const dataSource = getPortfolioData();
    let data;
    if (currentCategory === "summary") {
        data = dataSource.summary;
    } else {
        data = dataSource[currentCategory]?.modules?.[currentModule];
    }
    if (!data) {
        content.innerHTML = `
            <h2>Module not found</h2>
            <p>Try selecting another category or module.</p>
        `;
        content.classList.add("animate-in");
        return;
    }
    const sections = (data.sections || [])
        .map(section => {
            let list = "";
            if (Array.isArray(section.content)) {
                list = section.content
                    .map(item => `<li>${item}</li>`)
                    .join("");
            }
            else if (Array.isArray(section.details)) {
                list = section.details
                    .map(item => `<li>${item}</li>`)
                    .join("");
            }
            else {
                list = `<li>${section.content}</li>`;
            }
            return `
                <div class="doc-section">
                    <div class="section-header">
                        ${section.heading}
                    </div>
                    <div class="section-content">
                        <ul>
                            ${list}
                        </ul>
                    </div>
                </div>
            `;
        })
        .join("");
    content.innerHTML = `
        <h2>${data.title}</h2>
        <div class="typed-overview"></div>
        ${data.intro
            ? `<div class="examples-label">${data.intro}</div>`
            : ""
        }
        ${sections}
    `;
    const typedElement = content.querySelector(".typed-overview");
    typeWriter(
        data.overview,
        typedElement
    );
    content.classList.add("animate-in");
    if (documentationSystem) {
        documentationSystem.classList.add("visible");
    }
}
content.innerHTML = `
    <h2>${data.title}</h2>
    <div class="typed-overview"></div>
    ${data.intro ? `<div class="examples-label">${data.intro}</div>` : ""}
    ${sections}
    `;
const typedElement = content.querySelector(".typed-overview");
typeWriter(data.overview, typedElement);
content.classList.add("animate-in");
if (documentationSystem) {
    documentationSystem.classList.add("visible");
}
function typeWriter(text, target) {
    if (!target) return;
    if (typingTimer) {
        clearTimeout(typingTimer);
    }
    target.innerHTML = "";
    const temp = document.createElement("div");
    temp.innerHTML = text;
    const formatted = temp.innerHTML;
    let index = 0;
    function step() {
        target.innerHTML = formatted.slice(0, index);
        const viewer = document.querySelector(".documentation-viewer");
        if (viewer) {
            viewer.scrollTop = viewer.scrollHeight;
        }
        index++;
        if (index <= formatted.length) {
            typingTimer = setTimeout(step, 9);
        }
    }
    step();
}
function setOffline() {
    status.className = "project-status offline";
    statusText.className = "status-text offline-text";
    statusText.style.visibility = "visible";
    statusText.textContent = "OFFLINE";
    document.querySelector(".terminal-cursor")
        ?.style.setProperty(
            "display",
            "none"
        );
    document.querySelector(".loading-container").style.display = "none";
}
function shutdownProject() {
    clearTimeout(initializingTimer);
    clearTimeout(typingTimer);
    setPlatformState("carousel");
    const viewer = document.querySelector(".documentation-viewer");
    viewer?.classList.remove(
        "deploy-seed",
        "deploy-expand"
    );
    viewer?.classList.add(
        "deploy-hidden"
    );
    const categories = document.querySelector(
        ".category-navigation"
    );
    categories?.classList.remove(
        "deploy-slide"
    );
    const documentationSystem = document.querySelector(
        ".documentation-system"
    );
    documentationSystem?.classList.remove(
        "visible"
    );
    clearModules();
    clearDocumentation();
    currentModule = null;
    setOffline();
}
function bindEvents() {
    previous?.addEventListener(
        "click",
        () => rotateCarousel(-1)
    );
    next?.addEventListener(
        "click",
        () => rotateCarousel(1)
    );
    initialize?.addEventListener(
        "click",
        () => {
            initialize.classList.add(
                "powering"
            );
            setTimeout(() => {
                initialize.classList.remove(
                    "powering"
                );
            }, 700);
            bootProject();
        }
    );
    returnButton?.addEventListener(
        "click",
        shutdownProject
    );
}
window.initProjects = initProjects;
document.addEventListener(
    "DOMContentLoaded",
    initProjects
);