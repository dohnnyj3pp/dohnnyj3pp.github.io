// project-data.js
// Portfolio Project Database


const projectData = {

    languages: {

        title: "CORE LANGUAGES",
        
        introduction:`
In this section you will find the three primary languages used to compose everything you are seeing.

Select one of the modules above to find out a bit more about the purpose and functionality it served for this project.`,

        modules: {

            HTML5: {

                title:
                    "THE STRUCTURE & SEMANTIC FOUNDATION",
                overview:`
used HTML5 to create the structural foundation of the portfolio, including the page architecture, navigation systems, hero experience, project platform structure, and reusable content containers.`,

                intro: [
                    "Examples:"
                ],
                sections: [

                    {
                        heading: "creating the website structure",
                        details: [
                            "Built the main navigation system and page hierarchy.",
                            "creating reusable page layouts.",
                            "Structured content sections using semantic HTML."
                        ]
                    },

                    {
                        heading: "Built the cinematic hero experience",
                        details: [
                            "creating the landing page foundation.",
                            "Integrated HTML5 video background support.",
                            "Structured title, description, and call-to-action elements."
                        ]
                    },

                    {
                        heading: "Developed reusable content containers",
                        details: [
                            "creating organized project sections.",
                            "implementing structured page-content containers.",
                            "maintaining separation between content and functionality."
                        ]
                    }

                ]

            },


            CSS3: {

                title:
                    "THE DESIGN & ANIMATIONS",

                overview:
                    "used CSS3 to create the visual identity of the portfolio, including typography, layouts, effects, responsive styling, and the overall cinematic atmosphere.",

                intro:
                    "Examples:",

                sections: [

                    {
                        heading: "creating the visual identity",
                        details: [
                            "designing the dark sci-fi inspired color system.",
                            "creating neon glow typography and visual effects.",
                            "Developed the overall presentation style."
                        ]
                    },

                    {
                        heading: "Built reusable styling systems",
                        details: [
                            "creating component-based styling.",
                            "Separated layout, appearance, and animation behavior.",
                            "designing reusable classes for UI elements."
                        ]
                    },

                    {
                        heading: "Developed responsive layouts",
                        details: [
                            "creating adaptable designs across screen sizes.",
                            "using flexible positioning and sizing techniques.",
                            "maintaining consistent presentation across devices."
                        ]
                    }

                ]

            },


            JavaScript: {

                title:
                    "THE INTERACTION & DYNAMIC BEHAVIOR",

                overview:
                    "used JavaScript to transform the website from a static page into an interactive experience by controlling navigation, user interaction, animations, and dynamic content behavior.",

                intro:
                    "Examples:",

                sections: [

                    {
                        heading: "creating dynamic navigation systems",
                        details: [
                            "Built SPA-style page transitions.",
                            "Loaded content dynamically without full refreshes.",
                            "creating application-style navigation behavior."
                        ]
                    },

                    {
                        heading: "Controlled interface behavior",
                        details: [
                            "Managed animation states.",
                            "updating active navigation elements.",
                            "creating interactive user responses."
                        ]
                    },

                    {
                        heading: "Added custom interactions",
                        details: [
                            "Developed cursor tracking behavior.",
                            "implementing mouse-based parallax effects.",
                            "Added dynamic functionality throughout the site."
                        ]
                    }

                ]

            }

        }

    },


technologies:{

    title:"TECH & FEATURES",

    modules:{

  technologies: {

    title:"TECH & FEATURES",

    introduction:
`This section highlights the additional technologies and features that helped transform the portfolio from a static website into an interactive application-style experience.`,

    modules:{

        "DOM Manipulation":{

            title:
                "THE DYNAMIC INTERFACE SYSTEM",

            overview:
`Used DOM manipulation to allow JavaScript to communicate directly with webpage elements, enabling dynamic updates, interface changes, and interactive user experiences without rebuilding the page structure.`,

            sections:[

                {
                    heading:
                        "Controlled dynamic interface states",

                    content:[

                        "Added and removed classes to trigger visual changes.",
                        "Managed animations and transition states.",
                        "Updated interface elements based on user interaction."

                    ]
                },

                {
                    heading:
                        "Connected user interaction with functionality",

                    content:[

                        "Linked user actions with visual responses.",
                        "Modified page content dynamically.",
                        "Created a more application-like experience."

                    ]
                }

            ]

        },


        "Fetch API":{

            title:
                "THE ASYNCHRONOUS CONTENT SYSTEM",

            overview:
`Used the Fetch API to create dynamic content loading systems, allowing sections of the portfolio to update asynchronously while maintaining a smooth application-style navigation experience.`,

            sections:[

                {
                    heading:
                        "Created dynamic content delivery",

                    content:[

                        "Retrieved page content without full refreshes.",
                        "Updated website sections seamlessly.",
                        "Reduced unnecessary page reloads."

                    ]
                },

                {
                    heading:
                        "Improved navigation flow",

                    content:[

                        "Maintained persistent interface elements.",
                        "Created smoother transitions between pages.",
                        "Improved the overall user experience."

                    ]
                }

            ]

        },


        "Browser History API":{

            title:
                "THE NAVIGATION STATE SYSTEM",

            overview:
`Used the Browser History API to maintain modern navigation behavior while implementing dynamic page transitions and application-style routing.`,

            sections:[

                {
                    heading:
                        "Managed browser navigation states",

                    content:[

                        "Implemented pushState navigation.",
                        "Updated URLs dynamically.",
                        "Supported browser back and forward functionality."

                    ]
                },

                {
                    heading:
                        "Maintained application behavior",

                    content:[

                        "Preserved navigation consistency.",
                        "Connected URL changes with loaded content.",
                        "Improved the feeling of a single-page application."

                    ]
                }

            ]

        },


        "CSS Animations":{

            title:
                "THE MOTION DESIGN SYSTEM",

            overview:
`Used CSS animations and transitions to create the cinematic movement, timing, and interactive feedback that define the visual experience of the portfolio.`,

            sections:[

                {
                    heading:
                        "Created cinematic presentation sequences",

                    content:[

                        "Designed staged hero introduction animations.",
                        "Controlled animation timing and sequencing.",
                        "Built smooth page transitions."

                    ]
                },

                {
                    heading:
                        "Enhanced user interaction",

                    content:[

                        "Created hover-based feedback systems.",
                        "Developed expanding interface components.",
                        "Added motion throughout the user experience."

                    ]
                }

            ]

        },


        "Responsive Design":{

            title:
                "THE ADAPTIVE LAYOUT SYSTEM",

            overview:
`Used responsive design techniques to ensure the portfolio maintains usability, readability, and visual consistency across different screen sizes and devices.`,

            sections:[

                {
                    heading:
                        "Built flexible layouts",

                    content:[

                        "Created adaptable content structures.",
                        "Used scalable sizing and positioning techniques.",
                        "Designed layouts that adjust across devices."

                    ]
                },

                {
                    heading:
                        "Maintained visual consistency",

                    content:[

                        "Preserved spacing and hierarchy.",
                        "Optimized content presentation.",
                        "Ensured accessibility across screen sizes."

                    ]
                }

            ]

        },


        "HTML5 Video Integration":{

            title:
                "THE CINEMATIC BACKGROUND SYSTEM",

            overview:
`Used HTML5 video integration to create the immersive animated background experience that establishes the visual identity of the portfolio.`,

            sections:[

                {
                    heading:
                        "Developed the cinematic landing environment",

                    content:[

                        "Implemented looping background video playback.",
                        "Combined video with layered visual effects.",
                        "Created an atmospheric introduction sequence."

                    ]
                },

                {
                    heading:
                        "Integrated video into the design system",

                    content:[

                        "Controlled video behavior with HTML attributes.",
                        "Built supporting overlays and visual effects.",
                        "Balanced performance with presentation quality."

                    ]
                }

            ]

        },


        "Git & GitHub":{

            title:
                "THE DEVELOPMENT WORKFLOW",

            overview:
`Used Git and GitHub throughout development to manage version control, track improvements, maintain project organization, and deploy the completed portfolio.`,

            sections:[

                {
                    heading:
                        "Managed development progression",

                    content:[

                        "Tracked changes through version control.",
                        "Maintained organized project structure.",
                        "Preserved stable development versions."

                    ]
                },

                {
                    heading:
                        "Deployed the final experience",

                    content:[

                        "Configured GitHub Pages hosting.",
                        "Published the completed portfolio.",
                        "Maintained production-ready files."

                    ]
                }

            ]

        }

    }

},


        


        "Browser History API":{

            title:
                "THE NAVIGATION STATE SYSTEM",

            overview:
                "used the Browser History API to maintain navigation behavior while the remaining dynamic page transition was kept in current state.",

            sections:[

                {
                    heading:"Managed browser navigation",

                    content:[

                        "implementing pushState navigation.",
                        "Updating URLs without refreshing pages.",
                        "Supporting browser back and forward functionality."

                    ]
                }

            ]

        },


        "CSS Animations":{

            title:
                "THE MOTION DESIGN SYSTEM",

            overview:
                "used CSS animations and transitions to create movement, timing, and interactive feedback throughout the website.",

            sections:[

                {
                    heading:"creating cinematic reveals",

                    content:[

                        "Designing staged hero introductions.",
                        "Controlling animation timing sequences.",
                        "creating smooth content transitions."

                    ]
                },

                {
                    heading:"Enhanced interaction feedback",

                    content:[

                        "Built hover animations.",
                        "creating expanding content sections.",
                        "Developed visual responses to user actions."

                    ]
                }

            ]

        },

        "HTML5 Video Integration":{

            title:
                "THE CINEMATIC BACKGROUND SYSTEM",

            overview:
                "used HTML5 video capabilities to create an immersive landing experience through a persistent animated background.",

            sections:[

                {
                    heading:"Integrated video into the hero section",

                    content:[

                        "implemented the looping background playback.",
                        "combining video with layered CSS effects.",
                        "created an atmospheric introduction sequence."

                    ]
                }

            ]

        },

        "Fetch API":{

            title:
                "THE SINGLE-PAGE NAVIGATION",

            overview:
                "used the Fetch API to asynchronously retrieve page content and create smooth transitions between sections without refreshing the entire website, giving it the \"one page only\" feeling.",

            sections:[

                {
                    heading:"Built dynamic content loading",

                    content:[

                        "fetching HTML content dynamically.",
                        "updating page sections seamlessly.",
                        "creating smoother navigation experiences."

                    ]
                },

                {
                    heading:"Improved user experience",

                    content:[

                        "reducing unnecessary page reloads.",
                        "maintaining persistent interface elements.",
                        "creating a more application-like experience."

                    ]
                }

            ]

        },

    }

},



    development: {

        title: "DEVELOPMENT",

        modules: {

            Build: {

                title:
                    "BUILD PIPELINE & VERSION CONTROL",

                overview:
                    "implemented Git version control, task automation, and a deployment-ready structure for the portfolio build process.",

                sections: [

                    {
                        heading: "Workflow",
                        content:
                            "Organized development tasks with source control, branch management, and iterative improvements."
                    },

                    {
                        heading: "Deployment",
                        content:
                            "The project is prepared for web deployment with responsive design, asset management, and performance optimization."
                    }

                ]

            },

            Testing: {

                title:
                    "QUALITY ASSURANCE & DEBUGGING",

                overview:
                    "Conducted testing across browsers, interactions, and responsive layouts to ensure stable behavior.",

                sections: [

                    {
                        heading: "Cross-Browser",
                        content:
                            "Verified that the interactive portfolio works consistently across major browsers and device sizes."
                    },

                    {
                        heading: "Debugging",
                        content:
                            "Fixed layout, animation, and script issues through iterative testing and review."
                    }

                ]

            }

        }

    },


    summary: {

        title: "SUMMARY",

        title:
            "PROJECT SUMMARY",

        overview:
`Welcome to the heart and soul of my portfolio. Countless hours have been devoted to writing the code, testing it, debugging, rewriting, tweaking, testing it again, and embracing the endless cycle of a coder's life.  This project was designing and developed entirely from scratch using semantic HTML5, custom CSS3, and vanilla JavaScript without the use of frontend frameworks.

My goal was to create more than a traditional portfolio, but instead to build a truly interactive digital experience that demonstrates not only my understanding of my frontend development stack, but as well to deliver a captivating website filled with animation, dynamic interactions, and intentional user-focusing design.

Most software and web developers create portfolios to showcase their work, but I wanted to take that idea one step further. I wanted to create an immersive platform that not only showcases my projects, but also becomes part of the showcase itself.  As you navigate through the different sections, you'll discover the behind-the-scenes work, design decisions, the thought proccess, and technical systems in place that bring everything together as one final piece of art.`

    }

}

window.projectData = projectData;