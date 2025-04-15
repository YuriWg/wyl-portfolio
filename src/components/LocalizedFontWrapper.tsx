import React, { useEffect, useRef, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { applyChineseFontToElements } from '../utils/fontUtils';

interface LocalizedFontWrapperProps {
  children: ReactNode;
  className?: string;
}

const LocalizedFontWrapper: React.FC<LocalizedFontWrapperProps> = ({ 
  children, 
  className = '' 
}) => {
  const { i18n } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const isZh = i18n.language.startsWith('zh');

  useEffect(() => {
    if (isZh && contentRef.current) {
      applyChineseFontToElements(contentRef.current);
    }
  }, [i18n.language, isZh]);

  const zhFontStyle = isZh
    ? { fontFamily: '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif' }
    : {};

  return (
    <div 
      ref={contentRef} 
      className={`${isZh ? 'font-chinese' : 'font-comic'} ${className}`}
      style={zhFontStyle}
    >
      {children}
    </div>
  );
};

export default LocalizedFontWrapper;