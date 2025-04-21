import React, { useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoLogoWechat } from 'react-icons/io5';
import Decorations from '../components/Decorations';

const About: React.FC = () => {
  // 指定使用about命名空间
  const { t, i18n } = useTranslation(['about', 'common']);
  const contentRef = useRef<HTMLDivElement>(null);
  const isZh = i18n.language.startsWith('zh');
  const [showQRCode, setShowQRCode] = React.useState(false);

  useEffect(() => {
    if (isZh && contentRef.current) {
      const allElements = contentRef.current.querySelectorAll('*');
      allElements.forEach(el => {
        (el as HTMLElement).style.fontFamily = '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif';
      });
    }
  }, [i18n.language, isZh]);

  const zhFontStyle = isZh
    ? {
        fontFamily: '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif'
      }
    : {};
  
  return (
    <div className={`min-h-screen bg-gray-50 ${isZh ? 'font-chinese' : 'font-comic'}`}>
      <Header />
      {/* 添加Decorations组件 */}
      <Decorations />

      <div className="mx-auto px-6 pt-32 pb-12 h-auto bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl shadow-lg overflow-hidden backdrop-blur-sm px-3 py-3">
            {/* 个人信息头部 */}
            <div className=" h-24 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="sticker-card-avatar w-32 h-32 rounded-full shadow-lg overflow-hidden relative transform rotate-2">        
                  <img 
                    src={`${import.meta.env.BASE_URL}images/avatar.jpg`}
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.05) saturate(1.1)'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `${import.meta.env.BASE_URL}images/default-avatar.png`;
                    }}
                  />
                  
                  {/* 添加一个轻微的贴纸边缘效果 */}
                  <div className="absolute inset-0 rounded-full border border-gray-200 opacity-50 z-20"></div>
                </div>
              </div>
            </div>

            {/* 个人信息内容 */}
            <div className="pt-24 px-8 pb-8" ref={contentRef} style={zhFontStyle}>
              <h1 className="text-3xl font-bold mb-2" style={zhFontStyle}>{t('name', { ns: 'about' })}</h1>
              <p className="text-gray-600 mb-6" style={zhFontStyle}>{t('title', { ns: 'about' })}</p>

                <div className="flex space-x-4 mb-8">
                <a 
                  href="mailto:wangyuli1991@hotmail.com" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/yuriwg" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/yuli_wg?s=21" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                {/* 添加微信公众号二维码 */}
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQRCode(true);
                  }}
                  className="text-gray-600 hover:text-gray-900 relative group"
                  title={t('公众号')}
                >
                  <IoLogoWechat className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {t('公众号')}
                  </span>
                </a>

                {/* 添加二维码模态框 */}
                {showQRCode && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowQRCode(false)}
                  >
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
                      <img 
                        src="https://raw.githubusercontent.com/YuriWg/Obisidian_Pic/main/Picgo/qrcode_for_gh_430.jpg"
                        alt="WeChat QR Code"
                        className="w-full h-auto"
                      />
                      <p className="text-center mt-4 text-gray-600">{t('scanWeChatQRCode')}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="prose prose-lg max-w-none" style={zhFontStyle}>
                <h2 style={zhFontStyle}>{t('aboutMe', { ns: 'about' })}</h2>
                <p style={zhFontStyle}>{t('bio', { ns: 'about' })}</p>

                <h2 style={zhFontStyle}>{t('skills', { ns: 'about' })}</h2>
                <ul style={zhFontStyle}>
                  <li style={zhFontStyle}>{t('skill1', { ns: 'about' })}</li>
                  <li style={zhFontStyle}>{t('skill2', { ns: 'about' })}</li>
                  <li style={zhFontStyle}>{t('skill3', { ns: 'about' })}</li>
                  <li style={zhFontStyle}>{t('skill4', { ns: 'about' })}</li>
                </ul>

                {/* 

                <h2 style={zhFontStyle}>{t('experience', { ns: 'about' })}</h2>
                <div className="space-y-6" style={zhFontStyle}>
                  <div style={zhFontStyle}>
                    <h3 style={zhFontStyle}>{t('job1.title', { ns: 'about' })}</h3>
                    <p className="text-gray-600" style={zhFontStyle}>{t('job1.company', { ns: 'about' })} | {t('job1.period', { ns: 'about' })}</p>
                    <p style={zhFontStyle}>{t('job1.description', { ns: 'about' })}</p>
                  </div>
                  <div style={zhFontStyle}>
                    <h3 style={zhFontStyle}>{t('job2.title', { ns: 'about' })}</h3>
                    <p className="text-gray-600" style={zhFontStyle}>{t('job2.company', { ns: 'about' })} | {t('job2.period', { ns: 'about' })}</p>
                    <p style={zhFontStyle}>{t('job2.description', { ns: 'about' })}</p>
                  </div>
                </div>

                <h2 style={zhFontStyle}>{t('education', { ns: 'about' })}</h2>
                <div style={zhFontStyle}>
                  <h3 style={zhFontStyle}>{t('education1.degree', { ns: 'about' })}</h3>
                  <p className="text-gray-600" style={zhFontStyle}>
                    {t('education1.school', { ns: 'about' })} | {t('education1.period', { ns: 'about' })}
                  </p>
                </div>

                */}

                <h2 style={zhFontStyle}>{t('interest', { ns: 'about' })}</h2>
                <div className="flex flex-wrap gap-2 mt-2" style={zhFontStyle}>
                  <span className="bg-blue-100 text-blue-800 border-0 border-blue-300 text-sm font-medium px-3 py-1 rounded-full" style={zhFontStyle}>
                    {t('interest1', { ns: 'about' })}
                  </span>
                  <span className="bg-green-100 text-green-800 border-0 border-green-300 text-sm font-medium px-3 py-1 rounded-full" style={zhFontStyle}>
                    {t('interest2', { ns: 'about' })}
                  </span>
                  <span className="bg-purple-100 text-purple-800 border-0 border-purple-300 text-sm font-medium px-3 py-1 rounded-full" style={zhFontStyle}>
                    {t('interest3', { ns: 'about' })}
                  </span>
                  <span className="bg-amber-100 text-amber-800 border-0 border-amber-300 text-sm font-medium px-3 py-1 rounded-full" style={zhFontStyle}>
                    {t('interest4', { ns: 'about' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;