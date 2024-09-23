/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1F2937", // Custom dark mode colors
        "dark-text": "#E5E7EB",
      },
    },
  },
  plugins: [require("daisyui")],
};
