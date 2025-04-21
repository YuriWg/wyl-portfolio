import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Info, ArrowLeft, Calendar, Tag, FileText, ExternalLink, User, Database, Wrench, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TableauEmbed from '../components/TableauEmbed';
import D3Embed from '../components/D3Embed';
import { useProject } from '../hooks/useProjects';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/markdown.css';
import { getAssetPath } from '../utils/pathUtils';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation(['project', 'common']);
  const { project, loading, error, refetch } = useProject(id);
  const contentRef = useRef<HTMLDivElement>(null);
  const isZh = i18n.language.startsWith('zh');
  const previousProjectRef = useRef<string | null>(null);

  useEffect(() => {
    console.log('项目详情页状态:', {
      id,
      language: i18n.language,
      loading,
      error: error?.message,
      hasProject: !!project,
      routePath: window.location.pathname
    });
  }, [id, i18n.language, loading, error, project]);

  // 在项目详情页顶部添加以下调试代码
  useEffect(() => {
    console.log(`ProjectDetail mounted/updated: id=${id}, language=${i18n.language}`);
    return () => {
      console.log(`ProjectDetail unmounted: id=${id}, language=${i18n.language}`);
    };
  }, [id, i18n.language]);

  // 语言变化时重新获取数据
  useEffect(() => {
    if (id) {
      console.log('Language changed, refetching project data');
      refetch();
    }
  }, [i18n.language, id, refetch]);

  // 当项目加载成功后，保存当前项目ID
  useEffect(() => {
    if (project && project.id) {
      previousProjectRef.current = project.id;
    }
  }, [project]);

  useEffect(() => {
    if (project) {
      console.log('Project loaded:', project);
      document.title = `${project.title} | ${t('header.title', { ns: 'common' })}`;
      document.documentElement.lang = i18n.language;

      if (isZh && contentRef.current) {
        const allElements = contentRef.current.querySelectorAll('*');
        allElements.forEach(el => {
          (el as HTMLElement).style.fontFamily = '"Microsoft YaHei", "微软雅黑", SimHei, "黑体", sans-serif';
        });
      }
    }
  }, [project, t, i18n.language, isZh]);

  useEffect(() => {
    if (project) {
      console.log('项目加载成功:', {
        id,
        title: project.title,
        language: i18n.language,
        // 移除对 getProjectFileName 的调用，直接使用项目信息
        fileName: project.id
      });
    }
  }, [project, id, i18n.language]);


  // 如果正在加载，显示更详细的加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <div className="loader mb-4 mx-auto"></div>
            <p className="text-gray-600 mb-2">
              {t('loading', { ns: 'common' })}...
            </p>
            <p className="text-xs text-gray-400">
              {t('loadingProject', { ns: 'project' })} {id} ({i18n.language})
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 如果发生错误或没有数据，显示错误状态
  if (error || !project) {
    console.error('项目加载失败:', { id, error: error?.message });
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold mb-6">{t('notFound', { ns: 'project' })}</h1>
          <p className="text-gray-600 mb-8">
            {error?.message || t('projectLoadError', { ns: 'project' })}
          </p>
          <div className="space-y-4">
            <RouterLink to="/" className="text-blue-600 hover:underline flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>{t('Back', { ns: 'project' })}</span>
            </RouterLink>
            <button 
              onClick={() => refetch()} 
              className="text-amber-500 hover:text-amber-700 flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>{t('tryAgain', { ns: 'common' })}</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${isZh ? 'font-chinese' : 'font-comic'}`}>
      <Header />

      {/* 项目封面图 */}
      <div className="w-full h-[60vh] bg-gray-200 relative mt-16 overflow-hidden">
        {/* 背景模糊层 */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <img
            src={getAssetPath(project.image || '/images/placeholder.png')}
            alt=""
            className="w-full h-full object-cover scale-110"
            style={{ filter: 'blur(3px)' }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
          <h1
            className="text-4xl font-bold text-white text-center max-w-4xl px-6 sticker-title"
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      <div ref={contentRef} className="max-w-4xl mx-auto px-6 py-12" >
        <h2
          className={`sticker-detail-title flex items-center mb-4 ${isZh ? 'zh-text' : ''}`}
        >
          {t('Info')}
        </h2>
        <div className="sticker-showcase sticker-detail-card mb-12" >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('client', { ns: 'project' })}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">
                  {project.client || t('Self-initiated')}
                </p>
              </div>

              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Tag className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('categories', { ns: 'project' })}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">
                  {project.category}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Wrench className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('tools', { ns: 'project' })}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">
                  {project.type?.toUpperCase()}
                </p>
              </div>

              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Database className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('data', { ns: 'project' })}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">
                  {project.dataSource}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center text-gray-700 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-gray-900">{t('publishDate', { ns: 'project' })}</span>
                </div>
                <p className="text-gray-600 ml-7 font-normal bg-gray-50 py-1 px-2 rounded-md inline-block">
                  {project.publishDate}
                </p>
              </div>

              {project.link && (
                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-gray-900">{t('projectLinks', { ns: 'project' })}</span>
                  </div>
               </div>
              )}

              {project.link && (
                <div>
                  <div className="flex items-center text-gray-700 mb-2">
                    <LinkIcon className="w-5 h-5 mr-2" />
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {t('projectLinks', { ns: 'project' })}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="mb-12"
          style={{
          }}
          data-lang={isZh ? 'zh' : 'en'}
        >
          {project.contentHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: project.contentHtml }}
              className="markdown-content prose prose-lg max-w-none" // 添加 prose 类但覆盖最大宽度
            />
          ) : (
            <p className="w-full text-gray-600">
              {project.description}
            </p>
          )}
        </div>

        {/* 项目展示区域 - 根据项目类型使用不同组件 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">
            {t('showcase', { ns: 'project' })}
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {project.type === 'd3' ? (
              <D3Embed
                previewImage={getAssetPath(project.image || '/images/placeholder.png')} // 提供默认值
                demoUrl={project.demoUrl}
              />
            ) : (
              <TableauEmbed
                previewImage={getAssetPath(project.image || '/images/placeholder.png')} // 提供默认值
                demoUrl={project.demoUrl}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;