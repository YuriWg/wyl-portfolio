// 定义项目类型
// 修改 Project 接口，添加新的字段
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  // 移除 'moodGarden' 作为单独类型
  type: 'tableau' | 'd3' | 'python' | 'obsidian' | 'other';
  publishDate: string;
  link?: string;
  linkText?: string;
  downloadUrl?: string;
  
  tableauProps?: {
    vizId: string;
    width: string;
    height: string;
    vizName?: string;
    staticImageSrc?: string;
  };

  d3Props?: {
    sourceUrl: string;
    previewImageUrl?: string;
    width?: string;
    height?: string;
    isEmbeddable?: boolean; // 是否可以嵌入iframe
  };
  client?: string;
  dataSource?: string;
  longDescription?: string;
}

// 简单的 ID 生成器
let lastId = 0;
const generateId = () => {
  // 第一次调用时，找到当前最大的 ID
  if (lastId === 0) {
    // 过滤掉尚未添加的新项目，然后找到最大 ID
    const existingProjects = projects.slice(0, projects.length); // 假设新项目在末尾
    lastId = Math.max(0, ...existingProjects.map(p => p.id));
  }
  lastId += 1;
  return lastId;
};

// 更新项目数据，添加新的字段
export const projects: Project[] = [
  {
    id: 1,
    title: "Chinese Calligraphy Visualization",
    description: "An interactive exploration of Chinese calligraphy patterns and styles",
    image: "https://public.tableau.com/static/images/Ir/IronViz2021ChineseCalligraphy/ChineseCalligraphy/1_rss.png",
    category: "culture",
    type: "tableau",
    publishDate: "2021-06",
    client: "Self-initiated",
    dataSource: "Chinese Calligraphy Database",
    link: "https://public.tableau.com/app/profile/yuri.wg/viz/IronViz2021ChineseCalligraphy/ChineseCalligraphy",
    linkText: "Tableau Public",
    tableauProps: {
      vizId: 'viz1744185802632',
      width: '1250px',
      height: '3027px',
      vizName: 'IronViz2021ChineseCalligraphy/ChineseCalligraphy',
      staticImageSrc: 'https://public.tableau.com/static/images/Ir/IronViz2021ChineseCalligraphy/ChineseCalligraphy/1_rss.png'
    }
  },
  {
    id: 2,
    title: "Global Temperature Changes",
    description: "Interactive D3.js visualization of climate change patterns",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    category: "climate",
    type: "d3",
    publishDate: "2022-03",
    client: "Climate Research Institute",
    dataSource: "Global Climate Database",
    longDescription: "This visualization explores global temperature changes over the past century, highlighting trends and patterns in different regions of the world. Using D3.js, it creates an interactive experience that allows users to explore the data in depth.",
    d3Props: {
      sourceUrl: "https://github.com/yourgithub/global-temp-viz", // 假设的 GitHub 链接
      width: "100%",
      height: "600px",
      isEmbeddable: false
    }
  },
  {
    id: 3,
    title: "Urban Migration Patterns",
    description: "Python-based analysis of population movements",
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&q=80&w=2070",
    category: "society",
    type: "python",
    publishDate: "2022-05" // 添加发布时期
  },
  {
    id: 4,
    title: "Research Dashboard Template",
    description: "Comprehensive Obsidian template for academic research and note-taking",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2073",
    category: "templates",
    type: "obsidian",
    downloadUrl: "templates/research-dashboard.md",
    publishDate: "2022-08" // 添加发布时期
  },
  {
    id: 5,
    title: "Data Analysis Workflow",
    description: "Obsidian template for organizing data analysis projects",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    category: "templates",
    type: "obsidian",
    downloadUrl: "templates/data-analysis.md",
    publishDate: "2022-10" // 添加发布时期
  },
  // 添加你的 Tableau 作品
  {
    id: 6,
    title: "碳中和",
    description: "关于碳中和的数据可视化分析",
    image: "https://public.tableau.com/static/images/_1/_16205984439490/CarbonNeutralization/1_rss.png",
    category: "climate",
    type: "tableau",
    publishDate: "2021-05", // 添加发布时期
    tableauProps: {
      vizId: 'viz1744187245528',
      width: '1300px',
      height: '4527px',
      vizName: '_16205984439490/CarbonNeutralization',
      staticImageSrc: 'https://public.tableau.com/static/images/_1/_16205984439490/CarbonNeutralization/1_rss.png'
    }
  },
  {
    id: 7,
    title: "汇率变化",
    description: "汇率变化趋势的可视化分析",
    image: "https://public.tableau.com/static/images/Th/The6thVizChallengeTheExchangeRate/sheet0/1_rss.png",
    category: "society",
    type: "tableau",
    publishDate: "2021-08", // 添加发布时期
    tableauProps: {
      vizId: 'viz1744187308580',
      width: '1000px',
      height: '2827px',
      vizName: 'The6thVizChallengeTheExchangeRate/sheet0',
      staticImageSrc: 'https://public.tableau.com/static/images/Th/The6thVizChallengeTheExchangeRate/sheet0/1_rss.png'
    }
  },
  {
    id: 8,
    title: "信息可视化",
    description: "信息可视化设计作品",
    image: "https://public.tableau.com/static/images/in/infowetrustmakeovermonday2019week16/1/1_rss.png",
    category: "culture",
    type: "tableau",
    publishDate: "2021-11", // 添加发布时期
    tableauProps: {
      vizId: 'viz1744187339506',
      width: '1366px',
      height: '827px',
      vizName: 'infowetrustmakeovermonday2019week16/1',
      staticImageSrc: 'https://public.tableau.com/static/images/in/infowetrustmakeovermonday2019week16/1/1_rss.png'
    }
  },
  // 添加新的作品
  {
    id: 9,
    title: "50个最佳城市",
    description: "全球50个最佳城市的数据可视化分析",
    image: "https://public.tableau.com/static/images/50/50_15655374759590/1/1_rss.png",
    category: "society",
    type: "tableau",
    publishDate: "2023-02", // 添加发布时期
    tableauProps: {
      vizId: 'viz1744187429364',
      width: '827px',
      height: '1196px',
      vizName: '50_15655374759590/1',
      staticImageSrc: 'https://public.tableau.com/static/images/50/50_15655374759590/1/1_rss.png'
    }
  },
  {
    id: 10,
    title: "H.R. Giger - 夜晚绘制怪物的人",
    description: "关于艺术家H.R. Giger作品和生平的可视化分析",
    image: "https://public.tableau.com/static/images/H_/H_R_Giger_Themanwhopaintsmonstersinthenight/EN/1_rss.png",
    category: "culture",
    type: "tableau",
    publishDate: "2023-05", // 添加发布时期
    tableauProps: {
      vizId: 'viz1744189364262',
      width: '1000px',
      height: '3050px',
      vizName: 'H_R_Giger_Themanwhopaintsmonstersinthenight/EN',
      staticImageSrc: 'https://public.tableau.com/static/images/H_/H_R_Giger_Themanwhopaintsmonstersinthenight/EN/1_rss.png'
    }
  },
  
  // 在 projects 数组中添加心情花园项目
  {
    id: 11,
    title: "心情花园可视化",
    description: "基于D3.js的互动式数据可视化，将每日心情数据以花朵形式展现，支持多种布局和主题色。",
    image: "/DataViz-Portfolio/images/projects/mood-garden-preview.jpg", // 确保路径正确
    category: "life",
    type: "d3", // 使用 d3 类型
    publishDate: "2023-08",
    link: "https://github.com/YuriWg/mood-garden-viz",
    linkText: "GitHub 代码库",
    client: "Self-initiated",
    dataSource: "模拟心情数据",
    longDescription: `心情花园可视化项目是一个基于D3.js的互动式数据可视化实验，旨在将抽象的情绪数据转化为直观的视觉表达。
    每个花朵代表一天的心情记录，花朵的大小和颜色反映心情指数的高低，支持随机布局和日历布局两种查看模式，并提供多种主题色切换功能。
    该项目不仅实现了数据的可视化展示，还注重用户体验和交互性，可以帮助用户更好地理解和分析自己的情绪变化趋势。`,
    
    // 使用统一的 d3Props 替代专属配置
    d3Props: {
      sourceUrl: "https://yuriwg.github.io/mood-garden-viz/", 
      previewImageUrl: "/DataViz-Portfolio/images/projects/mood-garden-preview.jpg",
      width: "100%",
      height: "1400px",
      isEmbeddable: true // 目前尚未部署到可嵌入的位置
    }
  }
];

export default projects;