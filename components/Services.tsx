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

  const icons = [BarChart3, Gavel, TrendingUp, ShieldCheck, Users, Layers];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-6 block">
            {t.services.tag}
          </span>
          <h3 className="text-3xl md:text-4xl font-serif text-brand-primary leading-[1.4] mb-8">
            {t.services.title_1} <br/>
            <span className="italic text-brand-grey/60 font-light">{t.services.title_2}</span>
          </h3>
          <p className="text-brand-grey text-lg max-w-xl font-light leading-relaxed">
             {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-brand-accent/20">
          {t.services.cards.map((service: any, index: number) => {
            const Icon = icons[index];
            return (
              <button 
                key={index}
                onClick={handleServiceClick}
                className="group p-10 md:p-12 border-r border-b border-brand-accent/20 text-left cursor-pointer transition-all hover:bg-brand-accent/10"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-brand-primary group-hover:scale-110 transition-transform duration-500">
                    <Icon size={28} strokeWidth={1} />
                  </div>
                  <ArrowUpRight className="text-brand-accent/40 group-hover:text-brand-primary transition-colors" size={18} />
                </div>
                
                <h4 className="text-xl font-serif text-brand-primary mb-4">{service.title}</h4>
                <p className="text-brand-grey font-light leading-relaxed text-sm">
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