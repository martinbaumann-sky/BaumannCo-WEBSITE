import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const translations = {
  es: {
    nav: {
      about: "Diagnóstico",
      services: "Estructura",
      methodology: "Metodología",
      cta: "Agendar Sesión"
    },
    hero: {
      tag: "Baumann&Co · Consultoría Estratégica",
      title_1: "Ordenamos empresas para que sean",
      title_2: "rentables y puedan crecer con control.",
      subtitle: "Acompañamos a dueños de empresas medianas a poner orden en su negocio, recuperar rentabilidad y diseñar un crecimiento escalable.",
      cta_primary: "Agendar Sesión Inicial",
      cta_secondary: "Metodología"
    },
    problem: {
      tag: "El Problema",
      title_1: "El desorden operativo",
      title_2: "es el techo de su rentabilidad.",
      highlight: "Muchas empresas intentan crecer antes de estar listas.",
      bullets: [
        "Roles difusos y duplicidad de tareas.",
        "Decisiones basadas en intuición, no en datos.",
        "Dueños atrapados en la resolución de urgencias."
      ],
      result: "El resultado es una operación que consume recursos sin generar el retorno esperado."
    },
    methodology: {
      tag: "La Secuencia",
      title: "Un proceso lógico y calmo",
      subtitle: "No creemos en soluciones rápidas. Seguimos una secuencia inquebrantable de tres fases.",
      steps: [
        { 
          step: "01", 
          title: "Orden", 
          desc: "Definimos una estructura clara. Roles precisos, responsabilidades asignadas y métricas de desempeño por cada cargo.",
          footer: "Sin orden, la eficiencia es imposible."
        },
        { 
          step: "02", 
          title: "Rentabilidad", 
          desc: "Analizamos márgenes y costos. Alineamos los incentivos y las decisiones financieras con los objetivos reales del negocio.",
          footer: "Vender más no es ganar más."
        },
        { 
          step: "03", 
          title: "Crecimiento", 
          desc: "Diseñamos un modelo de expansión que la organización pueda absorber sin depender del esfuerzo extra del dueño.",
          footer: "Crecer con control."
        }
      ]
    },
    fit: {
      is_for: {
        title: "Perfil de Cliente",
        items: [
          "Dueños y Gerentes Generales de empresas medianas.",
          "Negocios con estructura operativa existente.",
          "Empresas que buscan profesionalizar su gestión."
        ]
      },
      is_not_for: {
        title: "No es para usted si busca",
        items: [
          "Resultados inmediatos sin cambios estructurales.",
          "Asesoría para startups en fase temprana.",
          "Consultoría sin involucramiento de la gerencia."
        ]
      }
    },
    booking: {
      tag: "Contacto",
      title: "Si su empresa necesita orden antes de crecer, conversemos.",
      subtitle: "Nuestra primera sesión sirve para entender su situación y evaluar si nuestra metodología es la adecuada para su empresa.",
      steps: [
        { title: "Evaluación", desc: "Validamos la estructura del problema." },
        { title: "Diagnóstico", desc: "Analizamos el encaje con nuestra secuencia." },
        { title: "Propuesta", desc: "Diseño de la hoja de ruta estratégica." }
      ],
      cta: "Agendar Primera Sesión",
      confidential: "Tratamiento confidencial de la información"
    },
    services: {
      tag: "Fases de Intervención",
      title_1: "Pilares de gestión",
      title_2: "para el control total.",
      subtitle: "Ordenamos la columna vertebral de su negocio para asegurar resultados sostenibles.",
      cards: [
        { title: "Control de Gestión", desc: "Tableros de mando ejecutivos para decidir basados en márgenes reales y flujo de caja." },
        { title: "Gobierno Corporativo", desc: "Definición de roles y órganos de decisión que liberan al dueño de la operación diaria." },
        { title: "Procesos Comerciales", desc: "Sistemas de venta repetibles y medibles que no dependen del azar o de relaciones personales." },
        { title: "Optimización Financiera", desc: "Visibilidad total sobre la estructura de costos y la rentabilidad por unidad de negocio." },
        { title: "Desarrollo Directivo", desc: "Alineamiento del equipo gerencial bajo una misma lógica de resultados y eficiencia." },
        { title: "Diseño de Escala", desc: "Preparación de la infraestructura operativa para absorber el crecimiento sin generar caos." }
      ]
    },
    testimonials: {
      tag: "Testimonios",
      title: "Experiencias en",
      title_italic: "empresas en marcha."
    },
    footer: {
      desc: "Consultoría estratégica senior. Orden, rentabilidad y crecimiento con control.",
      contact: "Contacto",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
      ethics: "Ética",
      rights: "Reservados todos los derechos."
    },
    questionnaire: {
      cancel: "Volver",
      title: "Perfilamiento",
      subtitle: "Breve validación para asegurar que podemos aportar valor real a su empresa.",
      step1: "Empresa",
      step2: "Agenda",
      mob_step: "Fase",
      mob_of: "de",
      final_step: "Agenda",
      select_time: "Seleccione un horario",
      step1_title: "Datos de Gestión",
      step1_subtitle: "Información necesaria para nuestra primera sesión.",
      role_label: "Su Cargo",
      role_ph: "Seleccione",
      roles: {
        owner: "Dueño / CEO",
        manager: "Gerente General / Director",
        consultant: "Consultor",
        student: "Otros"
      },
      rev_label: "Ventas Anuales (USD)",
      rev_opts: {
        l500: "< 500k",
        m500: "500k - 1M",
        m1: "1M - 10M",
        m10: "> 10M"
      },
      emp_label: "Tamaño del Equipo",
      emp_ph: "Seleccione",
      emp_opts: {
        o1: "1 - 10",
        o11: "11 - 50",
        o51: "51 - 200",
        o200: "+200"
      },
      btn_next: "Ver Disponibilidad",
      disqualify: {
        title: "Nuestra especialidad es distinta",
        text_1: "Agradecemos su interés. En Baumann&Co nos enfocamos exclusivamente en",
        text_bold: "dueños y gerentes generales",
        text_2: "de empresas medianas con estructura operativa.",
        text_3: "Según sus respuestas, no somos el socio adecuado para su situación actual.",
        btn: "Volver al Inicio"
      }
    }
  },
  en: {
    nav: {
      about: "Diagnosis",
      services: "Structure",
      methodology: "Methodology",
      cta: "Book Session"
    },
    hero: {
      tag: "Baumann&Co · Strategic Consulting",
      title_1: "We order companies to make them",
      title_2: "profitable and able to grow with control.",
      subtitle: "We support mid-sized business owners in bringing order to their business, regaining profitability, and designing scalable growth.",
      cta_primary: "Book Initial Session",
      cta_secondary: "Methodology"
    },
    problem: {
      tag: "The Problem",
      title_1: "Operational disorder",
      title_2: "is the ceiling of your profitability.",
      highlight: "Many companies try to grow before they are ready.",
      bullets: [
        "Fuzzy roles and duplication of tasks.",
        "Intuition-based decisions, not data-driven.",
        "Owners trapped in daily emergencies."
      ],
      result: "The result is an operation that consumes resources without generating the expected return."
    },
    methodology: {
      tag: "The Sequence",
      title: "A logical and calm process",
      subtitle: "We don't believe in quick fixes. We follow an unwavering sequence of three phases.",
      steps: [
        { 
          step: "01", 
          title: "Order", 
          desc: "We define a clear structure. Precise roles, assigned responsibilities, and performance metrics for each position.",
          footer: "Without order, efficiency is impossible."
        },
        { 
          step: "02", 
          title: "Profitability", 
          desc: "We analyze margins and costs. We align incentives and financial decisions with the real objectives of the business.",
          footer: "Selling more is not earning more."
        },
        { 
          step: "03", 
          title: "Growth", 
          desc: "We design an expansion model that the organization can absorb without depending on the owner's extra effort.",
          footer: "Growth with control."
        }
      ]
    },
    fit: {
      is_for: {
        title: "Client Profile",
        items: [
          "Owners and General Managers of mid-sized companies.",
          "Businesses with an existing operational structure.",
          "Companies looking to professionalize their management."
        ]
      },
      is_not_for: {
        title: "Not for you if you seek",
        items: [
          "Immediate results without structural changes.",
          "Advisory for early-stage startups.",
          "Consulting without management involvement."
        ]
      }
    },
    booking: {
      tag: "Contact",
      title: "If your company needs order before growth, let's talk.",
      subtitle: "Our first session serves to understand your situation and evaluate if our methodology is right for your company.",
      steps: [
        { title: "Evaluation", desc: "We validate the problem structure." },
        { title: "Diagnosis", desc: "We analyze the fit with our sequence." },
        { title: "Proposal", desc: "Strategic roadmap design." }
      ],
      cta: "Book Initial Session",
      confidential: "Confidential information handling"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const userLang = navigator.language || (navigator as any).userLanguage;
    if (userLang && userLang.startsWith('en')) {
      setLanguage('en');
    }
  }, []);

  const value = {
    language,
    setLanguage,
    t: (translations as any)[language]
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