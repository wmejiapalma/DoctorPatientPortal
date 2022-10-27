/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [//use "night theme",
      {
        mytheme: {
          "primary": "#352C79",
          "secondary": "#7467BE",
          "accent": "#DC77AE",
          "neutral": "#FFF",
          "base-100": "#352C79",
          "info": "#3B27BA",
          "success": "#ACFFAF",
          "warning": "#fbbf24", 
          "error": "#f87171",
        },
      },
    ],
  },
}