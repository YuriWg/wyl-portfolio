// 定义项目类型
// 修改 Project 接口，添加新的字段
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  category: string;
  type: 'tableau' | 'd3' | 'python'  | 'obsidian' | 'other';
  publishDate: string;
  client?: string;
  dataSource?: string;
  link?: string;
  linkText?: string;
  downloadUrl?: string;
  
  // Tableau 项目属性
  // Update Tableau props interface
  tableauProps?: {
    vizId: string;
    width: string;
    height: string;
    vizName: string;
    staticImageSrc: string;
    options?: {
      hideTabs?: boolean;
      hideToolbar?: boolean;
      showShareOptions?: boolean;
      allowPopups?: boolean;
      device?: 'desktop' | 'tablet' | 'phone';
    };
  };

  // D3 项目属性
  d3Props?: {
    sourceUrl: string;
    previewImageUrl: string;
    width?: string;
    height?: string;
    isEmbeddable: boolean;
  };

  // 通用项目属性（用于其他类型项目）
  showcaseProps?: {
    type: 'other' | 'custom';
    owner?: string;
    repo?: string;
    branch?: string;
    content?: React.ReactNode;
    links?: Array<{
      url: string;
      label: string;
    }>;
  };
}

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
      width: '100%',
      height: 'auto',
      vizName: 'IronViz2021ChineseCalligraphy/ChineseCalligraphy',
      staticImageSrc: 'https://public.tableau.com/static/images/Ir/IronViz2021ChineseCalligraphy/ChineseCalligraphy/1_rss.png'
    }
  },
  {
    id: 2,
    title: "跑步数据可视化",
    description: "基于D3.js的互动式跑步数据可视化，展示运动轨迹、配速和相关统计数据。",
    image: "images/projects/running-tracker.png",
    category: "life",
    type: "d3",
    publishDate: "2023-12",
    link: "https://github.com/YuriWG/running-tracker-react",
    linkText: "GitHub 代码库",
    client: "Self-initiated",
    dataSource: "Strava跑步数据",
    longDescription: `跑步数据可视化项目是一个基于D3.js的互动式数据可视化工具，将跑步轨迹和运动数据转化为直观的可视化展示。
    项目支持显示跑步路线、配速变化、海拔变化等关键指标，并提供数据筛选和时间范围选择功能。
    通过这个工具，跑步爱好者可以更好地分析自己的运动表现和进步轨迹。`,
    
    d3Props: {
      sourceUrl: "https://yuriwg.github.io/running-tracker-react/",
      previewImageUrl: "images/projects/running-tracker.png",
      width: "100%",
      height: "auto",
      isEmbeddable: true
    }
  },
  {
    id: 3,
    title: "心情花园可视化",
    description: "基于D3.js的互动式数据可视化，将每日心情数据以花朵形式展现，支持多种布局和主题色。",
    image: "images/projects/mood-garden-preview.jpg", // 确保路径正确
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
      previewImageUrl: "images/projects/mood-garden-preview.jpg",
      width: "100%",
      height: "1200px",
      isEmbeddable: true // 目前尚未部署到可嵌入的位置
    }
  },
  {
    id: 4,
    title: "极简主义挑战",
    description: "基于D3.js的互动式数据可视化，展示100天极简主义挑战的过程和成果。",
    image: "images/projects/minimalism-preview.png",
    category: "life",
    type: "d3",
    publishDate: "2024-01",
    link: "https://github.com/YuriWG/minimalism-challenge",
    linkText: "GitHub 代码库",
    client: "Self-initiated",
    dataSource: "个人极简主义挑战数据",
    longDescription: `极简主义挑战项目是一个记录和可视化100天极简主义生活的实验。
    通过D3.js将每天的物品整理数据转化为直观的可视化展示，帮助人们理解极简主义生活方式的实践过程。
    项目展示了物品数量的变化趋势，以及不同类别物品的分布情况。`,
    
    d3Props: {
      sourceUrl: "https://yuriwg.github.io/minimalism-challenge/",
      previewImageUrl: "images/projects/minimalism-preview.png",
      width: "100%",
      height: "1400px",
      isEmbeddable: true
    }
  },
  // 添加你的 Tableau 作品
  {
    id: 6,
    title: "碳中和",
    description: "关于碳中和的数据可视化分析",
    image: "https://public.tableau.com/static/images/_1/_16205984439490/CarbonNeutralization/1_rss.png",
    category: "climate",
    type: "tableau",
    publishDate: "2021-05",
    link: "https://public.tableau.com/views/_16205984439490/CarbonNeutralization",
    linkText: "Tableau Public",
    tableauProps: {
      vizId: 'viz1744448793486',
      width: '100%',
      height: 'auto',
      vizName: '_16205984439490/CarbonNeutralization',
      staticImageSrc: 'https://public.tableau.com/static/images/_1/_16205984439490/CarbonNeutralization/1_rss.png',
      options: {
        hideTabs: true,
        hideToolbar: false,
        showShareOptions: true,
        device: 'desktop'
      }
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
    link: "https://public.tableau.com/views/The6thVizChallengeTheExchangeRate/sheet0",
    linkText: "Tableau Public",
    tableauProps: {
      vizId: 'viz1744187308580',
      width: '100%',
      height: 'auto',
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
    link: "https://public.tableau.com/views/infowetrustmakeovermonday2019week16/1",
    linkText: "Tableau Public",
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
    link: "https://public.tableau.com/views/50_15655374759590/1",
    linkText: "Tableau Public",
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
      width: '100%',
      height: 'auto',
      vizName: 'H_R_Giger_Themanwhopaintsmonstersinthenight/EN',
      staticImageSrc: 'https://public.tableau.com/static/images/H_/H_R_Giger_Themanwhopaintsmonstersinthenight/EN/1_rss.png'
    }
  },

  
];

export default projects;

// 文档属性接口
export interface DocumentationProps {
  type: 'github' | 'custom';
  // GitHub 类型特有属性
  owner?: string;
  repo?: string;
  branch?: string;
  // 自定义内容类型特有属性
  content?: React.ReactNode;
  // 通用属性
  links?: ProjectLink[];
}

export interface ProjectLink {
  url: string;
  label: string;
}

