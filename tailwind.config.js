/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FCF9F6',
          100: '#F5EDE4',
          200: '#EAD9C7',
          300: '#DFC5AA',
          400: '#D4B18D',
          500: '#C99D70',
          600: '#BC8A5F', // Your original primary
          700: '#8B5E34', // Your original secondary
          800: '#583101', // Your original dark
        },
        accent: {
          light: '#FFEDD8', // Your original light
          DEFAULT: '#E7BC91', // Your original accent
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}