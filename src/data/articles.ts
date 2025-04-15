import { getAssetPath } from '../utils/pathUtils';

// 修改标签类型定义
export interface Tag {
  id: string;  // 唯一标识，用于匹配和筛选
  en: string;  // 英文标签文本
  zh: string;  // 中文标签文本
  localizedText?: string; // 根据当前语言本地化的文本
}

// 博客文章类型定义
export interface ArticleType {
  id: number;
  title: {
    en: string;
    zh: string;
  };
  excerpt: {
    en: string;
    zh: string;
  };
  content?: {
    en: string;
    zh: string;
  };
  date: string; 
  tags: Tag[]; // 修改为Tag类型的数组
  author?: string;
  image?: string;
  externalLink?: string;
  isPinned?: boolean;
  estimatedReadingTime?: {
    en: string;
    zh: string;
  };
}

// 预定义常用标签
const TAGS = {
  AI: { id: 'ai', en: 'AI', zh: '人工智能' },
  D3: { id: 'd3', en: 'D3.js', zh: 'D3.js' },
  OBSIDIAN: { id: 'obsidian', en: 'Obsidian', zh: 'Obsidian' },
  KNOWLEDGE_GRAPH: { id: 'knowledge-graph', en: 'Knowledge Graph', zh: '知识图谱' },
  BEST_PRACTICE: { id: 'best-practice', en: 'Best Practice', zh: '最佳实践' },
  JAVASCRIPT: { id: 'javascript', en: 'JavaScript', zh: 'JavaScript' },
  PYTHON: { id: 'python', en: 'Python', zh: 'Python' },
  TUTORIAL: { id: 'tutorial', en: 'Tutorial', zh: '教程' },
  DATA_ANALYSIS: { id: 'data-analysis', en: 'Data Analysis', zh: '数据分析' },
  WORKFLOW: { id: 'workflow', en: 'Workflow', zh: '工作流程' }
};

// 更新文章数据内容
export const articles: ArticleType[] = [
  {
    id: 1,
    title: {
      zh: "用AI做长文本处理：从电子书到知识图谱的实践之旅",
      en: "AI for Long Text Processing: A Journey from eBooks to Knowledge Graphs"
    },
    excerpt: {
      zh: "本文探讨如何利用人工智能技术处理长文本内容，实现从电子书到知识图谱的自动化构建过程。",
      en: "This article discusses how to use artificial intelligence to process long text content and achieve automated construction from e-books to knowledge graphs."
    },
    date: "2023-05-15",
    author: "王三三",
    tags: [TAGS.KNOWLEDGE_GRAPH, TAGS.AI, TAGS.BEST_PRACTICE],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    externalLink: "https://mp.weixin.qq.com/s/Q6zgYW-SdQhjIChNzYrk-Q",
    isPinned: true,
    estimatedReadingTime: {
      zh: "10分钟",
      en: "10 minutes"
    }
  },
  {
    id: 2,
    title: {
      zh: "春天来了，让AI给笔记库造了个心情花园",
      en: "Spring is Here: Building a Mood Garden for Your Note Library with AI"
    },
    excerpt: {
      zh: "通过人工智能分析个人笔记库数据，生成一个可视化的心情花园，展示不同时期的情绪变化和知识积累。",
      en: "Analyze personal note library data using artificial intelligence to generate a visualized mood garden showing emotional changes and knowledge accumulation over different periods."
    },
    date: "2023-06-22",
    author: "王三三",
    tags: [TAGS.AI, TAGS.OBSIDIAN, TAGS.D3],
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=2148",
    externalLink: "https://mp.weixin.qq.com/s/fLbaCahMKiNAOFy2xLv1Eg",
    estimatedReadingTime: {
      zh: "8分钟",
      en: "8 minutes"
    }
  },
  {
    id: 3,
    title: {
      zh: "D3.js 入门指南",
      en: "D3.js Beginner's Guide"
    },
    excerpt: {
      zh: "一篇全面的D3.js入门教程，介绍如何使用这个强大的JavaScript库创建交互式数据可视化作品。",
      en: "A comprehensive beginner's guide to D3.js, introducing how to use this powerful JavaScript library to create interactive data visualizations."
    },
    date: "2023-07-10",
    author: "王三三",
    tags: [TAGS.D3, TAGS.JAVASCRIPT, TAGS.TUTORIAL],
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=2070",
    externalLink: "https://mp.weixin.qq.com/s/Q6zgYW-SdQhjIChNzYrk-Q",
    estimatedReadingTime: {
      zh: "15分钟",
      en: "15 minutes"
    }
  },
  {
    id: 4,
    title: {
      zh: "如何利用AI工具提升数据分析效率",
      en: "How to Use AI Tools to Improve Data Analysis Efficiency"
    },
    excerpt: {
      zh: "探讨当前最新的AI辅助数据分析工具，以及如何将它们整合到日常工作流程中，提高分析效率。",
      en: "Exploring the latest AI-assisted data analysis tools and how to integrate them into daily workflows to improve analysis efficiency."
    },
    date: "2023-09-05",
    author: "王三三",
    tags: [TAGS.AI, TAGS.DATA_ANALYSIS, TAGS.WORKFLOW],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=2074",
    externalLink: "https://mp.weixin.qq.com/s/Q6zgYW-SdQhjIChNzYrk-Q",
    estimatedReadingTime: {
      zh: "12分钟",
      en: "12 minutes"
    }
  }
];

// 本地化文章数据，包括标签
const localizeArticle = (article: ArticleType, language: string): any => {
  const isZh = language.startsWith('zh');
  
  return {
    ...article,
    title: isZh ? article.title.zh : article.title.en,
    excerpt: isZh ? article.excerpt.zh : article.excerpt.en,
    content: article.content ? (isZh ? article.content.zh : article.content.en) : undefined,
    estimatedReadingTime: article.estimatedReadingTime ? 
      (isZh ? article.estimatedReadingTime.zh : article.estimatedReadingTime.en) : undefined,
    // 本地化标签
    tags: article.tags.map(tag => ({
      ...tag,
      localizedText: isZh ? tag.zh : tag.en
    }))
  };
};

// 修改获取所有文章函数，本地化标签
export const getAllArticles = (language: string = 'en'): any[] => {
  return articles.map(article => ({
    ...localizeArticle(article, language),
    image: article.image ? article.image : undefined
  }));
};

// 修改其他函数以接受语言参数
export const getPinnedArticles = (language: string = 'en'): any[] => {
  return getAllArticles(language).filter(article => article.isPinned);
};

// 按标签过滤文章（使用本地化文本）
export const getArticlesByTag = (tagText: string, language: string = 'en'): any[] => {
  return getAllArticles(language).filter(article => 
    article.tags.some((tag: Tag) => tag.localizedText === tagText)
  );
};

export const getArticleById = (id: number, language: string = 'en'): any | undefined => {
  return getAllArticles(language).find(article => article.id === id);
};

// 更新获取所有标签的函数，返回本地化的标签
export const getAllTags = (language: string = 'en'): Tag[] => {
  const isZh = language.startsWith('zh');
  
  // 收集所有标签对象
  const allTagObjects = articles.flatMap(article => article.tags);
  
  // 去重（基于id）
  const uniqueTagsMap = new Map<string, Tag>();
  allTagObjects.forEach(tag => {
    if (!uniqueTagsMap.has(tag.id)) {
      // 添加本地化文本属性
      uniqueTagsMap.set(tag.id, {
        ...tag,
        localizedText: isZh ? tag.zh : tag.en
      });
    }
  });
  
  // 返回本地化后的标签对象数组
  return Array.from(uniqueTagsMap.values());
};

// 按日期排序文章（从新到旧）
export const getArticlesSortedByDate = (language: string = 'en'): any[] => {
  return [...getAllArticles(language)].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// 搜索文章
export const searchArticles = (searchTerm: string, language: string = 'en'): any[] => {
  const term = searchTerm.toLowerCase();
  const localizedArticles = getAllArticles(language);
  
  return localizedArticles.filter(article => 
    article.title.toLowerCase().includes(term) || 
    article.excerpt.toLowerCase().includes(term) ||
    article.content?.toLowerCase().includes(term)
  );
};