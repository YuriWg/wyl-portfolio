import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
// 确保i18n配置在应用其他部分之前导入
import './i18n';
import './index.css';

// 获取基础URL
const basename = import.meta.env.BASE_URL;

// 检查用户语言偏好
const userLang = localStorage.getItem('i18nextLng') || 
  navigator.language || 
  (navigator.languages && navigator.languages[0]) || 
  'en';

// 设置文档语言
document.documentElement.lang = userLang;

// 使用createRoot渲染应用
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="project/:id" element={<ProjectDetail />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);