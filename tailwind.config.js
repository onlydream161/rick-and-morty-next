/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '100px',
      center: true,
    },
    screens: {
      main: '1440px',
    },
    colors: {
      transparent: 'transparent',
      primary: 'rgb(var(--primary) / <alpha-value>)',
      secondary: 'rgb(var(--secondary) / <alpha-value>)',
      gray: 'rgb(var(--gray) / <alpha-value>)',
      lines: 'rgb(var(--lines) / <alpha-value>)',
      'background-primary': 'rgb(var(--background-primary) / <alpha-value>)',
      'background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
      'background-hover': 'rgb(var(--background-hover) / <alpha-value>)',
      red: 'rgb(var(--red) / <alpha-value>)',
      white: 'rgb(var(--white) / <alpha-value>)',
      'button-press-primary': 'rgb(var(--button-press-primary) / <alpha-value>)',
      'button-press-secondary': 'rgb(var(--button-press-secondary) / <alpha-value>)',
      orange: 'rgb(var(--orange) / <alpha-value>)',
      green: 'rgb(var(--green) / <alpha-value>)',
      skeleton: 'rgb(var(--skeleton) / <alpha-value>)',
      'skeleton-highlight': 'rgb(var(--skeleton-highlight) / <alpha-value>)',
    },
    extend: {
      height: {
        small: '10px',
      },
      width: {
        small: '10px',
      },
      margin: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      padding: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      gap: {
        'extra-small': '5px',
        small: '10px',
        base: '15px',
        medium: '25px',
        large: '30px',
      },
      minWidth: {
        base: '1440px',
      },
      borderRadius: {
        base: '10px',
        large: '20px',
      },
      cursor: {
        inherit: 'inherit',
      },
      boxShadow: {
        button: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        base: ['0 4px 4px rgba(0, 0, 0, 0.15)', '0 0px 30px rgba(0, 0, 0, 0.11)'],
      },
      fontSize: {
        smalltext: ['.8125rem', '140%'],
        subtext: ['.8125rem', '206%'],
        base: ['1rem', '158%'],
      },
    },
  },
}
