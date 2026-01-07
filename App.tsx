import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Questionnaire from './components/Questionnaire';
import Testimonials from './components/Testimonials';
import Legal from './components/Legal';
import { useLanguage } from './contexts/LanguageContext';
import { CheckCircle2, XCircle, ArrowRight, UserCheck } from 'lucide-react';

type View = 'home' | 'method' | 'services' | 'about' | 'diagnosis' | 'privacy' | 'terms' | 'ethics';

function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<View>('home');

  const handleStartConsultation = () => {
    setCurrentView('diagnosis');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  if (currentView === 'diagnosis') {
    return <Questionnaire onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'privacy' || currentView === 'terms' || currentView === 'ethics') {
    return <Legal type={currentView as any} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen w-full bg-white selection:bg-brand-primary selection:text-white">
      <Header onStartConsultation={handleStartConsultation} onNavigate={handleNavigate} />
      
      <main>
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onStartConsultation={handleStartConsultation} />
            
            {/* El Problema */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                  <div className="md:w-1/2">
                    <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block opacity-80">{t.problem.tag}</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-brand-primary mb-8 leading-tight">
                      {t.problem.title}
                    </h2>
                  </div>
                  <div className="md:w-1/2 space-y-6">
                    {t.problem.items.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                        <p className="text-xl md:text-2xl font-light text-brand-grey">{item}</p>
                      </div>
                    ))}
                    <p className="text-lg italic text-brand-grey/60 border-t border-brand-accent/20 pt-6">
                      {t.problem.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* La Solución */}
            <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
              <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif mb-6 max-w-4xl mx-auto leading-tight">{t.solution.title}</h2>
                <p className="text-brand-accent/70 text-lg md:text-xl font-light">{t.solution.subtitle}</p>
              </div>
            </section>

            {/* El Método (Sin letras gigantes) */}
            <section className="py-24 bg-white border-b border-brand-accent/10">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {['o', 'r', 'c', 'a'].map((letter, idx) => (
                    <div key={letter} className="group relative p-10 border border-brand-accent/20 hover:border-brand-primary transition-all bg-white shadow-sm hover:shadow-lg rounded-sm">
                      <span className="text-xs font-bold text-brand-primary/40 mb-6 block tracking-widest uppercase">Fase 0{idx + 1}</span>
                      <h4 className="text-2xl font-serif mb-3 text-brand-primary">{t.method[letter].title}</h4>
                      <p className="text-brand-grey font-light mb-4">{t.method[letter].desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-16 text-center">
                   <button onClick={() => handleNavigate('method')} className="text-brand-primary font-bold border-b-2 border-brand-primary pb-1 hover:opacity-70 transition-all uppercase tracking-widest text-xs">
                     Conocer nuestra metodología estratégica
                   </button>
                </div>
              </div>
            </section>

            {/* Para Quién Es */}
            <section className="py-24 bg-brand-accent/10">
              <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-12 border border-brand-accent/30 rounded-2xl">
                    <h3 className="text-2xl font-serif text-brand-primary mb-8">{t.fit.is_for.title}</h3>
                    <ul className="space-y-4">
                      {t.fit.is_for.items.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-4 items-center">
                          <CheckCircle2 size={18} className="text-green-600" />
                          <span className="text-brand-grey text-lg font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brand-secondary p-12 border border-white/5 rounded-2xl text-white">
                    <h3 className="text-2xl font-serif mb-8">{t.fit.is_not_for.title}</h3>
                    <ul className="space-y-4">
                      {t.fit.is_not_for.items.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-4 items-center">
                          <XCircle size={18} className="text-red-400" />
                          <span className="text-brand-accent/70 text-lg font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <Testimonials />
            <Booking onStartConsultation={handleStartConsultation} />
          </div>
        )}

        {currentView === 'method' && (
          <div className="pt-32 pb-24 animate-fade-in">
            <div className="container mx-auto px-6 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-serif text-brand-primary mb-12">Metodología de Trabajo</h1>
              <p className="text-xl md:text-2xl font-serif italic text-brand-grey/60 mb-16">
                Nuestro enfoque no es teoría. Es un sistema probado para tomar mejores decisiones empresariales basadas en estructura y criterio.
              </p>
              
              <div className="space-y-16">
                {['o', 'r', 'c', 'a'].map((letter, idx) => (
                  <div key={letter} className="relative border-l-4 border-brand-primary pl-8 py-4">
                    <span className="text-xs font-bold text-brand-primary/40 block mb-2 tracking-[0.3em] uppercase">Fase 0{idx+1}</span>
                    <h2 className="text-3xl font-serif text-brand-primary mb-6">{t.method[letter].title}</h2>
                    <p className="text-xl text-brand-grey font-light mb-8 leading-relaxed">
                      {t.method[letter].desc}
                    </p>
                    <div className="bg-red-50 p-6 border-l-4 border-red-500">
                       <p className="text-red-800 font-bold italic">{t.method[letter].warning}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 text-center bg-brand-accent/10 p-12 rounded-2xl">
                <h3 className="text-2xl font-serif text-brand-primary mb-8">¿Hablamos sobre su empresa?</h3>
                <button 
                  onClick={handleStartConsultation}
                  className="px-10 py-5 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-secondary transition-colors"
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'services' && (
          <div className="pt-32 pb-24 animate-fade-in">
             <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block">{t.services.tag}</span>
                  <h1 className="text-4xl md:text-6xl font-serif text-brand-primary mb-6">Estructura simple, repetible.</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                   {t.services.blocks.map((block: any) => (
                     <div key={block.id} className="group relative p-12 border border-brand-accent/20 rounded-xl hover:shadow-xl transition-all bg-white overflow-hidden">
                        <h2 className="text-3xl font-serif text-brand-primary mb-6">{block.title}</h2>
                        <div className="space-y-6 relative z-10">
                           <div>
                             <p className="text-xs font-bold text-brand-grey/40 uppercase tracking-widest mb-1">Diagnóstico</p>
                             <p className="text-brand-primary font-medium">{block.recomendation}</p>
                           </div>
                           <div>
                             <p className="text-xs font-bold text-brand-grey/40 uppercase tracking-widest mb-1">Intervención</p>
                             <p className="text-brand-grey font-light">{block.work}</p>
                           </div>
                           <div className="pt-4 border-t border-brand-accent/10">
                             <p className="text-xs font-bold text-brand-grey/40 uppercase tracking-widest mb-1">Impacto</p>
                             <p className="text-brand-primary font-bold italic">{block.change}</p>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-20 text-center">
                  <button 
                    onClick={handleStartConsultation}
                    className="px-12 py-6 bg-brand-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20"
                  >
                    {t.nav.cta}
                  </button>
                </div>
             </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="pt-32 pb-24 animate-fade-in">
             <div className="container mx-auto px-6 max-w-4xl">
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block">{t.about.tag}</span>
                <h1 className="text-4xl md:text-6xl font-serif text-brand-primary mb-12">{t.about.title}</h1>
                <div className="prose prose-xl text-brand-grey font-light mb-16 leading-relaxed">
                   <p>{t.about.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                   {t.about.features.map((f: string) => (
                     <div key={f} className="p-8 bg-brand-accent/10 rounded-xl text-center">
                        <UserCheck className="mx-auto mb-4 text-brand-primary" size={32} />
                        <h4 className="font-serif text-brand-primary text-xl">{f}</h4>
                     </div>
                   ))}
                </div>

                <div className="mt-20 p-12 bg-brand-secondary text-white rounded-2xl text-center">
                   <h2 className="text-3xl font-serif mb-8">Estrategia con criterio.</h2>
                   <button 
                    onClick={handleStartConsultation}
                    className="px-10 py-5 bg-white text-brand-primary font-bold uppercase tracking-widest text-xs hover:bg-brand-accent transition-colors"
                  >
                    {t.nav.cta}
                  </button>
                </div>
             </div>
          </div>
        )}
      </main>

      <Footer onNavigate={(view) => handleNavigate(view as any)} />
    </div>
  );
}

export default App;