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
HTML5 serves as the structural backbone of the platform, providing the semantic foundation that everything else is built upon.`,

                intro:
                    "Examples:",

                sections: [

                    {
                        heading:
                            "Creating the website structure",

                        details: [

                            {
                                text:
                                    "Implemented semantic page structure.",

                                description:
                                    "Semantic HTML elements provide meaningful structure to the document, improving accessibility, readability, and search engine optimization.",

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
                                    "Stored custom data using HTML attributes.",

                                description:
                                    "Custom data attributes allow HTML elements to store additional information that JavaScript can access for creating dynamic behavior.",

                                code:
                                    `<button
  class="example-card"
  data-language="javascript"
  data-code="example">
  View Code
</button>`
                            },
                        ]
                    },
                  
                    {
                        heading:
                            "Sets up the foundation for Animation.",

                        details: [

                            {
                                text:
                                    "Created the navigation bar custom visual effects and letter motion.",

                                description:
                                    "This creates the navigation menu containing a link to the Projects page, with each letter wrapped individually to enable custom hover and animation effects.",

                                code:
                                    `<ul class="nav-links">
<li>
<a href="projects.html">
<span>P</span><span>R</span><span>O</span><span>J</span><span>E</span><span>C</span><span>T</span><span>S</span>
</a>
</li>`
                            },

                            {
                                text:
                                    "Integrated background video loop.",

                                description:
                                    "Configures the background video to automatically play silently, repeat continuously, and remain embedded within the webpage instead of opening in fullscreen on mobile devices.",

                                code:
                                    `<video autoplay muted loop playsinline>
<source src="images/video/intro.mp4" type="video/mp4">
</video>`
                            },

                            {
                                text:
                                    "Organized information using lists.",

                                description:
                                    "Structured related content into ordered and unordered lists to improve readability and document hierarchy.",

                                code:
                                    `
<ul>
<li>HTML</li>
li>CSS</li>
<li>JavaScript</li>
</ul>`
                            }

                        ]

                    },


                    {
                        text:
                            "Built reusable modal interface.",

                        description:
                            "Created a reusable HTML structure for code previews, incorporating accessibility attributes and a consistent layout for displaying interactive content.",

                        code:
                            `<div class="code-modal" aria-hidden="true">
  <div class="code-modal-backdrop"></div>
  <div class="code-modal-panel">
    <div class="code-modal-header">
      <div class="code-modal-title">Code Preview</div>
      <button type="button"
              class="code-modal-close"
              aria-label="Close modal">×</button>
    </div>
    <pre class="code-modal-snippet"><code></code></pre>
    <div class="code-modal-description"
         aria-live="polite"></div>
    <div class="code-modal-note">
      Press Esc or click outside to close.
    </div>
  </div>
</div>`
                    },

                    {
                        text:
                            "Implemented structured page-content containers.",

                        code:
                            `<section class="projects-section">`
                    },

                    {
                        text:
                            "Maintained separation between content and functionality.",

                        code:
                            `<div class="project-card-content">`
                    }

                ]

            },


            CSS3: {

                title:
                    "THE DESIGN & ANIMATIONS",

                overview:
                    `
CSS3 transforms the websites structure into a polished visual experience through custom layouts, animations, effects, and responsive design.`,

                intro:
                    "Examples:",

                sections: [

                    {
                        heading:
                            "Creating the visual identity",

                        details: [

                            {
                                text:
                                    "Designed the dark sci-fi inspired color system.",

                                code:
                                    `.project-category {
  border: 1px solid rgba(255, 132, 0, .35);
  background: rgba(8, 10, 18, .75);
}`
                            },

                            {
                                text:
                                    "Created neon glow typography and visual effects.",

                                code:
                                    `.hero-content h1 span {
  color: #ffca5a;
  text-shadow: 0 0 12px rgba(255, 75, 129, .6), 0 0 24px rgba(255, 75, 129, .4);
}`
                            },

                            {
                                text:
                                    "Developed the overall presentation style.",

                                code:
                                    `.hero-content::before {
  background: radial-gradient(ellipse, rgba(18, 8, 15, .65) 0%, rgba(35, 10, 25, .38) 35%, rgba(0, 0, 0, 0) 75%);
}`
                            }

                        ]

                    },


                    {
                        heading:
                            "Built reusable styling systems",

                        details: [

                            {
                                text:
                                    "Created component-based styling.",

                                code:
                                    `.technology-item {
  padding: 6px 18px;
  border-radius: 12px;
  background: rgba(8, 10, 18, .5);
}`
                            },

                            {
                                text:
                                    "Separated layout, appearance, and animation behavior.",

                                code:
                                    `.technology-item:hover {
  transform: translateY(-2px);
  border-color: #ff8a00;
}`
                            },

                            {
                                text:
                                    "Designed reusable classes for UI elements.",

                                code:
                                    `.technology-item.active {
  border-color: #ff8a00;
  background: rgba(255, 132, 0, .15);
}`
                            }

                        ]

                    },


                    {
                        heading:
                            "Developed responsive layouts",

                        details: [

                            {
                                text:
                                    "Created adaptable designs across screen sizes.",

                                code:
                                    `.module-navigation {
  display: flex;
  flex-wrap: wrap;
}`
                            },

                            {
                                text:
                                    "Used flexible positioning and sizing techniques.",

                                code:
                                    `@media (max-width: 800px) {
  .module-navigation {
    flex-wrap: wrap;
  }
}`
                            },

                            {
                                text:
                                    "Maintained consistent presentation across devices.",

                                code:
                                    `.project-category.active {
  border-color: #ff8a00;
  background: rgba(255, 132, 0, .15);
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
JavaScript is the heartbeat of the website. It brings the entire experience to life by controlling interactions, navigation, animations, and countless other systems working together behind the scenes.
 Ultimately it's what allows everything to communicate and function together as one cohesive application.`,

                intro:
                    "Examples:",

                sections: [

                    {
                        heading:
                            "Creating dynamic navigation systems",

                        details: [

                            {
                                text:
                                    "Built SPA-style page transitions.",

                                code:
                                    `function rotateCarousel(direction) {
  if (PLATFORM.state !== "carousel") return;
  PLATFORM.project += direction;
}`
                            },


                            {
                                text:
                                    "Loaded content dynamically without full refreshes.",

                                code:
                                    `const response = await fetch(url.href, {
  signal: controller.signal
});
const html = await response.text();`
                            },


                            {
                                text:
                                    "Created application-style navigation behavior.",

                                code:
                                    `const url = new URL(link.href, window.location.href);
button.classList.add("active");
loadDocumentation();`
                            }

                        ]

                    },


                    {
                        heading:
                            "Controlled interface behavior",

                        details: [

                            {
                                text:
                                    "Managed animation states.",

                                code:
                                    `content.classList.remove("animate-in");
void content.offsetWidth;`
                            },


                            {
                                text:
                                    "Updated active navigation elements.",

                                code:
                                    `button.classList.add("active");
loadDocumentation();`
                            },


                            {
                                text:
                                    "Created interactive user responses.",

                                code:
                                    `document.querySelectorAll(".project-category").forEach(btn => {
  btn.classList.remove("active");
});`
                            }

                        ]

                    },


                    {
                        heading:
                            "Added custom interactions",

                        details: [

                            {
                                text:
                                    "Developed cursor tracking behavior.",

                                code:
                                    `window.addEventListener("pointermove", e => {
  cursor.style.left = e.clientX + "px";
});`
                            },


                            {
                                text:
                                    "Implemented mouse-based parallax effects.",

                                code:
                                    `requestAnimationFrame(() => {
  heroInner.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 20px)';
});`
                            },

                            {
                                text:
                                    "Added dynamic functionality throughout the site.",


                                code:
                                    `document.addEventListener("DOMContentLoaded", initProjects);`
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

As you explore the different sections, you will discover the technical systems, the thought process, and logical decisions used that brought this creation to life.

Every element was intentionally designed to demonstrate a unique approach to frontend development and the thought process behind building it.`,
    }

};


window.projectData = projectData;