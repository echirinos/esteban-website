import type { Config } from 'tailwindcss';
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    './app/**/*.tsx',
    './content/**/*.mdx',
    './public/**/*.svg',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.sans],
        mono: ['var(--font-annotation)', ...fontFamily.mono],
      },
      // DaisyUI 5 theme colors are full color values, so Tailwind's alpha
      // modifier (text-base-content/60) cannot compose with them. These
      // channel-based definitions restore working opacity modifiers; the
      // --rgb-* variables are set per theme in global.css.
      colors: {
        'base-100': 'rgb(var(--rgb-base-100) / <alpha-value>)',
        'base-200': 'rgb(var(--rgb-base-200) / <alpha-value>)',
        'base-300': 'rgb(var(--rgb-base-300) / <alpha-value>)',
        'base-content': 'rgb(var(--rgb-base-content) / <alpha-value>)',
        primary: 'rgb(var(--rgb-primary) / <alpha-value>)',
        'primary-content': 'rgb(var(--rgb-primary-content) / <alpha-value>)',
        secondary: 'rgb(var(--rgb-secondary) / <alpha-value>)',
        'secondary-content': 'rgb(var(--rgb-secondary-content) / <alpha-value>)',
        accent: 'rgb(var(--rgb-accent) / <alpha-value>)',
        'accent-content': 'rgb(var(--rgb-accent-content) / <alpha-value>)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
} satisfies Config;
