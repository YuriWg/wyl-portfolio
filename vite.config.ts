import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - 忽略整个导入的类型错误
import { plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    react(),
    markdown({
      // @ts-ignore - 忽略类型检查
      mode: ['html'], 
      markdownIt: {
        html: true,
        breaks: true,
        linkify: true
      }
    })
  ],
  base: process.env.CF_PAGES === 'true' ? '/' : '/wyl-portfolio/',
  // 优化 Markdown 文件加载
  optimizeDeps: {
    include: ['gray-matter', 'marked']
  },
  
  // 确保 Markdown 文件被视为资源
  assetsInclude: ['**/*.md'],
  server: {
    headers: {
      'Content-Security-Policy': "frame-src 'self' https://public.tableau.com https://yuriwg.github.io/;",
      'X-Frame-Options': 'ALLOW-FROM https://yuriwg.github.io/'
    }
  },
  // 添加 publicDir 配置
  publicDir: 'public',
});