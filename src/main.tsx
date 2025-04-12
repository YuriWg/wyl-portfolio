import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';
import './i18n';
import './index.css';

// 获取基础URL
const basename = import.meta.env.BASE_URL;

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