import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: '#050505',
        },
        gold: {
          DEFAULT: '#C5A35D',
        },
        catalog: {
          bg: '#F9F9F9',
          bgLight: '#F5F5F7',
          text: '#1D1D1F',
        },
      },
      fontFamily: {
        'cormorant': ['var(--font-cormorant)', 'serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
