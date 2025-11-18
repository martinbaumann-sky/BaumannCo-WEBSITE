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
    // Fase 3: Contexto
    industry: '',
    pain_point: '',
    // Fase 4: Identificación
    name: '',
    company: '',
    challenge: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // --- LÓGICA DE LEAD SCORING (CRITERIOS ESTRICTOS) ---

    if (step === 2) {
      // 1. Ventas Anuales:
      //    - < USD 500K: DESCARTAR
      //    - 500K - 1M: MEDIA (Aceptable)
      //    - > 1M: ALTA (Ideal)
      const revenueDiscard = formData.revenue === 'menos_500k';
      
      // 2. Rol del contacto:
      //    - Dueño/Gerente: ALTA
      //    - Subgerente: MEDIA
      //    - Consultor/Estudiante: DESCARTAR
      const roleDiscard = formData.role === 'consultant' || formData.role === 'student';

      if (revenueDiscard || roleDiscard) {
        setIsQualified(false);
        return; 
      } else {
        setIsQualified(true); // Pasa provisionalmente
      }
    }

    if (step === 3) {
       // 3. Dolor Percibido:
       //    - "Ventas dependen de mí" / "Sin control": ALTA
       //    - "Mejorar marketing": MEDIA
       //    - "Solo branding/seguidores": DESCARTAR
       if (formData.pain_point === 'branding_only') {
          setIsQualified(false);
          return;
       }
    }
    
    setStep(step + 1);
  };

  // Pantalla de Descalificación (Mensaje educado pero firme)
  if (isQualified === false) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-serif text-brand-primary mb-4">No somos el socio adecuado hoy</h2>
          <p className="text-brand-grey mb-8 leading-relaxed text-sm">
            Muchas gracias por su interés. En Baumann&Co nos especializamos exclusivamente en empresas consolidadas (Ventas sobre USD 1M) que requieren reestructuración corporativa.
            <br/><br/>
            Según sus respuestas, su etapa actual requiere otro tipo de apoyo (posiblemente agencias de marketing digital o mentores de emprendimiento). Preferimos ser honestos para no hacerle perder tiempo.
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
               <h2 className="font-serif text-lg">Sesión de Estrategia</h2>
               <p className="text-xs text-brand-accent/70">Reserve su hora con un socio director.</p>
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
                 <h3 className="text-2xl font-bold mb-2">Calendario no vinculado</h3>
                 <p>Debe insertar su enlace de "Google Appointment Schedule" en el código.</p>
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
            <ChevronLeft size={16} /> Cancelar
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Validación Rápida</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed text-sm">
            Solo trabajamos con empresas donde sabemos que podemos generar un retorno de 10x sobre nuestra tarifa. Estas preguntas nos ayudan a saber si somos compatibles.
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: "Tamaño del Negocio" },
            { id: 2, label: "Su Rol" },
            { id: 3, label: "Dolor Principal" },
            { id: 4, label: "Datos Finales" }
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
          
          {/* Paso 1: Dimensiones (Ventas y Empleados) */}
          {step === 1 && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 1 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">Volumen de Venta</h3>
                <p className="text-brand-grey text-sm mt-2">Para entender la complejidad de su operación.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Building2 size={16} />
                    Ventas Anuales (USD)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'menos_500k', label: 'Menos de USD 500k (Pequeña / Inicial)' },
                      { value: '500k_1m', label: 'USD 500k - 1M (En crecimiento)' },
                      { value: '1m_10m', label: 'USD 1M - 10M (Mediana consolidada)' },
                      { value: '10m_20m', label: 'USD 10M - 20M (Mediana grande)' },
                      { value: 'mas_20m', label: 'Más de USD 20M (Corporativo)' }
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
                  <label className="block text-sm font-medium text-brand-grey">Cantidad de Empleados</label>
                  <select 
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary appearance-none text-sm"
                  >
                    <option value="">Seleccione rango</option>
                    <option value="1-10">1 - 10 personas</option>
                    <option value="11-30">11 - 30 personas</option>
                    <option value="31-100">31 - 100 personas</option>
                    <option value="101-200">101 - 200 personas</option>
                    <option value="200+">Más de 200</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.revenue || !formData.employees}
                className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
              >
                Siguiente <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Paso 2: Rol */}
          {step === 2 && (
            <div className="animate-slide-up space-y-8">
               <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 2 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">¿Quién eres?</h3>
                <p className="text-brand-grey text-sm mt-2">Nuestras soluciones requieren decisión de alto nivel.</p>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <User size={16} />
                    Su Cargo
                  </label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Seleccione su rol</option>
                    <option value="owner">Dueño / Socio / Gerente General (Decisor)</option>
                    <option value="manager">Gerente Comercial / Subgerente</option>
                    <option value="consultant">Consultor Externo / Agencia</option>
                    <option value="student">Estudiante / Otro</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Clock size={16} />
                    Nivel de Urgencia
                  </label>
                   <div className="grid grid-cols-1 gap-3">
                    {[
                        { val: 'urgente', txt: 'Alta: Estamos estancados y necesitamos cambios ya.' }, 
                        { val: 'corto', txt: 'Media: Planificando para el próximo trimestre.' }, 
                        { val: 'largo', txt: 'Baja: Solo estoy explorando ideas.' }, 
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
                  Siguiente <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Dolor Principal (Filtro Final) */}
          {step === 3 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 3 de 4</span>
                <h3 className="text-3xl font-serif text-brand-primary">¿Qué te duele hoy?</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Target size={16} />
                    Selecciona la frase que mejor te identifica:
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { val: "dependence", txt: "Las ventas dependen de mí. Si yo no estoy, no se vende." },
                      { val: "control", txt: "Vendemos harto pero no sé cuánto ganamos realmente (desorden)." },
                      { val: "structure", txt: "El equipo no rinde. Necesito profesionalizar la gerencia." },
                      { val: "branding_only", txt: "Solo quiero mejorar mi Instagram o hacer Branding." }
                    ].map((pain) => (
                      <label key={pain.val} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.pain_point === pain.val ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/40 hover:border-brand-primary/40'}`}>
                        <input 
                          type="radio" 
                          name="pain_point"
                          value={pain.val}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary accent-brand-primary"
                        />
                        <span className="ml-3 text-brand-primary text-sm">{pain.txt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Briefcase size={16} />
                    Industria
                  </label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Seleccione Industria</option>
                    <option value="services_b2b">Servicios B2B</option>
                    <option value="manufacturing">Manufactura / Fábrica</option>
                    <option value="construction">Construcción / Inmobiliaria</option>
                    <option value="distribution">Logística / Distribución</option>
                    <option value="retail">Retail</option>
                    <option value="other">Otra</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(2)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.industry || !formData.pain_point}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Ver si califico <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Contacto (Último paso antes de Agenda) */}
          {step === 4 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Tu perfil califica
                </span>
                <h3 className="text-3xl font-serif text-brand-primary">Hablemos</h3>
                <p className="text-brand-grey mt-2 text-sm leading-relaxed">
                  Parece que podemos ayudarte. Déjanos tus datos para agendar los 45 minutos de diagnóstico sin costo.
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
                    <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Empresa</label>
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
                  <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Desafío específico (Opcional)</label>
                  <textarea 
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 bg-brand-accent/5 border border-brand-accent/20 focus:bg-white focus:border-brand-primary outline-none rounded-md transition-all text-brand-primary resize-none text-sm"
                    placeholder="Ej: Quiero salirme de la operación diaria en 6 meses..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(3)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.company}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Ir al Calendario <Calendar size={16} />
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