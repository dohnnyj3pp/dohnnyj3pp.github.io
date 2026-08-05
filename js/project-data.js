// project-data.js
// Portfolio Project Database


const projectData = {

    languages: {

        title: "CORE LANGUAGES",

        introduction:
            `
Every experience begins with a foundation, and this portfolio was no different. The entire platform was designed and developed using three core web technologies: HTML5, CSS3, and JavaScript.

Together these technologies made it possible to build this platform entirely from the ground up, demonstrating an understanding of modern frontend development and the ability to combine structure, design, and logic into a complete interactive experience.
`,

        modules: {

HTML5: {

    title:
        "THE STRUCTURE & SEMANTIC FOUNDATION",

    overview:
        `
HTML5 serves as the foundation of the platform, providing the structure needed to build the visual design, interactive systems, and dynamic features that bring the experience together.
`,

    intro:
        "Examples:",

    sections: [

        {
            heading:
                "Created the website foundation.",

            details: [

                {
                    text:
                        "Built the core page structure using semantic HTML.",

                    description:
                        "Organizes the website into meaningful sections and elements that define the layout, content hierarchy, and relationship between different parts of the platform.",

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
                        "Stores additional information directly on HTML elements so JavaScript can identify, access, and update specific interactive features.",

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
                        "Creates a cinematic background experience by automatically loading, playing, muting, and looping video content behind the interface.",

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
        "THE VISUAL DESIGN & INTERACTION SYSTEM",

    overview:
        `
CSS3 controls the visual language of the platform, transforming the structural HTML foundation into a cinematic interface through custom layouts, animations, transitions, effects, and responsive design systems.
`,

    intro:
        "Examples:",

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
` .project-platform {
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
                "Created custom animation and transition systems.",

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
        "THE INTERACTION & DYNAMIC BEHAVIOR",

    overview:
        `
JavaScript acts as the core functionality layer of the platform, bringing the website to life by controlling interactions, navigation, animations, dynamic content, and the systems that make the experience feel like an application rather than a traditional webpage.
`,

    intro:
        "Examples:",

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

},

        }

    },

    technologies: {

        title:
            "TECH & FEATURES",

        introduction:
            `
This section highlights the additional technologies and features that helped transform the portfolio from a traditional website into an interactive, application-style experience.

Beyond the core languages, these systems allowed the platform to support dynamic content, smooth navigation, immersive visuals, and a more engaging user experience.

Explore each module below to discover the tools and features that expanded the functionality of the final product.
`,

        modules: {


            "DOM Manipulation": {

                title:
                    "THE DYNAMIC INTERFACE SYSTEM",

                overview:
                    `
Used DOM manipulation to allow JavaScript to communicate directly with webpage elements, enabling dynamic updates, interface changes, and interactive user experiences without rebuilding the page structure.
`,

                sections: [

                    {
                        heading:
                            "Controlled dynamic interface states",

                        content: [

                            "Added and removed classes to trigger visual changes.",

                            "Managed animation and transition states.",

                            "Updated interface elements based on user interaction."

                        ]

                    },


                    {
                        heading:
                            "Connected user interaction with functionality",

                        content: [

                            "Linked user actions with visual responses.",

                            "Modified page content dynamically.",

                            "Created a more application-like experience."

                        ]

                    }

                ]

            },


            "Fetch API": {

                title:
                    "THE ASYNCHRONOUS CONTENT SYSTEM",

                overview:
                    `
Used the Fetch API to create dynamic content loading systems, allowing sections of the portfolio to update asynchronously while maintaining a smooth application-style navigation experience.
`,

                sections: [

                    {
                        heading:
                            "Created dynamic content delivery",

                        content: [

                            "Retrieved page content without full refreshes.",

                            "Updated website sections seamlessly.",

                            "Reduced unnecessary page reloads."

                        ]

                    },


                    {
                        heading:
                            "Improved navigation flow",

                        content: [

                            "Maintained persistent interface elements.",

                            "Created smoother transitions between sections.",

                            "Improved the overall user experience."

                        ]

                    }

                ]

            },


            "Browser History API": {

                title:
                    "THE NAVIGATION STATE SYSTEM",

                overview:
                    `
Used the Browser History API to maintain modern navigation behavior while implementing dynamic page transitions and application-style routing.
`,

                sections: [

                    {
                        heading:
                            "Managed browser navigation states",

                        content: [

                            "Implemented pushState navigation.",

                            "Updated URLs dynamically without refreshing pages.",

                            "Supported browser back and forward functionality."

                        ]

                    },


                    {
                        heading:
                            "Maintained application behavior",

                        content: [

                            "Preserved navigation consistency.",

                            "Connected URL changes with loaded content.",

                            "Improved the feeling of a single-page application."

                        ]

                    }

                ]

            },


            "CSS Animations": {

                title:
                    "THE MOTION DESIGN SYSTEM",

                overview:
                    `
Used CSS animations and transitions to create the cinematic movement, timing, and interactive feedback that define the visual experience of the portfolio.
`,

                sections: [

                    {
                        heading:
                            "Created cinematic presentation sequences",

                        content: [

                            "Designed staged hero introduction animations.",

                            "Controlled animation timing and sequencing.",

                            "Built smooth page transitions."

                        ]

                    },


                    {
                        heading:
                            "Enhanced user interaction",

                        content: [

                            "Created hover-based feedback systems.",

                            "Developed expanding interface components.",

                            "Added motion throughout the user experience."

                        ]

                    }

                ]

            },


            "Responsive Design": {

                title:
                    "THE ADAPTIVE LAYOUT SYSTEM",

                overview:
                    `
Used responsive design techniques to ensure the portfolio maintains usability, readability, and visual consistency across different screen sizes and devices.
`,

                sections: [

                    {
                        heading:
                            "Built flexible layouts",

                        content: [

                            "Created adaptable content structures.",

                            "Used scalable sizing and positioning techniques.",

                            "Designed layouts that adjust across devices."

                        ]

                    },


                    {
                        heading:
                            "Maintained visual consistency",

                        content: [

                            "Preserved spacing and hierarchy.",

                            "Optimized content presentation.",

                            "Ensured accessibility across screen sizes."

                        ]

                    }

                ]

            },


            "HTML5 Video Integration": {

                title:
                    "THE CINEMATIC BACKGROUND SYSTEM",

                overview:
                    `
Used HTML5 video integration to create the immersive animated background experience that establishes the visual identity of the portfolio.
`,

                sections: [

                    {
                        heading:
                            "Developed the cinematic landing environment",

                        content: [

                            "Implemented looping background video playback.",

                            "Combined video with layered visual effects.",

                            "Created an atmospheric introduction sequence."

                        ]

                    },


                    {
                        heading:
                            "Integrated video into the design system",

                        content: [

                            "Controlled video behavior with HTML attributes.",

                            "Built supporting overlays and visual effects.",

                            "Balanced performance with presentation quality."

                        ]

                    }

                ]

            },


            "Git & GitHub": {

                title:
                    "THE DEVELOPMENT WORKFLOW",

                overview:
                    `
Used Git and GitHub throughout development to manage version control, track improvements, maintain project organization, and deploy the completed portfolio.
`,

                sections: [

                    {
                        heading:
                            "Managed development progression",

                        content: [

                            "Tracked changes through version control.",

                            "Maintained organized project structure.",

                            "Preserved stable development versions."

                        ]

                    },


                    {
                        heading:
                            "Deployed the final experience",

                        content: [

                            "Configured GitHub Pages hosting.",

                            "Published the completed portfolio.",

                            "Maintained production-ready files."

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

                overview:
                    `
Implemented development workflows using version control, organized project structures, and deployment practices to maintain a stable and scalable portfolio build.
`,

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

                overview:
                    `
Performed testing across browsers, interactions, animations, and responsive layouts to ensure the portfolio maintained stable and consistent behavior.
`,

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

My goal was to create more than a traditional portfolio. I wanted to build a fully custom frontend experience that demonstrates my ability to design, develop, and integrate modern web technologies into a cohesive application-style platform.

Most developers create portfolios to showcase their work, but I wanted to take that concept one step further. I wanted the portfolio itself to become part of the showcase.

As you explore the different sections, you will discover how each technology plays a role in everything you're seeing and doing on this platform.

Every element was intentionally designed to demonstrate a unique approach to frontend development and the process behind building it.`,
    }

};


window.projectData = projectData;