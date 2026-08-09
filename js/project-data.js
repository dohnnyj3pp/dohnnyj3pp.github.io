// project-data.js
// Portfolio Project Database


const projectData = {

    languages: {

        title: "CORE LANGUAGES",

        introduction:
            `
Every experience begins with a foundation, and this portfolio was no different. The entire platform was designed and developed using three core web technologies: HTML5, CSS3, and JavaScript.

Together these technologies made it possible to build this platform entirely from the ground up therefore demonstrating an understanding of modern frontend development and the ability to combine structure, design and logic into a complete interactive experience.
`,

        modules: {

            HTML5: {

                title:
                    "THE STRUCTURE & FOUNDATION",

                sections: [

                    {
                        heading:
                            "Created the website foundation.",

                        details: [

                            {
                                text:
                                    "Built the core page structure using semantic HTML.",

                                description:
                                    "Organizes the website into meaningful sections and elements that define the layout, content hierarchy and relationships between different parts of the platform.",

                                code:
`<main>
  <section>
    <article>
      <footer>
    </article>
  </section>
</main>`
                            },

                            {
                                text:
                                    "Created reusable project content layouts.",

                                description:
                                    "Provides a consistent structure for displaying project information, allowing multiple projects to share the same layout and styling system.",

                                code:
`<article class="project-card">
  <div class="project-thumbnail"></div>

  <div class="project-card-content">
  </div>
</article>`
                            }

                        ]

                    },

                    {
                        heading:
                            "Built HTML elements for interaction.",

                        details: [

                            {
                                text:
                                    "Used custom data attributes for dynamic content.",

                                description:
                                    "Stores additional information directly on HTML elements so JavaScript can identify, access and update specific interactive features.",

                                code:
`<button
  class="example-card"
  data-language="javascript"
  data-code="example">
  View Code
</button>`
                            },

                            {
                                text:
                                    "Created animated navigation elements.",

                                description:
                                    "Allows individual navigation elements to be animated and controlled, creating custom hover effects and interactive visual responses.",

                                code:
`<a href="projects.html">
  <span>P</span>
  <span>R</span>
  <span>O</span>
  <span>JECTS</span>
</a>`
                            },

                            {
                                text:
                                    "Integrated HTML5 video background systems.",

                                description:
                                    "Creates a cinematic background experience by automatically loading, playing, muting and looping video content behind the interface.",

                                code:
`<video autoplay muted loop playsinline>
  <source src="images/video/intro.mp4"
  type="video/mp4">
</video>`
                            }

                        ]

                    },

                    {
                        heading:
                            "Developed reusable interface components.",

                        details: [

                            {
                                text:
                                    "Created a reusable code preview modal.",

                                description:
                                    "Displays code examples and additional information inside a popup window that can be opened and closed without leaving the current page.",

                                code:
`<div class="code-modal" aria-hidden="true">

  <div class="code-modal-panel">

    <button
      class="code-modal-close"
      aria-label="Close modal">
      ×
    </button>

  </div>

</div>`
                            },

                            {
                                text:
                                    "Added accessibility support to interactive elements.",

                                description:
                                    "Provides additional information about interactive elements so both users and other assistive technologies can identify their purpose.",

                                code:
`<button
  class="project-return"
  aria-label="Return to projects">
  RETURN
</button>`
                            },

                            {
                                text:
                                    "Structured page sections for future expansion.",

                                description:
                                    "Creates organized containers that separate different parts of the platform, making future additions and modifications easier to implement.",

                                code:
`<section class="projects-section">

  <div class="project-platform">

  </div>

</section>`
                            }

                        ]

                    }

                ]

            },

            CSS3: {

                title:
                    "THE VISUAL DESIGN",

                sections: [

                    {
                        heading:
                            "Built the visual foundation of the platform.",

                        details: [

                            {
                                text:
                                    "Created the primary layout and positioning systems.",

                                description:
                                    "Established the core page layouts using modern CSS positioning techniques, allowing interface components to be precisely arranged and controlled throughout the application.",

                                code:
`.project-platform {
    display:flex;
    justify-content:center;
    align-items:center;
}

.project-workspace {
    display:grid;
    grid-template-columns:
    200px 1fr;
}`
                            },

                            {
                                text:
                                    "Developed the cinematic visual atmosphere.",

                                description:
                                    "Applied layered backgrounds, transparency effects, shadows, and blur techniques to create the immersive interface style used throughout the platform.",

                                code:
`.documentation-system {
    background:
    rgba(8,10,18,.85);

    backdrop-filter:
    blur(14px);

    box-shadow:
    0 0 45px
    rgba(255,132,0,.08);
}`
                            }

                        ]

                    },

                    {
                        heading:
                            "Created animation and transition systems.",

                        details: [

                            {
                                text:
                                    "Designed interface deployment animations.",

                                description:
                                    "Built custom transitions that control how sections of the platform appear, expand, and change states, creating the feeling of a live application booting and loading.",

                                code:
`.documentation-viewer {
    opacity:0;
    transform:
    scale(.05);

    transition:
    transform .55s ease,
    opacity .3s ease;
}

.documentation-viewer.deploy-expand {
    opacity:1;
    transform:
    scale(1);
}`
                            },

                            {
                                text:
                                    "Created interactive hover effects.",

                                description:
                                    "Developed animated feedback states for buttons and interface elements, providing visual responses that make the platform feel dynamic and responsive.",

                                code:
`.project-return:hover {

    transform:
    translateY(-3px);

    box-shadow:
    0 0 18px
    rgba(255,183,75,.4);
}`
                            },

                            {
                                text:
                                    "Built custom terminal-style animations.",

                                description:
                                    "Created animated status displays using CSS keyframes, text effects, and visual overlays to simulate system states and reinforce the application's HUD-inspired design.",

                                code:
`@keyframes terminalFlicker {

    0%,100% {
        opacity:1;
    }

    94% {
        opacity:.65;
    }
}`
                            }

                        ]

                    },

                    {
                        heading:
                            "Developed reusable interface components.",

                        details: [

                            {
                                text:
                                    "Created reusable card and panel systems.",

                                description:
                                    "Designed consistent UI components with shared styling rules, allowing project cards, documentation panels, and interface sections to maintain the same visual identity.",

                                code:
`.project-card {

    border-radius:
    19px;

    backdrop-filter:
    blur(12px);

    box-shadow:
    0 0 30px
    rgba(255,202,90,.12);
}`
                            },

                            {
                                text:
                                    "Implemented advanced visual effects.",

                                description:
                                    "Used CSS gradients, shadows, transparency, and pseudo-elements to create animated lighting effects, glowing borders, and layered visual details without external libraries.",

                                code:
`.button::before {

    content:"";

    background:
    linear-gradient(
    120deg,
    transparent,
    rgba(255,255,255,.18)
    );

}`
                            },

                            {
                                text:
                                    "Created 3D interface transformations.",

                                description:
                                    "Applied CSS perspective and transform properties to create depth-based interactions within the project carousel, making elements appear layered in a 3D environment.",

                                code:
`.project-carousel {

    perspective:
    1200px;
}

.project-card.active {

    transform:
    translateZ(120px);
}`
                            }

                        ]

                    }

                ]

            },

            JavaScript: {

                title:
                    "THE DYNAMIC BEHAVIOR",

                sections: [

                    {
                        heading:
                            "Created dynamic application behavior.",

                        details: [

                            {
                                text:
                                    "Built SPA-style page transitions.",

                                description:
                                    "Allows different areas of the platform to open and transition smoothly without forcing the user to leave the page and reload everything, creating a more seamless experience.",

                                code:
`function loadPage(url) {

    const response =
    await fetch(url);

    const html =
    await response.text();

}`
                            },

                            {
                                text:
                                    "Loaded content dynamically.",

                                description:
                                    "Allows new information and sections of the website to appear when needed instead of loading everything at once, helping keep the experience organized and responsive.",

                                code:
`const response =
await fetch(url.href, {
    signal:
    controller.signal
});

const html =
await response.text();`
                            },

                            {
                                text:
                                    "Created application state control.",

                                description:
                                    "Keeps track of what the platform is currently doing, such as moving through projects, loading documentation, or changing between different interface modes.",

                                code:
`if (PLATFORM.state !== "carousel") {
    return;
}

PLATFORM.project += direction;`
                            }

                        ]

                    },

                    {
                        heading:
                            "Controlled interface behavior.",

                        details: [

                            {
                                text:
                                    "Managed animation states.",

                                description:
                                    "Controls when animations begin, reset, and change by communicating with the visual design systems created through CSS.",

                                code:
`content.classList.remove(
    "animate-in"
);

void content.offsetWidth;

content.classList.add(
    "animate-in"
);`
                            },

                            {
                                text:
                                    "Updated active interface elements.",

                                description:
                                    "Keeps the website aware of what the user has selected, updating buttons, menus, and content areas to match the current section being viewed.",

                                code:
`button.classList.add(
    "active"
);

loadDocumentation();`
                            },

                            {
                                text:
                                    "Created interactive user responses.",

                                description:
                                    "Allows the website to react to user actions such as clicking buttons, selecting projects, and navigating through different areas of the platform.",

                                code:
`document
.querySelectorAll(".project-category")
.forEach(btn => {

    btn.classList.remove(
        "active"
    );

});`
                            }

                        ]

                    },

                    {
                        heading:
                            "Developed custom interactive systems.",

                        details: [

                            {
                                text:
                                    "Built custom cursor tracking behavior.",

                                description:
                                    "Created a custom cursor experience that follows the user's movement and adds another layer of interaction beyond the standard browser cursor.",

                                code:
`window.addEventListener(
    "pointermove",
    e => {

        cursor.style.left =
        e.clientX + "px";

    }
);`
                            },

                            {
                                text:
                                    "Implemented mouse-based parallax effects.",

                                description:
                                    "Created movement effects where certain elements respond to mouse movement, adding depth and making the interface feel more alive.",

                                code:
`requestAnimationFrame(() => {

    heroInner.style.transform =
    "translate3d(" +
    offsetX +
    "px," +
    offsetY +
    "px,20px)";

});`
                            },

                            {
                                text:
                                    "Created reusable initialization systems.",

                                description:
                                    "Organized the startup process that prepares website features, connects interactions, and makes sure each system is ready when the platform loads.",

                                code:
`document.addEventListener(
    "DOMContentLoaded",
    initProjects
);`
                            }

                        ]

                    }

                ]

            }

        }

    },


    technologies: {

        title:
            "TECH & FEATURES",

        introduction:
            `
This section highlights the technologies and supporting systems that extended the portfolio beyond its core languages.

Rather than relying on frameworks or pre-built interface libraries, these systems were implemented directly to create application-style navigation, persistent interface behavior, immersive presentation, and a structured development workflow.

Explore each module to see how these technologies contributed to the architecture and overall experience of the final product.
`,

        modules: {

            "Fetch API": {

                title:
                    "THE ASYNCHRONOUS CONTENT SYSTEM",

                sections: [

                    {
                        heading:
                            "Built soft page navigation.",

                        details: [

                            {
                                text:
                                    "Loaded page content dynamically without requiring full browser refreshes.",

                                description:
                                    "Uses the Fetch API to request another HTML document, parse the returned markup, and replace the active page content while keeping the surrounding application environment alive.",

                                code:
`const response =
await fetch(
    url.href,
    {
        signal:
        controller.signal
    }
);

const html =
await response.text();

const nextDocument =
new DOMParser()
.parseFromString(
    html,
    "text/html"
);`
                            },

                            {
                                text:
                                    "Replaced only the active page content.",

                                description:
                                    "The navigation system retrieves the next page and replaces the existing page-content element rather than rebuilding the entire document.",

                                code:
`const nextContent =
nextDocument.getElementById(
    "page-content"
);

pageContent.replaceWith(
    nextContent
);

pageContent =
    nextContent;`
                            }

                        ]

                    },

                    {
                        heading:
                            "Coordinated asynchronous navigation.",

                        details: [

                            {
                                text:
                                    "Prevented overlapping navigation requests.",

                                description:
                                    "Uses AbortController to cancel an existing navigation request before beginning another, preventing outdated page requests from interfering with the current interface state.",

                                code:
`if (activeRequest) {
    activeRequest.abort();
}

const controller =
    new AbortController();

activeRequest =
    controller;`
                            },

                            {
                                text:
                                    "Connected content loading with transition states.",

                                description:
                                    "Asynchronous content loading is coordinated with the existing transition system so navigation feels like a continuous application rather than a series of disconnected page loads.",

                                code:
`body.classList.add(
    "transitioning"
);

nextContent.classList.add(
    "is-entering"
);

pageContent.replaceWith(
    nextContent
);`
                            }

                        ]

                    }

                ]

            },


            "Browser History API": {

                title:
                    "THE NAVIGATION STATE SYSTEM",

                sections: [

                    {
                        heading:
                            "Connected navigation to browser state.",

                        details: [

                            {
                                text:
                                    "Updated browser URLs without forcing full page reloads.",

                                description:
                                    "Uses the History API to change the browser's current URL while keeping the dynamically loaded application state intact.",

                                code:
`if (pushState) {

    history.pushState(
        {},
        "",
        url.href
    );

}`
                            },

                            {
                                text:
                                    "Implemented application-style navigation.",

                                description:
                                    "Combines dynamic page loading with URL state so the portfolio behaves more like a single application while remaining built entirely with vanilla JavaScript.",

                                code:
`loadPage(
    url,
    {
        pushState:true
    }
);`
                            }

                        ]

                    },

                    {
                        heading:
                            "Preserved expected browser behavior.",

                        details: [

                            {
                                text:
                                    "Supported browser back and forward navigation.",

                                description:
                                    "Listens for popstate events and loads the appropriate page when the browser history changes.",

                                code:
`window.addEventListener(
    "popstate",
    () => {

        loadPage(
            new URL(
                window.location.href
            )
        );

    }
);`
                            },

                            {
                                text:
                                    "Synchronized URL state with loaded content.",

                                description:
                                    "Navigation state, page content, active navigation styling, and document titles are updated together so the application remains internally consistent.",

                                code:
`document.title =
    nextDocument.title;

setActiveNav(
    url
);

pageContent =
    nextContent;`
                            }

                        ]

                    }

                ]

            },


            "HTML5 Video Integration": {

                title:
                    "THE CINEMATIC MEDIA SYSTEM",

                sections: [

                    {
                        heading:
                            "Built the persistent visual environment.",

                        details: [

                            {
                                text:
                                    "Integrated looping HTML5 video as the portfolio's visual foundation.",

                                description:
                                    "Uses a persistent video element as the visual environment behind the interface, allowing the portfolio to maintain a cinematic presentation across navigation states.",

                                code:
`<video
    id="intro-video"
    autoplay
    muted
    loop
    playsinline>

    <source
        src="images/video/intro.mp4"
        type="video/mp4">

</video>`
                            },

                            {
                                text:
                                    "Kept the video active during soft navigation.",

                                description:
                                    "Because navigation replaces page content instead of reloading the document, the background video can remain persistent while different sections of the portfolio are displayed.",

                                code:
`const video =
    document.getElementById(
        "intro-video"
    );

if (video) {
    video.play()
        .catch(() => {});
}`
                            }

                        ]

                    },

                    {
                        heading:
                            "Integrated media with the interface.",

                        details: [

                            {
                                text:
                                    "Layered interface systems over the video surface.",

                                description:
                                    "The video acts as a visual layer beneath navigation, content, overlays, atmosphere effects, and interactive elements rather than functioning as a standalone media component.",

                                code:
`<video id="intro-video"></video>

<div id="video-overlay"></div>

<div id="page-surface"></div>

<nav>
    ...
</nav>`
                            },

                            {
                                text:
                                    "Prepared media specifically for web delivery.",

                                description:
                                    "The background asset was encoded and optimized for browser playback while maintaining the visual quality required for the cinematic presentation.",

                                code:
`<video
    autoplay
    muted
    loop
    playsinline>
</video>`
                            }

                        ]

                    }

                ]

            },


            "Interaction Systems": {

                title:
                    "THE INTERACTION SYSTEM",

                sections: [

                    {
                        heading:
                            "Built custom motion-driven interaction.",

                        details: [

                            {
                                text:
                                    "Created a custom cursor with independently controlled elements.",

                                description:
                                    "The portfolio uses separate cursor elements for the primary pointer, trailing ring, inner ring, and surrounding interface brackets, allowing each layer to respond independently.",

                                code:
`const dot =
    document.querySelector(
        ".cursor-dot"
    );

const ring =
    document.querySelector(
        ".cursor-ring"
    );

const ringInner =
    document.querySelector(
        ".cursor-ring-inner"
    );`
                            },

                            {
                                text:
                                    "Added requestAnimationFrame-based pointer motion.",

                                description:
                                    "Uses requestAnimationFrame to synchronize visual movement with the browser's rendering cycle and prevent unnecessary continuous layout updates.",

                                code:
`parallaxFrame =
    requestAnimationFrame(() => {

        const heroInner =
            document.querySelector(
                ".hero-description"
            );

        if (heroInner) {

            heroInner.style.transform =
                \`translate3d(
                    \${offsetX}px,
                    \${offsetY}px,
                    20px
                )\`;

        }

    });`
                            }

                        ]

                    },

                    {
                        heading:
                            "Coordinated application states.",

                        details: [

                            {
                                text:
                                    "Used state classes to coordinate complex visual sequences.",

                                description:
                                    "Interface states are represented through body classes that allow different systems to respond to the same application state without tightly coupling their implementation.",

                                code:
`body.classList.add(
    "nav-ready"
);

body.classList.add(
    "hero-ready"
);

body.classList.add(
    "title-ready"
);

body.classList.add(
    "text-ready"
);

body.classList.add(
    "platform-ready"
);`
                            },

                            {
                                text:
                                    "Built timed presentation sequences.",

                                description:
                                    "Multiple delayed states are coordinated through stored timers, allowing the hero, navigation, content, platform controls, and cursor to enter the experience in a controlled sequence.",

                                code:
`heroTimers.push(
    setTimeout(() => {

        body.classList.add(
            "hero-ready"
        );

        enterHero();

    }, 1300)
);`
                            }

                        ]

                    }

                ]

            },


            "Git & GitHub": {

                title:
                    "THE DEVELOPMENT WORKFLOW",

                sections: [

                    {
                        heading:
                            "Managed versioned development.",

                        details: [

                            {
                                text:
                                    "Used Git to track the progression of the portfolio.",

                                description:
                                    "Version control provided a structured history of development and made it possible to experiment with major architectural changes while maintaining stable versions of the project.",

                                code:
`git status

git add .

git commit
-m "Stabilize portfolio architecture"`
                            },

                            {
                                text:
                                    "Maintained stable development milestones.",

                                description:
                                    "The project was developed through deliberate milestones, allowing stable versions to act as restore points while new interface systems and architectural changes were introduced.",

                                code:
`git log
--oneline

git checkout <stable-commit>`
                            }

                        ]

                    },

                    {
                        heading:
                            "Deployed and maintained the production experience.",

                        details: [

                            {
                                text:
                                    "Configured GitHub Pages hosting.",

                                description:
                                    "The portfolio is deployed directly from the GitHub repository, providing a production environment for the completed frontend application.",

                                code:
`Repository
    ↓
GitHub Pages
    ↓
Production Portfolio`
                            },

                            {
                                text:
                                    "Used the repository as the source of the production application.",

                                description:
                                    "The same version-controlled project structure used during development is maintained as the source for the live portfolio, keeping development and deployment closely connected.",

                                code:
`Local Development
      ↓
     Git
      ↓
   GitHub
      ↓
GitHub Pages`
                            }

                        ]

                    }

                ]

            }

        }

    },


    development: {

        title:
            "DEVELOPMENT",

        introduction:
            `
Building a successful project requires more than writing code. Development involves planning, testing, debugging, version control, and continuous improvement.

This section highlights the workflow systems used throughout the creation of the portfolio, including maintaining stability, testing functionality, and preparing the final product for deployment.
`,

        modules: {

            Build: {

                title:
                    "BUILD PIPELINE & VERSION CONTROL",

                sections: [

                    {
                        heading:
                            "Development workflow",

                        content:
                            "Organized development tasks through version control, iterative improvements, and structured project management."

                    },

                    {
                        heading:
                            "Deployment preparation",

                        content:
                            "Prepared the project for web deployment through asset management, responsive design practices, and performance considerations."

                    }

                ]

            },

            Testing: {

                title:
                    "QUALITY ASSURANCE & DEBUGGING",

                sections: [

                    {
                        heading:
                            "Cross-browser testing",

                        content:
                            "Verified that the interactive portfolio maintained functionality and presentation consistency across different browsers and device sizes."

                    },

                    {
                        heading:
                            "Debugging and refinement",

                        content:
                            "Resolved layout issues, animation conflicts, and JavaScript behavior problems through continuous testing and iteration."

                    }

                ]

            }

        }

    },


    summary: {

        title:
            "PROJECT SUMMARY",

        overview:
            `
Welcome to the core of my portfolio.

Countless hours have been devoted to writing code, testing functionality, debugging issues, rewriting systems, refining designs, and embracing the endless cycle that defines the life of a developer.

This project was designed and developed using HTML5, CSS3, and JavaScript without the use of frontend frameworks.

My goal was to create more than a traditional portfolio. I wanted to build a fully customized frontend experience that demonstrates the ability to design, develop, and integrate modern web technologies into a cohesive application-style platform.

Most developers create portfolios to showcase their work, but I took that concept one step further. I wanted the portfolio itself to become part of the showcase.

As you explore the different sections, you will discover how each technology plays a role in various aspects of this platform.

Every element was intentionally designed to demonstrate a unique approach to frontend development and the details that went into building it.`,
    }

};


window.projectData = projectData;