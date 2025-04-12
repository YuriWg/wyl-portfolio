import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 为不同平台使用不同的基础路径

  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://public.tableau.com https://yuriwg.github.io/;",
      'X-Frame-Options': 'ALLOW-FROM https://yuriwg.github.io/'
    }
  }
});