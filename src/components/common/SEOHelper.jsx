// src/components/common/SEOHelper.jsx
import { useEffect } from 'react';
import { updateMetaTags } from '../../utils/seo';

const SEOHelper = ({ 
  title = "Natasha Hinga | Full-Stack Developer & CS Student",
  description = "Mathematics & Computer Science student at JKUAT building full-stack web and mobile applications.",
  image = "https://yourdomain.com/og-image.jpg"
}) => {
  useEffect(() => {
    updateMetaTags(title, description, image);
  }, [title, description, image]);
  
  return null; // This component doesn't render anything
};

export default SEOHelper;