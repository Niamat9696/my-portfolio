# Build a Production-Ready Senior Full-Stack Developer Portfolio

Build a complete, modern, production-ready personal portfolio website for **Niamat Ullah**, a Senior Full-Stack Developer with 5+ years of experience.

The portfolio must position me as an experienced engineer capable of owning the complete software development lifecycle:

**Requirements → Architecture → Database → Backend → Frontend → Integrations → Testing → Deployment → Optimization**

Do NOT design this like a generic junior developer portfolio.

The website should communicate within the first few seconds:

> "This developer can design, build, integrate, optimize, and deploy serious production applications."

The overall visual identity should represent:

* Senior software engineering
* Full-stack development
* Backend architecture
* SaaS
* AI integrations
* Cloud infrastructure
* Scalability
* Production systems

---

# 1. Technology Stack

Use:

* Next.js latest stable version
* TypeScript
* App Router
* Tailwind CSS
* Framer Motion / Motion for animations
* Lucide React for icons
* Next/Image for image optimization
* Next/Font for fonts

Prefer Server Components wherever possible.

Only use Client Components when required for:

* animations
* interactive navigation
* mobile menu
* theme interactions
* dynamic UI behavior

Keep dependencies minimal.

Do not install large libraries for functionality that can easily be implemented with CSS or existing framework capabilities.

---

# 2. Architecture

Use a clean and scalable project structure.

Example:

src/
app/
components/
layout/
sections/
ui/
projects/
data/
hooks/
lib/
types/
constants/
assets/

Separate portfolio data from UI components.

Projects, skills, experience, social links, navigation links, and other repeatable content should come from structured TypeScript data/configuration rather than being duplicated directly inside components.

Create reusable components where appropriate.

---

# 3. Design Philosophy

The design should feel like a premium engineering/SaaS product.

Keywords:

* modern
* sophisticated
* technical
* minimal
* dark
* spacious
* professional
* polished
* premium
* engineering-focused

Avoid making the website overly decorative.

Use whitespace intentionally.

The interface should feel similar in quality to a modern SaaS landing page rather than a traditional CV website.

Avoid:

* excessive glassmorphism
* huge gradients
* excessive neon
* excessive glowing
* floating particles everywhere
* unnecessary 3D objects
* giant technology logos
* skill percentage/progress bars
* long typing animations
* distracting cursor effects
* excessive scroll animations
* template-looking layouts

Animations should support the experience rather than become the experience.

---

# 4. Color System

Use the following primary dark theme.

Main background:

#090E17

Secondary background:

#0F172A

Card background:

#111C2E

Primary blue:

#3B82F6

Accent cyan:

#22D3EE

Primary text:

#F8FAFC

Secondary text:

#94A3B8

Border:

#1E293B

Success / availability:

#22C55E

Use approximately:

80% neutral/dark colors
15% primary blue
5% cyan accents

Do NOT overuse cyan.

Blue should be the main interactive color.

Cyan should mainly appear in:

* subtle gradients
* tiny accents
* selected technology tags
* decorative lines
* small highlights
* hover effects

Use CSS variables/design tokens so the color system can easily be changed later.

---

# 5. Typography

Use:

**Inter**
for:

* headings
* paragraphs
* navigation
* buttons
* general UI

Use:

**JetBrains Mono**
for:

* technology labels
* code-style text
* project metadata
* tiny technical accents
* section numbers
* developer-oriented labels

Typography should have strong visual hierarchy.

Suggested desktop sizes:

Hero headline:
56px–72px

Section heading:
36px–48px

Card heading:
20px–24px

Body:
16px–18px

Small text:
14px

Use responsive typography using clamp() or responsive Tailwind utilities.

Headings should use tight line-height.

Paragraphs should remain highly readable with comfortable line-height.

Avoid extremely wide paragraphs.

Recommended maximum text width:

60–75 characters.

---

# 6. Global Layout

Use a centered container.

Recommended maximum width:

1200px–1280px

Desktop horizontal padding:

24px–32px

Mobile:

16px–20px

Use generous vertical spacing between major sections.

Sections should visually breathe.

Do not put everything inside cards.

Use cards only when they improve information hierarchy.

---

# 7. Navigation

Create a sticky/fixed navbar.

Left:

Niamat.

or

Niamat Ullah

Keep the branding minimal.

Navigation:

About
Experience
Projects
Skills
Contact

Add a visually prominent:

Download CV

button.

Include GitHub and LinkedIn icons where appropriate.

Navbar behavior:

At top of page:

* mostly transparent

After scrolling:

* subtle dark background
* slight backdrop blur
* thin bottom border
* smooth transition

Highlight the currently active section.

Clicking navigation links should smoothly scroll to sections.

On mobile:

Use an accessible hamburger menu.

Animate opening/closing smoothly.

Prevent background scrolling when the mobile menu is open.

Close menu after selecting a navigation item.

---

# 8. Hero Section

This is the most important section.

The hero should immediately explain what I do.

Include a small introduction:

Hi, I'm Niamat Ullah.

Main headline:

I build scalable digital products.

Supporting rotating/highlighted concepts can include:

Scalable Web Applications.
Backend Systems.
AI-Powered Products.
Production APIs.

Do NOT use a slow typewriter effect.

Instead use a sophisticated:

* fade
* slide
* word transition
* crossfade

animation.

Supporting paragraph:

Position me as a Senior Full-Stack Developer specializing in modern web applications, backend architecture, AI integrations, databases, cloud infrastructure, and production deployments.

Primary CTA:

View My Work

Secondary CTA:

Contact Me

Also provide:

GitHub
LinkedIn
Email

Use Lucide icons where appropriate.

Include a small availability indicator such as:

● Available for opportunities

only if this can easily be changed/disabled from configuration.

Do NOT use a generic "developer sitting at laptop" illustration.

Instead use subtle technical visual elements such as:

* abstract grid
* architecture nodes
* code-inspired decorative elements
* very subtle gradient
* restrained background glow

Keep the hero professional.

---

# 9. Hero Animation

When page loads:

1. small introduction fades in
2. headline enters
3. description appears
4. CTA buttons appear
5. social links appear

Use slight stagger.

Animation duration should generally stay around:

300ms–700ms.

Do not make users wait for content.

Respect:

prefers-reduced-motion

and remove/reduce animations accordingly.

---

# 10. Credibility / Statistics Strip

Immediately after the hero, show credibility indicators.

Examples:

5+ Years Experience

10+ Projects Delivered

Full-Stack Development

Production & Cloud Experience

Use a clean horizontal layout.

Desktop:

4 columns

Tablet:

2 columns

Mobile:

stack or 2-column layout

Use subtle separators rather than heavy cards.

Numbers can animate once when entering the viewport, but the effect should be subtle.

---

# 11. About Section

Section label:

01 / About

Heading:

Engineering products from idea to production.

Explain that I work across the complete development lifecycle.

Communicate experience with:

* product requirements
* frontend development
* backend architecture
* API design
* databases
* authentication
* third-party integrations
* AI integrations
* payments
* cloud deployment
* production optimization

Keep this section concise.

Use 2–3 short paragraphs instead of a huge biography.

Optionally include a small technical summary panel.

---

# 12. Featured Projects

Section:

02 / Selected Work

Heading:

Products I've helped bring to life.

This should be one of the strongest sections.

Show approximately:

4–6 featured projects.

Potential projects include:

* SlamSport AI
* Black Diamond App
* Vitasoftware SaaS Platform
* Pay the Debt Coin
* Mettaswap
* Book Library System

Also allow newer/better projects to replace these easily through configuration.

Each project card should include:

* project screenshot/visual
* project name
* project category
* short problem/product description
* my role
* important technical contribution
* technology stack
* project status
* View Case Study link
* Live Site link when available
* GitHub link when publicly available

Do NOT show fake links.

Hide unavailable actions.

---

# 13. Project Card Design

Use large visual project cards.

Prefer alternating layouts on desktop:

Image | Information

Information | Image

rather than a repetitive grid of tiny cards.

On mobile:

Image
Information

Project image should have:

* rounded corners
* subtle border
* optimized loading
* responsive sizing

Hover behavior:

* card/image moves approximately 2–4px upward
* border becomes slightly brighter
* project image scales approximately 1.02–1.04
* CTA arrow moves slightly right
* subtle shadow/glow appears

Transition:

200–350ms

Do NOT use aggressive scaling.

---

# 14. Project Case Study Pages

Create dynamic project pages.

Example route:

/projects/[slug]

Each project page should contain:

Project name

Overview

Problem

My Role

Architecture / Approach

Key Features

Technical Challenges

Solutions

Results / Impact

Technology Stack

Screenshots

Links

Each case study should demonstrate engineering thinking rather than just show screenshots.

When appropriate, provide architecture diagrams showing:

Frontend
↓
API
↓
Services
↓
Database
↓
External integrations

Architecture graphics should match the portfolio design system.

---

# 15. Project Image Loading

Use Next/Image.

Implement:

* proper width/height
* responsive sizes
* modern image formats
* lazy loading for below-fold images
* blurred/skeleton placeholders where appropriate

Hero/LCP content should NOT be unnecessarily lazy-loaded.

Avoid layout shifts.

Reserve image dimensions before loading.

---

# 16. Experience Section

Section:

03 / Experience

Use a clean vertical timeline.

Include roles such as:

Full Stack Developer — 1 Sol Digital Services

MERN Stack Developer — Grace Technology

and other verified professional experience.

Each timeline item should contain:

* company
* position
* dates
* short description
* 3–5 major achievements
* technologies used

Highlight achievements involving:

* AI/LLM integrations
* scalable applications
* secure APIs
* JWT/RBAC
* database optimization
* payments
* cloud deployment
* team leadership
* mentoring
* architecture

Timeline animation should reveal entries as they enter the viewport.

Keep animations subtle.

---

# 17. Technical Skills

Section:

04 / Technical Arsenal

Do NOT use percentage bars.

Do NOT write things such as:

React 95%
Node 90%

Group technologies logically.

Frontend:

* JavaScript
* TypeScript
* React
* Next.js
* Tailwind CSS
* Material UI
* Responsive UI

Backend:

* Node.js
* NestJS
* Express.js
* REST APIs
* WebSockets
* API Architecture

Databases:

* MongoDB
* PostgreSQL
* MySQL
* Prisma
* Sequelize
* Mongoose

Authentication & Security:

* JWT
* OAuth
* Passport.js
* RBAC

AI:

* LLM integrations
* AI APIs
* streaming responses
* prompt handling
* AI chat interfaces

Cloud & DevOps:

* AWS
* Docker
* VPS
* Nginx
* Vercel
* cPanel
* CI/CD
* production deployment

Integrations:

* Stripe
* Firebase
* third-party APIs
* social authentication

Tools:

* Git
* GitHub
* Postman
* VS Code

Only include technologies that are actually part of my experience.

Use compact technology pills/cards.

Use JetBrains Mono for technology names where appropriate.

Hover:

* subtle border color change
* small translateY
* slight background change

No dramatic animations.

---

# 18. How I Work

Section:

05 / Process

Heading:

From idea to production.

Create a visual engineering workflow:

01
Understand

02
Architect

03
Build

04
Test

05
Deploy

06
Improve

Briefly explain each stage.

For example:

Understand
Clarify requirements, users, constraints, and business goals.

Architect
Design application architecture, database structure, APIs, security, and integrations.

Build
Develop maintainable frontend and backend systems.

Test
Validate functionality, edge cases, security, and performance.

Deploy
Configure production infrastructure, CI/CD, Nginx, Docker, or cloud hosting.

Improve
Monitor, optimize, fix bottlenecks, and iterate.

Desktop can use a horizontal process.

Mobile should become vertical.

---

# 19. Leadership / Achievements

Add a compact section highlighting:

* production project delivery
* leading development work
* mentoring junior developers
* code reviews
* architecture decisions
* performance optimization
* scalable database design

Do not exaggerate claims.

Keep this section evidence-based.

---

# 20. Contact Section

Section:

06 / Contact

Create a strong closing CTA.

Heading:

Have a product in mind?
Let's build it.

Supporting text should invite:

* full-time opportunities
* freelance projects
* SaaS development
* backend architecture work
* AI integrations
* technical collaboration

Provide:

Email

LinkedIn

GitHub

Optional location:

Pakistan

Do not expose unnecessary personal information.

Include:

Copy Email

functionality.

After clicking:

show a small accessible toast:

Email copied

CTA:

Start a Conversation

---

# 21. Social Links

Social links should be configured from a centralized data file.

Support:

GitHub
LinkedIn
Email

Optionally:

Fiverr
Upwork

only when actual URLs are provided.

Never generate fake URLs.

All external links:

target="_blank"

and use appropriate:

rel="noopener noreferrer"

Add accessible aria-labels.

---

# 22. Footer

Keep footer minimal.

Example:

© [current year] Niamat Ullah.
Designed & built with care.

Include:

GitHub
LinkedIn
Email

Optionally:

Built with Next.js + TypeScript

Automatically generate the current year.

---

# 23. Hover Effects

Use consistent interaction behavior throughout the website.

Buttons:

* subtle background change
* slight translateY(-1px)
* optional small shadow
* icon/arrow movement

Cards:

* translateY(-2px to -4px)
* border highlight
* subtle shadow

Links:

* color transition
* animated underline or arrow

Social icons:

* subtle scale approximately 1.05
* primary color transition

Technology tags:

* border/background transition

Do NOT make elements jump significantly.

Use approximately:

transition duration 200–300ms.

---

# 24. Buttons

Create reusable button variants:

Primary

Secondary

Ghost

Icon

Primary button:

blue background
light text

Hover:

slightly lighter blue
subtle shadow
slight upward movement

Secondary:

transparent/dark background
border

Hover:

brighter border
slight background change

Maintain proper focus-visible states for keyboard navigation.

---

# 25. Scroll Animations

Use Intersection Observer or Framer Motion viewport functionality.

Animate sections when entering viewport.

Preferred effects:

* fade
* translateY 15–30px
* slight stagger

Avoid:

* huge slide animations
* rotation
* bouncing
* aggressive scaling

Animations should generally execute once.

Do not repeatedly animate sections every time the user scrolls slightly.

---

# 26. Background Effects

Use subtle decorative elements.

Possible effects:

* radial blue glow
* cyan accent glow
* grid pattern
* noise texture
* tiny technical lines

Opacity should remain low.

Background effects must never reduce readability.

---

# 27. Cursor

Use the normal system cursor.

Do NOT implement a giant custom cursor.

Interactive elements should use standard pointer behavior.

---

# 28. Responsive Design

The website must work perfectly across:

320px mobile
375px
430px
768px tablet
1024px laptop
1440px desktop
large monitors

Mobile design must not feel like a compressed desktop site.

Explicitly adjust:

* typography
* spacing
* navigation
* project layouts
* timeline
* statistics
* process section
* contact CTA

Avoid horizontal scrolling.

---

# 29. Accessibility

Target WCAG AA where practical.

Implement:

* semantic HTML
* correct heading hierarchy
* keyboard navigation
* visible focus states
* aria-labels
* accessible mobile navigation
* sufficient color contrast
* meaningful alt text
* reduced motion support

Do not rely solely on color to communicate meaning.

---

# 30. Performance

Performance is extremely important because this portfolio represents a developer.

Target Lighthouse scores close to:

Performance: 95+
Accessibility: 95+
Best Practices: 95+
SEO: 95+

Optimize:

* JavaScript bundle
* fonts
* images
* animations
* third-party scripts
* CSS

Use code splitting where useful.

Lazy-load heavy below-fold components where it provides an actual benefit.

Do NOT lazy-load everything blindly.

Avoid unnecessary hydration.

Prefer Server Components.

---

# 31. Loading States

Implement elegant loading states.

For project images:

use placeholders/skeletons where necessary.

For route navigation:

use subtle loading UI if meaningful.

Avoid giant full-screen spinners.

Loading states should match the dark design system.

---

# 32. SEO

Implement strong technical SEO.

Create metadata for:

Title:

Niamat Ullah | Senior Full-Stack Developer

Description focused on:

Full-Stack Development
React
Next.js
Node.js
NestJS
Backend Architecture
AI Integrations
SaaS
Cloud Deployment

Create:

* metadata
* canonical URL support
* robots.txt
* sitemap.xml
* Open Graph metadata
* Twitter/X cards
* structured data

Use JSON-LD for:

Person

and appropriate professional/profile information.

Project pages should have individual metadata.

---

# 33. Open Graph

Create a professional Open Graph image.

It should include:

Niamat Ullah

Senior Full-Stack Developer

Scalable Web Apps • Backend Systems • AI Products

Use the same dark/blue visual identity.

---

# 34. URL Structure

Use clean URLs.

Examples:

/

/projects/slamsport-ai

/projects/black-diamond

/projects/vitasoftware

Avoid query-based project URLs.

---

# 35. Analytics

Structure the application so privacy-friendly analytics can easily be added.

Possible future integration:

Vercel Analytics

Do not add invasive tracking.

---

# 36. Error Pages

Create a custom:

404 page.

Keep it consistent with the portfolio.

Example:

404
Looks like this route wasn't deployed.

Button:

Back to Home

A small developer-related joke is acceptable, but keep it professional.

---

# 37. Error Handling

External links and optional data should never break the UI.

Missing project screenshots should have graceful fallbacks.

Missing Live/GitHub links should simply hide those buttons.

---

# 38. Contact Email Protection

Avoid unnecessarily exposing email in source code in multiple locations.

Keep contact information centralized.

If no backend contact form is necessary, prefer:

mailto

and

Copy Email

rather than building an unnecessary backend service.

---

# 39. Content Strategy

Write portfolio copy like a senior engineer.

Avoid generic statements such as:

"I'm passionate about coding."

"I love solving problems."

"I'm a hardworking developer."

Prefer specific positioning:

"I design and build production systems across frontend, backend, databases, integrations, and infrastructure."

Focus on:

problems
architecture
technical decisions
business impact
performance
security
scalability
delivery

---

# 40. Project Content Quality

Do not describe projects only as:

"Built using React and Node."

Explain:

What problem existed?

What did I build?

What architecture did I choose?

What difficult technical problems occurred?

How were they solved?

What was the result?

Example structure:

Problem

A platform required multiple user roles with different permissions and complex operational workflows.

Solution

Designed a modular backend architecture with RBAC, secure APIs, optimized database relationships, and isolated business modules.

Impact

Created a maintainable foundation capable of supporting additional modules without tightly coupling business logic.

---

# 41. Microinteractions

Add small professional microinteractions.

Examples:

CTA arrow movement

navigation underline

copy-email feedback

project image zoom

button press feedback

active navigation indicator

technology pill hover

timeline highlight

Keep these extremely polished and restrained.

---

# 42. Page Transitions

If page transitions are implemented between home and project case studies:

use:

opacity
small translateY

Duration:

200–400ms

Do not delay navigation unnecessarily.

---

# 43. Scroll Behavior

Use smooth scrolling.

Account for sticky navbar offset.

Provide a subtle Back to Top button after the user has scrolled sufficiently.

The button should:

fade in
remain unobtrusive
have an accessible label

---

# 44. Mobile Navigation

Mobile menu should cover enough space to be easy to use.

Include:

About
Experience
Projects
Skills
Contact
Download CV

Optionally show social links at the bottom.

Use smooth open/close animation.

Escape key should close the menu when applicable.

---

# 45. CV Integration

Provide a:

Download CV

button in:

Navbar
Hero or About
Contact/Footer if appropriate

CV should open/download reliably.

Store the PDF in an appropriate public/static asset location.

Do not embed a huge PDF viewer directly into the homepage.

---

# 46. Theme

Start with dark mode as the primary identity.

Architect colors using CSS variables so a light theme can be introduced later without redesigning every component.

A theme toggle is optional.

Do not add it if it weakens the visual identity or adds unnecessary complexity.

---

# 47. Component Quality

Components should:

* have clear responsibilities
* use proper TypeScript interfaces
* avoid duplicated markup
* avoid unnecessary prop drilling
* remain readable
* remain maintainable

Do not over-engineer basic components.

---

# 48. Code Quality

Use:

* TypeScript strict typing
* ESLint
* Prettier
* clean naming
* reusable utilities
* semantic HTML

Avoid:

any

unless absolutely unavoidable.

Remove:

* unused imports
* console logs
* dead components
* placeholder code
* commented-out code

before final delivery.

---

# 49. Security

For external links:

noopener noreferrer

Do not expose:

API secrets
tokens
private environment variables

If analytics or external APIs are later added, use environment variables appropriately.

---

# 50. Content Data

Create centralized data structures such as:

personalInfo
navigation
socialLinks
experience
projects
skills
achievements

Example concept:

const personalInfo = {
name: "Niamat Ullah",
title: "Senior Full-Stack Developer",
location: "Pakistan",
};

Do not duplicate personal information across many components.

---

# 51. Projects Data Model

Each project should support fields similar to:

slug
title
shortDescription
description
category
role
image
images
technologies
problem
solution
architecture
challenges
results
liveUrl
githubUrl
featured

This allows project pages to be generated dynamically.

---

# 52. Image Strategy

Use screenshots of actual projects whenever available.

Do not fill the portfolio with generic stock images.

For projects without screenshots:

create tasteful abstract technical previews based on the project's purpose.

Maintain consistent aspect ratios.

Recommended:

16:10

or

16:9.

---

# 53. Animation Performance

Prefer animations using:

transform
opacity

Avoid repeatedly animating properties causing expensive layout recalculation.

Animations must remain smooth on mid-range mobile devices.

Do not sacrifice performance for visual effects.

---

# 54. Technical Personality

Introduce subtle engineering personality throughout the website.

Examples:

01 / ABOUT

02 / SELECTED WORK

03 / EXPERIENCE

04 / TECHNICAL ARSENAL

Use JetBrains Mono for these labels.

Small elements such as:

<developer />

{ build: "production" }

or architectural notation may be used sparingly.

Do not turn the entire website into a fake code editor.

---

# 55. Final Page Order

Use this overall homepage structure:

Navbar

Hero

Credibility Metrics

About

Featured Projects

Experience

Technical Skills

How I Work

Leadership / Achievements

Contact CTA

Footer

Project details should live on separate routes.

---

# 56. Final Visual Goal

The finished website should feel like the portfolio of someone who could confidently be hired as:

Senior Full-Stack Developer

Backend Developer

MERN / Node.js Engineer

NestJS Developer

SaaS Engineer

AI Integration Developer

Technical Lead

The design should communicate engineering maturity rather than simply displaying a list of technologies.

---

# 57. Information to Use

Developer:

Niamat Ullah

Primary positioning:

Senior Full-Stack Developer

Experience:

5+ years

Primary technical ecosystem:

Frontend:
React.js
Next.js
TypeScript
JavaScript
Tailwind CSS
Material UI

Backend:
Node.js
NestJS
Express.js
REST APIs
WebSockets

Databases:
MongoDB
PostgreSQL
MySQL

ORM / ODM:
Mongoose
Prisma
Sequelize
TypeORM where applicable

Authentication:
JWT
OAuth
Passport.js
RBAC
Firebase Authentication

AI:
LLM integrations
AI APIs
AI chat interfaces
streaming responses
prompt handling

Cloud / DevOps:
AWS
Docker
Nginx
VPS
Vercel
cPanel
CI/CD
Linux deployments

Integrations:
Stripe
Firebase
social authentication
third-party APIs

Version control:
Git
GitHub

Experience also includes:

* database architecture
* API architecture
* performance optimization
* production deployment
* server configuration
* payment integrations
* authentication systems
* real-time functionality
* leadership
* code reviews
* mentoring junior developers

---

# 58. Important Implementation Rule

Do not invent professional information.

Do not invent:

* company names
* project metrics
* GitHub URLs
* LinkedIn URLs
* live project URLs
* client names
* testimonials
* awards
* revenue numbers
* user numbers
* performance improvements
* employment dates

If information is unavailable, create a clearly identifiable configuration placeholder or omit the element.

Never publish fake information just to make the portfolio appear more impressive.

---

# 59. Final Testing

Before considering development complete, test:

Desktop

Tablet

Mobile

Chrome

Firefox

Edge

Safari compatibility where practical.

Test:

navigation
mobile menu
all CTAs
external links
CV download
project routes
404 route
copy email
animations
keyboard navigation
focus states
responsive images
lazy loading
reduced motion
SEO metadata

Check for:

layout shifts
horizontal overflow
broken links
missing images
console errors
hydration errors
TypeScript errors
ESLint errors

---

# 60. Final Optimization

Run a production build.

Fix all:

TypeScript errors
ESLint issues
hydration warnings
console errors

Optimize Lighthouse results.

Check Core Web Vitals:

LCP
CLS
INP

Make sure animations and large images do not hurt performance.

---

# 61. Expected Final Result

The final result must NOT look like a downloaded developer portfolio template.

It should feel custom-built specifically for Niamat Ullah.

Someone visiting the portfolio should quickly understand:

Who I am.

What I specialize in.

What kinds of systems I have built.

How I approach engineering.

What technologies I work with.

Why I can be trusted with production software.

How to contact me.

Prioritize:

clarity over decoration

engineering credibility over buzzwords

real projects over generic claims

performance over unnecessary animation

case studies over technology logo walls

professional polish over flashy effects

The finished portfolio should feel like a modern software engineer's personal product — not simply an online CV.
