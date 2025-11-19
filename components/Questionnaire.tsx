import React, { useState } from 'react';
import { ArrowRight, X, CheckCircle2, AlertCircle, ChevronLeft, Calendar, Building2, User, Briefcase, Target } from 'lucide-react';

// ---------------------------------------------------------------------------
// ¡IMPORTANTE! CONFIGURACIÓN DEL CALENDARIO
// ---------------------------------------------------------------------------
// Enlace de agenda oficial de Baumann&Co
// ---------------------------------------------------------------------------
const GOOGLE_CALENDAR_LINK = "https://calendar.app.google/ajpYr5jvwtBKRMc69"; 

interface QuestionnaireProps {
  onBack: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // Paso 1: Perfil Clave
    role: '',
    revenue: '',
    employees: '',
    // Paso 2: Contexto
    industry: '',
    pain_point: '',
    // Paso 3: Contacto
    name: '',
    company: '',
    challenge: '' // Opcional
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // --- LÓGICA DE LEAD SCORING ---

    if (step === 1) {
      // Lógica de Filtro de Rol:
      // 1. Consultor/Estudiante: DESCARTAR (No es tomador de decisión)
      // 2. Los demás pasan.
      const roleDiscard = formData.role === 'consultant' || formData.role === 'student';

      if (roleDiscard) {
        setIsQualified(false);
        return; 
      }
    }

    if (step === 2) {
       // Lógica de Filtro de Dolor:
       // Si busca algo que NO hacemos (Solo branding), descartamos.
       if (formData.pain_point === 'branding_only') {
          setIsQualified(false);
          return;
       }
       setIsQualified(true); // Si pasa esto, califica para reunión
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
            Según tus respuestas, parece que tu necesidad actual (Branding o Consultoría Externa) o tu rol no calzan con nuestro modelo de intervención directa.
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

  // Paso 4: Mostrar Calendario (Agenda)
  if (step === 4 && isQualified === true) {
    const isLinkConfigured = GOOGLE_CALENDAR_LINK && !GOOGLE_CALENDAR_LINK.includes("PON_AQUI");

    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
        <div className="bg-brand-primary text-white p-4 flex justify-between items-center shadow-md shrink-0 z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-brand-accent"/>
             </div>
             <div>
               <h2 className="font-serif text-lg">Sesión de Estrategia</h2>
               <p className="text-xs text-brand-accent/70">Selecciona tu horario disponible.</p>
             </div>
          </div>
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 w-full h-full bg-brand-accent/5 relative overflow-hidden">
          {isLinkConfigured ? (
            <iframe 
              src={GOOGLE_CALENDAR_LINK} 
              style={{ border: 0 }} 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Agendar reunión con Baumann&Co"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-white">
               <div className="max-w-md border-2 border-dashed border-brand-primary/20 rounded-xl p-8 bg-brand-accent/5">
                 <AlertCircle size={48} className="text-brand-primary mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-brand-primary mb-2">Falta conectar el Calendario</h3>
                 <p className="text-brand-grey text-sm mb-4">
                   Error de configuración. Por favor contacte al administrador.
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:flex-row animate-fade-in h-screen overflow-hidden">
      {/* Sidebar / Progress */}
      <div className="md:w-1/3 bg-brand-primary p-8 md:p-12 flex flex-col justify-between text-white shrink-0 overflow-y-auto">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-accent/60 hover:text-white transition-colors mb-12 text-xs font-bold uppercase tracking-widest">
            <ChevronLeft size={16} /> Cancelar
          </button>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Perfilamiento</h2>
          <p className="text-brand-accent/70 font-light leading-relaxed text-sm">
            Solo 3 pasos breves para entender tu contexto y preparar nuestra reunión.
          </p>
        </div>
        
        <div className="mt-12 space-y-6">
          {[
            { id: 1, label: "Perfil" },
            { id: 2, label: "Contexto" },
            { id: 3, label: "Agendar" }
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
      <div className="flex-1 bg-white p-6 md:p-12 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-lg pb-10">
          
          {/* Paso 1: Perfil (Rol, Ventas, Equipo) */}
          {step === 1 && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 1 de 3</span>
                <h3 className="text-3xl font-serif text-brand-primary">Datos Clave</h3>
                <p className="text-brand-grey text-sm mt-2">Para asegurarnos de que somos el socio correcto.</p>
              </div>
              
              <div className="space-y-6">
                 {/* Rol */}
                 <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <User size={16} />
                    Tu Cargo Actual
                  </label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-4 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="owner">Dueño / Socio / Gerente General</option>
                    <option value="manager">Gerente Comercial / Gerente de Área</option>
                    <option value="consultant">Consultor Externo / Agencia</option>
                    <option value="student">Estudiante / Investigando</option>
                  </select>
                </div>

                {/* Ventas */}
                <div className="space-y-3">
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

                {/* Equipo (Antes Dotación) */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-brand-grey">Tamaño del equipo</label>
                  <select 
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary appearance-none text-sm"
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
                className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
              >
                Siguiente <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Paso 2: Contexto (Dolor e Industria) */}
          {step === 2 && (
            <div className="animate-slide-up space-y-8">
               <div>
                <span className="text-brand-primary/60 font-bold tracking-widest uppercase text-xs mb-2 block">Paso 2 de 3</span>
                <h3 className="text-3xl font-serif text-brand-primary">Tu Situación</h3>
                <p className="text-brand-grey text-sm mt-2">Lo que más te preocupa hoy.</p>
              </div>
              
              <div className="space-y-6">
                 {/* Dolor Principal */}
                 <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Target size={16} />
                    Principal Desafío
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { val: "dependence", txt: "Dependencia: Si no estoy yo, el negocio no avanza." },
                      { val: "control", txt: "Desorden: Vendemos, pero no tengo control financiero." },
                      { val: "structure", txt: "Equipo: La estructura actual me queda chica." },
                      { val: "branding_only", txt: "Solo busco Marketing / Redes Sociales." }
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

                {/* Industria */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium text-brand-grey">
                    <Briefcase size={16} />
                    Industria
                  </label>
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full p-3 bg-white border border-brand-accent/40 focus:border-brand-primary outline-none rounded-lg transition-all text-brand-primary text-sm"
                  >
                    <option value="">Selecciona</option>
                    <option value="services_b2b">Servicios B2B / Profesionales</option>
                    <option value="manufacturing">Manufactura / Industrial</option>
                    <option value="construction">Construcción / Inmobiliaria</option>
                    <option value="retail">Retail / Distribución</option>
                    <option value="tech">Tecnología</option>
                    <option value="other">Otra</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(1)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.pain_point || !formData.industry}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Continuar <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Contacto (Último paso antes de Agenda) */}
          {step === 3 && isQualified === true && (
            <div className="animate-slide-up space-y-8">
              <div>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Casi listo
                </span>
                <h3 className="text-3xl font-serif text-brand-primary">Hablemos</h3>
                <p className="text-brand-grey mt-2 text-sm leading-relaxed">
                  La primera sesión es para conocernos y ver si podemos ayudarte. Sin costo ni compromisos de venta forzada.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Ej: Quiero salirme de la operación diaria..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button onClick={() => setStep(2)} className="px-6 py-4 text-brand-grey hover:text-brand-primary font-medium text-sm uppercase tracking-wide">Atrás</button>
                 <button 
                  onClick={handleNext}
                  disabled={!formData.name || !formData.company}
                  className="flex-1 py-4 bg-brand-primary text-white rounded-lg font-bold tracking-wide hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 uppercase text-xs"
                >
                  Ver Calendario <Calendar size={16} />
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