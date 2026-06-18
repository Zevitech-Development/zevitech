# Zevitech — Production Codebase Rules

This file governs all AI-assisted development in this repository.
Do not deviate from these rules. They exist to prevent regressions, design drift, and production incidents.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v3 + shadcn/ui (new-york style)
- **Animation:** framer-motion v12, motion v12, react-fast-marquee, swiper, embla-carousel
- **Forms:** react-hook-form + zod
- **Icons:** lucide-react, react-icons
- **Fonts:** Coolvetica Rg (custom, heading), Inter (Google, body)
- **Analytics:** GA4 `G-4V3XW7Q5EG`, Google Ads `AW-17789624484`, MS Clarity `ujhgmiiqop`
- **Notifications:** sonner (Toaster)

---

## Folder Structure

```
src/
├── app/                      # Route definitions ONLY — no logic or markup
│   ├── (website)/            # Main site routes — shares global header/footer
│   ├── landing-pages/        # Landing page routes — each has its own layout.tsx
│   ├── api/                  # API route handlers
│   ├── payment/              # Payment flow
│   └── layout.tsx            # Root layout — global scripts, fonts, providers
│
├── containers/               # Page-level composition — one file per page
├── components/
│   ├── common/               # Reusable section-level components (hero, FAQ, contact…)
│   ├── layouts/              # Header, footer, guards, navigation
│   ├── forms/                # Form components (dialog form, multi-step)
│   ├── partials/             # Small atoms (Logo, CountUp, etc.)
│   ├── hooks/                # Custom React hooks
│   └── ui/                   # shadcn/ui components + custom advanced UI
│
├── elements/                 # Business-specific, non-reusable sections
│   ├── business/             # Landing page elements (logo-design, shopify, website-design)
│   └── website/              # Main website page elements (home, services…)
│
├── content/                  # Static data — arrays, config objects, copy
├── interfaces/               # TypeScript interfaces for ALL component props
├── schemas/                  # Zod validation schemas
├── services/                 # Business logic (email, payment)
├── utils/                    # Helpers (metadata, validators)
├── lib/                      # Utility functions (cn, etc.)
└── styles/
    ├── globals.css           # CSS variables, base resets, font-face
    ├── include.css           # Additional global includes
    └── animation.css         # Keyframe animation definitions
```

### Placement Rules

| What you're building                   | Where it goes                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| A new route                            | `src/app/[zone]/[route]/page.tsx`                                            |
| Page composition logic                 | `src/containers/[zone]/[page-name].tsx`                                      |
| Reusable section (used on 2+ pages)    | `src/components/common/`                                                     |
| Layout chrome (header/footer variants) | `src/components/layouts/`                                                    |
| Page-specific section (used on 1 page) | `src/elements/[zone]/[page]/`                                                |
| Static copy / data arrays              | `src/content/[category]/[page]-content.ts`                                   |
| Component prop types                   | `src/interfaces/common-interfaces.ts` (or a domain-specific interfaces file) |
| Zod schema                             | `src/schemas/[form-name]-schema.ts`                                          |

---

## Page Composition Rules

Every page follows a strict three-tier hierarchy. Never collapse these tiers.

```
app/[route]/page.tsx
  └── imports one container
        containers/[zone]/[page].tsx
          └── imports components/common/* and elements/*
                ↕ props fed from src/content/*
```

### `page.tsx` rules

- Export default a Server Component (no `"use client"`)
- Contains ONLY: `export const metadata`, `export default function Page()`, and a single container import
- Never import UI components or write JSX markup directly in `page.tsx`
- Always use `GetPageMetadata()` from `@/utils/meta-data` for metadata

```typescript
// CORRECT
import { Metadata } from "next";
import { GetPageMetadata } from "@/utils/meta-data";
import MyPageContainer from "@/containers/website/my-page";

export const metadata: Metadata = GetPageMetadata({ title: "...", description: "..." });

export default function MyPage() {
  return <MyPageContainer />;
}
```

### Container rules

- One container per page, named after the page
- Composes sections in reading order (hero → content → CTA → contact)
- Imports content data from `src/content/` and passes it as props
- No raw HTML, no inline styles, no hardcoded strings

### Component rules

- Prop-driven: all data passed via typed props
- Never fetch data inside a component — receive it as props from the container or page
- Never hardcode content strings — import from `src/content/`

---

## Landing Page Rules

Landing pages live under `app/landing-pages/[name]/` and follow a different chrome than the main site.

### Required steps for every new landing page

**Step 1 — Create the route and layout**

```
app/landing-pages/[name]/
  ├── layout.tsx
  └── page.tsx
```

The layout MUST:

- Be `"use client"` (uses `useEffect` for LiveChat hide/show)
- Render the landing-specific header and footer (e.g., `WebDesignHeader`, `WebDesignFooter`)
- Inject page-specific `<Script>` tags if needed
- NOT use the main site `Header` or `Footer`

**Step 2 — Register the path in `RootHeaderFooterGuard`**

File: `src/components/layouts/RootHeaderFooterGuard.tsx`

Add the new path to the `landingRoots` array. Failure to do this causes a double-header bug in production.

```typescript
const landingRoots = [
  "/landing-pages/logo-design",
  "/landing-pages/shopify-development",
  "/landing-pages/website-design",
  "/landing-pages/[your-new-page]", // ADD THIS
  // ...
];
```

**Step 3 — Create a container**

```
src/containers/landing-page/[name]-page.tsx
```

**Step 4 — Create content data**

```
src/content/landing/[name]-page-content.ts
```

### Migrating from an HTML/CSS landing page

When converting a raw HTML/CSS page into this project:

1. **Strip all inline styles** — replace with Tailwind utility classes
2. **Replace hardcoded colors** — use design tokens (`text-primary`, `bg-secondary`, etc.), never hex values
3. **Replace custom fonts** — use `font-heading` (Coolvetica) and `font-body` (Inter) only
4. **Replace all `<div class="...">` HTML patterns** — convert to React JSX with Tailwind
5. **Extract all repeated sections** — map them to existing `src/components/common/` components
6. **Separate all copy** — move all text strings into `src/content/landing/[name]-content.ts`
7. **Type all props** — add interfaces to `src/interfaces/`
8. **Do not import external CSS files** — no `styles.css`, no `<link href="...">` in JSX
9. **Do not add `<style>` tags** inside components
10. **Do not use `!important`** unless overriding a third-party library

---

## Design System Rules

### Colors — Always use tokens, never raw values

```typescript
// CORRECT
<p className="text-paragraph">...</p>
<button className="bg-primary hover:bg-primary-hover text-primary-foreground">

// WRONG — never do this
<p style={{ color: "#585858" }}>...</p>
<button className="bg-[#007afc]">
```

Available color tokens: `primary`, `primary-hover`, `primary-foreground`, `secondary`, `secondary-hover`, `tertiary`, `accent`, `heading`, `paragraph`, `muted`, `muted-foreground`, `border`, `background`, `secondary-background`, `destructive`

### Typography

```typescript
// Headings — always font-heading
<h1 className="font-heading font-bold text-heading text-4xl md:text-5xl lg:text-6xl">
<h2 className="font-heading font-bold text-heading text-3xl md:text-4xl">

// Body — font-body is the default (set on <body>), no class needed
<p className="text-paragraph">
```

Never import or use a font not already in the project.

### Standard Layout Classes

Always use these Tailwind plugin classes for consistency:

```typescript
// Page wrapper
<div className="page-layout-standard">

// Content container (max-width + centering)
<div className="layout-standard">

// Section spacing
<section className="section-padding-standard">

// Hero section top padding (accounts for fixed header)
<section className="hero-section-layout-standard section-padding-standard">

// Hover transitions
<div className="animation-standard hover:scale-105">

// Centered flex
<div className="flex-center">
```

### Breakpoints

Use these in order. Do NOT use `sm` for tablet — `md` is 768px here.

```
xs: 400px   sm: 480px   md: 768px   lg: 1024px   xl: 1440px   2xl: 1536px
```

---

## Tailwind Rules

- Use `cn()` from `@/lib/utils` for conditional class merging — never string concatenation
- Never use `style={{}}` prop except for CSS custom property values that Tailwind cannot express
- Never duplicate layout wrapper classes — use the defined plugin classes (`.layout-standard`, etc.)
- Arbitrary values (`bg-[#abc]`, `mt-[13px]`) are allowed only when there is no token equivalent
- Responsive classes follow mobile-first order: `base md:... lg:...`

---

## shadcn/ui Rules

- All shadcn components live in `src/components/ui/` — never modify source files directly
- Always import from the path alias: `import { Button } from "@/components/ui/button"`
- Use `cn()` when extending shadcn component classes
- Variants are defined in the component file using `class-variance-authority` — add new variants there, not inline
- Custom advanced UI (`lamp.tsx`, `spotlight-new.tsx`, `card-hover-effect.tsx`) lives in `src/components/ui/` as well

---

## Animation Rules

### Micro-interactions (hover, focus)

Use the `.animation-standard` Tailwind plugin class (`transition: all 0.3s ease-in-out`).
Add `hover:scale-105` for scale effects.

```typescript
<div className="animation-standard hover:scale-105 hover:bg-primary-hover">
```

### Page/Section Transitions

Use `framer-motion`. Import from `"framer-motion"`.

```typescript
import { motion, AnimatePresence } from "framer-motion";

// Standard fade-in
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
```

### Marquee

Use `react-fast-marquee` or the existing `HeroMarquee` component. Never build a custom CSS marquee.

### Scroll animations

Use the existing `StickyScrollReveal` component from `src/components/ui/sticky-scroll-reveal.tsx`.

### Carousels/Sliders

Use `embla-carousel-react` or `swiper`. Never build a custom slider.

### Number counters

Use `react-countup` via the existing `CountUp` component in `src/components/partials/count-up.tsx`.

### Custom keyframes

Add new keyframes to `tailwind.config.ts` (under `theme.extend.keyframes`) and the animation shorthand under `theme.extend.animation`.
Add standalone CSS keyframes to `src/styles/animation.css`.
Never add `@keyframes` inside a component file.

---

## Server / Client Boundaries

| Scenario                                              | Directive                       |
| ----------------------------------------------------- | ------------------------------- |
| Route page (`page.tsx`)                               | No directive — Server Component |
| Layout with `useEffect` / `usePathname`               | `"use client"`                  |
| Component with `useState`, event handlers, animations | `"use client"`                  |
| Static content-only component                         | No directive — Server Component |
| Form component                                        | `"use client"`                  |
| Content files (`src/content/`)                        | No directive                    |
| Utility functions (`src/utils/`, `src/lib/`)          | No directive                    |

Keep `"use client"` as low in the tree as possible. Wrap only the interactive part, not the whole page.

---

## TypeScript Rules

- Every component must have its props typed via an interface in `src/interfaces/`
- Never use `any` for component props
- Prop interfaces follow the naming convention: `{ComponentName}Props`
- Add new interfaces to `src/interfaces/common-interfaces.ts` unless the interface is domain-specific (then create a new file in `src/interfaces/`)
- Form data types follow: `{FormName}Type`

```typescript
// CORRECT
export interface MyNewSectionProps {
  title: string;
  description: string;
  items: ServiceItem[];
}

// WRONG
function MySection({ title, description }: any) {
```

---

## Naming Conventions

| Thing                 | Convention       | Example                  |
| --------------------- | ---------------- | ------------------------ |
| Files                 | kebab-case       | `web-design-hero.tsx`    |
| React components      | PascalCase       | `WebDesignHero`          |
| Prop interfaces       | `{Name}Props`    | `WebDesignHeroProps`     |
| Form types            | `{Name}Type`     | `LeadFormType`           |
| Zod schemas           | `{Name}Schema`   | `LeadFormSchema`         |
| Constants             | UPPER_SNAKE_CASE | `TOTAL_STEPS`            |
| Variables / functions | camelCase        | `handleSubmit`           |
| Content exports       | camelCase        | `webDesignPageContent`   |
| CSS classes           | kebab-case       | `.hero-section-layout`   |
| Route segments        | kebab-case       | `/website-design/custom` |

---

## Import Order

```typescript
// 1. React / Next.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

// 2. Third-party libraries
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

// 3. Internal — components
import { Button } from "@/components/ui/button";
import { DynamicHero } from "@/components/common/dynamic-hero";

// 4. Internal — content, interfaces, utils
import { pageContent } from "@/content/landing/page-content";
import { MyComponentProps } from "@/interfaces/common-interfaces";
import { cn } from "@/lib/utils";

// 5. Static assets
import HeroImage from "../../../public/images/hero.jpg";
```

---

## Analytics & Tracking Rules

- **Do not add new analytics scripts** to `src/app/layout.tsx` without understanding which scripts are already present (GA4, Google Ads, MS Clarity, LiveChat)
- **Landing page layouts** may include their own conversion script (`gtag_report_conversion`) — this is intentional
- **Do not duplicate** the `aw-conversion-helper` script ID across layouts — use a unique ID per layout file
- **Form submissions** that should track conversions must call `window.gtag_report_conversion()` on success
- **LiveChat hide/show** must be managed in landing page `layout.tsx` via `useEffect` with the existing pattern

---

## Tailwind Content Config

If you add a new source directory outside the existing paths, you MUST add it to `tailwind.config.ts` under `content`. Failure causes all Tailwind classes in that directory to be purged in production.

Current content paths:

```typescript
content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
],
```

---

## What NOT to Do

- Do not write JSX markup in `page.tsx` beyond a single container return
- Do not import raw `.css` files into components
- Do not use `<style>` tags inside `.tsx` files
- Do not hardcode colors as hex or rgba values — use tokens
- Do not hardcode content strings in components — use `src/content/`
- Do not add a landing page without updating `RootHeaderFooterGuard.tsx`
- Do not add a `"use client"` directive to a layout or page that doesn't need it
- Do not use `any` for props
- Do not create new custom keyframes inside component files
- Do not install new font packages — use `font-heading` and `font-body`
- Do not install new icon libraries — use `lucide-react` and `react-icons`
- Do not use `!important` in Tailwind classes unless overriding third-party library styles
- Do not bypass the `cn()` utility for conditional classNames
