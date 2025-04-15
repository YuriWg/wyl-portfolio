import React from 'react';

// 添加 originalFileName 字段到 Project 接口
export interface Project {
  filePath: string;
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  type: 'd3' | 'tableau';
  publishDate: string;
  client: string;
  dataSource: string;
  link: string;
  demoUrl: string;
  contentHtml?: string;
  language: string;
  originalFileName?: string; // 添加这一行
}

// 其他接口保持不变
// 添加项目列表类型
export type ProjectList = Project[];

// 添加项目查询参数类型
export interface ProjectQueryParams {
  language?: string;
  category?: string;
  type?: string;
}