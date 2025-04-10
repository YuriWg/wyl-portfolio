import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, BarChart2, FileText, ExternalLink, User, Database, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TableauEmbed from '../components/TableauEmbed';
import D3Embed from '../components/D3Embed';
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
            {t('project.backToHome')}
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
          className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('project.backToHome')}</span>
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
        {/* 项目元数据 - 卡片式布局 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">{t('project.projectInfo')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 左侧列 */}
            <div className="space-y-6">
              {/* 客户端 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">{t('project.client')}</span>
                </div>
                <p className="text-gray-600 ml-6">{project.client || "Self-initiated"}</p>
              </div>
              
              {/* 分类 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="font-medium">{t('project.categories')}</span>
                </div>
                <p className="text-gray-600 ml-6">{t(`categories.${project.category}`)}</p>
              </div>
            </div>
            
            {/* 中间列 */}
            <div className="space-y-6">
              {/* 工具 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Wrench className="w-4 h-4 mr-2" />
                  <span className="font-medium">{t('project.tools')}</span>
                </div>
                <p className="text-gray-600 ml-6">{t(`types.${project.type}`)}</p>
              </div>
              
              {/* 数据 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Database className="w-4 h-4 mr-2" />
                  <span className="font-medium">{t('project.data')}</span>
                </div>
                <p className="text-gray-600 ml-6">{project.dataSource || "Various sources"}</p>
              </div>
            </div>
            
            {/* 右侧列 */}
            <div className="space-y-6">
              {/* 发布日期 */}
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">{t('project.publishDate')}</span>
                </div>
                <p className="text-gray-600 ml-6">{project.publishDate}</p>
              </div>
              
              {/* 链接 */}
              {project.link && (
                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span className="font-medium">{t('project.link')}</span>
                  </div>
                  <p className="text-gray-600 ml-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
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
            <p className="mt-6">
              {project.longDescription}
            </p>
          )}
        </div>

        {/* Tableau 可视化 */}
        {project.tableauProps && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('project.visualization')}</h2>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <TableauEmbed
                vizId={project.tableauProps.vizId}
                width={project.tableauProps.width || '100%'}
                height={project.tableauProps.height || '600px'}
                vizName={project.tableauProps.vizName || ''}
                staticImageSrc={project.tableauProps.staticImageSrc || ''}
              />
            </div>
          </div>
        )}

        {/* D3 可视化 */}
        {project.d3Props && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('project.visualization')}</h2>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <D3Embed
                sourceUrl={project.d3Props.sourceUrl}
                previewImageUrl={project.d3Props.previewImageUrl}
                width={project.d3Props.width || '100%'}
                height={project.d3Props.height || '1400px'}
                isEmbeddable={project.d3Props.isEmbeddable}
              />
            </div>
          </div>
        )}

        {/* 下载模板按钮 */}
        {project.downloadUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t('project.resources')}</h2>
            <a 
              href={project.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-5 h-5" />
              <span>{t('project.downloadTemplate')}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;