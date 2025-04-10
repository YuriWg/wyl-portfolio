import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  publishDate: string;
  downloadUrl?: string;
  onDownload?: (url: string) => void;
  tableauProps?: any;
  onViewTableau?: (props: any) => void;
  onClick?: () => void; // 添加 onClick 属性
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  type,
  publishDate,
  downloadUrl,
  onDownload,
  tableauProps,
  onViewTableau,
  className,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className={`${className}`}>
      {/* 图片容器 */}
      <div className="sticker-card-image-container">
        <img 
          src={image} 
          alt={title} 
          className="sticker-card-image"
        />
      </div>
      
      {/* 内容区域 - 悬停时显示 */}
      <div className="sticker-card-content">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{publishDate}</span>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {t(`types.${type}`)}
          </span>
        </div>

        <div className="mt-2 flex justify-left">
          <Link
            to={`/project/${id}`}
            className="text-sm bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;