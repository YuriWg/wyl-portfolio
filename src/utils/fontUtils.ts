import { useTranslation } from 'react-i18next';

// 自定义hook，用于获取当前语言的字体样式
export const useLocalizedFont = () => {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const zhFontStyle = isZh
    ? { fontFamily: '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif' }
    : {};

  return {
    isZh,
    zhFontStyle,
    fontClass: isZh ? 'font-chinese' : 'font-comic'
  };
};

// 辅助函数，用于应用中文字体到DOM元素
export const applyChineseFontToElements = (parentElement: HTMLElement | null) => {
  if (!parentElement) return;
  
  const allElements = parentElement.querySelectorAll('*');
  allElements.forEach(el => {
    (el as HTMLElement).style.fontFamily = '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif';
  });
};