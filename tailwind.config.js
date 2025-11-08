/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'korean-teal': '#0E7C7B',
        'korean-crimson': '#C1272D',
        'korean-gold': '#D4AF37',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
