import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project';
import { getProjects, getProjectById } from '../data/projects';

export const useProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProjects(i18n.language);
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProject = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();
  const prevLanguage = useRef(i18n.language);
  const prevId = useRef(id);

  const fetchProject = useCallback(async () => {
    if (!id) {
      setProject(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`加载项目:`, {
        id,
        language: i18n.language,
        previousLanguage: prevLanguage.current,
        currentTime: new Date().toISOString(),
        isLanguageChange: i18n.language !== prevLanguage.current,
        isIdChange: id !== prevId.current
      });

      prevLanguage.current = i18n.language;
      prevId.current = id;
      
      // 尝试获取项目数据
      const data = await getProjectById(id, i18n.language);
      
      if (data) {
        console.log('项目加载成功:', {
          id: data.id,
          title: data.title,
          language: i18n.language,
          type: data.type
        });
        setProject(data);
      } else {
        const errorMessage = `项目 ${id} 未找到`;
        console.error(errorMessage);
        setError(new Error(errorMessage));
        setProject(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      console.error('项目加载失败:', errorMessage);
      setError(err instanceof Error ? err : new Error(errorMessage));
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [id, i18n.language]);

  // 单独监听语言变化，确保即使其他依赖项不变也能触发重新加载
  useEffect(() => {
    console.log(`语言已变更为 ${i18n.language}，重新加载项目...`);
    fetchProject();
  }, [i18n.language, fetchProject]);

  return { project, loading, error, refetch: fetchProject };
};
