import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CALENDLY_LINK = "https://calendly.com/manuel-baumann-co/30min"; 

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);

  useEffect(() => {
    if (step === 2 && isQualified === true) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
      return () => { document.head.removeChild(script); };
    }
  }, [step, isQualified]);

  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in overflow-y-auto">
        <div className="md:w-1/3 bg-brand-primary p-12 text-white flex flex-col justify-between shrink-0 relative overflow-hidden">
          <div className="relative z-10">
            <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white mb-12 text-xs font-bold uppercase tracking-widest">
              <ChevronLeft size={16} /> {t.questionnaire.cancel}
            </button>
            <div className="mb-8">
              <h2 className="text-4xl font-serif mb-4">{t.diagnosis.title}</h2>
              <p className="text-brand-accent/70 font-light leading-relaxed">
                {t.diagnosis.subtitle}
              </p>
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            <h4 className="text-lg font-serif text-brand-accent">{t.diagnosis.get.title}</h4>
            {t.diagnosis.get.items.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-4 items-center">
                <CheckCircle2 className="text-brand-accent shrink-0" size={20} />
                <span className="text-sm font-light text-brand-accent/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-12 flex items-center justify-center bg-brand-accent/5">
          <div className="max-w-xl w-full bg-white p-12 rounded-3xl shadow-xl border border-brand-accent/20">
            <h3 className="text-3xl font-serif text-brand-primary mb-8 text-center">¿En qué etapa está su empresa?</h3>
            <p className="text-brand-grey text-center mb-10 font-light">Para agendar, confirme que cumple con el perfil:</p>
            
            <div className="space-y-4 mb-10">
               {t.fit.is_for.items.map((f: string) => (
                 <div key={f} className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="text-green-600" size={20} />
                    <span className="text-brand-primary font-medium">{f}</span>
                 </div>
               ))}
            </div>

            <button 
              onClick={() => { setIsQualified(true); setStep(2); }}
              className="w-full py-6 bg-brand-primary text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Continuar al calendario <ArrowRight size={20} />
            </button>
            <div className="flex items-center justify-center gap-2 mt-6 opacity-30">
               <p className="text-[10px] text-brand-grey uppercase tracking-widest font-bold">Diagnóstico ORCA™ · Protocolo Profesional</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in h-screen">
      <div className="p-4 bg-brand-primary text-white flex justify-between items-center shrink-0">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-brand-accent/60 hover:text-white text-xs font-bold uppercase tracking-widest">
           <ChevronLeft size={16} /> Volver
        </button>
        <div className="flex items-center gap-3">
          <h2 className="font-serif">Calendario de Disponibilidad</h2>
        </div>
        <button onClick={onBack} className="text-xs font-bold uppercase tracking-widest">Cerrar</button>
      </div>
      <div className="flex-1 w-full bg-white relative overflow-hidden">
        <div 
          className="calendly-inline-widget" 
          data-url={`${CALENDLY_LINK}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1B365D`}
          style={{ minWidth: '320px', height: '100%', width: '100%' }} 
        />
      </div>
    </div>
  );
};

export default Questionnaire;