import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectEmbedProps } from './ProjectEmbed';

const TableauEmbed: React.FC<ProjectEmbedProps> = ({
  previewImage,
  demoUrl,
}) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const zhFontStyle = isZh
    ? {
        fontFamily: '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif',
      }
    : {};

  return (
    <div className="tableau-static-visualization w-full">
      {previewImage ? (
        <div className="tableau-image-container border border-gray-200 rounded-lg overflow-hidden">
          <img 
            src={previewImage} 
            alt="Visualization" 
            className="w-full object-contain mx-auto"
            style={{ maxWidth: '100%' }}
          />
        </div>
      ) : null}

      {demoUrl && (
        <div className="mt-4 flex justify-end">
          <a 
            href={demoUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="sticker-link-button"
            style={zhFontStyle}
          >
            <span>{t('View', { ns: 'project' })}</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default TableauEmbed;