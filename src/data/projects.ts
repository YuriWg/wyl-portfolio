import { Project, ProjectQueryParams } from '../types/project';
import { processMarkdownContent } from '../utils/markdownLoader';

// 项目缓存
const projectCache: Record<string, Record<string, Project>> = {
  en: {},
  zh: {}
};

// 获取项目列表 - 使用自动探测
export const getProjects = async (language: string = 'en'): Promise<Project[]> => {
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  console.log(`正在获取${lang}语言的项目列表`);

  try {
    // 获取有效的项目ID列表
    const projectIds = await getProjectIds(lang);
    
    if (projectIds.length === 0) {
      console.warn('未找到任何项目，返回空数组');
      return [];
    }
    
    console.log(`尝试加载 ${projectIds.length} 个项目: ${projectIds.join(', ')}`);
    
    // 加载项目内容
    const projectPromises = projectIds.map(id => loadProjectContent(id, lang));
    const projectResults = await Promise.all(projectPromises);
    
    // 过滤掉加载失败的项目
    const validProjects = projectResults.filter((p): p is Project => p !== null);
    console.log(`成功加载 ${validProjects.length} 个项目`);
    
    return validProjects;
  } catch (error) {
    console.error(`加载项目列表失败:`, error);
    return [];
  }
};

// 获取项目ID列表（直接使用index.json中的文件名）
async function getProjectIds(language: string): Promise<string[]> {
  const basePath = import.meta.env.BASE_URL || '/wyl-portfolio/';
  const indexPath = `${basePath}content/projects/${language}/index.json`;
  
  try {
    const indexResponse = await fetch(indexPath);
    if (!indexResponse.ok) {
      throw new Error('索引文件加载失败');
    }
    
    const indexData = await indexResponse.json();
    const fileNames = indexData.projects || [];
    console.log(`从${language}索引加载项目列表:`, fileNames);
    return fileNames;
  } catch (error) {
    console.error('加载项目索引失败:', error);
    return [];
  }
}

// 修改加载项目内容的函数
export async function loadProjectContent(fileName: string, language: string): Promise<Project | null> {
  try {
    const lang = language.startsWith('zh') ? 'zh' : 'en';
    const basePath = import.meta.env.BASE_URL || '/wyl-portfolio/';
    
    // 直接使用文件名加载
    const filePath = `${basePath}content/projects/${lang}/${fileName}.md`;
    console.log(`尝试加载文件:`, filePath);

    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`文件加载失败: ${response.status}`);
    }

    const content = await response.text();
    return await processMarkdownContent(content, fileName, lang);
  } catch (error) {
    console.error('加载项目内容失败:', error);
    return null;
  }
}

/**
 * 根据ID获取单个项目
 */
export const getProjectById = async (id: string | number, language: string = 'en'): Promise<Project | null> => {
  const lang = language.startsWith('zh') ? 'zh' : 'en';
  
  console.log(`开始获取项目, ID=${id}, 语言=${lang}`);

  try {
    // 1. 获取索引文件
    const basePath = import.meta.env.BASE_URL || '/wyl-portfolio/';
    const indexPath = `${basePath}content/projects/${lang}/index.json`;
    
    console.log(`加载索引文件: ${indexPath}`);
    const indexResponse = await fetch(indexPath);
    if (!indexResponse.ok) {
      console.error(`索引文件加载失败: ${indexResponse.status}`);
      return null;
    }
    
    const indexData = await indexResponse.json();
    const projects = indexData.projects || [];
    
    // 2. 确定实际的文件名
    let fileName: string;
    let numericId: number | null = null;
    
    // 尝试确定文件名
    if (/^\d+$/.test(id.toString())) {
      // 如果是数字ID (如 "1", "2"...), 从索引中获取相应位置的项目名
      const idx = parseInt(id.toString()) - 1;
      if (idx < 0 || idx >= projects.length) {
        console.error(`无效的数字ID: ${id}, 索引范围: 0-${projects.length-1}`);
        return null;
      }
      fileName = projects[idx];
      numericId = parseInt(id.toString());
      console.log(`数字ID ${id} 对应文件名: "${fileName}"`);
    } else {
      // 如果不是数字，假设已经是文件名
      // 不区分大小写查找
      const fileNameLower = id.toString().toLowerCase();
      const matchIndex = projects.findIndex((p: string) => p.toLowerCase() === fileNameLower);
      
      if (matchIndex === -1) {
        console.error(`项目文件 "${id}" 不在索引中`);
        return null;
      }
      
      // 使用索引中的准确文件名（保持大小写一致）
      fileName = projects[matchIndex];
      numericId = matchIndex + 1;
      console.log(`直接使用文件名: "${fileName}", 对应ID: ${numericId}`);
    }
    
    // 3. 加载项目文件
    const filePath = `${basePath}content/projects/${lang}/${fileName}.md`;
    console.log(`加载项目文件: ${filePath}`);
    
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`项目文件加载失败: ${response.status}`);
      
      // 如果当前不是英文，尝试回退到英文版本
      if (lang !== 'en') {
        console.log('尝试回退到英文版本...');
        return await getProjectById(numericId || id, 'en');
      }
      
      return null;
    }
    
    const content = await response.text();
    
    // 4. 处理内容，并确保设置正确的ID
    const project = await processMarkdownContent(content, fileName, lang);
    
    // 设置正确的数字ID
    if (numericId) {
      project.id = numericId.toString();
    }
    
    console.log(`项目加载成功:`, {
      id: project.id,
      title: project.title,
      language: lang,
      type: project.type,
      fileName: fileName
    });
    
    return project;
  } catch (error) {
    console.error(`项目加载失败:`, error);
    return null;
  }
};

/**
 * 清除项目缓存
 */
export const clearProjectCache = (language?: string) => {
  if (language) {
    const lang = language.startsWith('zh') ? 'zh' : 'en';
    projectCache[lang] = {};
  } else {
    Object.keys(projectCache).forEach(lang => {
      projectCache[lang] = {};
    });
  }
};

/**
 * 按条件筛选项目
 */
export const filterProjects = (
  projects: Project[], 
  params: ProjectQueryParams
): Project[] => {
  return projects.filter(project => {
    if (params.language && project.language !== params.language) return false;
    if (params.category && project.category !== params.category) return false;
    if (params.type && project.type !== params.type) return false;
    return true;
  });
};