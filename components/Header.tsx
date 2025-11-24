import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onStartConsultation: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartConsultation }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.methodology, href: '#methodology' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-brand-accent/20 py-3 md:py-4 shadow-sm' 
          : 'bg-transparent py-4 md:py-8'
      }`}
    >
      <div className="container mx-auto px-5 md:px-6 lg:px-12 flex justify-between items-center">
        {/* Text Logo */}
        <a 
          href="#" 
          onClick={scrollToTop}
          className="group block shrink-0 z-50 relative"
        >
          <div className={`font-libre text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${
            isScrolled || isMobileMenuOpen ? 'text-brand-primary' : 'text-white'
          }`}>
            <span className="font-bold">Baumann</span>
            <span className="font-normal opacity-90">&</span>
            <span className="font-bold">Co.</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                  isScrolled 
                    ? 'text-brand-grey hover:text-brand-primary' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded transition-colors ${
              isScrolled 
                ? 'text-brand-primary hover:bg-brand-accent/20' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Globe size={14} />
            <span>{language === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <button 
            onClick={onStartConsultation}
            className={`px-4 lg:px-6 py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border flex items-center gap-2 whitespace-nowrap ${
              isScrolled 
                ? 'bg-brand-primary border-brand-primary text-white hover:bg-brand-secondary' 
                : 'bg-white text-brand-primary border-white hover:bg-brand-accent hover:border-brand-accent'
            }`}
          >
            {t.nav.cta}
            <ArrowRight size={14} />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors z-50 relative ${isScrolled || isMobileMenuOpen ? 'text-brand-primary' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col w-full px-8 gap-6 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-2xl font-serif font-medium text-brand-primary py-2 border-b border-brand-accent/10 hover:text-brand-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleLanguage}
            className="text-brand-primary font-medium flex items-center justify-center gap-2 py-2"
          >
            <Globe size={18} />
            {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          </button>

          <div className="h-4"></div>
          <button 
            onClick={() => {
              onStartConsultation();
              setIsMobileMenuOpen(false);
            }}
            className="bg-brand-primary text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-brand-secondary w-full flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20"
          >
            {t.nav.cta}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
