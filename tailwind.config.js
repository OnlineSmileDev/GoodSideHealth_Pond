const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: 'tw-',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    extend: {
      fontSize: { 2.5: '10px', 15: '0.938rem', 22: '1.375rem' },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        hind: ['Hind', ...defaultTheme.fontFamily.sans],
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      backgroundPosition: {
        'center-right-15': 'center right 15px',
      },
      backgroundSize: {
        20: '20px',
        35: '35px',
      },
      colors: {
        pondBlack: {
          DEFAULT: '#4C4C4C',
          lighter: '#434345',
          lightest: '#495057',
        },
        pondBlue: { DEFAULT: '#428EC2' },
        light: { DEFAULT: '#f6f6fc', lighter: '#E2E6EA', lightest: '#FFFFFF' },
        primary: { DEFAULT: '#428EC2', lighter: '#287FBB' },
        danger: { DEFAULT: '#EF4444', lighter: '#DC3545', darker: '#C72127' },
        warning: {
          DEFAULT: '#F7941E',
          lighter: '#E67D00',
          lightest: '#EB8D30',
        },
        success: { DEFAULT: '#8DC63F', lighter: '#218838' },
        purple: { DEFAULT: '#92278F' },
        pondBlueBgOverlay: 'rgba(66, 142, 194, .8)',
        pondBlueOpaqueBgOverlay: 'rgb(66, 142, 194)',
      },
      borderWidth: {
        5: '5px',
        10: '10px',
      },
      spacing: {
        1.25: '0.313rem',
        6.25: '1.563rem',
        7.5: '1.875rem',
        9.5: '2.375rem',
        12.25: '3.125rem',
        15.1: '3.75rem',
        16.25: '4.063rem',
        17.5: '4.375rem',
        22.5: '5.625rem',
        31.25: '7.813rem',
        37.5: '9.375rem',
        87.5: '21.875rem',
        92: '23rem',
        15: '15px',
        22: '22px',
        100: '100px',
        200: '200px',
        485: '485px',
        500: '500px',
        785: '785px',
        '10%': '10%',
        '50%': '50%',
        '60vh': '60vh',
      },
      lineHeight: {
        6.5: '1.625rem',
      },
      width: {
        690: '690px',
      },
      minWidth: {
        5: '5rem',
      },
      maxWidth: {
        690: '690px',
        '1/2': '50%',
      },
      minHeight: {
        12.5: '3.125rem',
        4: '4rem',
      },
      zIndex: {
        5: '5',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
      },
      backgroundImage: () => ({
        arrowDownBlue: "url('/arrowDown.svg')",
        arrowDownWhite: "url('/arrowDownWhite.svg')",
        rightBlueArrow: "url('/rightBlueArrow.svg')",
        download: "url('/download.png')",
      }),
      scale: {
        flip: '-1',
      },
    },
  },
  plugins: [],
}
