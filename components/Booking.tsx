import React, { useState } from 'react';
import { Calendar, CheckCircle, Loader2, Sparkles, ArrowRight, RefreshCcw, ExternalLink } from 'lucide-react';
import { analyzeBusinessChallenge } from '../services/gemini';
import { BookingFormState, BookingState, AiAnalysisResult } from '../types';

// --- CONFIGURACIÓN ---
// PEGA AQUÍ EL ENLACE DE TU "CALENDARIO DE CITAS" DE GOOGLE O CALENDLY
// Ejemplo: "https://calendar.google.com/calendar/appointments/schedules/..."
const GOOGLE_CALENDAR_LINK = ""; 

const Booking: React.FC = () => {
  const [state, setState] = useState<BookingState>(BookingState.IDLE);
  const [form, setForm] = useState<BookingFormState>({
    name: '',
    email: '',
    company: '',
    challenge: '',
    date: ''
  });
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.challenge || !form.company) return;

    setState(BookingState.ANALYZING);
    setError(null);

    try {
      const result = await analyzeBusinessChallenge(form.challenge, form.company);
      setAiResult(result);
      setState(BookingState.ANALYSIS_COMPLETE);
    } catch (err) {
      setError("Hubo un problema analizando su solicitud. Por favor intente nuevamente.");
      setState(BookingState.IDLE);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-secondary text-white relative overflow-hidden">
      {/* Elegant Background Gradients - Updated Colors */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-primary rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary rounded-full blur-[150px] opacity-40"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 sticky top-32">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-primary border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-widest uppercase mb-6">
              Siguiente Nivel
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
              Comience su transformación.
            </h3>
            <p className="text-brand-accent/70 text-lg mb-10 leading-relaxed font-light">
              Utilizamos inteligencia artificial para maximizar el valor de nuestra primera interacción. Describa su desafío y generaremos una agenda ejecutiva a medida.
            </p>
            
            <div className="space-y-8 border-t border-white/10 pt-10">
              <div className="group flex items-start gap-5">
                <div className="p-3 bg-brand-primary/50 rounded-2xl text-brand-accent group-hover:scale-110 transition-transform duration-300 border border-brand-accent/10">
                  <Sparkles size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-white">Análisis Preliminar con IA</h4>
                  <p className="text-brand-accent/60 text-sm leading-relaxed">Evaluación inmediata y objetiva de su situación actual.</p>
                </div>
              </div>
              <div className="group flex items-start gap-5">
                <div className="p-3 bg-brand-primary/50 rounded-2xl text-brand-accent group-hover:scale-110 transition-transform duration-300 border border-brand-accent/10">
                  <Calendar size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-white">Consultoría Priority</h4>
                  <p className="text-brand-accent/60 text-sm leading-relaxed">Acceso directo a disponibilidad en tiempo real vía Google Calendar.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Interface */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-brand-grey relative overflow-hidden min-h-[600px]">
              
              {state === BookingState.IDLE && (
                <form onSubmit={handleSubmitAnalysis} className="space-y-8 animate-fade-in">
                  <div className="flex justify-between items-end border-b border-brand-accent/20 pb-6">
                    <h4 className="text-2xl font-serif font-medium text-brand-primary">Solicitud de Análisis</h4>
                    <span className="text-xs text-brand-grey/50 font-medium uppercase tracking-wider">Paso 1 de 2</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-xs font-bold text-brand-grey/70 uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">Nombre Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        className="w-full pb-3 bg-transparent border-b border-brand-accent/30 text-lg font-medium text-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-brand-accent"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-brand-grey/70 uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">Email Corporativo</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full pb-3 bg-transparent border-b border-brand-accent/30 text-lg font-medium text-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-brand-accent"
                        placeholder="juan@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-brand-grey/70 uppercase tracking-wider mb-2 group-focus-within:text-brand-primary transition-colors">Empresa</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={form.company}
                      onChange={handleInputChange}
                      className="w-full pb-3 bg-transparent border-b border-brand-accent/30 text-lg font-medium text-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-brand-accent"
                      placeholder="Nombre de su organización"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-brand-grey/70 uppercase tracking-wider mb-3 group-focus-within:text-brand-primary transition-colors flex items-center justify-between">
                      Desafío Principal
                      <span className="flex items-center gap-1 text-[10px] text-brand-primary bg-brand-accent/20 px-2 py-0.5 rounded-full">
                        <Sparkles size={10} /> Powered by Gemini
                      </span>
                    </label>
                    <textarea 
                      name="challenge"
                      required
                      value={form.challenge}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-4 bg-brand-accent/5 border border-brand-accent/30 rounded-xl text-brand-primary focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all resize-none placeholder:text-brand-grey/40 placeholder:font-light"
                      placeholder="Ej: Buscamos optimizar la cadena de suministro para reducir costos operativos un 15%..."
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={!form.challenge || !form.company}
                      className="w-full bg-brand-primary text-white font-medium text-lg py-4 rounded-xl hover:bg-brand-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-0.5"
                    >
                      Generar Análisis
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">{error}</p>}
                </form>
              )}

              {state === BookingState.ANALYZING && (
                <div className="flex flex-col items-center justify-center h-[500px] space-y-8 animate-fade-in">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-accent/20 rounded-full blur-xl animate-pulse"></div>
                    <Loader2 className="relative z-10 animate-spin text-brand-primary" size={56} strokeWidth={1.5} />
                  </div>
                  <div className="text-center space-y-2">
                    <h4 className="text-2xl font-serif font-medium text-brand-primary">Analizando Contexto</h4>
                    <p className="text-brand-grey font-light">Nuestros algoritmos están procesando su solicitud...</p>
                  </div>
                </div>
              )}

              {state === BookingState.ANALYSIS_COMPLETE && aiResult && (
                <div className="animate-slide-up">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="text-xl font-serif font-medium text-brand-primary">Resultado del Análisis</h4>
                     <button onClick={() => setState(BookingState.IDLE)} className="text-brand-grey/50 hover:text-brand-primary transition-colors flex items-center gap-1 text-xs uppercase tracking-wider font-bold">
                       <RefreshCcw size={14} /> Reiniciar
                     </button>
                   </div>

                  <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-brand-primary">
                      <Sparkles size={100} />
                    </div>
                    
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-brand-primary mb-2">Recomendación</span>
                    <h5 className="text-2xl font-serif text-brand-primary mb-3">{aiResult.recommendedService}</h5>
                    <p className="text-brand-grey text-sm leading-relaxed mb-6 relative z-10">{aiResult.analysis}</p>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white p-5 shadow-sm">
                      <h6 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3">Agenda Propuesta para la Sesión</h6>
                      <ul className="space-y-2">
                        {aiResult.agenda.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-brand-grey">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-xs font-bold mt-0.5">{idx + 1}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* GOOGLE CALENDAR INTEGRATION */}
                  <div className="pt-2 border-t border-brand-accent/20">
                     <h3 className="text-lg font-serif font-medium text-brand-primary mb-4">Seleccione su horario disponible</h3>
                     <div className="w-full h-[500px] rounded-xl overflow-hidden bg-brand-accent/5 border border-brand-accent/20 shadow-inner">
                        {GOOGLE_CALENDAR_LINK ? (
                           <iframe 
                             src={GOOGLE_CALENDAR_LINK} 
                             className="w-full h-full" 
                             frameBorder="0"
                             title="Google Calendar Appointment Scheduling"
                           ></iframe>
                        ) : (
                           <div className="flex flex-col items-center justify-center h-full text-center p-8 text-brand-grey/50">
                              <Calendar size={48} className="mb-4 opacity-20" />
                              <p className="font-medium text-brand-primary mb-2">Calendario no configurado</p>
                              <p className="text-sm mb-4">El propietario del sitio debe añadir el enlace de Google Calendar en el código.</p>
                              <a 
                                href="https://calendar.google.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs flex items-center gap-1 text-brand-primary hover:underline"
                              >
                                Ir a Google Calendar <ExternalLink size={12}/>
                              </a>
                           </div>
                        )}
                     </div>
                     <p className="text-xs text-brand-grey/60 mt-4 text-center">
                       * Al confirmar, recibirá una invitación automática de Google Meet en su correo.
                     </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;