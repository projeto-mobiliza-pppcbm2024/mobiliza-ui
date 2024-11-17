/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c00: "#ffffff",
        c01: "#f7f7f7",
        c02: "#ededed",
        c03: "#dedede",
        c04: "#cccccc",
        c05: "#b2b2b2",
        c06: "#9c9c9c",
        c07: "#717171",
        c08: "#595959",
        c09: "#404040",
        c10: "#2e2e2e",
        c11: "#111111",
        c12: "#000000",
        g00: "linear-gradient(#AD022A, #EB1A24)",
        p01: "#FF425B",
        p02: "#F95063",
        p03: "#FF1630",
        p04: "#AD022A",
        p05: "#760029",
      },
      fontFamily: {
        display: ["League Spartan", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
