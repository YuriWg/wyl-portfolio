import React, { useEffect, useState, useMemo } from 'react'; // 添加 useMemo
import { useTranslation } from 'react-i18next';
// import { useProjectList } from '../hooks/useProjects'; // 不再需要 projects 来生成筛选器

// Project 接口定义可以保留，虽然此组件不直接使用 projects
interface Project {
  id: string;
  title: string;
  category: string; // 预期父组件会处理这里的匹配 (例如，此值应为 'life', 'society' 等 key)
  type: string;
  filePath?: string;
}

interface FilterOption {
  id: string; // i18n key (e.g., 'all', 'life', 'tableau')
  label: string; // Translated label (e.g., '全部', '生活', 'TABLEAU')
}

interface ProjectFiltersProps {
  categoryFilter: string; // 当前选中的 category i18n key
  setCategoryFilter: (categoryKey: string) => void;
  toolFilter: string; // 当前选中的 tool i18n key
  setToolFilter: (toolKey: string) => void;
  loading?: boolean; // 从父组件接收 loading 状态，用于显示加载提示
}

// 筛选器选项的 i18n keys (确保与 common.json 文件一致！)
// 根据截图 zh/common.json (Image 6) 定义
const CATEGORY_KEYS = ['pkm', 'society', 'culture', 'life' ,'technology', 'other'];
const TOOL_KEYS = ['tableau', 'd3', 'python', 'obsidian', 'other'];

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  toolFilter,
  setToolFilter,
  loading // 接收 loading 状态
}) => {
  const { t, i18n } = useTranslation();

  // 使用 useMemo 优化选项生成，仅在语言或 t 函数变化时重新计算
  const categoryOptions = useMemo<FilterOption[]>(() => {
    console.log('计算类别选项，语言:', i18n.language);
    const options = [
      { id: 'all', label: t('categories.all') },
      ...CATEGORY_KEYS.map(key => ({
        id: key,
        label: t(`categories.${key}`) // 获取翻译
      }))
    ];
    console.log('生成的类别选项:', options);
    return options;
  }, [t, i18n.language]); // 依赖 t 和语言

  const toolOptions = useMemo<FilterOption[]>(() => {
    console.log('计算工具选项，语言:', i18n.language);
    const options = [
      // 直接使用 t 函数获取翻译，信任 JSON 文件中的大小写
      { id: 'all', label: t('tools.all') },
      ...TOOL_KEYS.map(key => {
        let label = t(`tools.${key}`); // 直接获取翻译
        // 检查翻译是否失败 (key 作为 fallback)
        const translationFailed = label.startsWith('tools.');
        if (translationFailed) {
          console.warn(`Translation missing for tools.${key}, using key as fallback.`);
          label = key; // 使用 key 作为 fallback
           // 可选：如果希望 fallback 的 key 在英文下也大写
           if (i18n.language === 'en') {
              if (key === 'd3') label = 'D3.js'; // 保留特殊处理
              else label = key.charAt(0).toUpperCase() + key.slice(1);
           }
        }
        return {
          id: key,
          label: label // 使用从 t() 获取的（或 fallback 的）标签
        };
      })
    ];
    console.log('生成的工具选项 (已简化):', options);
    return options;
  }, [t, i18n.language]); // 依赖 t 和语言

  // 状态现在可以直接使用计算好的选项
  const [categories, setCategories] = useState<FilterOption[]>(categoryOptions);
  const [tools, setTools] = useState<FilterOption[]>(toolOptions);

  // 当语言切换导致 re-render 时，更新状态
  useEffect(() => {
    setCategories(categoryOptions);
    setTools(toolOptions);
  }, [categoryOptions, toolOptions]); // 依赖计算好的选项

  // 为按钮生成随机旋转角度 (保持不变)
  const getRandomRotation = () => {
    return Math.floor(Math.random() * 3) - 1;
  };

  // 加载状态处理
  if (loading) {
    return <div className="text-center py-8">{t('loading.filters', '加载筛选器...')}</div>;
  }

  // --- Rendering Logic ---
  return (
    <div className="mb-8"> {/* 将整个组件的下边距从 mb-12 减小到 mb-8 */}
      {/* 分类过滤器 */}
      <div className="flex flex-wrap justify-center gap-3 mb-4"> {/* 将分类过滤器的下边距从 mb-8 减小到 mb-4 */}
        {categories.map((category) => {
           const displayLabel = category.label.startsWith('categories.') ? category.id : category.label;
           const isActive = categoryFilter === category.id;
           const rotation = getRandomRotation();

           return (
             <button
               key={category.id}
               // 使用 App.tsx 中的样式类名
               className={`sticker-button ${isActive ? 'sticker-button-active' : ''}`}
               style={{
                 transform: `rotate(${rotation}deg)`,
                 // 可以选择保留或移除这里的内联 box-shadow，取决于 sticker-button-active 是否包含阴影
                 // boxShadow: isActive ? '3px 3px 0 rgba(0,0,0,0.2)' : 'none'
               }}
               onClick={() => {
                 console.log(`设置类别筛选为 Key: ${category.id}`);
                 setCategoryFilter(category.id);
               }}
             >
               {displayLabel}
             </button>
           );
         })}
      </div>

      {/* 工具过滤器 */}
      <div className="flex flex-wrap justify-center gap-4"> 
        {tools.map((tool) => {
          const displayLabel = tool.label.startsWith('tools.') ? tool.id : tool.label;
          const isActive = toolFilter === tool.id;
          const rotation = getRandomRotation();

          return (
            <button
              key={tool.id}
              // 使用 App.tsx 中的样式类名
              className={`sticker-button-alt ${isActive ? 'sticker-button-alt-active' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                // 可以选择保留或移除这里的内联 box-shadow，取决于 sticker-button-alt-active 是否包含阴影
                // boxShadow: isActive ? '3px 3px 0 rgba(0,0,0,0.2)' : 'none'
              }}
              onClick={() => {
                console.log(`设置工具筛选为 Key: ${tool.id}`);
                setToolFilter(tool.id);
              }}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectFilters;