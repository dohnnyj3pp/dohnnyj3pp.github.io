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
let initializedPlatform = null;
let eventsBoundTo = null;

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
    if (!platform) return;

    PLATFORM.state = nextState;

    platform.classList.remove(
        "carousel",
        "booting",
        "deploying",
        "online",
        "shutdown"
    );

    platform.classList.add(nextState);
}

function initProjects() {
    cacheDOM();

    if (!platform) {
        initializedPlatform = null;
        eventsBoundTo = null;
        return;
    }

    if (initializedPlatform === platform) {
        return;
    }

    initializedPlatform = platform;

    const viewer = document.querySelector(".documentation-viewer");

    viewer?.classList.add("deploy-hidden");

    setPlatformState("carousel");
    renderCarousel();
    bindEvents();
    bindCodeModalEvents();
    setOffline();

    console.log("Portfolio Platform Online");
}

function renderCarousel() {
    const total = cards.length;

    if (!total) return;

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
        else if (
            index ===
            (PLATFORM.project - 1 + total) % total
        ) {
            card.classList.add("previous");
        }
        else if (
            index ===
            (PLATFORM.project + 1) % total
        ) {
            card.classList.add("next");
        }
        else {
            card.classList.add("hidden");
        }
    });
}

function rotateCarousel(direction) {
    if (
        PLATFORM.state !== "carousel" ||
        !cards.length
    ) {
        return;
    }

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
    if (
        PLATFORM.state !== "carousel" ||
        !activeModuleAvailable()
    ) {
        return;
    }

    const card = cards[PLATFORM.project];
    const project = card?.dataset.project;

    if (project === "poker-hand-trainer") {
        window.open(
            "https://dohnnyj3pp.github.io/poker-hand-trainer",
            "_blank",
            "noopener,noreferrer"
        );
        return;
    }

    setPlatformState("booting");

    platform.classList.add("hud-focus");

    startDocumentationBoot();
}

function startDocumentationBoot() {
    status.className = "project-status booting";

    statusText.className =
        "status-text initializing-text";

    statusText.textContent = "";
    statusText.style.visibility = "hidden";

    const loader =
        document.querySelector(".loading-container");

    const fill =
        document.querySelector(".loading-fill");

    const percent =
        document.querySelector(".loading-percent");

    const loadingLabel =
        document.querySelector(".loading-label");

    if (loader) {
        loader.style.display = "flex";
    }

    if (fill) {
        fill.style.width = "0%";
    }

    if (percent) {
        percent.textContent = "0%";
    }

    if (loadingLabel) {
        loadingLabel.textContent = "LOADING DATA";
        loadingLabel.style.backgroundImage =
            "linear-gradient(90deg,#f6f9fa 0%,#f7f5f3 0%,#fff 0%,#fff 100%)";
    }

    let progress = 0;

    clearInterval(initializingTimer);

    function update() {
        progress +=
            Math.floor(Math.random() * 4) + 2;

        if (progress >= 99) {
            progress = 99;
        }

        if (fill) {
            fill.style.width = `${progress}%`;
        }

        if (percent) {
            percent.textContent = `${progress}%`;
        }

        if (loadingLabel) {
            loadingLabel.style.backgroundImage =
                `linear-gradient(90deg,#a705cf 0%,#0824a1,${progress}%,#fff ${progress}%,#fff 100%)`;
        }

        if (progress >= 99) {
            clearInterval(initializingTimer);

            window.scrollTo(0, 0);

            initializeDocumentation();

            setTimeout(() => {
                deployDocumentation();
            }, 350);
        }
    }

    update();

    initializingTimer =
        setInterval(update, 120);
}

function initializeDocumentation() {
    currentCategory = "summary";
    currentModule = null;

    buildCategories();
    clearModules();
    clearDocumentation();
}

function getPortfolioData() {
    return (
        window.PROJECT_DATA?.portfolio?.categories ||
        projectData
    );
}

function clearModules() {
    const container =
        document.querySelector(".module-navigation");

    if (!container) return;

    container.innerHTML = "";
}

function clearDocumentation() {
    const content =
        document.querySelector(".documentation-content");

    if (!content) return;

    content.innerHTML = "";
}

function deployDocumentation() {
    setPlatformState("deploying");

    platform.classList.remove("hud-focus");
    platform.classList.add("hud-deploy");

    const viewer =
        document.querySelector(".documentation-viewer");

    viewer?.classList.remove("deploy-hidden");
    viewer?.classList.add("deploy-seed");

    setTimeout(() => {
        viewer?.classList.remove("deploy-seed");
        viewer?.classList.add("deploy-expand");
    }, 600);

    setTimeout(() => {
        finishBoot();
    }, 900);
}

function finishBoot() {
    setPlatformState("online");

    platform.classList.remove("hud-deploy");
    platform.classList.add("hud-online");

    status.className =
        "project-status online";

    const loader =
        document.querySelector(".loading-container");

    if (loader) {
        loader.style.display = "none";
    }

    statusText.className =
        "status-text online-text";

    statusText.style.visibility =
        "visible";

    statusText.textContent = "ONLINE";

    document
        .querySelector(".terminal-cursor")
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
    const content =
        document.querySelector(
            ".documentation-content"
        );

    if (!content) return;

    const dataSource =
        getPortfolioData();

    const category =
        dataSource[currentCategory];

    if (!category) return;

    content.innerHTML = `
        <h2>${category.title}</h2>
        <div class="typed-overview"></div>
    `;

    const typedElement =
        content.querySelector(
            ".typed-overview"
        );

    if (category.introduction) {
        typeWriter(
            category.introduction,
            typedElement
        );
    }
}

function showDocumentationSystem() {
    const documentationSystem =
        document.querySelector(
            ".documentation-system"
        );

    const buttons =
        document.querySelectorAll(
            ".project-category"
        );

    if (!documentationSystem) return;

    documentationSystem.classList.add(
        "visible"
    );

    buttons.forEach((button, index) => {
        button.classList.remove(
            "show",
            "enter-left",
            "enter-right"
        );

        button.classList.add(
            index % 2 === 0
                ? "enter-left"
                : "enter-right"
        );

        setTimeout(() => {
            button.classList.add("show");
        }, 220 * index + 180);
    });
}

function buildCategories() {
    const buttons =
        document.querySelectorAll(
            ".project-category"
        );

    const documentationSystem =
        document.querySelector(
            ".documentation-system"
        );

    buttons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category ===
            currentCategory
        );
    });

    buttons.forEach(button => {
        button.onclick = () => {
            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            currentModule = null;

            resetDocumentationScroll();

            buildModules();
            loadCategoryIntroduction();

            documentationSystem?.classList.remove(
                "popout-closed"
            );

            documentationSystem?.classList.add(
                "popout-active"
            );
        };
    });
}

function animateModuleTransition(callback) {
    const container =
        document.querySelector(
            ".module-navigation"
        );

    if (!container) {
        callback();
        return;
    }

    const buttons =
        container.querySelectorAll(
            ".technology-item"
        );

    if (!buttons.length) {
        callback();
        return;
    }

    buttons.forEach((button, index) => {
        button.classList.remove("show");
        button.classList.add("exit");

        setTimeout(() => {
            button.parentNode?.removeChild(
                button
            );
        }, 160 + index * 40);
    });

    setTimeout(callback, 220);
}

function buildModules() {
    const container =
        document.querySelector(
            ".module-navigation"
        );

    if (!container) return;

    animateModuleTransition(() => {
        container.innerHTML = "";

        const dataSource =
            getPortfolioData();

        const category =
            dataSource?.[currentCategory];

        if (currentCategory === "summary") {
            currentModule = null;
            loadDocumentation();
            return;
        }

        const modules =
            category?.modules;

        if (
            !modules ||
            Object.keys(modules).length === 0
        ) {
            container.innerHTML = `
                <div class="technology-item empty-state show">
                    No modules available for this category yet.
                </div>
            `;

            return;
        }

        Object.keys(modules).forEach(
            (module, index) => {
                const button =
                    document.createElement("button");

                button.className =
                    "technology-item";

                if (
                    currentModule === module
                ) {
                    button.classList.add(
                        "active"
                    );
                }

                button.textContent = module;

                button.onclick = () => {
                    container
                        .querySelectorAll(
                            ".technology-item"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add(
                        "active"
                    );

                    currentModule = module;

                    resetDocumentationScroll();

                    loadDocumentation();
                };

                container.appendChild(button);

                setTimeout(() => {
                    button.classList.add(
                        "show"
                    );
                }, 70 * index + 80);
            }
        );
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
}

function detectCodeLanguage(code) {
    if (!code) return "text";

    const trimmed = code.trim();

    if (/^</.test(trimmed)) {
        return "html";
    }

    if (
        /^\s*[@.#]?[a-zA-Z0-9\-_]+\s*\{/.test(
            trimmed
        ) ||
        /:\s*[^;\n]+;/.test(trimmed)
    ) {
        return "css";
    }

    return "js";
}

function highlightCode(code, language) {
    const escaped =
        String(code)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\t/g, "    ");

    if (language === "html") {
        return escaped
            .replace(
                /(&lt;!--[\s\S]*?--&gt;)/g,
                `<span class="token comment">$1</span>`
            )
            .replace(
                /(&lt;\/?)([a-zA-Z0-9-]+)([^&]*?)(\/?&gt;)/g,
                `$1<span class="token tag">$2</span>$3$4`
            )
            .replace(
                /([a-zA-Z-:]+)(=)(&quot;.*?&quot;|&#39;.*?&#39;)/g,
                `<span class="token attr-name">$1</span>$2<span class="token string">$3</span>`
            );
    }

    if (language === "css") {
        return escaped
            .replace(
                /(\/\*[\s\S]*?\*\/)/g,
                `<span class="token comment">$1</span>`
            )
            .replace(
                /([a-zA-Z\-]+)(\s*:\s*)([^;\n]+)(;?)/g,
                `<span class="token property">$1</span>$2<span class="token value">$3</span>$4`
            )
            .replace(
                /([{}])/g,
                `<span class="token punctuation">$1</span>`
            );
    }

    return escaped
        .replace(
            /(\/\*[\s\S]*?\*\/|\/\/.*?$)/gm,
            `<span class="token comment">$1</span>`
        )
        .replace(
            /(".*?"|'.*?'|`[\s\S]*?`)/g,
            `<span class="token string">$1</span>`
        )
        .replace(
            /\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|new|this|document|window|querySelector|addEventListener)\b/g,
            `<span class="token keyword">$1</span>`
        )
        .replace(
            /\b(true|false|null|undefined)\b/g,
            `<span class="token literal">$1</span>`
        )
        .replace(
            /([{}();.,])/g,
            `<span class="token punctuation">$1</span>`
        );
}

function renderDocumentationItem(item) {
    if (typeof item === "string") {
        return `
            <li class="description-item">
                ${escapeHtml(item)}
            </li>
        `;
    }

    const title =
        escapeHtml(
            item?.text ||
            item?.title ||
            "View example"
        );

    const hasCode =
        typeof item === "object" &&
        item?.code;

    if (!hasCode) {
        return `
            <li class="description-item">
                ${title}
            </li>
        `;
    }

    const rawCode = item.code;

    const encodedCode =
        encodeURIComponent(rawCode);

    const language =
        item.language ||
        detectCodeLanguage(rawCode);

    const description =
        item.description
            ? escapeHtml(item.description)
            : "";

    const descriptionAttr =
        description
            ? ` data-description="${description}"`
            : "";

    return `
        <li>
            <button
                type="button"
                class="example-card"
                data-code="${encodedCode}"
                data-title="${title}"
                data-language="${language}"${descriptionAttr}>
                <span>${title}</span>
                <strong>View code</strong>
            </button>
        </li>
    `;
}

function renderDocumentationSection(section) {
    const items =
        Array.isArray(section.content)
            ? section.content
            : Array.isArray(section.details)
                ? section.details
                : [];

    const list =
        items
            .map(renderDocumentationItem)
            .join("");

    return `
        <div class="doc-section">
            <div class="section-header">
                ${escapeHtml(section.heading)}
            </div>

            <div class="section-content">
                <ul>
                    ${list}
                </ul>
            </div>
        </div>
    `;
}

function bindExampleCards() {
    document
        .querySelectorAll(".example-card")
        .forEach(card => {
            card.onclick = () => {
                const rawCode =
                    decodeURIComponent(
                        card.dataset.code || ""
                    );

                openCodeModal(
                    card.dataset.title,
                    rawCode,
                    card.dataset.language,
                    card.dataset.description || ""
                );
            };
        });
}

let codeModalPreviousFocus = null;

function openCodeModal(
    title,
    code,
    language,
    description
) {
    const modal =
        document.querySelector(
            ".code-modal"
        );

    const titleElement =
        modal?.querySelector(
            ".code-modal-title"
        );

    const codeBlock =
        modal?.querySelector(
            ".code-modal-snippet code"
        );

    const descriptionElement =
        modal?.querySelector(
            ".code-modal-description"
        );

    if (
        !modal ||
        !titleElement ||
        !codeBlock ||
        !descriptionElement
    ) {
        return;
    }

    codeModalPreviousFocus =
        document.activeElement;

    titleElement.textContent =
        title || "Code Preview";

    codeBlock.innerHTML =
        highlightCode(
            code || "",
            language ||
            detectCodeLanguage(code)
        );

    descriptionElement.textContent =
        description || "";

    descriptionElement.style.display =
        description
            ? "block"
            : "none";

    modal.scrollTop = 0;

    modal.classList.add("visible");

    document.body.classList.add(
        "code-modal-open"
    );
}

function closeCodeModal() {
    const modal =
        document.querySelector(
            ".code-modal"
        );

    if (!modal) return;

    if (
        document.activeElement &&
        modal.contains(
            document.activeElement
        )
    ) {
        document.activeElement.blur();
    }

    modal.classList.remove("visible");

    document.body.classList.remove(
        "code-modal-open"
    );

    if (
        codeModalPreviousFocus &&
        typeof codeModalPreviousFocus.focus ===
        "function" &&
        document.contains(
            codeModalPreviousFocus
        )
    ) {
        requestAnimationFrame(() => {
            codeModalPreviousFocus.focus();
            codeModalPreviousFocus = null;
        });
    } else {
        codeModalPreviousFocus = null;
    }
}

function bindCodeModalEvents() {
    const modal =
        document.querySelector(
            ".code-modal"
        );

    if (!modal) return;

    const closeButton =
        modal.querySelector(
            ".code-modal-close"
        );

    const backdrop =
        modal.querySelector(
            ".code-modal-backdrop"
        );

    closeButton?.addEventListener(
        "click",
        closeCodeModal
    );

    backdrop?.addEventListener(
        "click",
        closeCodeModal
    );

    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "visible"
                )
            ) {
                closeCodeModal();
            }
        }
    );
}
function resetDocumentationScroll() {
    const content =
        document.querySelector(
            ".documentation-content"
        );

    if (!content) return;

    content.scrollTop = 0;
}

function loadDocumentation() {
    const content =
        document.querySelector(
            ".documentation-content"
        );

    const documentationSystem =
        document.querySelector(
            ".documentation-system"
        );

    if (!content) return;

    content.classList.remove(
        "animate-in"
    );

    void content.offsetWidth;

    if (
        currentCategory !== "summary" &&
        !currentModule
    ) {
        content.innerHTML = `
            <h2>Portfolio Documentation</h2>
            <p>Select a technology module.</p>
        `;

        return;
    }

    const dataSource =
        getPortfolioData();

    const data =
        currentCategory === "summary"
            ? dataSource.summary
            : dataSource[
                currentCategory
            ]?.modules?.[
            currentModule
            ];

    if (!data) {
        content.innerHTML = `
            <h2>Module not found</h2>
            <p>Try selecting another category or module.</p>
        `;

        content.classList.add(
            "animate-in"
        );

        return;
    }

    const sections =
        (data.sections || [])
            .map(
                renderDocumentationSection
            )
            .join("");

    content.innerHTML = `
        ${data.title
            ? `<h2>${escapeHtml(data.title)}</h2>`
            : ""
        }

        ${data.overview
            ? `<div class="typed-overview"></div>`
            : ""
        }

        ${data.intro
            ? `<div class="examples-label">${escapeHtml(data.intro)}</div>`
            : ""
        }

        ${sections}
    `;

    const typedElement =
        content.querySelector(
            ".typed-overview"
        );

    if (
        data.overview &&
        typedElement
    ) {
        typeWriter(
            data.overview,
            typedElement
        );
    }

    bindExampleCards();

    content.classList.add(
        "animate-in"
    );

    documentationSystem?.classList.add(
        "visible"
    );
}

function typeWriter(text, target) {
    if (!target) return;

    if (typingTimer) {
        clearTimeout(typingTimer);
    }

    target.innerHTML = "";

    const temp =
        document.createElement("div");

    temp.innerHTML = text;

    const formatted =
        temp.innerHTML;

    let index = 0;

    function step() {
        target.innerHTML =
            formatted.slice(
                0,
                index
            );

        index++;

        if (
            index <=
            formatted.length
        ) {
            typingTimer =
                setTimeout(
                    step,
                    9
                );
        }
    }

    step();
}

function setOffline() {
    if (!status || !statusText) return;

    status.className =
        "project-status offline";

    statusText.className =
        "status-text offline-text";

    statusText.style.visibility =
        "visible";

    statusText.textContent =
        "OFFLINE";

    document
        .querySelector(".terminal-cursor")
        ?.style.setProperty(
            "display",
            "none"
        );

    const loader =
        document.querySelector(
            ".loading-container"
        );

    if (loader) {
        loader.style.display = "none";
    }
}

function shutdownProject() {
    clearInterval(initializingTimer);
    clearTimeout(typingTimer);

    setPlatformState("carousel");

    platform.classList.remove(
        "hud-focus",
        "hud-deploy",
        "hud-online"
    );

    const viewer =
        document.querySelector(
            ".documentation-viewer"
        );

    viewer?.classList.remove(
        "deploy-seed",
        "deploy-expand"
    );

    viewer?.classList.add(
        "deploy-hidden"
    );

    const documentationSystem =
        document.querySelector(
            ".documentation-system"
        );

    documentationSystem?.classList.remove(
        "visible"
    );

    clearModules();
    clearDocumentation();

    currentCategory = "languages";
    currentModule = null;

    buildCategories();
    renderCarousel();
    setOffline();
}

function bindEvents() {
    if (
        !platform ||
        eventsBoundTo === platform
    ) {
        return;
    }

    eventsBoundTo = platform;

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
            if (
                PLATFORM.state !==
                "carousel"
            ) {
                return;
            }

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
    () => {
        console.log(
            "Projects DOM ready"
        );

        initProjects();
    }
);