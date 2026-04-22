# Requirements Document

## Introduction

Dilitech is a premium computer retail company based in Mali. This feature delivers a high-end, immersive product website that rivals apple.com and coffee-tech.com in quality, smoothness, storytelling, and interactivity. The website showcases Dilitech's brand identity through a 3D-driven hero experience, scroll-based storytelling, and a guided selling approach — all built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React Three Fiber, GSAP, and shadcn/ui. The site is fully responsive, performant on low-end devices, and supports dark/light mode. All user-facing text is in French.

## Glossary

- **Website**: The Dilitech premium product website, the single-page application delivered by this feature
- **Loading_Screen**: The initial premium loading experience displayed while assets (3D model, fonts, images) are being fetched
- **Navbar**: The sticky glassmorphism navigation bar at the top of the page
- **Hero_Section**: The fullscreen immersive section containing the 3D model, scroll-driven storytelling text, and call-to-action buttons
- **Three_D_Viewer**: The React Three Fiber canvas component that renders and animates the animation.glb 3D model
- **Scroll_Controller**: The GSAP-based scroll-trigger system that drives camera movement, model rotation, and text transitions within the Hero_Section
- **Product_Grid**: The section displaying brand cards (HP, Lenovo, Mac) with product descriptions and tags
- **Conversion_Section**: The section where users can request a personalized computer recommendation based on budget and usage
- **Services_Section**: The section presenting Dilitech's support services (Maintenance, Assistance, After-sales)
- **Testimonials_Section**: The circular testimonials component displaying customer reviews with images
- **About_Section**: The short company presentation section
- **Footer**: The bottom section containing location map, contact information, social links, and opening hours
- **Theme_Toggle**: The dark/light mode toggle control
- **Visitor**: Any person browsing the Dilitech website

## Requirements

### Requirement 1: Loading Experience

**User Story:** As a Visitor, I want to see a premium loading screen while the website assets load, so that I perceive the brand as high-quality from the first moment.

#### Acceptance Criteria

1. WHEN the Website is first accessed, THE Loading_Screen SHALL display the Dilitech logo (logo.png) with a fade-in animation
2. WHILE assets are loading, THE Loading_Screen SHALL display an animated progress indicator reflecting actual loading progress
3. WHEN all critical assets have loaded, THE Loading_Screen SHALL transition smoothly to the Hero_Section with a fade-out animation lasting between 600ms and 1000ms
4. THE Loading_Screen SHALL remain visible for a minimum of 1500ms to ensure the brand impression registers even on fast connections

### Requirement 2: Glassmorphism Navbar

**User Story:** As a Visitor, I want a sticky, translucent navigation bar, so that I can access any section of the website at any time without losing context.

#### Acceptance Criteria

1. THE Navbar SHALL remain fixed at the top of the viewport during scrolling
2. THE Navbar SHALL apply a glassmorphism effect using a backdrop blur of at least 12px and a semi-transparent background
3. THE Navbar SHALL display the Dilitech logo (logo.png) on the left side
4. THE Navbar SHALL display navigation links in the center: Accueil, Produits, Services, À Propos, Témoignages
5. THE Navbar SHALL display a "Contact" call-to-action button on the right side styled with a gradient using the primary color #02a3da
6. WHEN a Visitor clicks a navigation link, THE Navbar SHALL smooth-scroll the page to the corresponding section
7. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu
8. WHEN a Visitor opens the hamburger menu, THE Navbar SHALL display navigation links in a full-screen or slide-in overlay with smooth animation

### Requirement 3: Hero Section with 3D Model

**User Story:** As a Visitor, I want to see an immersive fullscreen hero with a rotating 3D computer model, so that I am immediately captivated by the premium experience.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy 100% of the viewport height on initial load
2. THE Three_D_Viewer SHALL load and render the animation.glb 3D model centered in the Hero_Section
3. WHILE the Visitor has not scrolled, THE Three_D_Viewer SHALL rotate the 3D model slowly on the Y-axis at a constant speed
4. THE Hero_Section SHALL display the title text "Une machine exceptionnelle pour un client d'exception" with a fade-in animation
5. THE Hero_Section SHALL display two call-to-action buttons: "Explorer" and "Acheter maintenant" styled with gradient backgrounds using #02a3da
6. THE Three_D_Viewer SHALL use lazy loading via dynamic imports to avoid blocking the initial page render
7. IF the WebGL context fails to initialize, THEN THE Three_D_Viewer SHALL display a static fallback image of the product

### Requirement 4: Scroll-Driven Storytelling

**User Story:** As a Visitor, I want the hero section to evolve as I scroll — with camera movements, text transitions, and feature highlights — so that I experience a cinematic product presentation.

#### Acceptance Criteria

1. WHEN the Visitor scrolls within the Hero_Section, THE Scroll_Controller SHALL trigger GSAP ScrollTrigger animations that change the camera angle and distance around the 3D model
2. WHEN the Visitor scrolls within the Hero_Section, THE Scroll_Controller SHALL transition the displayed text through at least three storytelling phases: Performance, Design, and Power
3. WHILE a storytelling phase is active, THE Hero_Section SHALL display a heading and a short description relevant to that phase with a fade-in/fade-out animation
4. THE Scroll_Controller SHALL keep the 3D model visible and centered throughout all storytelling phases within the Hero_Section
5. THE Scroll_Controller SHALL pin the Hero_Section during the scroll storytelling sequence so that the Visitor scrolls through phases without leaving the section

### Requirement 5: Product Brands Grid

**User Story:** As a Visitor, I want to browse the key computer brands Dilitech offers, so that I can identify products that match my preferences.

#### Acceptance Criteria

1. THE Product_Grid SHALL display cards for HP, Lenovo, and Mac brands in a responsive grid layout
2. THE Product_Grid SHALL display each brand card with the corresponding product image (hp.jpg, lenevo.jpg, mac.jpg), brand name, a short description, and category tags
3. WHEN a brand card enters the viewport, THE Product_Grid SHALL animate the card with a GSAP fade-in-up effect
4. WHEN a Visitor hovers over a brand card, THE Product_Grid SHALL apply a scale-up transform and an elevated shadow effect with a smooth transition between 150ms and 300ms
5. THE Product_Grid SHALL use Next.js Image component with optimized loading for all product images

### Requirement 6: Conversion Section (Guided Selling)

**User Story:** As a Visitor, I want to tell Dilitech my budget and usage needs, so that I can receive a personalized computer recommendation.

#### Acceptance Criteria

1. THE Conversion_Section SHALL display the title "Obtenez la machine idéale pour vos besoins"
2. THE Conversion_Section SHALL present selectable usage categories: Gaming, Travail, Montage vidéo, Design, Bureautique
3. THE Conversion_Section SHALL display a "Demander une recommandation" call-to-action button styled with a gradient using #02a3da
4. THE Conversion_Section SHALL display a WhatsApp contact button linking to https://wa.me/22371927198
5. WHEN a Visitor clicks the WhatsApp button, THE Website SHALL open the WhatsApp conversation in a new tab with a pre-filled message including the selected usage category
6. THE Conversion_Section SHALL animate elements on scroll entry using GSAP fade-in effects

### Requirement 7: Services Section

**User Story:** As a Visitor, I want to learn about Dilitech's support services, so that I feel confident about post-purchase support.

#### Acceptance Criteria

1. THE Services_Section SHALL display at least three service offerings: Maintenance, Assistance, and Service après-vente d'exception
2. THE Services_Section SHALL present each service with an SVG icon, a title, and a short description in a card-based or icon-based layout
3. WHEN a service card enters the viewport, THE Services_Section SHALL animate the card with a GSAP staggered fade-in effect
4. THE Services_Section SHALL use a responsive layout that stacks cards vertically on viewports below 768px

### Requirement 8: Testimonials Section

**User Story:** As a Visitor, I want to read customer testimonials with photos, so that I trust Dilitech based on real customer experiences.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display at least four testimonials using images from the /public/testimonial/ directory (testimonial_female_1.jpg, testimonial_female_2.jpg, testimonial_man_1.jpg, testimonial_man_2.jpg)
2. THE Testimonials_Section SHALL present testimonials in a circular or carousel-style component with smooth transition animations
3. WHEN the Testimonials_Section enters the viewport, THE Testimonials_Section SHALL animate testimonial cards with a staggered entrance effect
4. THE Testimonials_Section SHALL display each testimonial with a customer photo (circular crop), customer name, and review text

### Requirement 9: About Section

**User Story:** As a Visitor, I want to learn about Dilitech as a company, so that I understand who I am buying from.

#### Acceptance Criteria

1. THE About_Section SHALL display a short company presentation describing Dilitech's mission and presence in Mali
2. THE About_Section SHALL use a clean, human-centered layout with generous whitespace
3. WHEN the About_Section enters the viewport, THE About_Section SHALL animate content with a GSAP fade-in effect

### Requirement 10: Footer with Contact and Location

**User Story:** As a Visitor, I want to find Dilitech's location, contact details, and social links, so that I can reach out or visit the store.

#### Acceptance Criteria

1. THE Footer SHALL display an embedded Google Maps iframe showing the Dilitech store location in Mali
2. THE Footer SHALL display contact information: WhatsApp number +223 71 92 71 98 and an email address
3. THE Footer SHALL display social media links as clickable icons
4. THE Footer SHALL display store opening hours
5. THE Footer SHALL use a responsive multi-column layout that stacks on viewports below 768px

### Requirement 11: Dark/Light Mode

**User Story:** As a Visitor, I want to toggle between dark and light themes, so that I can browse the website in my preferred visual mode.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL be accessible from the Navbar
2. WHEN a Visitor clicks the Theme_Toggle, THE Website SHALL switch between dark and light color schemes with a smooth transition
3. THE Website SHALL persist the selected theme preference in localStorage so that the preference is retained across page reloads
4. THE Website SHALL default to the system color scheme preference on first visit using the prefers-color-scheme media query
5. WHILE dark mode is active, THE Website SHALL apply dark background colors, light text, and adjusted glassmorphism effects for the Navbar

### Requirement 12: Performance Optimization

**User Story:** As a Visitor on a low-end device, I want the website to load quickly and animate smoothly, so that I have a good experience regardless of my hardware.

#### Acceptance Criteria

1. THE Website SHALL lazy-load the Three_D_Viewer component using Next.js dynamic imports with no SSR
2. THE Website SHALL optimize all product and testimonial images using the Next.js Image component with appropriate width, height, and format settings
3. THE Website SHALL use code splitting so that the Three_D_Viewer bundle is loaded separately from the main page bundle
4. IF the Visitor's device does not support WebGL, THEN THE Website SHALL render a static fallback layout without the 3D model
5. THE Website SHALL target a Lighthouse Performance score of 80 or above on mobile

### Requirement 13: Responsive Design

**User Story:** As a Visitor on any device, I want the website to adapt to my screen size, so that the experience is consistent across mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Website SHALL render correctly at viewport widths of 375px, 768px, 1024px, and 1440px
2. WHILE the viewport width is below 768px, THE Website SHALL stack content vertically and adjust font sizes for readability
3. WHILE the viewport width is below 768px, THE Three_D_Viewer SHALL reduce the 3D model scale to fit the mobile viewport
4. THE Website SHALL prevent horizontal scrolling at all viewport widths

### Requirement 14: Smooth Scrolling and Micro-Interactions

**User Story:** As a Visitor, I want smooth scrolling and subtle interactive feedback throughout the website, so that the browsing experience feels polished and premium.

#### Acceptance Criteria

1. THE Website SHALL enable smooth scrolling behavior globally using CSS scroll-behavior or a GSAP smooth-scroll implementation
2. WHEN a Visitor hovers over any interactive element (button, card, link), THE Website SHALL provide visual feedback through color change, shadow, or opacity transition within 150ms to 300ms
3. THE Website SHALL respect the prefers-reduced-motion media query by disabling non-essential animations when the Visitor has requested reduced motion
4. THE Website SHALL use GSAP ScrollTrigger for all scroll-based entrance animations across all sections
