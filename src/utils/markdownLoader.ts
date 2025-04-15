import { marked } from 'marked';
import { Project } from '../types/project';

// 添加 Buffer polyfill
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// 创建浏览器环境可用的 Buffer polyfill
const browserBuffer = {
  from: (data: string): Uint8Array => {
    return textEncoder.encode(data);
  },
  toString: (buffer: Uint8Array): string => {
    return textDecoder.decode(buffer);
  }
};

// 将函数改为异步处理
export async function processMarkdownContent(rawContent: string, id: string, language: string): Promise<Project> {
  try {
    console.log(`处理Markdown内容: ${id}, 语言: ${language}`);
    const { data, content } = parseFrontMatter(rawContent);
    
    // 使用 await 等待 marked 转换完成
    const contentHtml = await marked(content, {
      async: true,
      gfm: true,
      breaks: true
    });

    // 处理type字段 - 确保设置默认值并验证
    let projectType: 'd3' | 'tableau' = 'tableau'; // 默认为tableau
    
    if (data.type) {
      const typeVal = data.type.toLowerCase().trim();
      if (typeVal === 'd3' || typeVal === 'tableau') {
        projectType = typeVal as 'd3' | 'tableau';
      } else {
        console.warn(`非法type值: ${data.type}, 使用默认值"tableau"`);
      }
    } else {
      console.warn(`项目 ${id} 未指定type, 使用默认值"tableau"`);
    }
    
    // 确保使用前端数据中的ID，而不是覆盖它
    const numericId = data.id ? data.id.toString() : id;
    
    const project: Project = {
      id: numericId,
      title: data.title || '',
      description: data.description || '',
      image: data.image || '',
      category: data.category || '',
      type: projectType, // 使用已处理的type
      publishDate: data.publishDate || '',
      client: data.client || '',
      dataSource: data.dataSource || '',
      link: data.link || '',
      demoUrl: data.demoUrl || '',
      contentHtml,
      language,
      originalFileName: id // 添加原始文件名，用于跨语言查找
      ,
      filePath: ''
    };
    
    console.log(`Markdown处理完成:`, {
      id: project.id,
      title: project.title.substring(0, 20) + (project.title.length > 20 ? '...' : ''),
      type: project.type,
      originalId: id
    });
    
    return project;
  } catch (error) {
    console.error('Markdown处理失败:', error);
    throw error;
  }
}

// 自定义 front matter 解析函数
function parseFrontMatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  
  if (!match) {
    return { data: {}, content: content };
  }

  try {
    const yamlContent = match[1];
    const markdownContent = match[2];

    // 优化 YAML 解析 - 处理引号问题
    const data = yamlContent.split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        // 将所有分号后的内容重新组合为完整值
        let value = valueParts.join(':').trim();
        
        // 处理引号
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        
        acc[key.trim()] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    return { data, content: markdownContent };
  } catch (error) {
    console.error('Error parsing front matter:', error);
    return { data: {}, content: content };
  }
}

// loadProjectContent 函数替换为新的实现
export async function loadProjectContent(fileName: string, language: string = 'en'): Promise<Project | null> {
  try {
    const lang = language.startsWith('zh') ? 'zh' : 'en';
    const basePath = import.meta.env.BASE_URL || '/wyl-portfolio/';
    
    // 尝试直接加载文件
    let filePath = `${basePath}content/projects/${lang}/${fileName}.md`;
    console.log(`尝试加载文件(直接方式): ${filePath}`);
    
    let response = await fetch(filePath);
    
    // 如果文件不存在，尝试从索引中查找
    if (!response.ok) {
      console.log('直接加载失败，尝试从索引中查找...');
      const indexPath = `${basePath}content/projects/${lang}/index.json`;
      const indexResponse = await fetch(indexPath);
      
      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        const projectNames = indexData.projects || [];
        
        // 尝试在索引中匹配项目名称（不区分大小写）
        const foundIndex = projectNames.findIndex(
          (name: string) => name.toLowerCase() === fileName.toLowerCase()
        );
        
        if (foundIndex >= 0) {
          const exactName = projectNames[foundIndex];
          filePath = `${basePath}content/projects/${lang}/${exactName}.md`;
          console.log(`从索引中找到匹配项目: ${exactName}`);
          response = await fetch(filePath);
        } else if (/^\d+$/.test(fileName)) {
          // 如果是数字ID，直接使用索引位置
          const idx = parseInt(fileName) - 1;
          if (idx >= 0 && idx < projectNames.length) {
            const exactName = projectNames[idx];
            filePath = `${basePath}content/projects/${lang}/${exactName}.md`;
            console.log(`通过数字ID ${fileName} 找到项目: ${exactName}`);
            response = await fetch(filePath);
          }
        }
      }
    }
    
    if (!response.ok) {
      if (lang !== 'en') {
        // 尝试回退到英文版
        console.log('当前语言版本不存在，尝试加载英文版...');
        return await loadProjectContent(fileName, 'en');
      }
      
      throw new Error(`项目文件不存在: ${filePath}`);
    }
    
    const content = await response.text();
    const parsed = await processMarkdownContent(content, fileName, lang);
    
    // 确保ID字段正确
    if (/^\d+$/.test(fileName)) {
      // 如果文件名是数字，使用数字作为ID
      parsed.id = fileName;
    } else {
      // 否则查找对应的索引位置
      const indexPath = `${basePath}content/projects/${lang}/index.json`;
      const indexResponse = await fetch(indexPath);
      
      if (indexResponse.ok) {
        const indexData = await indexResponse.json();
        const projectNames = indexData.projects || [];
        
        // 不区分大小写查找
        const foundIndex = projectNames.findIndex(
          (name: string) => name.toLowerCase() === fileName.toLowerCase()
        );
        
        if (foundIndex >= 0) {
          parsed.id = (foundIndex + 1).toString();
        }
      }
    }
    
    return parsed;
  } catch (error) {
    console.error('加载项目内容失败:', error);
    return null;
  }
}