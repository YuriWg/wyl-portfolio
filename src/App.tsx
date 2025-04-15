import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import { useProjectList } from './hooks/useProjects';
import Header from './components/Header';
import Footer from './components/Footer';
import Decorations from './components/Decorations';
import ProjectFilters from './components/ProjectFilters'; // 1. 引入 ProjectFilters

function App() {
  const { t, i18n } = useTranslation(['common']);
  const { projects, loading, error } = useProjectList();
  const [categoryFilter, setCategoryFilter] = useState('all'); // i18n key
  const [toolFilter, setToolFilter] = useState('all'); // i18n key or tool name
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 初始设置文档语言
    document.documentElement.lang = i18n.language;
    
    // 监听语言变化
    const handleLanguageChange = () => {
      document.documentElement.lang = i18n.language;
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // 过滤项目
  const filteredProjects = projects.filter(project => {
    let matchesCategory = true;
    if (categoryFilter !== 'all') {
      // 获取类别的翻译文本
      const translatedCategory = t(`categories.${categoryFilter}`);
      
      // 检查项目的 category 是否与翻译后的文本匹配
      // 或者与 key 本身匹配（处理可能的数据不一致情况）
      matchesCategory = 
        project.category === translatedCategory || 
        project.category.toLowerCase() === categoryFilter.toLowerCase();
      
      console.log(`Category Filter: ${categoryFilter}, Translated: ${translatedCategory}, Project Category: ${project.category}, Match: ${matchesCategory}`);
    }

    // 工具过滤：保持原来的逻辑，但增加更多的匹配可能性
    let matchesTool = toolFilter === 'all';
    if (!matchesTool) {
      // 1. 直接比较小写形式
      matchesTool = project.type?.toLowerCase() === toolFilter.toLowerCase();
      
      // 2. 如果不匹配，尝试使用翻译后的文本比较
      if (!matchesTool) {
        const translatedTool = t(`tools.${toolFilter}`);
        matchesTool = project.type === translatedTool;
      }
      
      console.log(`Tool Filter: ${toolFilter}, Project Type: ${project.type}, Match: ${matchesTool}`);
    }

    return matchesCategory && matchesTool;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="error-message">
          {t('Error loading projects')}: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 添加Decorations组件 */}
      <Decorations />

      <Header />

      {/* 英雄区域 - 手绘风格 */}
      <section className=" px-5 pt-40 pb-0 hero-section">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="sticker-hero-title mb-4" >
            {t('hero.title', { ns: 'common' })}
          </h1>
          <p className="sticker-hero-subtitle max-w-3xl mx-auto">
            {t('hero.subtitle', { ns: 'common' })}
          </p>
        </div>
        {/* 向下滚动箭头 */}
        <div className="scroll-down-button">
          <button 
            onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
            className="animate-bounce  py-2 px-4 bg-transparent border-none mt-5 mb-10"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* 项目区域 */}
      <section className="py-18 px-4 relative projects-section" >
        <div className="max-w-8xl mx-auto ">
          {/* 2. 使用 ProjectFilters 组件 */}
          <ProjectFilters
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            toolFilter={toolFilter}
            setToolFilter={setToolFilter}
            loading={loading} // 传递 loading 状态
          />

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 mb-20">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={String(project.id)}
                title={project.title}
                description={project.description}
                image={project.image || ''}
                type={project.type || 'other'}
                publishDate={project.publishDate}
                category={project.category}
                className="sticker-card"
              />
            ))}
          </div>

          {/* 无结果提示 */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">
                {t('No projects found matching your filters')}
              </h3>
              <button 
                className="mt-4 sticker-button"
                onClick={() => {
                  setCategoryFilter('all');
                  setToolFilter('all');
                }}
              >
                {t('Reset filters')}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
