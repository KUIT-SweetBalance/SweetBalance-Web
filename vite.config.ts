import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production"; // 배포 환경 여부 확인

  return {
    plugins: [react()],
    build: {
      outDir: "dist", // 배포 디렉토리 설정
      rollupOptions: {
        external: ["fs", "path", "url"], // Node.js 전용 모듈 제외
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss()], // TailwindCSS 설정 추가
      },
    },
    server: !isProduction
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, "key.pem")), // HTTPS 키 파일
            cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")), // HTTPS 인증서 파일
          },
          host: "localhost", // 로컬호스트에서 실행
          port: 5173, // Vite 기본 포트
          strictPort: true, // 5173 포트가 사용 중이면 실행 안 함
        }
      : undefined, // 배포 환경에서는 서버 설정 제거
  };
});