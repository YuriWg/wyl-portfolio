import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../utils/pathUtils';  // 导入共享函数

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
  onClick?: () => void;
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
  className,
  category,
}) => {
  // 引用common和project命名空间
  const { t } = useTranslation(['common', 'project']);
  
  // 添加调试信息
  useEffect(() => {
    console.log('ProjectCard rendered:', { id, title, image });
  }, [id, title, image]);
  
  // 添加调试信息
  useEffect(() => {
    console.log('ProjectCard 类别信息:', { 
      id, 
      title, 
      category,
      type
    });
  }, [id, title, category, type]);
  
  // 格式化类型显示
  return (
    <div className="sticker-card">
      {/* 图片容器 */}
      <div className="sticker-card-image-container">
        <img 
          src={getAssetPath(image)}  // 使用共享函数
          alt={title} 
          className="sticker-card-image"
          onError={(e) => {
            console.error("卡片图片加载失败:", image);
            (e.target as HTMLImageElement).src = getAssetPath('images/placeholder.png');  // 使用共享函数
          }}
        />
      </div>
      
      {/* 内容区域 - 悬停时显示 */}
      <div className="sticker-card-content">
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS' }}>{title}</h3>
        <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: 'Comic Sans MS' }}>{description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500" style={{ fontFamily: 'Comic Sans MS' }}>{publishDate}</span>
          <div className="flex gap-2">
            <span 
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ 
                fontFamily: 'Comic Sans MS',
                background: '#FF9B26',
                color: 'white', 
                transform: 'rotate(-1deg)',
                border: '1px solid #FF9B26'
              }}
            >
               {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            {category && (
              <span 
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{ 
                  fontFamily: 'Comic Sans MS',
                  background: 'black',
                  color: 'white',
                  transform: 'rotate(1deg)',
                  border: '1px solid #000'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-start">
          <Link
            to={`/project/${id}`}
            className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-700 transition-colors duration-300 group"
            style={{ fontFamily: 'Comic Sans MS' }}
          >
            {t('View Details', { ns: 'project' })}
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