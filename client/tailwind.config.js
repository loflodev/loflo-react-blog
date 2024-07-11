import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'logo-primary': '#001858',
        'logo-seconday': '#6246EA',
        'base': '#2B2C34',
        'white': '#FFFFFE',
        'dark-grey': '#9A9494',
        'light-grey': '#C0C0C0',
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans",]
      },
      backgroundColor: {
        'white': '#FFFFFE',
        'light-grey-1': '#EFF0F3',
        'light-grey-2': '#E4E5E9',
        'logo-primary': '#001858',
        'btn-hover': '#4d7dff',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
