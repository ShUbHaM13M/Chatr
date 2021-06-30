module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.jsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#69A2D3',
        offBlack: 'rgba(0, 0, 0, 0.2)',
        danger: '#DB6A5E'
      },
      transitionDuration: {
        '350': '350ms'
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(.68, -0.55, .27, 1.55)',
      },
      transitionProperty: {
        'width': 'width',
        'filter': 'filter'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      width: ['hover'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
      translate: ['hover', 'focus'],
    },
  },
  plugins: [],
}
