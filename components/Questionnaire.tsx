import React, { useState, useEffect } from 'react';
import { ArrowRight, X, CheckCircle2, AlertCircle, ChevronLeft, User, Building2 } from 'lucide-react';

// ---------------------------------------------------------------------------
// CONFIGURACIÓN DE CALENDLY
// ---------------------------------------------------------------------------
const CALENDLY_LINK = "https://calendly.com/manuel-baumann-co/30min"; 

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // Paso 1: Perfil Clave (Filtros)
    role: '',
    revenue: '',
    employees: '',
  });

  // Efecto para cargar Calendly cuando se llega al paso de agenda (ahora Paso 2)
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
    // --- LÓGICA DE LEAD SCORING ---

    if (step === 1) {
      // Lógica de Filtro de Rol:
      // 1. Consultor/Estudiante: DESCARTAR
      // 2. Los demás pasan.
      const roleDiscard = formData.role === 'consultant' || formData.role === 'student';

      if (roleDiscard) {
        setIsQualified(false);
        return; 
      }
      setIsQualified(true);
    }
    
    setStep(step + 1);
  };

  // Pantalla de Descalificación
  if (isQualified === false) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-serif text-brand-primary mb-4">No somos el socio adecuado hoy</h2>
          <p className="text-brand-grey mb-8 leading-relaxed text-sm">
            Muchas gracias por tu interés. En Baumann&Co nos enfocamos exclusivamente en trabajar directamente con <strong>socios y gerentes generales</strong> en temas de estructura y gestión integral.
            <br/><br/>
            Según tus respuestas, parece que tu rol actual no calza con nuestro modelo de intervención directa con tomadores de decisión final.
          </p>
          <button 
            onClick={onBack}
            className="px-8 py-3 border border-brand-primary text-brand-primary rounded-full font-medium hover:bg-brand-primary hover:text-white transition-colors text-sm uppercase tracking-wide"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in h-screen overflow-hidden">
      {/* Sidebar / Progress - Hidden on Mobile */}
      <div className="md:w-1/3 bg-brand-primary p-8 md:p-12 flex flex-col justify-between text-white shrink-0 overflow-y-auto hidden md:flex">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white transition-colors mb-12 text-xs font-bold uppercase tracking-widest">
            <ChevronLeft size={16} /> Cancelar
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Perfilamiento</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed text-sm">
            Validación rápida para asegurar que podemos aportar valor real a tu negocio.
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: "Perfil de Empresa" },
            { id: 2, label: "Agendar Sesión" }
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

      {/* Mobile Header (Only visible on mobile) */}
      <div className="md:hidden w-full bg-brand-primary p-4 flex justify-between items-center text-white shrink-0 z-10 shadow-md">
         <span className="font-serif text-lg">Paso {step} de 2</span>
         <button onClick={onBack} className="p-1"><X size={24} /></button>
      </div>

      {/* Content Area */}
      <div className={`flex-1 bg-white flex flex-col overflow-hidden`}>
        
        {/* Paso 2: Agendamiento (Calendly Integration) */}
        {step === 2 && isQualified === true ? (
           <div className="w-full h-full flex flex-col animate-slide-up p-0 md:p-0">
              <div className="p-4 md:p-6 bg-white border-b border-brand-accent/10 shrink-0 flex justify-between items-center">
                 <div>
                    <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-1 block">
                       Paso Final
                    </span>
                    <h3 className="text-lg md:text-2xl font-serif text-brand-primary">Selecciona tu horario</h3>
                 </div>
                 <a 
                    href={CALENDLY_LINK} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="md:hidden text-xs text-brand-primary underline font-medium"
                 >
                    Abrir externo
                 </a>
              </div>

              <div className="flex-1 w-full bg-white relative overflow-y-auto">
                {/* Calendly Inline Widget Container */}
                {/* Se eliminaron los parámetros de pre-relleno (name, a1) ya que no pedimos datos */}
                <div 
                  className="calendly-inline-widget" 
                  data-url={`${CALENDLY_LINK}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1B365D`}
                  style={{ minWidth: '320px', height: '100%', width: '100%' }} 
                />
              </div>
           </div>
        ) : (
          /* Paso 1: Formulario de Perfil */
          <div className="w-full h-full overflow-y-auto p-6 md:p-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg pb-20">
              {step === 1 && (
                <div className="animate-slide-up space-y-6 md:space-y-8">
                  <div>
                    <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 1 de 2</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-primary">Datos Clave</h3>
                    <p className="text-brand-grey text-sm mt-2">Para asegurarnos de que somos el socio correcto.</p>
                  </div>
                  
                  <div className="space-y-5 md:space-y-6">
                     {/* Rol */}
                     <div className="space-y-2 md:space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                        <User size={16} />
                        Tu Cargo Actual
                      </label>
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-base md:text-sm" // text-base evita zoom en iOS
                      >
                        <option value="">Selecciona tu rol</option>
                        <option value="owner">Dueño / Socio / Gerente General</option>
                        <option value="manager">Gerente Comercial / Gerente de Área</option>
                        <option value="consultant">Consultor Externo / Agencia</option>
                        <option value="student">Estudiante / Investigando</option>
                      </select>
                    </div>

                    {/* Ventas */}
                    <div className="space-y-2 md:space-y-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                        <Building2 size={16} />
                        Ventas Anuales (Aprox USD)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { value: 'menos_500k', label: '< USD 500k' },
                          { value: '500k_1m', label: 'USD 500k - 1M' },
                          { value: '1m_10m', label: 'USD 1M - 10M' },
                          { value: 'mas_10m', label: '> USD 10M' }
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

                    {/* Equipo */}
                    <div className="space-y-2 md:space-y-3">
                      <label className="block text-sm font-medium text-brand-grey">Tamaño del equipo</label>
                      <select 
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="w-full p-3 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary appearance-none text-base md:text-sm"
                      >
                        <option value="">Selecciona</option>
                        <option value="1-10">1 - 10 personas</option>
                        <option value="11-50">11 - 50 personas</option>
                        <option value="51-200">51 - 200 personas</option>
                        <option value="200+">+200 personas</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    disabled={!formData.role || !formData.revenue || !formData.employees}
                    className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs mt-4"
                  >
                    Ver disponibilidad <ArrowRight size={16} />
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