/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '60px',
      center: true,
    },
    screens: {
      main: '1440px',
    },
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      black: 'rgb(var(--black) / <alpha-value>)',
      white: 'rgb(var(--white) / <alpha-value>)',
      text: 'rgb(var(--text) / <alpha-value>)',
      'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
      main: 'rgb(var(--main) / <alpha-value>)',
      'main-hover': 'rgb(var(--main-hover) / <alpha-value>)',
      'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
      secondary: 'rgb(var(--secondary) / <alpha-value>)',
      'secondary-hover': 'rgb(var(--secondary-hover) / <alpha-value>)',
      'secondary-secondary': 'rgb(var(--secondary-secondary) / <alpha-value>)',
      background: 'rgb(var(--background) / <alpha-value>)',
      'background-primary': 'rgb(var(--background-primary) / <alpha-value>)',
      'background-secondary': 'rgb(var(--background-secondary) / <alpha-value>)',
      'background-tertiary': 'rgb(var(--background-tertiary) / <alpha-value>)',
      'background-quaternary': 'rgb(var(--background-quaternary) / <alpha-value>)',
      red: 'rgb(var(--red) / <alpha-value>)',
      green: 'rgb(var(--green) / <alpha-value>)',
      border: 'rgb(var(--border) / <alpha-value>)',
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
        small: '5px',
        base: '10px',
        large: '20px',
      },
      cursor: {
        inherit: 'inherit',
      },
      dropShadow: {
        tooltip: ['0 4px 4px rgba(0, 0, 0, 0.15)', '0 0px 30px rgba(0, 0, 0, 0.11)'],
        pagination: ['0 7px 15px rgba(35, 36, 70, 0.19)'],
      },
      boxShadow: {
        notification: ['0px 14px 40px rgba(93, 93, 112, 0.25)'],
        tooltip: ['0 4px 4px rgba(0, 0, 0, 0.15)', '0 0px 30px rgba(0, 0, 0, 0.11)'],
      },
      fontSize: {
        h1: [
          '1.75rem',
          {
            lineHeight: '2.125rem',
            fontWeight: '700',
          },
        ],
        h2: [
          '1.25rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '600',
          },
        ],
        h3: [
          '1.0625rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '600',
          },
        ],
        h4: ['1.0625rem', '170%'],
        p: ['0.75rem', '1.25rem'],
        h5: [
          '0.5rem',
          {
            lineHeight: '0.625rem',
            fontWeight: '700',
          },
        ],
      },
    },
  },
}
