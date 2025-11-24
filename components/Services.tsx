import React from 'react';
import { BarChart3, Users, Gavel, Layers, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const handleServiceClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const icons = [Gavel, TrendingUp, Layers, Users, ShieldCheck, BarChart3];

  return (
    <section id="services" className="py-16 md:py-20 bg-brand-accent/5 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-3 md:mb-4 block opacity-80">
              {t.services.tag}
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-primary leading-tight">
              {t.services.title_1} <br/>
              <span className="italic text-brand-grey font-light">{t.services.title_2}</span>
            </h3>
          </div>
          <p className="text-brand-grey text-base md:text-lg max-w-md leading-relaxed">
             {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.services.cards.map((service: any, index: number) => {
            const Icon = icons[index];
            return (
              <button 
                key={index}
                onClick={handleServiceClick}
                className="group bg-white p-6 md:p-8 rounded-2xl border border-brand-accent/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(27,54,93,0.1)] hover:-translate-y-1 transition-all duration-500 ease-out hover:border-brand-primary/30 text-left cursor-pointer w-full active:scale-[0.98]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="text-brand-accent group-hover:text-brand-primary transition-colors" size={20} />
                </div>
                
                <h4 className="text-lg md:text-xl font-semibold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors">{service.title}</h4>
                <p className="text-brand-grey leading-relaxed text-sm">
                  {service.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
