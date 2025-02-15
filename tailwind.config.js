/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind가 적용될 파일 경로
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'], // Tailwind의 기본 sans를 덮어쓰기
        agbalumo: ['Agbalumo', 'sans-serif'],
        stylescript: ['"Style Script"', 'cursive'],
      },
      colors: {
        primary: '#722A2A',
        secondary: '#D6AC8A',
        alert: '#f0807f',
        point: '#FFD572',
        text: '#121212',
        gray_light: '#F3F3F3',
        gray_text: '#909090',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
