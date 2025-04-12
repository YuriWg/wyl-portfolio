import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface GitHubReadmeProps {
  owner: string;
  repo: string;
  branch?: string;
}

const GitHubReadme: React.FC<GitHubReadmeProps> = ({ owner, repo, branch = 'main' }) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setIsLoading(true);
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
        }
        
        const markdown = await response.text();
        // 使用 marked.parse 确保返回字符串类型
        const html = marked.parse(markdown, { async: false }) as string;
        // 使用 DOMPurify 清理 HTML 以防止 XSS 攻击
        const cleanHtml = DOMPurify.sanitize(html);
        
        setContent(cleanHtml);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [owner, repo, branch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 py-4">加载失败: {error}</div>;
  }

  return (
    <div className="prose prose-gray max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default GitHubReadme;