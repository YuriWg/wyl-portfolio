/**
 * 处理资源路径，支持多平台部署
 * @param path 原始路径
 * @returns 处理后的路径
 */
export const getAssetPath = (path: string): string => {
  console.log('getAssetPath 输入:', path);
  
  // 处理空值或 undefined
  if (!path) {
    const defaultPath = import.meta.env.BASE_URL + 'images/placeholder.png';
    console.log('getAssetPath 使用默认路径:', defaultPath);
    return defaultPath;
  }
  
  // 如果路径已经是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 处理可能的引号
  let cleanPath = path.trim();
  if ((cleanPath.startsWith('"') && cleanPath.endsWith('"')) || 
      (cleanPath.startsWith("'") && cleanPath.endsWith("'"))) {
    cleanPath = cleanPath.substring(1, cleanPath.length - 1);
  }
  
  // 删除开头的斜杠以避免双斜杠问题
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  
  // 获取基础路径 (在不同环境中可能不同)
  const basePath = import.meta.env.BASE_URL || '/';
  
  // 确保基础路径以斜杠结尾
  const baseWithSlash = basePath.endsWith('/') ? basePath : `${basePath}/`;
  
  // 拼接最终路径
  const finalPath = `${baseWithSlash}${normalizedPath}`;
  
  console.log('getAssetPath 输出:', finalPath);
  return finalPath;
};