/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: { max: "860px" },
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "480px" },
      xxs: { max: "380px" },
    },
    extend: {
      colors: {
        bgLight: "#2c2c2c",
        bg: "#0c0c0c",
        grey: "#ababab",
        green: "#40c057",
        greenLight: "#8ce99a",
        greenDark: "#2f9e44",
        yellow: "#ffd43b",
        yellowLight: "#ffec99",
        yellowDark: "#f59f00",
        blue: "#5c7cfa",
        blueLight: "#91a7ff",
        blueDark: "#3b5bdb",
        red: "#fa5252",
        redLight: "#ff8787",
        redDark: "#e03131",
        teal: "#20c997",
        tealLight: "#63e6be",
        tealDark: "#099268",
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
    },
  },
  plugins: [],
};
