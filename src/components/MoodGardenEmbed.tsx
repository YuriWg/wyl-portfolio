import React, { useEffect, useRef } from 'react';

interface MoodGardenEmbedProps {
  width?: string;
  height?: string;
  sourceUrl?: string;
  imageUrl?: string; // 添加预览图选项
}

const MoodGardenEmbed: React.FC<MoodGardenEmbedProps> = ({
  width = '100%',
  height = '600px',
  sourceUrl,
  imageUrl
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 清空容器内容
    containerRef.current.innerHTML = '';

    // 如果项目已发布，使用iframe展示
    if (sourceUrl && sourceUrl.includes('github.io')) {
      const iframe = document.createElement('iframe');
      iframe.src = sourceUrl;
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.allow = 'fullscreen';
      
      containerRef.current.appendChild(iframe);
    } 
    // 否则显示预览图和链接到GitHub仓库
    else {
      const container = document.createElement('div');
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.textAlign = 'center';
      
      // 显示预览图（如有）
      if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '70%';
        img.style.objectFit = 'contain';
        img.style.marginBottom = '20px';
        img.alt = '心情花园可视化预览';
        container.appendChild(img);
      }
      
      // 显示项目未部署的提示
      const message = document.createElement('p');
      message.textContent = '项目开发中，尚未部署到线上环境';
      message.style.margin = '10px 0';
      message.style.fontSize = '16px';
      container.appendChild(message);
      
      // 提供访问GitHub仓库的链接
      if (sourceUrl) {
        const link = document.createElement('a');
        link.href = sourceUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = '查看 GitHub 项目代码';
        link.style.color = '#3b82f6';
        link.style.textDecoration = 'none';
        link.style.fontWeight = 'bold';
        link.style.padding = '8px 16px';
        link.style.borderRadius = '4px';
        link.style.border = '1px solid #3b82f6';
        link.style.marginTop = '10px';
        link.onmouseover = () => {
          link.style.backgroundColor = '#3b82f6';
          link.style.color = 'white';
        };
        link.onmouseout = () => {
          link.style.backgroundColor = 'transparent';
          link.style.color = '#3b82f6';
        };
        container.appendChild(link);
      }
      
      containerRef.current.appendChild(container);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [sourceUrl, imageUrl]);

  return (
    <div 
      ref={containerRef}
      style={{
        width,
        height,
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white'
      }}
    ></div>
  );
};

export default MoodGardenEmbed;