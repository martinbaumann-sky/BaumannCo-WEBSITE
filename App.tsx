import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Booking from './components/Booking';
import Footer from './components/Footer';
import Questionnaire from './components/Questionnaire';
import Testimonials from './components/Testimonials';

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
        
        {/* About Section */}
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
                    <p className="font-serif text-xl text-brand-primary mb-1">Santiago, Chile</p>
                    <p className="text-xs text-brand-grey uppercase tracking-wider">Atendemos a todo LatAm</p>
                 </div>
               </div>

               <div className="lg:w-1/2">
                 <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block opacity-80">Sobre Nosotros</span>
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-primary mb-8 leading-tight">
                   Crecimiento sin <br/><span className="italic text-brand-grey/70">estructura.</span>
                 </h2>
                 <div className="space-y-6 text-lg text-brand-grey font-light leading-relaxed">
                   <p>
                     Baumann&Co. es una consultora especializada en <strong>empresas medianas</strong> que están creciendo, pero se están quedando sin estructura.
                   </p>
                   <p>
                     Fundada en Santiago por Manuel Baumann, acompañamos a dueños que hicieron crecer su empresa con esfuerzo propio, pero hoy se enfrentan a un negocio que depende demasiado de ellos, no tiene control claro y está perdiendo velocidad.
                   </p>
                   <p>
                     Nuestro foco es simple: ordenar la operación, clarificar la estrategia y construir los sistemas que permiten crecer sin que el dueño tenga que estar en todo.
                   </p>
                   <p className="font-medium text-brand-primary">
                     Trabajamos con un enfoque directo, ejecutivo y orientado a resultados: diagnosticamos rápido, definimos el plan y lo ejecutamos con usted y su equipo.
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </section>

        <Services />
        
        {/* Methodology Section */}
        <section id="methodology" className="py-24 bg-brand-primary text-white relative overflow-hidden">
           {/* Abstract shapes */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay blur-3xl -translate-y-1/2 translate-x-1/4"></div>
           </div>

           <div className="container mx-auto px-6 md:px-12 relative z-10">
             <div className="text-center max-w-3xl mx-auto mb-16">
               <span className="text-brand-accent/80 font-bold tracking-widest uppercase text-xs mb-4 block">Cómo Trabajamos</span>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">3 Pasos Claros</h2>
               <p className="text-brand-accent/70 font-light text-lg">Acciones directas, sin ruido. Ordenamos tu negocio para que pueda crecer sin depender de ti.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting line for desktop */}
                <div className="absolute top-12 left-0 w-full h-px bg-white/10 hidden md:block z-0"></div>

                {[
                  { step: "01", title: "Diagnóstico Exacto", desc: "Revisamos tus números, procesos y equipo para identificar los cuellos de botella estructurales. Te decimos exactamente qué está frenando tu crecimiento." },
                  { step: "02", title: "Orden y Estructura", desc: "Diseñamos cómo debe funcionar la empresa: ventas, operación, roles, procesos y métricas. Dejamos la casa ordenada y con reglas claras." },
                  { step: "03", title: "Crecimiento Sostenible", desc: "Con la estructura lista, aceleramos ventas, mejoramos márgenes y habilitamos nuevos mercados. Tu negocio crece; tú recuperas control." }
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

        <Testimonials />
        
        <Booking onStartConsultation={handleStartConsultation} />
      </main>
      <Footer />
    </div>
  );
}

export default App;