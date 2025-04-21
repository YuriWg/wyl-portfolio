

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
    id: 4,
    title: {
      zh: "Deep Research + Obsidian + MCP = 盘活你的”第二大脑“",
      en: "Deep Research + Obsidian + MCP = Revitalize Your 'Second Brain'"
    },
    excerpt: {
      zh: "探索如何通过Deep Research、Obsidian和MCP工作流程构建和管理个人知识系统。",
      en: "Explore how to build and manage a personal knowledge system through Deep Research, Obsidian, and MCP workflow."
    },
    date: "2025-04-20",
    author: "wyl",
    tags: [TAGS.OBSIDIAN, TAGS.WORKFLOW, TAGS.KNOWLEDGE_GRAPH],
    image: "https://raw.githubusercontent.com/YuriWg/Obisidian_Pic/main/Picgo/%E7%9F%A5%E8%AF%86%E5%9B%BE%E8%B0%B1.png",
    externalLink: "https://mp.weixin.qq.com/s/vahLPMxiDMGx_MHAPU2xLA",
    estimatedReadingTime: {
      zh: "8分钟",
      en: "8 minutes"
    }
  },
  {
    id: 3,
    title: {
      zh: "'零经验' 如何让'AI团队'为你搭建个人网站？揭秘人机协作的创造力革命",
      en: "How to Build a Personal Website with 'AI Team' as a Beginner? Unveiling the Creative Revolution of Human-AI Collaboration"
    },
    excerpt: {
      zh: "分享一段借助'AI团队'从零开始构建个人网站的经历。",
      en: "Sharing the experience of building a personal website from scratch with the help of an 'AI Team'."
    },
    date: "2025-04-15",
    author: "wyl",
    tags: [TAGS.AI, TAGS.JAVASCRIPT, TAGS.TUTORIAL],
    image: "https://raw.githubusercontent.com/YuriWg/Obisidian_Pic/main/Picgo/20250415181014.png",
    externalLink: "https://mp.weixin.qq.com/s/HK1Vg8n7jp_uKso6cCfCGQ",
    estimatedReadingTime: {
      zh: "15分钟",
      en: "15 minutes"
    }
  },
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
    date: "2024-03-25",
    author: "wyl",
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
    date: "2024-03-15",
    author: "wyl",
    tags: [TAGS.AI, TAGS.OBSIDIAN, TAGS.D3],
    image: "https://raw.githubusercontent.com/YuriWg/Obisidian_Pic/main/Picgo/%E5%BF%83%E6%83%85%E8%8A%B1%E5%9B%AD.png",
    externalLink: "https://mp.weixin.qq.com/s/fLbaCahMKiNAOFy2xLv1Eg",
    estimatedReadingTime: {
      zh: "8分钟",
      en: "8 minutes"
    }
  },
  
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