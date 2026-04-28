/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f1ff",
          100: "#ebe4ff",
          200: "#d9cfff",
          300: "#bea8ff",
          400: "#9f78ff",
          500: "#8447ff",
          600: "#7128f0",
          700: "#5f1fd1",
          800: "#4e1cab",
          900: "#421b8b",
        },
      },
      boxShadow: {
        crm: "0 24px 60px rgba(76, 29, 149, 0.14)",
        panel: "0 18px 40px rgba(15, 23, 42, 0.08)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
