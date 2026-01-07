import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

interface HeaderProps {
  onStartConsultation: () => void;
  onNavigate: (view: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onStartConsultation, onNavigate }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, view: 'about' },
    { name: t.nav.method, view: 'method' },
    { name: t.nav.services, view: 'services' },
  ];

  const headerBaseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
  const headerStateClasses = isMobileMenuOpen 
    ? "bg-white" 
    : isScrolled 
      ? "bg-white/95 backdrop-blur-lg border-b border-brand-accent/20 shadow-sm" 
      : "bg-transparent";
  
  const headerPaddingClasses = isScrolled ? "py-3" : "py-6";
  const logoVariant = isScrolled || isMobileMenuOpen ? 'standard' : 'white';

  return (
    <header className={`${headerBaseClasses} ${headerStateClasses} ${headerPaddingClasses}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={() => onNavigate('home')} 
          className="z-50 cursor-pointer flex items-center"
        >
          {/* Aumentamos el alto disponible para que el logo se vea bien */}
          <Logo className="h-8 md:h-10 lg:h-12" variant={logoVariant} />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.view} 
              onClick={() => onNavigate(link.view)}
              className={`text-sm font-medium tracking-wide transition-all ${
                isScrolled ? 'text-brand-grey hover:text-brand-primary' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}

          <button 
            onClick={onStartConsultation}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border flex items-center gap-2 ${
              isScrolled 
                ? 'bg-brand-primary border-brand-primary text-white hover:bg-brand-secondary' 
                : 'bg-white text-brand-primary border-white hover:bg-brand-accent'
            }`}
          >
            {t.nav.cta}
            <ArrowRight size={14} />
          </button>
        </nav>

        <button 
          className={`md:hidden p-2 z-50 ${isScrolled || isMobileMenuOpen ? 'text-brand-primary' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 md:hidden flex flex-col p-8 pt-24 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.view} 
              onClick={() => { onNavigate(link.view); setIsMobileMenuOpen(false); }}
              className="text-2xl font-serif text-brand-primary text-left border-b border-brand-accent/10 pb-4"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => { onStartConsultation(); setIsMobileMenuOpen(false); }}
            className="bg-brand-primary text-white py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 mt-4"
          >
            {t.nav.cta}
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;