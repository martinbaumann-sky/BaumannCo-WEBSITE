import React, { useState } from 'react';
import { ArrowRight, X, CheckCircle2, AlertCircle, ChevronLeft, Calendar, Building2, User, Clock, Briefcase, Target } from 'lucide-react';

// REEMPLAZA ESTE ENLACE CON EL DE TU CALENDARIO DE GOOGLE O CALENDLY
const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ABC_TU_LINK_REAL_AQUI?gv=true";

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // Fase 1: Dimensiones
    revenue: '',
    employees: '',
    // Fase 2: Rol y Tiempo
    role: '',
    timeline: '',
    // Fase 3: Contexto (NUEVO)
    industry: '',
    priority: '',
    // Fase 4: Identificación (Solo si califica)
    name: '',
    company: '',
    challenge: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // El filtro se ejecuta al final de la Fase 2
    if (step === 2) {
      // CRITERIOS DE FILTRO:
      // 1. Facturación menor a 1M -> Descalificado
      // 2. Cargo "Estudiante/Investigador" -> Descalificado
      if (formData.revenue === 'menos_1m' || formData.role === 'student') {
        setIsQualified(false);
        return; 
      } else {
        setIsQualified(true);
      }
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
          <h2 className="text-2xl font-serif text-brand-primary mb-4">Evaluación de Perfil</h2>
          <p className="text-brand-grey mb-8 leading-relaxed text-sm">
            Tras analizar los parámetros operativos proporcionados, hemos determinado que su organización se encuentra en una etapa distinta al foco estratégico de Baumann&Co.
            <br/><br/>
            Nuestra estructura de consultoría está optimizada para corporaciones de alta complejidad y escala financiera. Agradecemos su interés en nuestra firma.
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

  // Paso 5: Mostrar Calendario (Agenda)
  if (step === 5 && isQualified === true) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
        <div className="bg-brand-primary text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-brand-accent"/>
             </div>
             <div>
               <h2 className="font-serif text-lg">Coordinación de Sesión</h2>
               <p className="text-xs text-brand-accent/70">Seleccione un bloque horario disponible para la reunión.</p>
             </div>
          </div>
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 w-full h-full bg-brand-accent/10 relative">
          <iframe 
            src={GOOGLE_CALENDAR_LINK} 
            style={{ border: 0 }} 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Google Calendar"
          ></iframe>
          {GOOGLE_CALENDAR_LINK.includes("TU_LINK_REAL") && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white p-8 text-center pointer-events-none">
               <div>
                 <h3 className="text-2xl font-bold mb-2">Configuración Pendiente</h3>
                 <p>Inserte el enlace de Google Calendar Appointment Schedule en <code>components/Questionnaire.tsx</code></p>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in">
      {/* Sidebar / Progress */}
      <div className="md:w-1/3 bg-brand-primary p-8 md:p-12 flex flex-col justify-between text-white">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white transition-colors mb-12 text-xs font-bold uppercase tracking-widest">
            <ChevronLeft size={16} /> Cancelar proceso
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Evaluación Preliminar</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed text-sm">
            Este proceso valida la alineación entre sus requerimientos estratégicos y nuestras capacidades ejecutivas.
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: "Estructura Organizacional" },
            { id: 2, label: "Alcance y Temporalidad" },
            { id: 3, label: "Contexto Estratégico" },
            { id: 4, label: "Identificación del Caso" }
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

      {/* Form Area */}
      <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-lg">
          
          {/* Paso 1: Dimensiones */}
          {step === 1 && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Fase 1 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">Dimensiones Operativas</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Building2 size={16} />
                    Facturación Anual Global (USD)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'menos_1m', label: '< 1M USD' },
                      { value: '1m_10m', label: '1M - 10M USD' },
                      { value: '10m_50m', label: '10M - 50M USD' },
                      { value: 'mas_50m', label: '> 50M USD' }
                    ].map((opt) => (
                      <label key={opt.value} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.revenue === opt.value ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/40 hover:border-brand-primary/40'}`}>
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

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-brand-grey">Dotación de Colaboradores</label>
                  <select 
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary appearance-none text-sm"
                  >
                    <option value="">Seleccione rango</option>
                    <option value="1-10">1 - 10 colaboradores</option>
                    <option value="11-50">11 - 50 colaboradores</option>
                    <option value="51-200">51 - 200 colaboradores</option>
                    <option value="200+">200+ colaboradores</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.revenue || !formData.employees}
                className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
              >
                Siguiente Fase <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Paso 2: Rol y Tiempo */}
          {step === 2 && (
            <div className="animate-slide-up space-y-8">
               <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Fase 2 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">Perfil de Autoridad</h3>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <User size={16} />
                    Posición en la Organización
                  </label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Seleccione su cargo</option>
                    <option value="c-level">C-Level / Propietario / Directorio</option>
                    <option value="vp-director">Vicepresidente / Gerente División</option>
                    <option value="manager">Gerencia Media / Jefe de Área</option>
                    <option value="student">Analista / Estudiante / Académico</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Clock size={16} />
                    Horizonte de Implementación
                  </label>
                   <div className="grid grid-cols-1 gap-3">
                    {[
                        { val: 'inmediato', txt: 'Crítico / Inmediato (< 30 días)' }, 
                        { val: 'corto', txt: 'Corto Plazo (1-3 meses)' }, 
                        { val: 'mediano', txt: 'Planificación 2025 (3-6 meses)' }, 
                        { val: 'exploratorio', txt: 'Fase Exploratoria / Sin fecha' }
                    ].map((time) => (
                      <label key={time.val} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.timeline === time.val ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/40 hover:border-brand-primary/40'}`}>
                        <input 
                          type="radio" 
                          name="timeline"
                          value={time.val}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary accent-brand-primary"
                        />
                        <span className="ml-3 text-brand-primary text-sm">{time.txt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(1)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.role || !formData.timeline}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Validar Perfil <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Contexto Estratégico (NUEVO) */}
          {step === 3 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Fase 3 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">Contexto de Negocio</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Briefcase size={16} />
                    Sector Industrial
                  </label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Seleccione Industria</option>
                    <option value="mining">Minería y Recursos Naturales</option>
                    <option value="finance">Servicios Financieros / Banca</option>
                    <option value="retail">Retail y Consumo Masivo</option>
                    <option value="tech">Tecnología y Telecomunicaciones</option>
                    <option value="manufacturing">Manufactura e Industria</option>
                    <option value="health">Salud y Farmacéutica</option>
                    <option value="other">Otro Servicios Corporativos</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Target size={16} />
                    Prioridad Estratégica Principal
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Crecimiento y Expansión de Mercado",
                      "Eficiencia Operacional y Reducción de Costos",
                      "Transformación Digital y Datos",
                      "Gestión de Cambio Cultural / Talento",
                      "Fusiones, Adquisiciones o Finanzas"
                    ].map((prio) => (
                      <label key={prio} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.priority === prio ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/40 hover:border-brand-primary/40'}`}>
                        <input 
                          type="radio" 
                          name="priority"
                          value={prio}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary accent-brand-primary"
                        />
                        <span className="ml-3 text-brand-primary text-sm">{prio}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(2)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.industry || !formData.priority}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Continuar <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Contacto (Último paso antes de Agenda) */}
          {step === 4 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Pre-Calificación Exitosa
                </span>
                <h3 className="text-3xl font-serif text-brand-primary">Identificación del Caso</h3>
                <p className="text-brand-grey mt-2 text-sm leading-relaxed">
                  Su perfil cumple con nuestros criterios de elegibilidad. Complete la información final para acceder a la agenda de socios.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Nombre</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-brand-accent/5 border border-brand-accent/20 focus:bg-white focus:border-brand-primary outline-none rounded-md transition-all text-brand-primary text-sm"
                    />
                  </div>
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Razón Social</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 bg-brand-accent/5 border border-brand-accent/20 focus:bg-white focus:border-brand-primary outline-none rounded-md transition-all text-brand-primary text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Detalle del Desafío Estratégico</label>
                  <textarea 
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 bg-brand-accent/5 border border-brand-accent/20 focus:bg-white focus:border-brand-primary outline-none rounded-md transition-all text-brand-primary resize-none text-sm"
                    placeholder="Describa el objetivo central a abordar en la primera sesión..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(3)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.company || !formData.challenge}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Acceder a Agenda <Calendar size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Questionnaire;