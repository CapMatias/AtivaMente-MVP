/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#22C55E',
        background: '#F8FAFC',
        text: '#334155',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.8s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'delay-100': 'fade-in-up 0.6s ease-out 0.1s forwards',
        'delay-200': 'fade-in-up 0.6s ease-out 0.2s forwards',
        'delay-300': 'fade-in-up 0.6s ease-out 0.3s forwards',
        'delay-400': 'fade-in-up 0.6s ease-out 0.4s forwards',
        'delay-500': 'fade-in-up 0.6s ease-out 0.5s forwards',
        'delay-600': 'fade-in-up 0.6s ease-out 0.6s forwards',
        'delay-700': 'fade-in-up 0.6s ease-out 0.7s forwards',
        'delay-800': 'fade-in-up 0.6s ease-out 0.8s forwards',
      },
    },
  },
  plugins: [],
};
