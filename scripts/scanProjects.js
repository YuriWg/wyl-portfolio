import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'public/content/projects');

async function scanProjects() {
  const config = {};
  
  // 扫描英文和中文目录
  for (const lang of ['en', 'zh']) {
    const langDir = path.join(CONTENT_DIR, lang);
    const files = fs.readdirSync(langDir);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const content = fs.readFileSync(path.join(langDir, file), 'utf-8');
      const { data } = parseMarkdownFrontMatter(content);
      
      // 使用文件名作为项目标识
      const projectId = path.basename(file, '.md');
      
      if (!config[projectId]) {
        config[projectId] = {};
      }
      
      config[projectId][lang] = {
        path: `projects/${lang}/${file}`,
        title: data.title,
        category: data.category
      };
    }
  }
  
  // 生成配置文件
  const configContent = `export const projectsConfig = ${JSON.stringify(config, null, 2)};`;
  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/projectsConfig.ts'),
    configContent
  );
  
  console.log('项目配置文件已更新');
}

scanProjects().catch(console.error);