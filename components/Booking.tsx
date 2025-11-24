import React from 'react';
import { ClipboardCheck, CheckCircle2, ArrowRight, Shield, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingProps {
  onStartConsultation: () => void;
}

const Booking: React.FC<BookingProps> = ({ onStartConsultation }) => {
  const { t } = useLanguage();
  const stepIcons = [ClipboardCheck, Shield, CheckCircle2];

  return (
    <section id="contact" className="py-16 md:py-20 bg-brand-secondary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-primary rounded-full blur-[100px] md:blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-primary rounded-full blur-[100px] md:blur-[150px] opacity-30 -translate-x-1/3 translate-y-1/4"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary border border-brand-accent/20 text-brand-accent text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
            {t.booking.tag}
          </span>
          <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-4 md:mb-6">
            {t.booking.title}
          </h3>
          <p className="text-brand-accent/70 text-base md:text-lg leading-relaxed font-light max-w-2xl mx-auto">
            {t.booking.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10 md:mb-12 relative">
          <div className="absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent hidden md:block"></div>

          {t.booking.steps.map((step: any, idx: number) => {
            const Icon = stepIcons[idx];
            return (
              <div key={idx} className="relative bg-brand-primary/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center group hover:bg-brand-primary/50 transition-colors duration-500">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-brand-secondary border border-brand-accent/20 rounded-full flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-brand-primary/20">
                  <Icon className="text-brand-accent" size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-lg font-serif mb-2 text-white">{step.title}</h4>
                <p className="text-brand-accent/60 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 w-full sm:w-auto">
             <button 
              onClick={onStartConsultation}
              className="group relative w-full sm:w-auto px-10 py-5 bg-brand-accent text-brand-primary rounded-full font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(206,217,229,0.3)] hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {t.booking.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="text-brand-accent/40 text-xs flex items-center gap-1.5">
              <Lock size={12} />
              {t.booking.confidential}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
