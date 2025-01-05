/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind가 적용될 파일 경로
  theme: {
    extend: {
      colors: {
        primary: '#6B4226', // 메인 컬러 (갈색)
        secondary: '#EFEFEF', // 서브 컬러
      },
    },
  },
  plugins: [],
};