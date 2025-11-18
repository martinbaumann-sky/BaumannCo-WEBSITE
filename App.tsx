import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Questionnaire from './components/Questionnaire';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'questionnaire'>('home');

  const handleStartConsultation = () => {
    setCurrentView('questionnaire');
    window.scrollTo(0, 0);
  };

  if (currentView === 'questionnaire') {
    return <Questionnaire onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen w-full bg-white selection:bg-brand-primary selection:text-white">
      <Header onStartConsultation={handleStartConsultation} />
      <main>
        <Hero onStartConsultation={handleStartConsultation} />
        
        {/* About Section - Redesigned */}
        <section id="about" className="py-24 bg-white">
           <div className="container mx-auto px-6 md:px-12">
             <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
               
               {/* Image with stylized elements */}
               <div className="lg:w-1/2 relative group">
                 <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-accent/40 rounded-2xl z-0 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
                 <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
                  alt="Modern corporate architecture" 
                  className="relative z-10 rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out w-full object-cover aspect-[4/3]"
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block border border-brand-accent/20">
                    <p className="font-serif text-2xl text-brand-primary mb-1">20+</p>
                    <p className="text-xs text-brand-grey uppercase tracking-wider">Años definiendo estándares</p>
                 </div>
               </div>

               <div className="lg:w-1/2">
                 <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block opacity-80">Sobre Nosotros</span>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-primary mb-8 leading-tight">
                   Claridad en tiempos de <br/><span className="italic text-brand-grey/70">incertidumbre.</span>
                 </h2>
                 <div className="space-y-6 text-lg text-brand-grey font-light leading-relaxed">
                   <p>
                     Fundada en Santiago, Chile por <strong>Manuel Baumann</strong>, Baumann&Co no es solo una consultora; es un socio estratégico diseñado para la era de la complejidad.
                   </p>
                   <p>
                     Creemos que los datos sin contexto son ruido. Nuestro equipo de ex-directivos y analistas senior trabaja codo a codo con su junta directiva para asegurar que la estrategia no se quede en el papel, sino que se traduzca en ejecución impecable.
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </section>

        <Services />
        
        {/* Methodology Section - Redesigned */}
        <section id="methodology" className="py-24 bg-brand-primary text-white relative overflow-hidden">
           {/* Abstract shapes */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           </div>

           <div className="container mx-auto px-6 md:px-12 relative z-10">
             <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-brand-accent/80 font-bold tracking-widest uppercase text-xs mb-4 block">Nuestra Metodología</span>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">Insight to Impact</h2>
               <p className="text-brand-accent/70 font-light text-lg">Un proceso iterativo diseñado para resultados tangibles y sostenibles.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting line for desktop */}
                <div className="absolute top-12 left-0 w-full h-px bg-white/10 hidden md:block z-0"></div>

                {[
                  { step: "01", title: "Diagnóstico", desc: "Análisis profundo basado en datos y entrevistas cualitativas." },
                  { step: "02", title: "Estrategia", desc: "Diseño de soluciones iterativas y adaptables al mercado." },
                  { step: "03", title: "Ejecución", desc: "Acompañamiento directivo durante la implementación." }
                ].map((item, idx) => (
                  <div key={idx} className="relative z-10 bg-brand-primary md:bg-transparent p-6 text-center group">
                    <div className="w-24 h-24 mx-auto bg-brand-primary rounded-full flex items-center justify-center border border-brand-accent/30 mb-8 group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors duration-500 shadow-xl relative">
                      <span className="font-serif text-3xl text-white group-hover:text-brand-primary transition-colors">{item.step}</span>
                    </div>
                    <h4 className="text-xl font-serif mb-3">{item.title}</h4>
                    <p className="text-brand-accent/70 font-light leading-relaxed px-4">{item.desc}</p>
                  </div>
                ))}
             </div>
           </div>
        </section>
        
        <Booking onStartConsultation={handleStartConsultation} />
      </main>
      <Footer />
    </div>
  );
}

export default App;