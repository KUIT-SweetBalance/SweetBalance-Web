/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind가 적용될 파일 경로
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'], // Tailwind의 기본 sans를 덮어쓰기
        agbalumo: ['Agbalumo', 'sans-serif'],
      },
      colors: {
        primary: '#722A2A',
        secondary: '#D6AC8A',
        alert: '#f0807f',
        point: '#FFD572',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
