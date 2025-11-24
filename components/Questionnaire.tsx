import React, { useState, useEffect } from 'react';
import { ArrowRight, X, CheckCircle2, AlertCircle, ChevronLeft, User, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CALENDLY_LINK = "https://calendly.com/manuel-baumann-co/30min"; 

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    role: '',
    revenue: '',
    employees: '',
  });

  useEffect(() => {
    if (step === 2 && isQualified === true) {
      const head = document.querySelector("head");
      const script = document.createElement("script");
      script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
      script.setAttribute("async", "true");
      head?.appendChild(script);

      return () => {
        if (head && script.parentNode === head) {
          head.removeChild(script);
        }
      };
    }
  }, [step, isQualified]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      const roleDiscard = formData.role === 'consultant' || formData.role === 'student';
      if (roleDiscard) {
        setIsQualified(false);
        return; 
      }
      setIsQualified(true);
    }
    setStep(step + 1);
  };

  if (isQualified === false) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-serif text-brand-primary mb-4">{t.questionnaire.disqualify.title}</h2>
          <p className="text-brand-grey mb-8 leading-relaxed text-sm">
            {t.questionnaire.disqualify.text_1} <strong>{t.questionnaire.disqualify.text_bold}</strong> {t.questionnaire.disqualify.text_2}
            <br/><br/>
            {t.questionnaire.disqualify.text_3}
          </p>
          <button 
            onClick={onBack}
            className="px-8 py-3 border border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-white transition-colors text-sm uppercase tracking-wide"
          >
            {t.questionnaire.disqualify.btn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in h-screen overflow-hidden">
      <div className="md:w-1/3 bg-brand-primary p-8 md:p-12 flex flex-col justify-between text-white shrink-0 overflow-y-auto hidden md:flex">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white transition-colors mb-12 text-xs font-bold uppercase tracking-widest">
            <ChevronLeft size={16} /> {t.questionnaire.cancel}
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">{t.questionnaire.title}</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed text-sm">
            {t.questionnaire.subtitle}
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: t.questionnaire.step1 },
            { id: 2, label: t.questionnaire.step2 }
          ].map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                step >= s.id ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'bg-transparent border-white/20 text-white/40'
              }`}>
                {step > s.id ? <CheckCircle2 size={16} /> : s.id}
              </div>
              <span className={`text-sm font-medium tracking-wide ${step >= s.id ? 'text-white' : 'text-white/40'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden w-full bg-brand-primary p-4 flex justify-between items-center text-white shrink-0 z-10 shadow-md">
         <span className="font-serif text-lg">{t.questionnaire.mob_step} {step} {t.questionnaire.mob_of} 2</span>
         <button onClick={onBack} className="p-1"><X size={24} /></button>
      </div>

      <div className={`flex-1 bg-white flex flex-col overflow-hidden`}>
        {step === 2 && isQualified === true ? (
           <div className="w-full h-full flex flex-col animate-slide-up p-0 md:p-0">
              <div className="p-4 md:p-6 bg-white border-b border-brand-accent/10 shrink-0 flex justify-between items-center">
                 <div>
                    <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-1 block">
                       {t.questionnaire.final_step}
                    </span>
                    <h3 className="text-lg md:text-2xl font-serif text-brand-primary">{t.questionnaire.select_time}</h3>
                 </div>
                 <a 
                    href={CALENDLY_LINK} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="md:hidden text-xs text-brand-primary underline font-medium"
                 >
                    Externo
                 </a>
              </div>

              <div className="flex-1 w-full bg-white relative overflow-y-auto">
                <div 
                  className="calendly-inline-widget" 
                  data-url={`${CALENDLY_LINK}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1B365D`}
                  style={{ minWidth: '320px', height: '100%', width: '100%' }} 
                />
              </div>
           </div>
        ) : (
          <div className="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg pb-20">
              {step === 1 && (
                <div className="animate-slide-up space-y-6 md:space-y-8">
                  <div>
                    <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">{t.questionnaire.mob_step} 1 {t.questionnaire.mob_of} 2</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-primary">{t.questionnaire.step1_title}</h3>
                    <p className="text-brand-grey text-sm mt-2">{t.questionnaire.step1_subtitle}</p>
                  </div>
                  
                  <div className="space-y-5 md:space-y-6">
                     <div className="space-y-2 md:space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                        <User size={16} />
                        {t.questionnaire.role_label}
                      </label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-base md:text-sm"
                      >
                        <option value="">{t.questionnaire.role_ph}</option>
                        <option value="owner">{t.questionnaire.roles.owner}</option>
                        <option value="manager">{t.questionnaire.roles.manager}</option>
                        <option value="consultant">{t.questionnaire.roles.consultant}</option>
                        <option value="student">{t.questionnaire.roles.student}</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                        <Building2 size={16} />
                        {t.questionnaire.rev_label}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { value: 'menos_500k', label: t.questionnaire.rev_opts.l500 },
                          { value: '500k_1m', label: t.questionnaire.rev_opts.m500 },
                          { value: '1m_10m', label: t.questionnaire.rev_opts.m1 },
                          { value: 'mas_10m', label: t.questionnaire.rev_opts.m10 }
                        ].map((opt) => (
                          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.revenue === opt.value ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/40 hover:border-brand-primary/40'}`}>
                            <input 
                              type="radio" 
                              name="revenue"
                              value={opt.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-brand-primary focus:ring-brand-primary accent-brand-primary"
                            />
                            <span className="ml-3 text-brand-primary text-sm font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="block text-sm font-medium text-brand-grey">{t.questionnaire.emp_label}</label>
                      <select 
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary appearance-none text-base md:text-sm"
                      >
                        <option value="">{t.questionnaire.emp_ph}</option>
                        <option value="1-10">{t.questionnaire.emp_opts.o1}</option>
                        <option value="11-50">{t.questionnaire.emp_opts.o11}</option>
                        <option value="51-200">{t.questionnaire.emp_opts.o51}</option>
                        <option value="200+">{t.questionnaire.emp_opts.o200}</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    disabled={!formData.role || !formData.revenue || !formData.employees}
                    className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs mt-4"
                  >
                    {t.questionnaire.btn_next} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
