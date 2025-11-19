import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartConsultation: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartConsultation }) => {
  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed transform scale-105 opacity-50 mix-blend-overlay"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop")',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/70 via-brand-primary/30 to-brand-primary"></div>

      <div className="relative z-10 container mx-auto px-6 pt-20 md:pt-0">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-block mb-6 animate-[fadeInUp_1s_ease-out_0.2s_both]">
            <span className="px-4 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/10 backdrop-blur-sm text-brand-accent text-xs font-bold tracking-[0.2em] uppercase">
              Estrategia clara. Crecimiento real.
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 tracking-tight animate-[fadeInUp_1s_ease-out_0.4s_both]">
            Deja de depender de <br />
            <span className="italic font-normal text-brand-accent/90">ti mismo.</span>
          </h1>
          
          <p className="text-brand-accent/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeInUp_1s_ease-out_0.6s_both]">
            Recupera el orden, el control y la rentabilidad de tu empresa.
          </p>
          
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center animate-[fadeInUp_1s_ease-out_0.8s_both]">
            <button 
              onClick={onStartConsultation}
              className="group relative px-8 py-4 bg-white text-brand-primary rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Agendar Primera Sesión
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={(e) => handleNavigation(e, 'services')}
              className="px-8 py-4 text-white font-medium text-sm tracking-wide border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm cursor-pointer"
            >
              Cómo ayudamos
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={(e) => handleNavigation(e, 'about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-accent/50 hover:text-white transition-colors animate-bounce cursor-pointer z-20"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} strokeWidth={1} />
      </button>
    </section>
  );
};

export default Hero;