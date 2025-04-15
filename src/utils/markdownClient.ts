import { marked } from 'marked';
import { Project } from '../types/project';

// 动态导入所有项目的 Markdown 文件
const projectFiles = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: false });

// 从文件名中提取ID
function getIdFromFilename(filePath: string): string {
  return filePath.split('/').pop()?.replace(/\.md$/, '') || '';
}

// 前端友好的 frontmatter 解析函数 - 保持所有值为字符串
function parseFrontMatter(content: string): { data: Record<string, any>; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const matches = content.match(frontMatterRegex);
  
  if (!matches) {
    return { data: {}, content };
  }
  
  const [, frontMatter, markdownContent] = matches;
  
  // 手动解析 YAML frontmatter
  const data: Record<string, any> = {};
  const lines = frontMatter.split('\n');
  
  lines.forEach(line => {
    // 跳过空行和注释
    if (!line.trim() || line.trim().startsWith('#')) return;
    
    // 处理键值对
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // 去除引号，但保持为字符串
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // 解析嵌套对象
      if (key.includes('Props')) {
        try {
          // 查找嵌套对象的起始位置
          const propsStart = content.indexOf(key + ':');
          if (propsStart !== -1) {
            // 寻找缩进块的结束
            let propsEnd = propsStart;
            let nextLine = content.indexOf('\n', propsStart);
            
            while (nextLine !== -1 && (
              content.substring(nextLine + 1).trim().startsWith(' ') || 
              content.substring(nextLine + 1).trim().startsWith('\t')
            )) {
              propsEnd = nextLine;
              nextLine = content.indexOf('\n', propsEnd + 1);
            }
            
            const propsYaml = content.substring(propsStart, propsEnd + 1);
            
            // 简单解析嵌套对象
            const props: Record<string, any> = {};
            const propLines = propsYaml.split('\n').slice(1); // 跳过第一行 (key:)
            
            propLines.forEach(propLine => {
              const trimmed = propLine.trim();
              if (!trimmed || trimmed.startsWith('#')) return;
              
              const propColonIndex = trimmed.indexOf(':');
              if (propColonIndex !== -1) {
                const propKey = trimmed.slice(0, propColonIndex).trim();
                let propValue = trimmed.slice(propColonIndex + 1).trim();
                
                // 去除引号，保持为字符串
                if ((propValue.startsWith('"') && propValue.endsWith('"')) || 
                   (propValue.startsWith("'") && propValue.endsWith("'"))) {
                  propValue = propValue.slice(1, -1);
                }
                
                props[propKey] = propValue;
              }
            });
            
            data[key] = props;
          }
        } catch (e) {
          console.error(`Error parsing ${key}:`, e);
          data[key] = {};
        }
      } else {
        // 所有值都保持为字符串
        data[key] = value;
      }
    }
  });
  
  return { data, content: markdownContent };
}

// 解析单个项目数据
export async function getProjectData(id: string): Promise<Project | null> {
  try {
    const filePath = `../content/projects/${id}.md`;
    
    if (!projectFiles[filePath]) {
      console.error(`Project file not found: ${id}`);
      return null;
    }
    
    // 动态导入 Markdown 内容
    const content = await projectFiles[filePath]();
    
    // 使用自定义 frontmatter 解析函数
    const { data, content: markdownContent } = parseFrontMatter(content);
    
    // 使用 marked 将 Markdown 转换为 HTML
    const contentHtml = marked.parse(markdownContent, { async: false });
    
    // 构建项目对象 - 添加 contentHtml
    const project: Project = {
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category,
      type: data.type,
      publishDate: data.publishDate,
      client: data.client,
      dataSource: data.dataSource,
      link: data.link,
      demoUrl: data.demoUrl,
      contentHtml: contentHtml,  // 添加这行
    };
    
    return project;
  } catch (error) {
    console.error(`Error loading project ${id}:`, error);
    return null;
  }
}

// 获取所有项目数据
export async function getAllProjects(): Promise<Project[]> {
  try {
    const entries = Object.entries(projectFiles);
    
    const projectsPromises = entries.map(async ([filePath]) => {
      const id = getIdFromFilename(filePath);
      return await getProjectData(id);
    });
    
    const projects = await Promise.all(projectsPromises);
    
    return projects
      .filter((project): project is Project => project !== null)
      .sort((a, b) => {
        // 将日期格式化为可比较的格式
        const dateA = new Date(a.publishDate.replace(/(\d{4})-(\d{2})$/, '$1-$2-01'));
        const dateB = new Date(b.publishDate.replace(/(\d{4})-(\d{2})$/, '$1-$2-01'));
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}