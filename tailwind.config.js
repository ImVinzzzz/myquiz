/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // font-display -> titoli (Space Grotesk: geometrico, "da piattaforma digitale")
        display: ['Space Grotesk', 'sans-serif'],
        // font-sans -> testo (Inter), sovrascrive il sans-serif di default
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
