import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <header className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="font-bold text-3xl text-black">
              <span className="font-black">wyl</span>
            </div>
          </Link>
          
          {/* 主导航 */}
          <nav className="hidden md:flex space-x-10">
            <Link 
              to="/" 
              className={`font-medium text-gray-800 hover:text-amber-500 transition-colors ${location.pathname === '/' ? 'text-amber-500' : ''}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              className={`font-medium text-gray-800 hover:text-amber-500 transition-colors ${location.pathname === '/about' ? 'text-amber-500' : ''}`}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium text-gray-800 hover:text-amber-500 transition-colors ${location.pathname === '/blog' ? 'text-amber-500' : ''}`}
            >
              {t('nav.blog')}
            </Link>
          </nav>
          
          {/* 右侧功能区 */}
          <div className="flex items-center space-x-6">
            {/* 语言切换 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-sm ${i18n.language === 'en' ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('zh')}
                className={`px-2 py-1 rounded text-sm ${i18n.language === 'zh' ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
              >
                中文
              </button>
            </div>
            
            {/* 社交链接图标 */}
            <div className="flex space-x-4">
              <a href="/profile" title="Profile" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </a>
              <a href="/blog" title="Blog" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                </svg>
              </a>
              <a href="/projects" title="Projects" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.99 6H7V7h10.01v2zm0 4H7v-2h10.01v2zm-3 4H7v-2h7.01v2z"></path>
                </svg>
              </a>
              <a href="https://github.com/YuriWG" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <a href="mailto:contact@example.com" title="Email" className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;