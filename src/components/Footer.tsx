import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation(['common']);
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="sticker-text-small">{t('footer.copyright', { ns: 'common' })} </p>
        <Link to="/about"></Link>
      </div>
    </footer>
  );
};

export default Footer;