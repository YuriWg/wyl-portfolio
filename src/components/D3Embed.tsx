import React from 'react';

interface D3EmbedProps {
  sourceUrl: string;
  previewImageUrl?: string;
  width?: string;
  height?: string;
  isEmbeddable?: boolean;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  dataSource?: string;
}

const D3Embed: React.FC<D3EmbedProps> = ({
  sourceUrl,
  previewImageUrl,
  width = '100%',
  height = '100%',
  isEmbeddable = false,
  title,
  description,
  link,
  linkText = "查看源代码",
  dataSource
}) => {
  return (
    <div className="viz-container bg-white rounded-lg shadow-sm p-6">
      {title && (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      
      <div className="mb-6">
        <div 
          className="viz-content bg-white rounded-lg overflow-hidden"
          style={{
            width,
            height : 'auto',
          }}
        >
          {previewImageUrl && (
            <img 
              src={previewImageUrl} 
              alt={title || "Project Preview"} 
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          
          {description && (
            <p className="text-gray-600 mb-4">{description}</p>
          )}
          
          {dataSource && (
            <div className="text-sm text-gray-500 mb-4">
              数据来源：{dataSource}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <a 
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sticker-link-button align-items-center "
        >
          Interactive Page
        </a>
        
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF9B26] hover:bg-[#ff8c00] text-white font-medium px-8 py-2 rounded-full transition-colors"
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
};

export default D3Embed;