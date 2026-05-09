/** @type {import('tailwindcss').Config} */
module.exports = {
  // to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B5B", // Coral/Salmon
          50: "#FFF5F4",
          100: "#FFE8E5",
          200: "#FFD0CC",
          300: "#FFB3AB",
          400: "#FF8F84",
          500: "#FF6B5B",
          600: "#E5554A",
          700: "#CC4038",
          800: "#B32D27",
          900: "#991A16",
        },
        secondary: {
          DEFAULT: "#f59e0b", // Amber 500
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        accent: "#10b981", // Emerald 500
        background: "#f8fafc", // Slate 50
        surface: "#ffffff",
      },
    },
  },
  plugins: [],
};
