import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartConsultation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartConsultation }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
      {/* Background with slight texture */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 grayscale mix-blend-overlay"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary via-brand-primary to-brand-primary"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Tagline con barras decorativas sutiles */}
          <div className="flex flex-col items-center mb-10 animate-[fadeIn_1.5s_ease-out]">
            <div className="flex items-center justify-center gap-4 opacity-60">
              <div className="h-px w-12 bg-brand-accent/40"></div>
              <span className="text-brand-accent text-xs font-bold tracking-[0.6em] uppercase">
                Baumann & Co. · Consulting
              </span>
              <div className="h-px w-12 bg-brand-accent/40"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-8 animate-[fadeInUp_1s_ease-out] whitespace-nowrap">
            {t.hero.headline}
          </h1>
          
          <p className="text-xl md:text-2xl font-serif italic text-brand-accent/90 mb-12 animate-[fadeInUp_1s_ease-out_0.2s_both] tracking-wide max-w-3xl mx-auto">
            {t.hero.subheadline}
          </p>

          <p className="text-brand-accent/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed animate-[fadeInUp_1s_ease-out_0.4s_both]">
            {t.hero.description}
          </p>
          
          <div className="animate-[fadeInUp_1s_ease-out_0.6s_both]">
            <button 
              onClick={onStartConsultation}
              className="px-14 py-6 bg-white text-brand-primary rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:bg-brand-accent hover:-translate-y-1 shadow-2xl flex items-center gap-5 mx-auto"
            >
              {t.hero.cta}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;