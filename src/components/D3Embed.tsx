import React, { useState } from 'react';

interface D3EmbedProps {
  sourceUrl: string;
  previewImageUrl?: string;
  width?: string;
  height?: string;
  isEmbeddable?: boolean;
}

const D3Embed: React.FC<D3EmbedProps> = ({
  sourceUrl,
  previewImageUrl,
  width = '100%',
  height = '1400px',
  isEmbeddable = false
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // 如果设置为可嵌入，尝试使用iframe
  if (isEmbeddable && !iframeError) {
    return (
      <div style={{ width, height, minHeight: '1400px', position: 'relative' }}>
        {/* 加载状态显示 */}
        {!iframeLoaded && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              zIndex: 1
            }}
          >
            <p>正在加载项目，请稍候...</p>
          </div>
        )}
        
        {/* iframe */}
        <iframe
          src={sourceUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px'
          }}
          sandbox="allow-scripts allow-same-origin" 
          onLoad={() => setIframeLoaded(true)}
          onError={() => setIframeError(true)}
        ></iframe>
      </div>
    );
  }
  
  // 如果不可嵌入或嵌入失败，显示替代内容
  return (
    <div 
      style={{
        width,
        height,
        minHeight: '1400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}
    >
      <p style={{ marginBottom: '20px' }}>
        {isEmbeddable ? 
          '无法在此页面嵌入项目，您可以点击下方按钮直接访问项目页面。' : 
          '此项目无法嵌入，请访问项目链接了解更多。'
        }
      </p>
      
      <a 
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        打开项目
      </a>
    </div>
  );
};

export default D3Embed;