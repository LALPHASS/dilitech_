# Implementation Plan: Dilitech Premium Website

## Overview

Build a premium, immersive single-page website for Dilitech (computer retail, Mali) using Next.js 16 App Router, TypeScript, Tailwind CSS v4, React Three Fiber, GSAP, and next-themes. Implementation follows a foundation-first approach: install dependencies, set up theming and global styles, create data/utility layers, then build components bottom-up (leaf components first, then sections, then page orchestrator), and finally wire scroll animations and integration.

## Tasks

- [x] 1. Install dependencies and configure project foundation
  - [x] 1.1 Install required npm packages
    - Run: `npm install @react-three/fiber @react-three/drei three next-themes`
    - Run: `npm install -D @types/three fast-check`
    - Verify all packages resolve without peer dependency conflicts
    - _Requirements: 3.6, 11.1, 12.1_

  - [x] 1.2 Update globals.css with Dilitech theme tokens and smooth scrolling
    - Add CSS custom properties for Dilitech brand: `--dilitech-primary: #02a3da`, gradient variants, glassmorphism tokens
    - Override shadcn `:root` and `.dark` CSS variables to incorporate Dilitech primary color into `--primary`
    - Add `html { scroll-behavior: smooth; }` for global smooth scrolling
    - Add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` 
    - _Requirements: 2.2, 5.4, 11.5, 14.1, 14.3_

  - [x] 1.3 Update layout.tsx with ThemeProvider and metadata
    - Wrap children in `ThemeProvider` from `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`
    - Add `suppressHydrationWarning` to `<html>` element
    - Update `<Metadata>` with Dilitech title and description (French)
    - _Requirements: 11.3, 11.4_

- [ ] 2. Create data layer and utility modules
  - [ ] 2.1 Create lib/constants.ts with all static data
    - Define and export typed interfaces: `NavLink`, `StoryPhase`, `BrandCard`, `UsageCategory`, `ServiceCard`, `Testimonial`
    - Export `NAV_LINKS`, `STORY_PHASES`, `BRAND_CARDS`, `USAGE_CATEGORIES`, `SERVICES`, `TESTIMONIALS` arrays with French content as specified in the design
    - _Requirements: 2.4, 4.2, 5.2, 6.2, 7.2, 8.1_

  - [ ] 2.2 Create lib/animations.ts with GSAP configuration
    - Register GSAP ScrollTrigger plugin at module level
    - Export `ANIMATION_DEFAULTS` object with `fadeInUp`, `fadeOut`, `stagger`, and `heroPin` configs as defined in the design
    - Export helper function to create reduced-motion-aware animations using `gsap.matchMedia()`
    - _Requirements: 4.1, 14.3, 14.4_

  - [ ] 2.3 Create custom hooks
    - Create `hooks/use-loading-progress.ts`: tracks font, image, and 3D model loading state, returns `progress` (0–100) and `isComplete` boolean
    - Create `hooks/use-scroll-animations.ts`: wraps GSAP ScrollTrigger setup with `gsap.context()` for proper cleanup on unmount
    - Create `hooks/use-media-query.ts`: returns boolean for a given media query string (used for responsive breakpoints)
    - Create `hooks/use-reduced-motion.ts`: detects `prefers-reduced-motion: reduce` via `window.matchMedia`
    - _Requirements: 1.2, 4.1, 13.3, 14.3_

  - [ ]* 2.4 Write property test for scroll phase mapping (Property 2)
    - **Property 2: Scroll progress maps to valid story phase**
    - Generate random scroll progress floats in [0, 1], verify the phase mapping function returns a valid index (0–3) and that increasing progress produces monotonically non-decreasing indices
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 4.2**

  - [ ]* 2.5 Write property test for WhatsApp URL generation (Property 4)
    - **Property 4: WhatsApp URL generation includes selected category**
    - Generate random usage category selections from the predefined list, verify the URL contains `https://wa.me/22371927198` and the URL-encoded text includes the selected category label
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 6.5**

- [ ] 3. Checkpoint — Verify foundation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Build leaf UI components
  - [ ] 4.1 Create components/theme-toggle.tsx
    - Use `useTheme()` from `next-themes` to toggle between light and dark
    - Render Sun/Moon icons from Lucide React
    - Only render after mount (check `mounted` state) to avoid hydration mismatch
    - Smooth icon transition via CSS
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [ ] 4.2 Create components/loading-screen.tsx
    - Accept `onLoadingComplete` callback prop
    - Display Dilitech logo (`logo.png`) with fade-in animation
    - Show animated progress bar reflecting actual loading progress from `use-loading-progress` hook
    - Enforce minimum 1500ms display time before triggering fade-out
    - Fade-out transition: 800ms
    - Call `onLoadingComplete` after fade-out completes
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 4.3 Write property test for loading screen minimum display time (Property 1)
    - **Property 1: Loading screen enforces minimum display time**
    - Generate random asset loading durations (0ms–5000ms), verify the loading screen remains visible for at least 1500ms
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 1.4**

  - [ ] 4.4 Create components/navbar.tsx
    - Fixed position with glassmorphism: `backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/10`
    - Logo on left, centered nav links (from `NAV_LINKS`), gradient "Contact" CTA on right
    - Integrate `ThemeToggle` component in the navbar
    - Smooth scroll on link click via `scrollIntoView({ behavior: 'smooth' })`
    - Below 768px: hamburger icon → full-screen overlay with slide-in animation
    - Close mobile menu on link click, on Escape key, trap focus when open
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 11.1_

  - [ ] 4.5 Create 3D viewer components
    - Create `components/computer-model.tsx`: uses `useGLTF('/animation.glb')` from Drei, idle Y-axis rotation via `useFrame` when phase is 0, respects `reducedMotion` prop, scales to 0.7 on mobile
    - Create `components/camera-controller.tsx`: uses `useFrame` + `THREE.Vector3.lerp` for smooth camera transitions driven by `targetPosition` and `targetLookAt` props
    - Create `components/three-d-viewer.tsx`: R3F `<Canvas>` with `<Suspense>` fallback, `<Environment preset="studio" />` + directional light, WebGL detection (fallback to static image if unsupported), `<ErrorBoundary>` wrapper
    - The ThreeDViewer must be exported as a dynamic import wrapper with `ssr: false`
    - _Requirements: 3.2, 3.3, 3.6, 3.7, 12.1, 12.3, 12.4, 13.3_

- [ ] 5. Checkpoint — Verify leaf components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Build section components
  - [ ] 6.1 Create components/hero-section.tsx
    - Occupy 100vh on initial load with `id="accueil"`
    - Integrate `ThreeDViewer` (dynamically imported) centered in the section
    - Implement `ScrollStoryOverlay`: GSAP ScrollTrigger pins the hero, `scrub: 1`, `end: "+=300%"`
    - Transition text through 4 story phases (intro, performance, design, power) with fade-in/fade-out
    - Track `currentPhase` (0–3) via ScrollTrigger `onUpdate` progress and pass to ThreeDViewer
    - Display title and two CTA buttons ("Explorer", "Acheter maintenant") with gradient backgrounds using #02a3da in intro phase
    - Use `gsap.context()` for cleanup on unmount
    - Respect reduced motion: skip animations, show static camera position
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 14.3_

  - [ ] 6.2 Create components/product-grid.tsx
    - Section with `id="produits"`, 3-column responsive grid (`grid-cols-1 md:grid-cols-3`)
    - Render `BRAND_CARDS` data: Next.js `<Image>` with `sizes` prop, brand name, French description, category tags
    - GSAP entrance: `fade-in-up` with `stagger: 0.15` on viewport entry via ScrollTrigger
    - Hover: `scale(1.03)` + `shadow-2xl` transition over 200ms, `cursor-pointer`
    - Use `gsap.context()` for cleanup
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 14.2_

  - [ ] 6.3 Create components/conversion-section.tsx
    - Title: "Obtenez la machine idéale pour vos besoins"
    - Render selectable usage category chips from `USAGE_CATEGORIES` with toggle selection state
    - "Demander une recommandation" gradient CTA button
    - WhatsApp button: opens `https://wa.me/22371927198?text=...` with pre-filled message including selected category, opens in new tab
    - GSAP fade-in on scroll entry, cleanup with `gsap.context()`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [ ] 6.4 Create components/services-section.tsx
    - Section with `id="services"`, 3-column grid stacking vertically below 768px
    - Render `SERVICES` data with Lucide icons (Wrench, Headphones, ShieldCheck), title, description
    - GSAP staggered fade-in: `stagger: 0.2` on viewport entry
    - Use `gsap.context()` for cleanup
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 6.5 Create components/testimonials-section.tsx
    - Section with `id="temoignages"`, carousel-style component
    - Render 4 `TESTIMONIALS` with circular cropped photos (`rounded-full`), customer name, French review text
    - Auto-advance every 5 seconds, manual navigation dots
    - GSAP staggered entrance on viewport entry
    - Use `gsap.context()` for cleanup
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 6.6 Create components/about-section.tsx
    - Section with `id="a-propos"`, short company description in French
    - Clean layout: `py-24 max-w-3xl mx-auto` with generous whitespace
    - GSAP fade-in on scroll entry, cleanup with `gsap.context()`
    - _Requirements: 9.1, 9.2, 9.3_

  - [ ] 6.7 Create components/footer.tsx
    - Multi-column layout: Map | Contact | Social | Hours
    - Embedded Google Maps iframe for Dilitech location in Mali
    - WhatsApp: +223 71 92 71 98, email link
    - Social media icon links using Lucide icons
    - Store opening hours
    - Responsive: stacks vertically below 768px
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 6.8 Write property test for data-driven card rendering completeness (Property 3)
    - **Property 3: Data-driven card rendering completeness**
    - Generate random valid BrandCard, ServiceCard, and Testimonial objects, verify rendered output contains every field (BrandCard: image, name, description, all tags; ServiceCard: icon, title, description; Testimonial: image, name, review)
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 5.2, 7.2, 8.4**

- [ ] 7. Checkpoint — Verify section components
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Wire page orchestrator and final integration
  - [ ] 8.1 Rewrite app/page.tsx as client component orchestrator
    - Add `"use client"` directive
    - Manage `isLoaded` state to control `LoadingScreen` visibility
    - Compose all sections in order: `LoadingScreen` → `Navbar` → `HeroSection` → `ProductGrid` → `ConversionSection` → `ServicesSection` → `TestimonialsSection` → `AboutSection` → `Footer`
    - Dynamically import `ThreeDViewer` with `next/dynamic` and `{ ssr: false }` (passed into HeroSection)
    - Hide page content until loading completes, then reveal with smooth transition
    - Add section `id` attributes matching nav link `href` targets for smooth scroll navigation
    - Ensure no horizontal scrolling at any viewport width (`overflow-x: hidden` on body if needed)
    - _Requirements: 1.3, 3.1, 3.6, 12.1, 12.3, 13.4, 14.1_

  - [ ]* 8.2 Write property test for theme persistence round-trip (Property 5)
    - **Property 5: Theme preference round-trip persistence**
    - Generate random theme values ("light", "dark"), set the theme and read back from localStorage, verify round-trip consistency
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 11.3**

  - [ ]* 8.3 Write property test for reduced motion behavior (Property 6)
    - **Property 6: Reduced motion disables non-essential animations**
    - Generate random GSAP animation configurations, verify that when `prefers-reduced-motion: reduce` is active, animations are skipped or execute with duration 0
    - Minimum 100 iterations using fast-check
    - **Validates: Requirements 14.3**

  - [ ]* 8.4 Write unit tests for key components
    - Test Navbar renders all 5 nav links with correct French labels, Contact CTA, hamburger at mobile breakpoint, theme toggle
    - Test ProductGrid renders 3 brand cards with correct images
    - Test ConversionSection renders all 5 usage categories and WhatsApp link with correct base URL
    - Test ServicesSection renders 3 service cards
    - Test TestimonialsSection renders 4 testimonials
    - Test Footer renders Google Maps iframe, contact info, social links
    - Test WebGL fallback: mock WebGL as unavailable, verify static fallback renders
    - _Requirements: 2.4, 5.2, 6.2, 7.2, 8.1, 10.1, 12.4_

- [ ] 9. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- All GSAP ScrollTrigger instances must use `gsap.context()` and be cleaned up on unmount
- The 3D viewer must always be dynamically imported with `ssr: false`
- All user-facing text must be in French
- Dependencies (@react-three/fiber, @react-three/drei, three, next-themes) must be installed before any component work begins
