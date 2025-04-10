import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 hover:text-gray-600 transition-colors"
      aria-label="Switch language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitch;