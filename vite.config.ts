import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 检测是否是 Cloudflare Pages 环境
const isCloudflare = process.env.CF_PAGES === 'true';
// 根据环境设置不同的基础路径
const base = isCloudflare ? '/' : '/wyl-portfolio/';

console.log(`Building for ${isCloudflare ? 'Cloudflare Pages' : 'GitHub Pages'} with base: ${base}`);

export default defineConfig({
  plugins: [react()],
  // 为不同平台使用不同的基础路径
  base: base,
  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://public.tableau.com https://yuriwg.github.io/;",
      'X-Frame-Options': 'ALLOW-FROM https://yuriwg.github.io/'
    }
  }
});