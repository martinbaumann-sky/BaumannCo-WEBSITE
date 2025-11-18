import React from 'react';
import { Box, Hexagon, Triangle, Circle, Square, Diamond } from 'lucide-react';

const clients = [
  { name: "Andean Mining", icon: Hexagon },
  { name: "Pacific Financial", icon: Diamond },
  { name: "Vertex Logistics", icon: Triangle },
  { name: "Global Health", icon: Circle },
  { name: "Stratum Energy", icon: Square },
  { name: "Nova Retail", icon: Box },
  { name: "Apex Capital", icon: Hexagon },
  { name: "Meridian Tech", icon: Diamond },
];

const Clients: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-brand-accent/10 overflow-hidden relative">
       <div className="container mx-auto px-6 mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand-grey/40">
            Confianza Corporativa
          </p>
       </div>
       
      {/* Gradient Masks for smooth fade effect */}
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-full">
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {/* First set of logos */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 mx-8 md:mx-16 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default group"
            >
              <div className="p-2 bg-brand-accent/20 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                 <client.icon size={28} className="text-brand-primary" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-serif text-brand-primary font-semibold whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
           {/* Duplicate set for seamless loop */}
           {[...clients, ...clients].map((client, index) => (
            <div 
              key={`dup-${index}`} 
              className="flex items-center gap-3 mx-8 md:mx-16 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default group"
            >
              <div className="p-2 bg-brand-accent/20 rounded-lg group-hover:bg-brand-primary/10 transition-colors">
                 <client.icon size={28} className="text-brand-primary" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-serif text-brand-primary font-semibold whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;