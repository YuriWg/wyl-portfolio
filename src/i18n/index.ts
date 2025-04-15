import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入英文翻译文件
import enCommon from './locales/en/common.json';
import enProject from './locales/en/project.json';
import enBlog from './locales/en/blog.json';
import enAbout from './locales/en/about.json';

// 导入中文翻译文件
import zhCommon from './locales/zh/common.json';
import zhProject from './locales/zh/project.json';
import zhBlog from './locales/zh/blog.json';
import zhAbout from './locales/zh/about.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        project: enProject,
        blog: enBlog,
        about: enAbout
      },
      zh: {
        common: zhCommon,
        project: zhProject,
        blog: zhBlog,
        about: zhAbout
      }
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'project', 'blog', 'about'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      // 存储用户选择的语言
      caches: ['localStorage'],
      // 查看URL参数lang=zh
      lookupQuerystring: 'lang',
    }
  });

export default i18n;