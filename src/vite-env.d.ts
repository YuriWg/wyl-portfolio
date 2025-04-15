/// <reference types="vite/client" />

// 声明可以导入 Markdown 文件
declare module '*.md' {
  const content: string;
  export default content;
}

// 扩展 ImportMeta 接口
interface ImportMeta {
  readonly env: {
    [key: string]: string | boolean | undefined;
    BASE_URL: string;
    MODE: string;
    DEV: boolean;
    PROD: boolean;
    SSR: boolean;
  };
  readonly glob: (
    pattern: string, 
    options?: { 
      as?: string; 
      eager?: boolean 
    }
  ) => Record<string, () => Promise<any>>;
}
