import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回首页按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('about.backToHome')}</span>
        </Link>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* 个人信息头部 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <img 
                    src="/avatar.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/128?text=Avatar';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 个人信息内容 */}
            <div className="pt-20 px-8 pb-8">
              <h1 className="text-3xl font-bold mb-2">{t('about.name')}</h1>
              <p className="text-gray-600 mb-6">{t('about.title')}</p>

              <div className="flex space-x-4 mb-8">
                <a 
                  href="mailto:contact@example.com" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/yourusername" 
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
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2>{t('about.aboutMe')}</h2>
                <p>{t('about.bio')}</p>

                <h2>{t('about.skills')}</h2>
                <ul>
                  <li>{t('about.skill1')}</li>
                  <li>{t('about.skill2')}</li>
                  <li>{t('about.skill3')}</li>
                  <li>{t('about.skill4')}</li>
                </ul>

                <h2>{t('about.experience')}</h2>
                <div className="space-y-6">
                  <div>
                    <h3>{t('about.job1.title')}</h3>
                    <p className="text-gray-600">{t('about.job1.company')} | {t('about.job1.period')}</p>
                    <p>{t('about.job1.description')}</p>
                  </div>
                  <div>
                    <h3>{t('about.job2.title')}</h3>
                    <p className="text-gray-600">{t('about.job2.company')} | {t('about.job2.period')}</p>
                    <p>{t('about.job2.description')}</p>
                  </div>
                </div>

                <h2>{t('about.education')}</h2>
                <div>
                  <h3>{t('about.education1.degree')}</h3>
                  <p className="text-gray-600">{t('about.education1.school')} | {t('about.education1.period')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;