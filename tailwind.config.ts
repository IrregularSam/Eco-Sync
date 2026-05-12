import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FFFBF2', // Cream background
          primary: '#00E676', // Vivid green for Eco
          secondary: '#FF4F00', // Warning/Alert orange
          accent: '#7C3AED', // Vivid purple for accents
          border: '#000000', // Hard black border
          text: '#000000', // Hard black text
        },
      },
      boxShadow: {
        neo: '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-hover': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        neo: '12px',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
