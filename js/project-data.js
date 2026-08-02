// project-data.js
// Portfolio Project Database


const projectData = {

    languages: {

        title: "CORE LANGUAGES",

        modules: {

            HTML5: {

                title:
                    "THE STRUCTURE & SEMANTIC FOUNDATION",

                overview:
                    "Used HTML5 to create the structural foundation of the website, including the page hierarchy, navigation system, hero section, project layouts, and reusable content containers.",

                intro:
                    "Examples:",

                sections: [

                    {
                        heading: "Created the website structure",
                        details: [
                            "Built the main navigation system and page hierarchy.",
                            "Created reusable page layouts.",
                            "Structured content sections using semantic HTML."
                        ]
                    },

                    {
                        heading: "Built the cinematic hero experience",
                        details: [
                            "Created the landing page foundation.",
                            "Integrated HTML5 video background support.",
                            "Structured title, description, and call-to-action elements."
                        ]
                    },

                    {
                        heading: "Developed reusable content containers",
                        details: [
                            "Created organized project sections.",
                            "Implemented structured page-content containers.",
                            "Maintained separation between content and functionality."
                        ]
                    }

                ]

            },


            CSS3: {

                title:
                    "THE DESIGN & ANIMATIONS",

                overview:
                    "Used CSS3 to create the visual identity of the portfolio, including typography, layouts, effects, responsive styling, and the overall cinematic atmosphere.",

                intro:
                    "Examples:",

                sections: [

                    {
                        heading: "Created the visual identity",
                        details: [
                            "Designed the dark sci-fi inspired color system.",
                            "Created neon glow typography and visual effects.",
                            "Developed the overall presentation style."
                        ]
                    },

                    {
                        heading: "Built reusable styling systems",
                        details: [
                            "Created component-based styling.",
                            "Separated layout, appearance, and animation behavior.",
                            "Designed reusable classes for UI elements."
                        ]
                    },

                    {
                        heading: "Developed responsive layouts",
                        details: [
                            "Created adaptable designs across screen sizes.",
                            "Used flexible positioning and sizing techniques.",
                            "Maintained consistent presentation across devices."
                        ]
                    }

                ]

            },


            JavaScript: {

                title:
                    "THE INTERACTION & DYNAMIC BEHAVIOR",

                overview:
                    "Used JavaScript to transform the website from a static page into an interactive experience by controlling navigation, user interaction, animations, and dynamic content behavior.",

                intro:
                    "Examples:",

                sections: [

                    {
                        heading: "Created dynamic navigation systems",
                        details: [
                            "Built SPA-style page transitions.",
                            "Loaded content dynamically without full refreshes.",
                            "Created application-style navigation behavior."
                        ]
                    },

                    {
                        heading: "Controlled interface behavior",
                        details: [
                            "Managed animation states.",
                            "Updated active navigation elements.",
                            "Created interactive user responses."
                        ]
                    },

                    {
                        heading: "Added custom interactions",
                        details: [
                            "Developed cursor tracking behavior.",
                            "Implemented mouse-based parallax effects.",
                            "Added dynamic functionality throughout the site."
                        ]
                    }

                ]

            }

        }

    },


    technologies: {

        title: "TECH & FEATURES",

        modules: {}

    },


    development: {

        title: "DEVELOPMENT",

        modules: {

            Build: {

                title:
                    "BUILD PIPELINE & VERSION CONTROL",

                overview:
                    "Implemented Git version control, task automation, and a deployment-ready structure for the portfolio build process.",

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
`Welcome to the heart and soul of my portfolio. Countless hours have been devoted to writing the code, testing it, debugging, rewriting, tweaking, testing it again, and embracing the endless cycle of a coder's life.  This project was designed and developed entirely from scratch using semantic HTML5, custom CSS3, and vanilla JavaScript without the use of frontend frameworks.

My goal was to create more than a traditional portfolio, but instead to build a truly interactive digital experience that demonstrates not only my understanding of my frontend development stack, but as well to deliver a captivating website filled with animation, dynamic interactions, and intentional user-focused design.

Most software and web developers create portfolios to showcase their work, but I wanted to take that idea one step further. I wanted to create an immersive platform that not only showcases my projects, but also becomes part of the showcase itself.  As you navigate through the different sections, you'll discover the behind-the-scenes work, design decisions, the thought proccess, and technical systems in place that bring everything together as one final piece of art.`

    }

}

window.projectData = projectData;