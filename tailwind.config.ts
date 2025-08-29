/* eslint-disable @typescript-eslint/no-require-imports */

import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/elements/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
      backgroundImage: {
        pattern: "url('/images/pattern-img.webp')",
        "home-hero": "url('/images/hero-bg.jpg')",
        "editing-banner": "url('/images/video-editing-hero-img.jpg')",
        "cta01-banner": "url('/images/video-editing-cta-banner.jpg')",
        "video-cta-banner": "url('/images/video-software-cta-banner.webp')",
        "process-vector": "url('/images/process-vector-img.webp')",
        CTA: "url('/images/home-page-cta.png')",
        CTA2: "url('/images/home-page-cta-02.png')",
        "home-page-contact": "url('/images/home-page-contact-img.jpg')",
        "home-cta": "url('/images/home-cta-banner.jpg')",
        "campaign-cta": "url('/images/campaign-cta-img.jpg')",
        "about-cta": "url('/images/about-us/about-cta-banner.jpg')",
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
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
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
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 5s ease-in-out infinite",
        spinY: "spinY 2s ease-in-out infinite",
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
