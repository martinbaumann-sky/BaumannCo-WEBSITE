import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  es: {
    nav: {
      about: "Sobre Nosotros",
      method: "Metodología",
      services: "Servicios",
      cta: "Diagnóstico Inicial"
    },
    hero: {
      headline: "Baumann & Co.",
      subheadline: "Consultoría Estratégica para la Empresa Media.",
      description: "Aportamos claridad y estructura a empresas que operan en la complejidad, ayudándolas a navegar decisiones críticas con control y foco.",
      cta: "Agendar Diagnóstico (15 min)"
    },
    problem: {
      tag: "El Desafío",
      title: "La complejidad no se resuelve con esfuerzo. Se resuelve con sistema.",
      items: [
        "Crecimiento sin estructura operativa",
        "Alta facturación con baja rentabilidad real",
        "Dependencia crítica de la propiedad"
      ],
      highlight: "Damos estructura para que el crecimiento sea una consecuencia, no un riesgo."
    },
    solution: {
      title: "Un marco de criterio operativo para su negocio.",
      subtitle: "No es consultoría genérica. Es un sistema para diagnosticar, priorizar y decidir con calma en escenarios de presión."
    },
    method: {
      tag: "Nuestro Marco de Trabajo",
      o: { title: "Orden", desc: "Estructura, roles y control del flujo operativo.", warning: "Sin orden, el crecimiento es la receta del colapso." },
      r: { title: "Rentabilidad", desc: "Optimización de márgenes y decisiones basadas en datos.", warning: "Sin rentabilidad, el negocio no se justifica." },
      c: { title: "Crecimiento", desc: "Escalamiento sostenible mediante sistemas comerciales.", warning: "Crecer sobre el desorden multiplica los riesgos." },
      a: { title: "Autonomía", desc: "Gobierno corporativo y delegación profesional.", warning: "Sin autonomía, el dueño es prisionero de su éxito." }
    },
    services: {
      tag: "Servicios",
      blocks: [
        { id: 'O', title: 'Orden Operativo', recomendation: 'Caos operativo y falta de control.', work: 'Estructura organizacional y procesos.', change: 'Control total del día a día.' },
        { id: 'R', title: 'Análisis de Rentabilidad', recomendation: 'Margen insuficiente o desconocido.', work: 'Análisis de costos y precios.', change: 'Un negocio financieramente sólido.' },
        { id: 'C', title: 'Estrategia de Crecimiento', recomendation: 'Estancamiento comercial.', work: 'Sistemas de adquisición y escala.', change: 'Escala predecible y controlada.' },
        { id: 'A', title: 'Gobierno y Autonomía', recomendation: 'Dependencia absoluta del dueño.', work: 'Directorios y delegación profesional.', change: 'Libertad estratégica del socio.' }
      ]
    },
    about: {
      tag: "Baumann&Co.",
      title: "Mirada de par, no de gurú.",
      description: "Somos partners de pensamiento para dueños de empresas. Operamos desde la sobriedad, el criterio y la experiencia real en directorios, alejados de recetas académicas.",
      features: ["Experiencia en Directorios", "Criterio Editorial", "Foco en Resultados Reales"]
    },
    booking: {
      tag: "Diagnóstico inicial",
      title: "Todo comienza con claridad.",
      subtitle: "En una sesión de 15 minutos identificamos la etapa actual de su empresa y definimos la prioridad real.",
      steps: [
        { title: "Diagnóstico", desc: "Evaluación de la etapa actual bajo el sistema ORCA™." },
        { title: "Priorización", desc: "Detección de riesgos críticos no evidentes." },
        { title: "Hoja de Ruta", desc: "Definición del siguiente paso estratégico." }
      ],
      cta: "Agendar Diagnóstico",
      confidential: "Privacidad y Confidencialidad Absoluta"
    },
    diagnosis: {
      title: "Diagnóstico Estratégico",
      subtitle: "Una conversación estructurada para entender el sistema de su negocio.",
      get: {
        title: "Entregables",
        items: [
          "Mapa de situación operativa",
          "Identificación de cuellos de botella",
          "Recomendación técnica honesta"
        ]
      },
      cta: "Seleccionar Horario"
    },
    fit: {
      is_for: {
        title: "Operamos con",
        items: ["Dueños y Gerentes Generales", "Empresas en proceso de profesionalización", "Negocios con voluntad de cambio"]
      },
      is_not_for: {
        title: "No operamos con",
        items: ["Startups en etapa de idea", "Empresas que buscan tips rápidos", "Contextos sin compromiso directivo"]
      }
    },
    testimonials: {
      tag: "Criterio Validado",
      title: "Resultados en la",
      title_italic: "voz del cliente"
    },
    questionnaire: {
      cancel: "Cancelar",
      disqualify: {
        btn: "Volver al inicio"
      }
    },
    legal_pages: {
      privacy: { title: "Política de Privacidad", content: "Manejo de información bajo estrictos acuerdos de confidencialidad." },
      terms: { title: "Términos de Servicio", content: "Servicios regidos por la ética profesional." },
      ethics: { title: "Código de Ética", content: "Integridad, objetividad y confidencialidad." }
    },
    footer: {
      desc: "ORCA™ Strategic System: Criterio para navegar la complejidad empresarial.",
      contact: "Oficina Central",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
      ethics: "Ética",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      about: "About Us",
      method: "Methodology",
      services: "Services",
      cta: "Initial Diagnosis"
    },
    hero: {
      headline: "Baumann & Co.",
      subheadline: "Strategic Consulting for Mid-Sized Firms.",
      description: "We provide clarity and structure to companies navigating complexity, helping them master critical decisions.",
      cta: "Schedule Diagnosis (15 min)"
    },
    problem: {
      tag: "The Challenge",
      title: "Complexity is solved with systems, not just effort.",
      items: ["Operational growth without structure", "Low profitability margins", "Critical owner dependency"],
      highlight: "We provide structure so growth is a consequence, not a risk."
    },
    solution: {
      title: "A strategic operating framework for your business.",
      subtitle: "Not generic consulting. A system to prioritize and decide with calm under pressure."
    },
    method: {
      tag: "Our Framework",
      o: { title: "Order", desc: "Organizational flow and operational control.", warning: "Without order, growth is collapse." },
      r: { title: "Profitability", desc: "Margin optimization and data-driven decisions.", warning: "Without profit, the business fails." },
      c: { title: "Growth", desc: "Sustainable scaling via commercial systems.", warning: "Growing over disorder is high risk." },
      a: { title: "Autonomy", desc: "Corporate governance and professional delegation.", warning: "Without autonomy, the owner is a prisoner." }
    },
    services: {
      tag: "Services",
      blocks: [
        { id: 'O', title: 'Operational Order', recomendation: 'Chaos and lack of control.', work: 'Org charts and process mapping.', change: 'Total daily control.' },
        { id: 'R', title: 'Profitability Analysis', recomendation: 'Insufficient margins.', work: 'Cost and pricing analysis.', change: 'Financial stability.' },
        { id: 'C', title: 'Growth Strategy', recomendation: 'Stagnant sales.', work: 'Acquisition and scaling systems.', change: 'Predictable scale.' },
        { id: 'A', title: 'Governance & Autonomy', recomendation: 'Owner stuck in the wheel.', work: 'Board advisory and delegation.', change: 'Strategic freedom.' }
      ]
    },
    about: {
      tag: "Baumann&Co.",
      title: "A Peer's View.",
      description: "Thinking partners for business owners. We operate with sobriety and real-world experience.",
      features: ["Board Experience", "Editorial Judgment", "Real Results"]
    },
    booking: {
      tag: "Initial Session",
      title: "Clarity first.",
      subtitle: "In 15 minutes we identify your stage and priorities.",
      steps: [
        { title: "Diagnosis", desc: "Evaluation of your business system." },
        { title: "Prioritize", desc: "Detection of hidden risks." },
        { title: "Roadmap", desc: "Strategic next step definition." }
      ],
      cta: "Schedule Diagnosis",
      confidential: "Absolute Privacy Guaranteed"
    },
    diagnosis: {
      title: "Strategic Diagnosis",
      subtitle: "A structured conversation to understand your business.",
      get: {
        title: "Deliverables",
        items: ["Operational map", "Bottleneck identification", "Honest technical advice"]
      },
      cta: "Pick a Time"
    },
    fit: {
      is_for: {
        title: "We work with",
        items: ["Owners and CEOs", "Firms seeking professionalization", "Commitment to change"]
      },
      is_not_for: {
        title: "We don't work with",
        items: ["Idea-stage startups", "Quick tip seekers", "Lack of leadership buy-in"]
      }
    },
    testimonials: {
      tag: "Proven Judgment",
      title: "Results in the",
      title_italic: "customer's voice"
    },
    questionnaire: {
      cancel: "Cancel",
      disqualify: {
        btn: "Back to Home"
      }
    },
    legal_pages: {
      privacy: { title: "Privacy Policy", content: "Data handling under professional confidentiality." },
      terms: { title: "Terms of Service", content: "Professional ethical governance." },
      ethics: { title: "Ethics Code", content: "Integrity, objectivity, and confidentiality." }
    },
    footer: {
      desc: "ORCA™ Strategic System: Judgment to navigate business complexity.",
      contact: "Headquarters",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      ethics: "Ethics",
      rights: "All rights reserved."
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const value = {
    language,
    setLanguage,
    t: (translations as any)[language] || translations.es
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};