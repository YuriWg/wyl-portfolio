import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 博客文章类型定义
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
}

// 示例博客文章数据
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "数据可视化的最佳实践",
    excerpt: "探索如何创建有效且引人入胜的数据可视化作品",
    content: "这是完整的博客文章内容...",
    date: "2023-05-15",
    tags: ["数据可视化", "设计", "最佳实践"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    title: "使用 Tableau 讲述数据故事",
    excerpt: "学习如何利用 Tableau 创建引人入胜的数据故事",
    content: "这是完整的博客文章内容...",
    date: "2023-06-22",
    tags: ["Tableau", "数据故事", "教程"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "D3.js 入门指南",
    excerpt: "D3.js 的基础知识和创建交互式可视化的步骤",
    content: "这是完整的博客文章内容...",
    date: "2023-07-10",
    tags: ["D3.js", "JavaScript", "教程"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
  }
];

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 过滤博客文章
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // 获取所有唯一标签
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回首页按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('blog.backToHome')}</span>
        </Link>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{t('blog.title')}</h1>
          
          {/* 搜索和标签过滤 */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('blog.searchPlaceholder')}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === null ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setSelectedTag(null)}
                >
                  {t('blog.allTags')}
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 博客文章列表 */}
          <div className="space-y-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-100 text-xs rounded"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {t('blog.readMore')}
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t('blog.noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;