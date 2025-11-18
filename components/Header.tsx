import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Metodología', href: '#methodology' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-brand-accent/20 py-4 shadow-sm' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Text Logo */}
        <a 
          href="#" 
          onClick={scrollToTop}
          className="group block"
        >
          <div className={`font-libre text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-brand-primary' : 'text-white'
          }`}>
            <span className="font-bold">Baumann</span>
            <span className="font-normal opacity-90">&</span>
            <span className="font-bold">Co.</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
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
          <a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border ${
              isScrolled 
                ? 'bg-brand-primary border-brand-primary text-white hover:bg-brand-secondary' 
                : 'bg-white text-brand-primary border-white hover:bg-brand-accent hover:border-brand-accent'
            }`}
          >
            Agendar Reunión
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-brand-primary' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-b border-brand-accent/20 md:hidden transition-all duration-300 ease-in-out origin-top ${
        isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
      }`}>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-lg font-medium text-brand-primary py-3 border-b border-brand-accent/20 hover:text-brand-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="mt-4 bg-brand-primary text-white text-center py-3 rounded-lg font-medium hover:bg-brand-secondary"
          >
            Agendar Consultoría
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;