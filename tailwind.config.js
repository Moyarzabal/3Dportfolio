/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050312",
        surface: "#0b0820",
        "surface-2": "#120e2e",
        line: "rgba(255,255,255,0.08)",
        muted: "#9a95b8",
        brand: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          pink: "#ec4899",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ['"Mona Sans"', "system-ui", "-apple-system", "sans-serif"],
      },
      screens: {
        xs: "450px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(139,92,246,0.45)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.6)", opacity: "0.4" },
        },
      },
      animation: {
        orbit: "orbit calc(var(--duration) * 1s) linear infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
