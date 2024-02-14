/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
    extend: {
      
        screens: {
          '3xl': '2000px',
        },
      
        fontFamily: {
        'DmSans': ['DM Sans', 'sans-serif']
        },
        colors:{
          blue: {
            50: "#edf7ff",
            100: "#cce9ff",
            300: "#6ca6fd",
            500: "#2a94f4",
            700: "#1976d2",
            A400_02: "#0e7bff",
            A400_01: "#1877f2",
            A400: "#2575f0",
            "50_01": "#dae7fc",
            "100_01": "#b2cdf8",
          },
          red: { 300: "#ec7373", 400: "#ef4352", "300_01": "#f97066" },
        green: { 500: "#4caf50", A700: "#1dc86d" },
        light_blue: { 900: "#0e538c", "900_01": "#006699" },
        yellow: { A200: "#faff05" },
        gray: {
          100: "#f2f3f6",
          300: "#dcdcdb",
          500: "#a7a6a8",
          700: "#555458",
          900: "#1d1c21",
          "900_0c": "#1018280c",
          "900_66": "#15143866",
          "100_02": "#f4f7f8",
          "100_01": "#f7f7f7",
          "900_01": "#101828",
          "300_01": "#e5e5e6",
        },
        blue_gray: {
          100: "#d9d9d9",
          400: "#8f8d95",
          500: "#667084",
          700: "#455c6c",
          800: "#3c4959",
          900: "#303030",
          "900_02": "#37363b",
          "900_01": "#181f49",
          "400_01": "#8c8c8e",
          "700_01": "#475466",
          "100_01": "#d0d5dd",
          "100_02": "#cfd4dc",
          "900_05": "#1d2838",
          "900_04": "#1f2545",
          "900_03": "#1d2939",
          "800_01": "#344053",
        },
        deep_purple: { A400: "#482be7" },
        teal: { 400: "#3aada1", A700: "#00cdae", A400: "#37e288" },
        amber: { 300: "#ffd851", 500: "#ffc107" },
        white: { A700: "#ffffff" },
        black: { 900: "#000000", "900_1e": "#0000001e" },
        deep_orange: { A400: "#ff3d00" },
        indigo: { 50: "#e4e6eb", 900: "#203668" },
        gold:'#FAB818',
        bronze:'#EAC696',
        silver:'#C0C0C0',
        gray700:' #344054',
        gray500:'#667085',
        bleu1:'#3417B0',
        bleu2:'#1E0E62',
        col1:'#00CDAE',
        color1:'#1E0E62',
        color2:'#15143966',
       

        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)"
        },
        boxShadow: {
          bs: "0px 3px  3px 0px #0000001e",
          bs1: "0px 4px  6px -2px #1018280c",
        },

    },
  },
  plugins: [],
}

