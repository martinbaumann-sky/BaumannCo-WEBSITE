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
        
        {/* The Problem Section - Paper Texture & Editorial Style */}
        <section id="about" className="py-32 paper-texture border-y border-brand-accent/20">
           <div className="container mx-auto px-6 md:px-12">
             <div className="max-w-5xl mx-auto">
               <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                 <div className="lg:w-1/2">
                   <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-8 block opacity-60">{t.problem.tag}</span>
                   <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-10 leading-[1.4]">
                     {t.problem.title_1} <br/>
                     <span className="italic text-brand-grey/50">{t.problem.title_2}</span>
                   </h2>
                   <p className="text-lg md:text-xl text-brand-primary font-serif italic mb-10 py-4 border-l-2 border-brand-primary/20 pl-8">
                     {t.problem.highlight}
                   </p>
                 </div>

                 <div className="lg:w-1/2 space-y-12">
                   <div className="space-y-6">
                     {t.problem.bullets.map((bullet: string, idx: number) => (
                       <div key={idx} className="flex items-start gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5"></div>
                         <p className="text-lg md:text-xl font-light text-brand-grey leading-relaxed">{bullet}</p>
                       </div>
                     ))}
                   </div>
                   
                   <div className="pt-8 border-t border-brand-accent/30">
                     <p className="text-base text-brand-grey font-medium leading-relaxed italic opacity-80">
                       {t.problem.result}
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </section>

        <Services />
        
        {/* Methodology Section - The Logical Sequence */}
        <section id="methodology" className="py-32 bg-brand-primary text-white relative">
           <div className="container mx-auto px-6 md:px-12">
             <div className="max-w-3xl mb-24">
               <span className="text-brand-accent/50 font-bold tracking-widest uppercase text-xs mb-6 block">{t.methodology.tag}</span>
               <h2 className="text-3xl md:text-5xl font-serif mb-10 leading-[1.3]">{t.methodology.title}</h2>
               <p className="text-brand-accent/60 font-light text-lg md:text-xl leading-relaxed">{t.methodology.subtitle}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
                {t.methodology.steps.map((item: any, idx: number) => (
                  <div key={idx} className="p-10 border-r border-b border-white/10 flex flex-col group">
                    <span className="font-serif text-6xl text-brand-accent/10 mb-8 group-hover:text-brand-accent/20 transition-colors">{item.step}</span>
                    <h4 className="text-2xl font-serif mb-4 text-brand-accent">{item.title}</h4>
                    <p className="text-brand-accent/60 font-light leading-relaxed mb-10 flex-grow">{item.desc}</p>
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">
                        {item.footer}
                      </p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* Fit Section - Quiet & Rational */}
        <section className="py-32 bg-brand-accent/10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-12 md:p-16 shadow-sm border border-brand-accent/20">
                <h3 className="text-xl md:text-2xl font-serif text-brand-primary mb-10 leading-relaxed">{t.fit.is_for.title}</h3>
                <ul className="space-y-6">
                  {t.fit.is_for.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                      <span className="text-brand-grey text-base md:text-lg font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-secondary p-12 md:p-16 border border-white/5 text-white">
                <h3 className="text-xl md:text-2xl font-serif text-white mb-10 leading-relaxed">{t.fit.is_not_for.title}</h3>
                <ul className="space-y-6">
                  {t.fit.is_not_for.items.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent/30 shrink-0"></div>
                      <span className="text-brand-accent/70 text-base md:text-lg font-light leading-snug">{item}</span>
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