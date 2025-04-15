import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImage from '/public/images/wyl-logo.png';

// 导入 react-icons 图标
import { IoPerson, IoBook, IoBarChart, IoLogoGithub, IoMail } from 'react-icons/io5';
import LanguageSwitch from './LanguageSwitch';

const Header: React.FC = () => {
  const { t } = useTranslation(['common']);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 监听页面滚动事件来控制导航栏透明度
  useEffect(() => {
    const handleScroll = () => {
      // 当页面滚动超过50px时，设置isScrolled为true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', handleScroll);
    
    // 初始检查滚动位置
    handleScroll();
    
    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  
  return (
    <header 
      className={`w-full py-0 fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-100 shadow-md' : 'bg-white bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" title = "wyl" > 
          <img 
            src={logoImage} 
            alt="Logo" 
            className="w-28 h-auto" // 减小图片尺寸
            style={{
                filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2))',
                transform: 'rotate(-6deg)',
                transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg)';
                e.currentTarget.style.filter = 'drop-shadow(3px 3px 0px rgba(0, 0, 0, 0.25))';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'rotate(-6deg)';
                e.currentTarget.style.filter = 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.2))'; 
            }}
            />
          </Link>
          
          {/* 右侧图标导航 */}
          <nav className="flex items-center space-x-3"> {/* 减小间距 */}
            {/* 语言切换 - 使用更新后的LanguageSwitch组件 */}
            <div 
                className="sticker-nav-item lang-switch-container" 
                >
                <div className="sticker-icon">
                    <div style={{
                    filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)',
                    width: '24px',
                    height: '24px',
                    paddingRight: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                    <LanguageSwitch />
                    </div>
                </div>
                </div>
            
            {/* 导航图标使用卡通风格 */}
            <Link 
              to="/about" 
              className="sticker-nav-item"
              title={t('nav.about', { ns: 'common' })}
            >
              <div className="sticker-icon">
                <IoPerson style={{
                  width: '30px', // 减小图标尺寸
                  height: '30px', // 减小图标尺寸
                  filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)'
                }}/>
              </div>
            </Link>

            <Link 
              to="/blog" 
              className="sticker-nav-item"
              title={t('nav.blog', { ns: 'common' })}
            >
              <div className="sticker-icon">
                <IoBook style={{
                  width: '30px', // 减小图标尺寸
                  height: '30px', // 减小图标尺寸
                  filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)'
                }}/>
              </div>
            </Link>

            <a 
              href="https://public.tableau.com/app/profile/yuri.wg/vizzes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="sticker-nav-item"
              title={t('nav.tableau', { ns: 'common' })}
            >
              <div className="sticker-icon">
                <IoBarChart style={{
                  width: '30px', // 减小图标尺寸
                  height: '30px', // 减小图标尺寸
                  filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)'
                }}/>
              </div>
            </a>

            <a 
              href="https://github.com/YuriWG" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-nav-item"
              title={t('nav.github', { ns: 'common' })}
            >
              <div className="sticker-icon">
                <IoLogoGithub style={{
                  width: '30px', // 减小图标尺寸
                  height: '30px', // 减小图标尺寸
                  filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)'
                }}/>
              </div>
            </a>

            <a 
              href="mailto:wangyuli1991@hotmail.com" 
              className="sticker-nav-item"
              title={t('nav.contact', { ns: 'common' })}
            >
              <div className="sticker-icon">
                <IoMail style={{
                  width: '30px', // 减小图标尺寸
                  height: '30px', // 减小图标尺寸
                  filter: 'drop-shadow(0 -2px 0 white) drop-shadow(2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(-2px 0 0 white)'
                }}/>
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;