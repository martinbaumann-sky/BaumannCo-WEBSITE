import React from 'react';
import { BarChart3, Users, Gavel, Layers, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';

const services = [
  {
    icon: Gavel,
    title: "Decisiones sin depender del dueño",
    description: "Diseñamos gobierno y reglas claras para que la empresa opere sola: decisiones delegadas, roles definidos y control ejecutivo."
  },
  {
    icon: TrendingUp,
    title: "Ventas que no dependen de tus contactos",
    description: "Transformamos ventas intuitivas en un sistema comercial predecible, medible y escalable."
  },
  {
    icon: Layers,
    title: "Números claros para decidir bien",
    description: "Tableros ejecutivos que muestran margen, costos, caja y proyecciones en tiempo real."
  },
  {
    icon: Users,
    title: "Gerentes que realmente gerencian",
    description: "Convertimos tu equipo directivo en líderes que toman decisiones, ejecutan y rinden cuentas."
  },
  {
    icon: ShieldCheck,
    title: "Procesos que escalan sin romperse",
    description: "Ordenamos flujos, controles y responsables para que el crecimiento no quiebre la operación."
  },
  {
    icon: BarChart3,
    title: "Qué productos ganan plata y cuáles no",
    description: "Identificamos dónde está el margen real para priorizar lo que genera plata y cortar lo que drena recursos."
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
    <section id="services" className="py-24 bg-brand-accent/5 relative">
      {/* Decorative subtle background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block opacity-80">Nuestras Soluciones</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-primary leading-tight">
              Ordena tu empresa para <br/>
              <span className="italic text-brand-grey font-light">que vuelva a crecer.</span>
            </h3>
          </div>
          <p className="text-brand-grey text-lg max-w-md leading-relaxed">
             Cuando la empresa crece más rápido que su estructura, el dueño queda atrapado en la operación. Ordenamos el negocio para que el crecimiento vuelva a depender del sistema, no de ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <button 
              key={index}
              onClick={handleServiceClick}
              className="group bg-white p-8 lg:p-10 rounded-2xl border border-brand-accent/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(27,54,93,0.1)] hover:-translate-y-1 transition-all duration-500 ease-out hover:border-brand-primary/30 text-left cursor-pointer w-full"
            >
              <div className="flex justify-between items-start mb-6 lg:mb-8">
                <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <ArrowUpRight className="text-brand-accent group-hover:text-brand-primary transition-colors" size={20} />
              </div>
              
              <h4 className="text-xl font-semibold text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">{service.title}</h4>
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