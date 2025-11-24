import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const testimonials = [
  {
    quote: "Baumann&Co fue clave en la reorganización comercial de nuestra empresa, quien además de ayudarnos en generar un excelente y potente plan comercial, nos apoyó con su implementación y seguimiento para que este realmente funcione. Su apoyo y mentoria han sido claves para nuestro crecimiento y ahora ya estamos viendo nuevas alternativas de negocios, que seguro podrán ser reales en el corto plazo.",
    author: "José Manuel Silva",
    role: "CEO, Agrical",
    year: ""
  },
  {
    quote: "Manuel ha sido clave para ordenar nuestro enfoque comercial. Nos ayuda a detectar, estructurar y priorizar, nuevas oportunidades con claridad y cercanía. Su acompañamiento nos ha permitido avanzar con foco en el negocio y mejores resultados globales.",
    author: "Juan Pablo Silva",
    role: "Gerente General, Masterwise",
    year: ""
  }
];

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-4 block">
              {t.testimonials.tag}
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-primary">
              {t.testimonials.title} <span className="italic text-brand-grey">{t.testimonials.title_italic}</span>
            </h3>
          </div>

          <div className="relative bg-white border border-brand-accent/20 rounded-2xl p-8 md:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <div className="absolute top-8 left-8 md:top-12 md:left-12 text-brand-accent/30">
              <Quote size={64} fill="currentColor" stroke="none" />
            </div>

            <div className="relative z-10 text-center">
              <div className="min-h-[180px] flex items-center justify-center mb-8">
                <p className="text-lg md:text-xl font-serif text-brand-primary leading-relaxed italic">
                  "{testimonials[activeIndex].quote}"
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-4 text-brand-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <h4 className="font-bold text-brand-primary text-lg">{testimonials[activeIndex].author}</h4>
                <p className="text-brand-grey text-sm">{testimonials[activeIndex].role}</p>
              </div>
            </div>

            <div className="flex justify-between items-center absolute top-1/2 left-0 w-full px-4 md:px-8 -translate-y-1/2 pointer-events-none">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white border border-brand-accent/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm pointer-events-auto group cursor-pointer"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full bg-white border border-brand-accent/30 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-sm pointer-events-auto group cursor-pointer"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-accent/40 hover:bg-brand-accent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
