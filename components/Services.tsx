import React from 'react';
import { BarChart3, Users, Gavel, Layers, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Gavel,
    title: "Decisiones sin depender del dueño",
    description: "Gobierno corporativo y reglas claras para operar con autonomía: roles definidos y control ejecutivo."
  },
  {
    icon: TrendingUp,
    title: "Ventas que no dependen de contactos",
    description: "Transformamos la intuición en un sistema comercial predecible, medible y escalable."
  },
  {
    icon: Layers,
    title: "Números claros para decidir",
    description: "Tableros ejecutivos con márgenes, costos y caja real para tomar decisiones informadas."
  },
  {
    icon: Users,
    title: "Gerentes que gerencian",
    description: "Desarrollamos líderes que toman decisiones, ejecutan planes y rinden cuentas."
  },
  {
    icon: ShieldCheck,
    title: "Procesos que escalan",
    description: "Ordenamos flujos y controles para que el crecimiento no quiebre la operación."
  },
  {
    icon: BarChart3,
    title: "Rentabilidad real",
    description: "Identificamos y priorizamos lo que genera margen; cortamos lo que drena recursos."
  }
];

const Services: React.FC = () => {
  const handleServiceClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 md:py-20 bg-brand-accent/5 relative">
      {/* Decorative subtle background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-3 md:mb-4 block opacity-80">Nuestras Soluciones</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-primary leading-tight">
              Ordena tu empresa para <br/>
              <span className="italic text-brand-grey font-light">volver a crecer.</span>
            </h3>
          </div>
          <p className="text-brand-grey text-base md:text-lg max-w-md leading-relaxed">
             Tu empresa creció, pero tu estructura no. Ordenamos el negocio para que el sistema trabaje, no tú.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <button 
              key={index}
              onClick={handleServiceClick}
              className="group bg-white p-6 md:p-8 rounded-2xl border border-brand-accent/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(27,54,93,0.1)] hover:-translate-y-1 transition-all duration-500 ease-out hover:border-brand-primary/30 text-left cursor-pointer w-full active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="text-brand-accent group-hover:text-brand-primary transition-colors" size={20} />
              </div>
              
              <h4 className="text-lg md:text-xl font-semibold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors">{service.title}</h4>
              <p className="text-brand-grey leading-relaxed text-sm">
                {service.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;