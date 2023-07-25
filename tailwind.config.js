/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
        colors:{
        gold:'#E9D3A8',
        bronze:'#EEE5E0',
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)"
        }

    },
  },
  plugins: [],
}

