const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      xs: "380px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        pop: ["Poppins"],
        urban: ["Urbanist"],
      },
    },
    colors: {
      tertiary: "#FF0202",
      secondary: "#FCFCFC",
      primary: "#191919",
    },
  },
  plugins: [require("flowbite/plugin")],
};
