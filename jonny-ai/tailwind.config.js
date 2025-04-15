/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff3366", // Pink from logo
          light: "#ff66a3",
          dark: "#cc0044",
        },
        secondary: {
          DEFAULT: "#8833ff", // Purple from logo
          light: "#aa66ff",
          dark: "#6600cc",
        },
        accent: {
          DEFAULT: "#ff6633", // Orange from logo
          light: "#ff9966",
          dark: "#cc3300",
        },
        background: {
          DEFAULT: "#111111", // Dark background
          light: "#222222",
          lighter: "#333333",
        },
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        typing: "typing 1s infinite",
      },
      keyframes: {
        typing: {
          "0%": { opacity: 0.2 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0.2 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
