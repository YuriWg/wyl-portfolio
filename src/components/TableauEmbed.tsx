import React, { useEffect, useRef, useState } from 'react';

interface TableauEmbedProps {
  vizId: string;
  width: string;
  height: string;
  vizName: string;
  staticImageSrc: string;
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({ 
  vizId, 
  width = '100%', 
  height, 
  vizName,
  staticImageSrc 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentHeight, setContentHeight] = useState(height);
  const vizRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // 当图片加载完成时，获取其高度
    if (imgRef.current && imgRef.current.complete) {
      setContentHeight(`${imgRef.current.height}px`);
    }
  }, [staticImageSrc]);

  useEffect(() => {
    const loadTableauViz = () => {
      if (!vizRef.current) return;

      try {
        const url = `https://public.tableau.com/views/${vizName}`;
        const options = {
          hideTabs: true,
          width: '100%',
          height: contentHeight,
          onFirstInteractive: () => {
            setIsLoading(false);
            // 可视化加载完成后，可能需要调整高度
            if (vizRef.current) {
              const vizHeight = vizRef.current.offsetHeight;
              if (vizHeight > 0) {
                setContentHeight(`${vizHeight}px`);
              }
            }
          }
        };

        // @ts-ignore
        const viz = new window.tableau.Viz(vizRef.current, url, options);
      } catch (error) {
        console.error('Error loading Tableau visualization:', error);
        setIsLoading(false);
      }
    };

    const loadTableauAPI = () => {
      const scriptId = 'tableau-api';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        script.onload = loadTableauViz;
        document.body.appendChild(script);
      } else {
        loadTableauViz();
      }
    };

    loadTableauAPI();

    return () => {
      // 清理代码
    };
  }, [vizId, width, contentHeight, vizName]);

  // 图片加载完成时的处理函数
  const handleImageLoad = () => {
    if (imgRef.current) {
      setContentHeight(`${imgRef.current.height}px`);
    }
  };

  return (
    <div className="tableau-container relative w-full" style={{ maxWidth: '100%' }}>
      {isLoading && staticImageSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <img 
            ref={imgRef}
            src={staticImageSrc} 
            alt={vizName || 'Tableau visualization'} 
            className="max-w-full object-contain"
            onLoad={handleImageLoad}
            style={{ height: 'auto' }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="text-white text-center p-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p>加载可视化中...</p>
            </div>
          </div>
        </div>
      )}
      <div 
        ref={vizRef} 
        className="w-full"
        style={{ 
          height: contentHeight,
          maxWidth: '100%',
          visibility: isLoading ? 'hidden' : 'visible'
        }}
      ></div>
    </div>
  );
};

export default TableauEmbed;