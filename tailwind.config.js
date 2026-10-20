/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // „prawdziwy” desktop: szeroki ekran + mysz/touchpad (slajder zabiegów na kółko myszy)
        desk: { raw: "(min-width: 1024px) and (hover: hover) and (pointer: fine)" },
      },
      colors: {
        textPrimary: "#EBE6E1",
        bgPrimary: "#0B0C0F",
        prime: "#FCAF56",
        primeDark: "#976934",
        cream: "#FFF8E7",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["Inter", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
