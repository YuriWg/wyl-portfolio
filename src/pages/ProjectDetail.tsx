import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Info, ArrowLeft, Calendar, Tag,  FileText, ExternalLink, User, Database, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TableauEmbed from '../components/TableauEmbed';
import D3Embed from '../components/D3Embed';
import GitHubReadme from '../components/GitHubReadme';
import { projects, Project } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  
  useEffect(() => {
    const foundProject = projects.find(p => p.id.toString() === id);
    if (foundProject) {
      setProject(foundProject);
      document.title = `${foundProject.title} | ${t('header.title')}`;
    }
  }, [id, t]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('project.notFound')}</h1>
          <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{t('Back')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回首页按钮 */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="sticker-link-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('Back')}</span>
        </Link>
      </div>

      {/* 项目封面图 */}
      <div className="w-full h-[50vh] bg-gray-200 relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center max-w-4xl px-6">
            {project.title}
          </h1>
        </div>
      </div>

      {/* 项目信息部分 - 重新设计的布局 */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 项目元数据 */}
        <h2 className="sticker-detail-title flex items-center">
           {/* <Info className="w-5 h-5 mr-2" />*/}
            {t('Info')}
          </h2>
        <div className="sticker-detail-card mb-12">
      
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 左侧列 */}
            <div className="space-y-6">
              {/* 客户端 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('project.client')}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">{project.client || "Self-initiated"}</p>
              </div>
              
              {/* 分类 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Tag className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('project.categories')}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">{t(`categories.${project.category}`)}</p>
              </div>
            </div>
            
            {/* 中间列 */}
            <div className="space-y-6">
              {/* 工具 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Wrench className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('project.tools')}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">{t(`types.${project.type}`)}</p>
              </div>
              
              {/* 数据 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Database className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('project.data')}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">{project.dataSource || "Various sources"}</p>
              </div>
            </div>
            
            {/* 右侧列 */}
            <div className="space-y-6">
              {/* 发布日期 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('project.publishDate')}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">{project.publishDate}</p>
              </div>
              
              {/* 链接 */}
              {project.link && (
                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-gray-900">{t('project.link')}</span>
                  </div>
                  <p className="text-gray-600 ml-7">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline bg-gray-50 py-1 px-2 rounded-md inline-block"
                    >
                      {project.linkText || t('project.viewOriginal')}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 项目描述 */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl leading-relaxed">{project.description}</p>
          {project.longDescription && (
            <p className="mt-6">{project.longDescription}</p>
          )}
        </div>

        {/* 项目展示 - 统一使用一个展示区域 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t('Showcase')}</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Tableau 项目 */}
            {project.type === 'tableau' && project.tableauProps && (
              <div className="tableau-visualization">
                <TableauEmbed 
                  {...project.tableauProps}
                  width="100%"
                  height="800px"  // 设置一个合适的初始高度
                  vizName={project.tableauProps.vizName}
                  staticImageSrc={project.image}  // 使用项目封面图作为加载时的预览图
                  link={project.link}
                  linkText={project.linkText}
                />
              </div>
            )}

            {/* D3 项目 */}
            {project.type === 'd3' && project.d3Props && (
              <D3Embed {...project.d3Props} />
            )}

            {/* 其他类型项目 */}
            {project.type !== 'tableau' && project.type !== 'd3' && project.showcaseProps && (
              <>
                {project.showcaseProps.type === 'other' && (
                  <GitHubReadme
                    owner={project.showcaseProps.owner || ''}
                    repo={project.showcaseProps.repo || ''}
                    branch={project.showcaseProps.branch}
                  />
                )}
                {project.showcaseProps.type === 'custom' && project.showcaseProps.content && (
                  <div className="prose prose-gray max-w-none">
                    {project.showcaseProps.content}
                  </div>
                )}
              </>
            )}

            {/* 项目链接 */}
            {project.showcaseProps?.links && project.showcaseProps.links.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl font-semibold mb-4">{t('project.projectLinks')}</h3>
                <div className="flex flex-wrap gap-3">
                  {project.showcaseProps.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* 下载模板按钮 */}
        {project.downloadUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('project.resources')}</h2>
            <a 
              href={project.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#FF9B26] hover:bg-[#ff8c00] text-white font-medium px-8 py-2 rounded-full transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{t('project.downloadTemplate')}</span>
              </div>
            </a>
          </div>
        )}
      </div>
  );
};

export default ProjectDetail;