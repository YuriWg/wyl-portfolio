// 创建一个ID到实际文件名的映射
interface ProjectMapping {
  id: string;
  fileName: {
    en: string;
    zh: string;
  };
  title: {
    en: string;
    zh: string;
  };
}

export const projectMappings: ProjectMapping[] = [
  {
    id: "1",
    fileName: {
      en: "Chinese Calligraphy Visualization",
      zh: "中国书法可视化"
    },
    title: {
      en: "Chinese Calligraphy Visualization",
      zh: "中国书法可视化"
    }
  },
  {
    id: "2",
    fileName: {
      en: "Carbon Neutrality",
      zh: "碳中和"
    },
    title: {
      en: "Carbon Neutrality",
      zh: "碳中和"
    }
  }
  // ... 其他项目
];

// 根据ID和语言获取文件名
export const getProjectFileName = (id: string, language: string): string => {
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  const project = projectMappings.find(p => p.id === id);
  return project?.fileName[lang] || id;
};

// 根据ID和语言获取标题
export const getProjectTitle = (id: string, language: string): string => {
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  const project = projectMappings.find(p => p.id === id);
  return project?.title[lang] || id;
};