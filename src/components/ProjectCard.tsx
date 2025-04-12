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
  category?: string;
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
  category,

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
          <div className="flex gap-2">
        <span className="text-xs font-semibold bg-amber-500 text-white px-2 py-1 rounded-full">
          {t(`${type}`)}
        </span>
        <span className="text-xs font-semibold bg-black text-white px-2 py-1 rounded-full">
          {t(`${category || 'other'}`)}
        </span>
          </div>
        </div>

        <div className="mt-4 flex justify-start">
          <Link
            to={`/project/${id}`}
            className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-700 transition-colors duration-300 group"
          >
            {t('View Details')}
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;