import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartConsultation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartConsultation }) => {
  const { t } = useLanguage();

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-primary">
      {/* Background calm */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 grayscale"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
        }}
      ></div>
      <div className="absolute inset-0 bg-brand-primary/60"></div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl">
          
          <div className="inline-block mb-8 animate-fade-in">
            <span className="text-brand-accent text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border-b border-brand-accent/30 pb-1">
              {t.hero.tag}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.3] mb-10 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            {t.hero.title_1} <br />
            <span className="italic font-normal text-brand-accent/80">{t.hero.title_2}</span>
          </h1>
          
          <p className="text-brand-accent/70 text-base md:text-lg font-light max-w-2xl mb-12 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <button 
              onClick={onStartConsultation}
              className="px-10 py-5 bg-white text-brand-primary rounded-none font-bold text-xs tracking-widest uppercase transition-all hover:bg-brand-accent cursor-pointer"
            >
              <span className="flex items-center gap-3">
                {t.hero.cta_primary}
                <ChevronRight size={14} />
              </span>
            </button>
            
            <button 
              onClick={(e) => handleNavigation(e, 'methodology')}
              className="px-10 py-5 text-white font-bold text-xs tracking-widest uppercase border border-white/20 hover:bg-white/5 transition-all cursor-pointer"
            >
              {t.hero.cta_secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;