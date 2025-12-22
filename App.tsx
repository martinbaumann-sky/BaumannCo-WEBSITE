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
import { CheckCircle2, XCircle } from 'lucide-react';

function App() {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<'home' | 'questionnaire' | 'privacy' | 'terms' | 'ethics'>('home');

  const handleStartConsultation = () => {
    setCurrentView('questionnaire');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: 'privacy' | 'terms' | 'ethics') => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  if (currentView === 'questionnaire') {
    return <Questionnaire onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'privacy' || currentView === 'terms' || currentView === 'ethics') {
    return <Legal type={currentView} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen w-full bg-white selection:bg-brand-primary selection:text-white">
      <Header onStartConsultation={handleStartConsultation} />
      <main>
        <Hero onStartConsultation={handleStartConsultation} />
        
        {/* The Problem Section */}
        <section id="about" className="py-24 bg-white">
           <div className="container mx-auto px-6 md:px-12">
             <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
               <div className="lg:w-1/2">
                 <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block opacity-80">{t.problem.tag}</span>
                 <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-primary mb-6 leading-[1.1]">
                   {t.problem.title_1} <br/>
                   <span className="italic text-brand-grey/70">{t.problem.title_2}</span>
                 </h2>
                 <p className="text-2xl md:text-3xl text-brand-primary font-serif mb-8 border-l-4 border-brand-primary pl-6 py-2">
                   {t.problem.highlight}
                 </p>
               </div>

               <div className="lg:w-1/2 space-y-8">
                 <div className="grid gap-4">
                   {t.problem.bullets.map((bullet: string, idx: number) => (
                     <div key={idx} className="flex items-center gap-4 group">
                       <div className="w-2 h-2 rounded-full bg-brand-primary group-hover:scale-150 transition-transform"></div>
                       <p className="text-xl md:text-2xl font-light text-brand-grey">{bullet}</p>
                     </div>
                   ))}
                 </div>
                 
                 <div className="pt-8 border-t border-brand-accent/20">
                   <p className="text-lg md:text-xl text-brand-grey leading-relaxed italic">
                     {t.problem.result}
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </section>

        <Services />
        
        {/* Methodology Section - Three Phases */}
        <section id="methodology" className="py-24 bg-brand-primary text-white relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           </div>

           <div className="container mx-auto px-6 md:px-12 relative z-10">
             <div className="text-center max-w-3xl mx-auto mb-20">
               <span className="text-brand-accent/80 font-bold tracking-widest uppercase text-xs mb-4 block">{t.methodology.tag}</span>
               <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-6">{t.methodology.title}</h2>
               <p className="text-brand-accent/70 font-light text-lg">{t.methodology.subtitle}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
                {t.methodology.steps.map((item: any, idx: number) => (
                  <div key={idx} className="relative z-10 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm flex flex-col h-full group hover:bg-white/10 transition-colors duration-500">
                    <span className="font-serif text-5xl text-brand-accent/20 mb-6 group-hover:text-brand-accent/40 transition-colors">{item.step}</span>
                    <h4 className="text-2xl font-serif mb-4 text-brand-accent">{item.title}</h4>
                    <p className="text-brand-accent/70 font-light leading-relaxed mb-8 flex-grow">{item.desc}</p>
                    <p className="font-bold text-sm tracking-wide text-white uppercase pt-4 border-t border-white/10">
                      {item.footer}
                    </p>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* Fit Section (Para Quién Es / No Es) */}
        <section className="py-24 bg-brand-accent/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Para Quién Es */}
              <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-brand-accent/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-brand-primary">{t.fit.is_for.title}</h3>
                </div>
                <ul className="space-y-6">
                  {t.fit.is_for.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                      <span className="text-brand-grey text-lg font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Para Quién No Es */}
              <div className="bg-brand-secondary p-10 md:p-14 rounded-3xl border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center">
                    <XCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-serif text-white">{t.fit.is_not_for.title}</h3>
                </div>
                <ul className="space-y-6">
                  {t.fit.is_not_for.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-accent/40 shrink-0"></div>
                      <span className="text-brand-accent/70 text-lg font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        
        <Booking onStartConsultation={handleStartConsultation} />
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;