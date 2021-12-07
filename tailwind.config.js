module.exports = {
  purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        primary: "1fr",
        "primary-lg": "288px 1fr",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "translate(0px,-20px)" },
          "100%": { transform: "translate(0px,10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out",
      },
      fontFamily: {
        poppins: ["Poppins", "Roboto", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", "10rem"],
      },
      height: {
        112: "28rem",
        120: "30rem",
        140: "40rem",
        148: "44rem",
      },
      backgroundSize: {
        150: "150%",
        125: "125%",
        100: "100%",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#5a55ee",
      secondary: "#ffed4a",
      danger: "#e3342f",
      pink: "#4B50E6",
      purple: "#E250E5",
      dark: "#1A202C",
      "dark-gray": "#2D3748",
      "light-gray": "#718096",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#431216",
      "light-gray": "#718096",
      pink: "#A548E2",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#5a55ee",
    }),
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      purple: "#E250E5",
      pink: "#4B50E6",
      "purple-500": "#833ef1",
      "purple-700": "#491cb5",
      "light-gray": "#718096",
      "dark-gray": "#2D3748",
    }),
  },
  variants: {
    extend: {
      gradientColorStops: ["disabled"],
      cursor: ["disabled"],
      textColor: ["disabled"],
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
      display: ["group-hover"],
      skew: ["group-hover"],
      visibility: ["group-hover"],
      borderRadius: ["group-hover"],
    },
  },
  plugins: [],
};
