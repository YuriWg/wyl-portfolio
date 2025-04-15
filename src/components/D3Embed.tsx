import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

interface D3EmbedProps {
  previewImage: string;
  demoUrl?: string;
}

const D3Embed: React.FC<D3EmbedProps> = ({ previewImage, demoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['common']);

  // 监听容器宽度变化，动态调整高度
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // 可以在这里添加高度调整逻辑
      }
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  const safePreviewImage = previewImage || '/images/placeholder.png';

  // 处理在新窗口打开demo
  const handleOpenDemo = () => {
    if (demoUrl) {
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full relative" ref={containerRef}>
        {/* 切换按钮 */}
        {demoUrl && (
            <div className="flex justify-start mb-2">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="text-sm px-0 py-1 sticker-link-button"
            >
              {showDemo ? t('IMG') : t('DEMO')}
            </button>
            </div>
        )}

        {/* 主要内容区域 */}
        {(showDemo && demoUrl) ? (
            <>
            <iframe
              src={demoUrl}
              className="w-full border-0"
              style={{ height: '1000px', transform: 'scale(1)' }}
              title="D3 Visualization"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
              setError('可视化加载失败');
              setIsLoading(false);
              }}
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
              <div className="loading-spinner"></div>
              </div>
            )}
            </>
        ) : (
          <img 
            src={safePreviewImage}
            alt="D3 Visualization Preview"
            className="w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              console.error('预览图片加载失败:', previewImage);
              (e.target as HTMLImageElement).src = '/images/placeholder.png';
            }}
          />
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>

      {/* 跳转按钮 */}
      {demoUrl && (
        <div className="flex justify-end">
          <button
            onClick={handleOpenDemo}
            className="sticker-link-button"
          >
            <span>{t('View', { ns: 'project' })}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default D3Embed;