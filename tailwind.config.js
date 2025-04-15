/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '128': '32rem', // 4x larger than w-32 (8rem)
      },
      height: {
        '128': '32rem', // 4x larger than h-32 (8rem)
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      translate: {
        'z-16': '4rem',
      },
      rotate: {
        'y-90': 'rotateY(90deg)',
        '-y-90': 'rotateY(-90deg)',
        'x-90': 'rotateX(90deg)',
        '-x-90': 'rotateX(-90deg)',
      },
    },
  },
  plugins: [],
};