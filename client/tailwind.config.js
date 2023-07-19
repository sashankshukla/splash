/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A202C', // text-gray-900
        secondary: '#718096', // text-gray-600
        subtitle: '#A0AEC0', // text-gray-500
        'primary-green': '#2F855A', // text-green-800
        'primary-darkgreen': '#22543D', // text-green-900
        alert: '#E53E3E', // text-red-600
        confirm: '#3182CE', // text-blue-600
        light: '#F0FFF4', // bg-green-50
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')
],
};

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
