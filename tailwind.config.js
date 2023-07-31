/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
        colors:{
        gold:'#FAB818',
        bronze:'#EAC696',
        silver:'#C0C0C0',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)"
        }

    },
  },
  plugins: [],
}

