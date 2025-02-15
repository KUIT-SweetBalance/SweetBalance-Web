import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['fs', 'path', 'url'], // Node.js 전용 모듈 제외
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()], // TailwindCSS 설정 추가
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')), // HTTPS 키 파일
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')), // HTTPS 인증서 파일
    },
    host: 'localhost', // 로컬호스트에서 실행
    port: 5173, // Vite 기본 포트
    strictPort: true, // 5173 포트가 사용 중이면 실행 안 함
  },
});
