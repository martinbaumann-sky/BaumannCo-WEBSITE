
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (view: 'privacy' | 'terms' | 'ethics' | 'home') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleLegalClick = (e: React.MouseEvent, view: 'privacy' | 'terms' | 'ethics') => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-[#1B365D] text-white/70 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col items-start gap-8 mb-16">
          <div className="mb-2">
            <Logo className="h-10 w-auto" variant="white" />
          </div>
          
          <p className="max-w-xl text-lg md:text-xl font-light text-brand-accent/60">
            {t.footer.desc}
          </p>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
             <button 
                onClick={(e) => handleLegalClick(e, 'privacy')} 
                className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t.footer.privacy}
              </button>
              <button 
                onClick={(e) => handleLegalClick(e, 'terms')} 
                className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t.footer.terms}
              </button>
              <button 
                onClick={(e) => handleLegalClick(e, 'ethics')} 
                className="hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t.footer.ethics}
              </button>
          </div>
          <p className="text-xs text-white/40 tracking-wide font-light">
            &copy; {new Date().getFullYear()} Baumann&Co Consulting. Baumann&Co. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
