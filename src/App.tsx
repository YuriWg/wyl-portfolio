import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './components/ProjectCard';
import LanguageSwitch from './components/LanguageSwitch';
import { projects, Project } from './data/projects';
// 添加 Ionicons 图标导入
import { IoPerson, IoBook, IoBarChart, IoHeart, IoLogoGithub, IoMail } from 'react-icons/io5';

function App() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  // 添加状态来存储当前选中的项目
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const typeMatch = selectedType === 'all' || project.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, '_blank');
  };

  // 添加处理查看项目详情的函数
  const handleViewTableau = (tableauProps: any) => {
    // 根据 tableauProps 找到对应的项目
    const project = projects.find(p => p.tableauProps?.vizId === tableauProps.vizId);
    if (project) {
      setSelectedProject(project);
      // 跳转到项目详情页
      window.location.href = `/project/${project.id}`;
    }
  };

  // 在return语句的最外层div中添加这些元素
  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 添加更加精致的装饰元素 */}
      <div style={{
        position: 'fixed',
        top: '15%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M20,20 L80,20 L80,80 L20,80 Z\' stroke-dasharray=\'5,5\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M30,30 L70,30 L70,70 L30,70 Z\' stroke-opacity=\'0.3\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(15deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '8%',
        width: '180px',
        height: '180px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' stroke-opacity=\'0.3\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'30\' stroke-opacity=\'0.2\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'20\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-10deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '40%',
        right: '5%',
        width: '200px',
        height: '100px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M0,50 C40,30 80,70 120,50 C160,30 200,50 200,50\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M0,60 C40,40 80,80 120,60 C160,40 200,60 200,60\' stroke-opacity=\'0.2\'/%3E%3Cpath d=\'M0,40 C40,20 80,60 120,40 C160,20 200,40 200,40\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '15%',
        width: '200px',
        height: '200px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M10,10 L90,10 L90,90 L10,90 Z\' stroke-opacity=\'0.05\'/%3E%3Cpath d=\'M20,20 L80,20 L80,80 L20,80 Z\' stroke-opacity=\'0.1\'/%3E%3Cpath d=\'M30,30 L70,30 L70,70 L30,70 Z\' stroke-opacity=\'0.15\'/%3E%3Cpath d=\'M40,40 L60,40 L60,60 L40,60 Z\' stroke-opacity=\'0.2\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(5deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        bottom: '15%',
        right: '15%',
        width: '180px',
        height: '180px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M20,50 L50,20 L80,50 L50,80 Z\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M30,50 L50,30 L70,50 L50,70 Z\' stroke-opacity=\'0.2\'/%3E%3Cpath d=\'M40,50 L50,40 L60,50 L50,60 Z\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-5deg)'
      }}></div>
      
      {/* 添加一些更加精致的点和线条装饰 */}
      <div style={{
        position: 'fixed',
        top: '25%',
        left: '25%',
        width: '1px',
        height: '100px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(45deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '70%',
        left: '30%',
        width: '80px',
        height: '1px',
        background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-30deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '30%',
        right: '25%',
        width: '120px',
        height: '1px',
        background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(60deg)'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '60%',
        right: '30%',
        width: '1px',
        height: '80px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-15deg)'
      }}></div>
      
      {/* 添加一些微妙的色彩点缀 */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '40%',
        width: '4px',
        height: '4px',
        backgroundColor: '#4299e1',
        borderRadius: '50%',
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '20%',
        width: '3px',
        height: '3px',
        backgroundColor: '#ed8936',
        borderRadius: '50%',
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '35%',
        right: '40%',
        width: '5px',
        height: '5px',
        backgroundColor: '#48bb78',
        borderRadius: '50%',
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        top: '65%',
        right: '20%',
        width: '4px',
        height: '4px',
        backgroundColor: '#9f7aea',
        borderRadius: '50%',
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      
      {/* 现有的Header部分 */}
      <header className={`fixed w-full transition-all duration-300 z-50 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sticker-nav-item">
              {/*<div className="sticker-icon">*/}       
                <img src="wyl-logo.png" alt="Logo" className="w-28  transform -rotate-6 hover:rotate-0 transition-transform duration-300 " 
                  style={{
                    filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2))',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.25))';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2))'; 
                  }} />
              {/*</div>*/}
              {/*<span className="sticker-title">{t('header.title')}</span>*/}
            </div>
            <nav className="flex items-center space-x-6">
              <div className="sticker-nav-item">
                <div className="sticker-icon">
                  <div style={{
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    stroke: 'white',
                    fontWeight: 'bold',
                    strokeWidth: 20
                  }}>
                    <LanguageSwitch />
                  </div>
                </div>
              </div>
              <Link 
                to="/about" 
                className="sticker-nav-item"
                title={t('header.about')}
              >
                <div className="sticker-icon">
                  <IoPerson style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </Link>
              <Link 
                to="/blog" 
                className="sticker-nav-item"
                title={t('header.blog')}
              >
                <div className="sticker-icon">
                  <IoBook style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </Link>
              <a 
                href="https://public.tableau.com/app/profile/yuri.wg/vizzes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sticker-nav-item"
                title="Tableau Public Profile"
              >
                <div className="sticker-icon">
                  <IoBarChart style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </a>
              {/* <a 
                href="https://www.xiaohongshu.com/user/profile/62aa9352000000001902bd0b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sticker-nav-item"
                title="Little Red Book"
              >
                <div className="sticker-icon">
                  <IoHeart style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </a> */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sticker-nav-item"
                title="GitHub"
              >
                <div className="sticker-icon">
                  <IoLogoGithub style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </a>
              <a 
                href="wangyuli1991@hotmail.com" 
                className="sticker-nav-item"
                title="Contact"
              >
                <div className="sticker-icon">
                  <IoMail style={{
                    width: '30px',  // 直接使用像素值
                    height: '30px',
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    strokeWidth: 10,
                    stroke: 'white'
                  }}/>
                </div>
              </a>
            </nav>
          </div>
        </div>
      </header>
  
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="sticker-hero-title mb-6">{t('hero.title')}</h1>
          <p className="sticker-hero-subtitle mb-12">{t('hero.subtitle')}</p>
          <div className="sticker-icon mx-auto">
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col items-center space-y-6 mb-12">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {['all', 'climate', 'society', 'culture', 'templates'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`sticker-button ${
                    selectedCategory === category
                      ? 'sticker-button-active'
                      : ''
                  }`}
                >
                  {t(`categories.${category}`)}
                </button>
              ))}
            </div>
            
            {/* Type Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {['all', 'tableau', 'd3', 'python', 'obsidian'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`sticker-button-alt ${
                  selectedType === type
                  ? 'sticker-button-alt-active'
                  : ''
                  }`}
                >
                  {t(`types.${type}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={String(project.id)} // 将 id 转换为字符串
                title={project.title}
                description={project.description}
                image={project.image}
                type={project.type}
                publishDate={project.publishDate}
                downloadUrl={project.downloadUrl}
                onDownload={handleDownload}
                tableauProps={project.tableauProps}
                onViewTableau={handleViewTableau}
                className="sticker-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="sticker-text-small">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
