module.exports = {
  purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        primary: "1fr",
        "primary-lg": "288px 1fr",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#5a55ee",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#431216",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#5a55ee",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
