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
      primary: "#BF8124",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
