import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 明确设置基础路径，对于不同环境使用不同值
  base: process.env.GITHUB_ACTIONS ? '/wyl-portfolio/' : '/',
  
  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://public.tableau.com https://yuriwg.github.io/;",
      'X-Frame-Options': 'ALLOW-FROM https://yuriwg.github.io/'
    }
  },
  
  // 确保静态资源被正确复制
  build: {
    assetsDir: 'assets',
  }
});