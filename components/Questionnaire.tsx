import React, { useState } from 'react';
import { ArrowRight, X, CheckCircle2, AlertCircle, ChevronLeft, Calendar, Building2, User, Clock } from 'lucide-react';

// REEMPLAZA ESTE ENLACE CON EL DE TU CALENDARIO DE GOOGLE O CALENDLY
const GOOGLE_CALENDAR_LINK = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ABC_TU_LINK_REAL_AQUI?gv=true";

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // Calificación
    revenue: '',
    employees: '',
    role: '',
    timeline: '',
    // Contacto (Final)
    name: '',
    company: '',
    challenge: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // Final del Paso 2: Ejecutar lógica de calificación
    if (step === 2) {
      // CRITERIOS DE FILTRO:
      // 1. Facturación menor a 1M -> Descalificado
      // 2. Cargo "Estudiante/Investigador" -> Descalificado
      if (formData.revenue === 'menos_1m' || formData.role === 'student') {
        setIsQualified(false);
        // Saltamos directamente a la pantalla de descalificado
        return; 
      } else {
        setIsQualified(true);
      }
    }
    
    setStep(step + 1);
  };

  // Si fue descalificado (se muestra inmediatamente tras el paso 2)
  if (isQualified === false) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-brand-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-brand-primary" />
          </div>
          <h2 className="text-3xl font-serif text-brand-primary mb-4">Gracias por su interés</h2>
          <p className="text-brand-grey mb-8 leading-relaxed">
            En este momento, los programas de consultoría estratégica de Baumann&Co están diseñados exclusivamente para organizaciones en etapas de madurez corporativa específica.
            <br/><br/>
            Basado en su perfil actual, no podemos agendar una sesión estratégica, pero hemos guardado su contacto para futuras iniciativas de mentoría o crecimiento temprano.
          </p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-secondary transition-colors"
          >
            Volver al sitio
          </button>
        </div>
      </div>
    );
  }

  // Paso 4: Mostrar Calendario (Solo si llegó aquí tras llenar contacto)
  if (step === 4 && isQualified === true) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
        <div className="bg-brand-primary text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-brand-accent"/>
             </div>
             <div>
               <h2 className="font-serif text-lg">Sesión Confirmada</h2>
               <p className="text-xs text-brand-accent/70">Seleccione su horario en Google Calendar</p>
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
          {/* Overlay informativo por si el link no es real */}
          {GOOGLE_CALENDAR_LINK.includes("TU_LINK_REAL") && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white p-8 text-center pointer-events-none">
               <div>
                 <h3 className="text-2xl font-bold mb-2">Modo de Desarrollo</h3>
                 <p>Debes configurar tu enlace de Google Calendar en el archivo <code>components/Questionnaire.tsx</code></p>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Pasos del Formulario (1, 2 y 3)
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in">
      {/* Sidebar / Progress */}
      <div className="md:w-1/3 bg-brand-primary p-8 md:p-12 flex flex-col justify-between text-white">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest">
            <ChevronLeft size={16} /> Cancelar
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Postulación de Cliente</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed">
            Nuestro proceso de admisión asegura que podemos entregar resultados excepcionales para su tipo de organización.
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: "Perfil Corporativo" },
            { id: 2, label: "Alcance y Rol" },
            { id: 3, label: "Detalles y Desafío" }
          ].map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-colors ${
                step >= s.id ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'bg-transparent border-white/20 text-white/40'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.id}
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
          
          {/* Step 1: Corporate Profile (Qualification Part 1) */}
          {step === 1 && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 1 de 3</span>
                <h3 className="text-3xl font-serif text-brand-primary">Dimensiones de la Organización</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Building2 size={16} />
                    Rango de Facturación Anual (USD)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { value: 'menos_1m', label: 'Menos de $1M' },
                      { value: '1m_10m', label: '$1M - $10M' },
                      { value: '10m_50m', label: '$10M - $50M' },
                      { value: 'mas_50m', label: 'Más de $50M' }
                    ].map((opt) => (
                      <label key={opt.value} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.revenue === opt.value ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-brand-accent/30 hover:border-brand-primary/30'}`}>
                        <input 
                          type="radio" 
                          name="revenue"
                          value={opt.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-brand-primary focus:ring-brand-primary accent-brand-primary"
                        />
                        <span className="ml-3 text-brand-primary font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-brand-grey">Tamaño del Equipo</label>
                  <select 
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/50 focus:border-brand-primary outline-none rounded-xl transition-all text-brand-primary appearance-none"
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="1-10">1 - 10 empleados</option>
                    <option value="11-50">11 - 50 empleados</option>
                    <option value="51-200">51 - 200 empleados</option>
                    <option value="200+">Más de 200 empleados</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleNext}
                disabled={!formData.revenue || !formData.employees}
                className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
              >
                Siguiente Paso <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Context (Qualification Part 2) */}
          {step === 2 && (
            <div className="animate-slide-up space-y-8">
               <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 2 de 3</span>
                <h3 className="text-3xl font-serif text-brand-primary">Contexto del Solicitante</h3>
              </div>
              
              <div className="space-y-6">
                 <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <User size={16} />
                    Su Rol en la Empresa
                  </label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/50 focus:border-brand-primary outline-none rounded-xl transition-all text-brand-primary"
                  >
                    <option value="">Seleccione su cargo</option>
                    <option value="c-level">C-Level / Dueño / Socio</option>
                    <option value="vp-director">VP / Director</option>
                    <option value="manager">Gerente de Área</option>
                    <option value="student">Estudiante / Investigador / Otro</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Clock size={16} />
                    Horizonte de Tiempo para el Proyecto
                  </label>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Inmediato', '1-3 meses', '3-6 meses', 'Solo explorando'].map((time) => (
                      <label key={time} className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all text-center ${formData.timeline === time ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-bold' : 'border-brand-accent/30 text-brand-grey hover:border-brand-primary/30'}`}>
                        <input 
                          type="radio" 
                          name="timeline"
                          value={time}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(1)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.role || !formData.timeline}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-xl font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                >
                  Verificar Perfil <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details (Solo si calificó) */}
          {step === 3 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Perfil Aprobado
                </span>
                <h3 className="text-3xl font-serif text-brand-primary">Detalles Finales</h3>
                <p className="text-brand-grey mt-2 text-sm">Su perfil cumple con nuestros criterios. Por favor complete sus datos para acceder a la agenda de socios.</p>
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
                      className="w-full p-3 bg-brand-accent/10 border border-transparent focus:bg-white focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary"
                      placeholder="Su nombre"
                    />
                  </div>
                   <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">Empresa</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-3 bg-brand-accent/10 border border-transparent focus:bg-white focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary"
                      placeholder="Nombre legal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-brand-primary/70 uppercase tracking-wider">El Desafío Principal</label>
                  <textarea 
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 bg-brand-accent/10 border border-transparent focus:bg-white focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary resize-none"
                    placeholder="¿Qué problema estratégico necesitamos resolver en la primera sesión?"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(2)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.company || !formData.challenge}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-xl font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                >
                  Ver Agenda Disponible <Calendar size={18} />
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