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
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
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
