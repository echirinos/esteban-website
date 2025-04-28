import type { Config } from 'tailwindcss';
// import typography from '@tailwindcss/typography';
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.mdx',
    './public/**/*.svg',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },
      // Remove typography key
      // typography,
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    // require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["cupcake", "light", "dark"],
  },
} satisfies Config;
