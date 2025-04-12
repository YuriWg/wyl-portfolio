import React from 'react';

interface TableauEmbedProps {
  vizName: string;
  vizId: string;
  width?: string;
  height?: string;
  staticImageSrc?: string;
  link?: string;
  linkText?: string;
  title?: string;
  description?: string;
  options?: {
    hideTabs?: boolean;
    hideToolbar?: boolean;
    showShareOptions?: boolean;
    allowPopups?: boolean;
    device?: 'desktop' | 'tablet' | 'phone';
  };
}

const TableauEmbed: React.FC<TableauEmbedProps> = ({ 
  vizName,
  width = '100%',
  height = '800px',
  title,
  description,
  staticImageSrc,
  link,
  linkText = "Tableau Public"
}) => {
  return (
    <div className="viz-container bg-white rounded-lg shadow-sm p-6">
      {title && (
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      )}
      
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}

      <div className="tableau-container w-full">
        <img
          src={staticImageSrc}
          alt={title || "Tableau visualization"}
          className="w-full h-auto"
          style={{
            maxWidth: '100%',
            display: 'block'
          }}
        />
      </div>

      {link && (
        <div className="mt-4">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="sticker-link-button"
          >
            {linkText}
          </a>
        </div>
      )}
    </div>
  );
};

export default TableauEmbed;