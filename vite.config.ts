import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 根据不同环境设置基础路径
  base: process.env.DEPLOY_ENV === 'CLOUDFLARE' ? '/' : '/wyl-portfolio/',
  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://public.tableau.com https://yuriwg.github.io/;",
      'X-Frame-Options': 'ALLOW-FROM https://yuriwg.github.io/'
    }
  }
});