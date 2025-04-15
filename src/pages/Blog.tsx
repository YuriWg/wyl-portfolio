import React, { useState } from 'react';
import { Calendar, Search, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Decorations from '../components/Decorations';
import LocalizedFontWrapper from '../components/LocalizedFontWrapper';
import { useLocalizedFont } from '../utils/fontUtils';
import { getAllArticles, getAllTags, searchArticles, getArticlesByTag } from '../data/articles';

// 修改类型声明
interface BlogTag {
  id: string;     // 标签唯一标识
  en: string;     // 英文标签文本
  zh: string;     // 中文标签文本
  localizedText: string;  // 根据当前语言本地化后的文本
}

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation(['blog', 'common']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const {fontClass } = useLocalizedFont();

  // 在组件顶部添加isZh标志
  const isZh = i18n.language.startsWith('zh');

  // 获取数据
  const allTags: BlogTag[] = getAllTags(i18n.language).map(tag => ({
    ...tag,
    localizedText: tag.localizedText || (isZh ? tag.zh : tag.en) // 确保 localizedText 属性有值
  }));
  
  // 过滤文章 - 传递当前语言
  let filteredPosts = [];
  if (searchTerm) {
    filteredPosts = searchArticles(searchTerm, i18n.language);
    if (selectedTag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(selectedTag));
    }
  } else if (selectedTag) {
    filteredPosts = getArticlesByTag(selectedTag, i18n.language);
  } else {
    filteredPosts = getAllArticles(i18n.language);
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${fontClass}`}>
      <Header />
      <Decorations />

      <LocalizedFontWrapper className="container mx-auto px-6 py-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('title', { ns: 'blog' })}</h1>
          
          {/* 搜索和标签过滤 */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder', { ns: 'blog' })}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  className={`sticker-button px-3 py-1 rounded-full text-sm ${
                    selectedTag === null ? 'sticker-button-active' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedTag(null)}
                >
                  {t('allTags', { ns: 'blog' })}
                </button>
                
                {/* 修正 map 函数中的变量和类型 */}
                {allTags.map((tag: BlogTag) => (
                  <button
                    key={tag.id}
                    className={`sticker-button px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag.localizedText ? 'sticker-button-active' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setSelectedTag(tag.localizedText)}
                  >
                    {tag.localizedText}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 博客文章列表 */}
          <div className="space-y-10">          
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <article 
                  key={post.id} 
                  className={`sticker-showcase sticker-detail-card bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row`}
                  style={{
                    transform: `rotate(${(index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0) * 0.8}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(0deg)' }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = `rotate(${(index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0) * 0.8}deg)`
                  }}
                >
                  {/* 左侧图片区域 */}
                  {post.image && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden flex-shrink-0 rounded-xl shadow-sm">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* 右侧文本内容区域 */}
                  <div className="p-6 flex-grow">
                    <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      
                      {/* 修改标签部分的渲染 */}
                      {post.tags.map((tag: BlogTag) => (
                        <span 
                          key={tag.id} 
                          className="px-2 py-1 bg-gray-100 text-xs rounded cursor-pointer"
                          onClick={() => setSelectedTag(tag.localizedText)}
                        >
                          {tag.localizedText}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.date}</span>
                      </div>
                      {post.estimatedReadingTime && (
                        <span className="text-sm">
                          {post.estimatedReadingTime}
                        </span>
                      )}
                    </div>
                    
                    {/* 阅读更多按钮 */}
                    <div className="flex justify-end">
                      <a 
                        href={post.externalLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sticker-link-button"
                      >
                        <span>{t('readMore', { ns: 'blog' })}</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t('noResults', { ns: 'blog' })}</p>
              </div>
            )}
          </div>
        </div>
      </LocalizedFontWrapper>
      <Footer />
    </div>
  );
};

export default Blog;