import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* AI Calling page brand tokens */
        "ai-blue": "var(--ai-blue)",
        "ai-indigo": "var(--ai-indigo)",
        "ai-cyan": "var(--ai-cyan)",
        "ai-emerald": "var(--ai-emerald)",
        "ai-bg": "var(--ai-bg)",
        "ai-bg2": "var(--ai-bg2)",
        "ai-ink": "var(--ai-ink)",
        "ai-text": "var(--ai-text)",
        "ai-muted": "var(--ai-muted)",
        "ai-line": "var(--ai-line)",
        "ai-panel": "var(--ai-panel)",
        background: "var(--background)",
        "secondary-background": "var(--secondary-background)",
        foreground: "var(--foreground)",
        heading: "var(--heading)",
        paragraph: "var(--paragraph)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          hover: "var(--primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          hover: "var(--secondary-hover)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          foreground: "var(--tertiary-foreground)",
          hover: "var(--tertiary-hover)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
          hover: "var(--muted-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["var(--font-coolvetica)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        pattern: "url('/images/pattern-img.webp')",
        "home-page-contact": "url('/images/home-page-contact-img.jpg')",
        "campaign-cta": "url('/images/campaign-cta-img.jpg')",
        "faq-img": "url('/images/faq-img.webp')",
        "logo-hero": "url('/images/logo-landing-hero.jpg')",
      },
      screens: {
        xs: "400px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1536px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -40%) rotate(0deg)",
          },
          "20%": {
            opacity: "1",
            transform: "translate(-50%, -40%) rotate(0deg)",
          },
          "50%": {
            transform: "translate(-50%, -40%) rotate(3deg)",
          },
          "100%": {
            transform: "translate(-50%, -40%) rotate(-3deg)",
          },
        },
        spinY: {
          "100%": { transform: "rotateY(360deg)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-33.333%)" },
          "100%": { transform: "translateX(0)" },
        },
        "marquee-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "grid-move": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "70px 70px, -70px -70px" },
        },
        /* AI Calling page keyframes */
        "ai-blink": {
          "50%": { opacity: "0.3" },
        },
        "ai-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.5" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
        "ai-float": {
          "50%": { transform: "translateY(-8px)" },
        },
        "ai-scroll": {
          to: { transform: "translateX(-50%)" },
        },
        "ai-typing": {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-3px)" },
        },
        "ai-wave": {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        "ai-bar-grow": {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 5s ease-in-out infinite",
        spinY: "spinY 2s ease-in-out infinite",
        "marquee-left": "marquee-left linear infinite",
        "marquee-right": "marquee-right linear infinite",
        "marquee-up": "marquee-up linear infinite",
        "marquee-down": "marquee-down linear infinite",
        "grid-move": "grid-move 20s linear infinite",
        "ai-blink": "ai-blink 1.4s infinite",
        "ai-ring": "ai-ring 2s infinite",
        "ai-float": "ai-float 5s ease-in-out infinite",
        "ai-scroll": "ai-scroll 28s linear infinite",
        "ai-typing": "ai-typing 1s infinite",
        "ai-wave": "ai-wave 0.85s infinite ease-in-out",
      },
    },
  },

  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".layout-standard": {
          maxWidth: "1536px",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        },

        ".page-layout-standard": {
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        },

        ".hero-section-layout-standard": {
          paddingTop: "7rem",
        },

        ".section-padding-standard": {
          paddingTop: "2rem",
          paddingBottom: "2rem",

          "@screen lg": {
            paddingTop: "3rem",
            paddingBottom: "3rem",
          },
        },

        ".section-margin-standard": {
          marginTop: "3rem",
          marginBottom: "3rem",

          "@screen lg": {
            marginTop: "4rem",
            marginBottom: "4rem",
          },
        },

        ".animation-standard": {
          transition: "all 0.3s ease-in-out",
        },

        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
    },

    tailwindcssAnimate,
    require("tailwindcss-animate"),
  ],
} satisfies Config;
