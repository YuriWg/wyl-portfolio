import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetail from './pages/ProjectDetail.tsx';
import About from './pages/About.tsx';
import Blog from './pages/Blog.tsx';

import './i18n';
import './index.css';

// 使用环境变量或动态获取当前环境的基础路径
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<ProjectDetail />} /> {/* 修改这里，使用Home组件而不是App自身 */}
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);