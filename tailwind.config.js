/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ajusta según tu estructura
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      // Variante para cuando el contenedor principal tenga la clase "active"
      addVariant("container-login-active", "&.active");
    },
  ],
};