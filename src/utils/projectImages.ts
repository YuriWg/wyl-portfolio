// 导入所有项目图片
import minimalism from '../assets/images/minimalism-preview.png';
import runningTracker from '../assets/images/running-tracker.png';
// 其他图片...

// 创建ID到图片的映射
export const projectImages: Record<string, string> = {
  '4': minimalism,
  '2': runningTracker,
  // 其他ID到图片的映射...
};

// 获取项目图片的辅助函数
export function getProjectImage(id: string | undefined, fallbackPath: string | undefined): string {
  if (!id) return fallbackPath || '';
  return projectImages[id] || fallbackPath || '';
}