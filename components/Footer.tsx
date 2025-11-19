import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-primary text-brand-accent/70 py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            {/* Text Logo White */}
            <div className="font-libre text-3xl text-white tracking-tight mb-6">
              <span className="font-bold">Baumann</span>
              <span className="font-normal opacity-80">&</span>
              <span className="font-bold">Co.</span>
            </div>
            
            <p className="max-w-md mb-6 text-sm leading-relaxed">
              Consultoría estratégica para empresas que buscan redefinir su futuro. Excelencia, integridad e innovación.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <span>Luis Pasteur 5280<br/>Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-accent flex-shrink-0" />
                <a href="mailto:contacto@baumann-co.com" className="hover:text-white transition-colors">contacto@baumann-co.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#contact" onClick={scrollToContact} className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#contact" onClick={scrollToContact} className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#contact" onClick={scrollToContact} className="hover:text-white transition-colors">Código de Ética</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-accent/50">
          <p>&copy; {new Date().getFullYear()} Baumann&Co Consulting. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;