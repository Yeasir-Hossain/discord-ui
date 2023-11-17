import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'primary': '#7289da',
        'background': '#282b30'
      },
      boxShadow: {
        'inset-white': '0px 0px 10px 0px rgba(255,255,255,0.5)',
      },
      animation: {
        marquee: 'marquee 23s linear infinite',
      },
      keyframes: {
        // shimmer: {
        //   '100%': {
        //     transform: 'translateX(100%)',
        //   },
        // },
        shimmer: {
          '0%': {
            backgroundPosition: '-200%',
          },
          '100%': {
            backgroundPosition: '200%',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
