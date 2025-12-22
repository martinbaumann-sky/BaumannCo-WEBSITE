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
      about: "El Problema",
      services: "Fases",
      methodology: "Metodología",
      cta: "Agendar Primera Sesión"
    },
    hero: {
      tag: "Baumann&Co · Consultoría Estratégica",
      title_1: "Orden. Rentabilidad.",
      title_2: "Crecimiento.",
      subtitle: "Acompañamos a dueños de empresas medianas a poner orden en su negocio, recuperar rentabilidad y crecer con control.",
      cta_primary: "Agendar Primera Sesión",
      cta_secondary: "Nuestra Forma de Trabajar"
    },
    problem: {
      tag: "El Problema",
      title_1: "La mayoría de las empresas medianas",
      title_2: "no tiene un problema de ventas.",
      highlight: "Tiene un problema de desorden.",
      bullets: [
        "Roles poco claros.",
        "Decisiones por intuición.",
        "Dueños atrapados en la operación."
      ],
      result: "El resultado: se trabaja mucho, se gana poco y crecer se vuelve riesgoso."
    },
    methodology: {
      tag: "Nuestra Forma de Trabajar",
      title: "Tres fases consecutivas",
      subtitle: "No creemos en soluciones rápidas ni recetas genéricas. Cada fase tiene un objetivo claro.",
      steps: [
        { 
          step: "01", 
          title: "Orden Organizacional", 
          desc: "Ponemos estructura donde hoy hay confusión. Roles claros, responsabilidades definidas y KPI por cargo.",
          footer: "Sin orden, nada funciona."
        },
        { 
          step: "02", 
          title: "Rentabilidad Controlada", 
          desc: "Identificamos dónde se gana y dónde se pierde plata. Alineamos foco, incentivos y decisiones.",
          footer: "Vender más no siempre es ganar más."
        },
        { 
          step: "03", 
          title: "Crecimiento con Control", 
          desc: "Diseñamos crecimiento absorbible por la organización, no por el esfuerzo del dueño.",
          footer: "Crecer sin romper la empresa."
        }
      ]
    },
    fit: {
      is_for: {
        title: "Para Quién Es",
        items: [
          "Dueños y gerentes generales",
          "Empresas medianas",
          "Negocios que quieren crecer sin perder control"
        ]
      },
      is_not_for: {
        title: "Para Quién No Es",
        items: [
          "Startups tempranas",
          "Empresas sin sponsor real",
          "Dueños que no quieren tomar decisiones difíciles"
        ]
      }
    },
    booking: {
      tag: "Conversemos",
      title: "Si tu empresa necesita orden antes de crecer, conversemos.",
      subtitle: "Primero entendemos el problema. Luego decidimos si tiene sentido trabajar juntos.",
      steps: [
        { title: "Pre-evaluación", desc: "Validamos si el problema es estructural." },
        { title: "Diagnóstico", desc: "Confirmamos si somos el socio adecuado." },
        { title: "Reunión", desc: "Sesión de 30 min para profundizar." }
      ],
      cta: "Agendar Primera Sesión",
      confidential: "Datos confidenciales"
    },
    services: {
      tag: "Fases de Intervención",
      title_1: "Transformamos el desorden",
      title_2: "en un sistema rentable.",
      subtitle: "No intervenimos solo un área; ordenamos la columna vertebral de tu negocio.",
      cards: [
        { title: "Decisiones con Datos", desc: "Tableros ejecutivos para dejar de decidir por intuición y empezar a decidir por márgenes." },
        { title: "Estructura de Mando", desc: "Gobierno corporativo y roles donde cada persona sabe exactamente qué se espera de ella." },
        { title: "Sistemas Comerciales", desc: "Ventas que no dependen de la agenda del dueño, sino de un proceso repetible." },
        { title: "Control de Gestión", desc: "Visibilidad total sobre costos, caja y eficiencia operativa en tiempo real." },
        { title: "Liderazgo Ejecutivo", desc: "Desarrollamos a tu equipo para que tome decisiones sin tener que preguntarte todo." },
        { title: "Escalabilidad Real", desc: "Preparamos la operación para que el crecimiento no signifique más caos, sino más valor." }
      ]
    },
    testimonials: {
      tag: "Resultados",
      title: "Impacto real en",
      title_italic: "negocios en marcha."
    },
    footer: {
      desc: "Consultoría estratégica para empresas que buscan orden, rentabilidad y crecimiento con control.",
      contact: "Contacto",
      legal: "Legal",
      privacy: "Aviso de Privacidad",
      terms: "Términos y Condiciones",
      ethics: "Código de Ética",
      rights: "Todos los derechos reservados."
    },
    questionnaire: {
      cancel: "Cancelar",
      title: "Perfilamiento",
      subtitle: "Validación rápida para asegurar que podemos aportar valor real a tu negocio.",
      step1: "Perfil de Empresa",
      step2: "Agendar Sesión",
      mob_step: "Paso",
      mob_of: "de",
      final_step: "Paso Final",
      select_time: "Selecciona tu horario",
      step1_title: "Datos Clave",
      step1_subtitle: "Para asegurarnos de que somos el socio correcto.",
      role_label: "Tu Rol Actual",
      role_ph: "Selecciona tu rol",
      roles: {
        owner: "Dueño / Socio / CEO",
        manager: "Gerente / Director de Área",
        consultant: "Consultor Externo",
        student: "Estudiante / Investigación"
      },
      rev_label: "Ventas Anuales (Aprox USD)",
      rev_opts: {
        l500: "< USD 500k",
        m500: "USD 500k - 1M",
        m1: "USD 1M - 10M",
        m10: "> USD 10M"
      },
      emp_label: "Tamaño del equipo",
      emp_ph: "Selecciona",
      emp_opts: {
        o1: "1 - 10 personas",
        o11: "11 - 50 personas",
        o51: "51 - 200 personas",
        o200: "+200 personas"
      },
      btn_next: "Ver disponibilidad",
      disqualify: {
        title: "No somos el socio adecuado hoy",
        text_1: "Muchas gracias por tu interés. En Baumann&Co nos enfocamos exclusivamente en trabajar directamente con",
        text_bold: "dueños y gerentes generales",
        text_2: "de empresas con estructura operando.",
        text_3: "Según tus respuestas, no parecemos ser el 'fit' ideal para tu situación actual.",
        btn: "Volver al inicio"
      }
    },
    legal_pages: {
      privacy: {
        title: "Aviso de Privacidad",
        content: `En Baumann&Co, la confidencialidad de nuestros clientes es el pilar de nuestra operación. Entendemos que la información estratégica, financiera y operativa que comparte con nosotros es el activo más valioso de su organización.

1. Recolección de Información
Recopilamos únicamente la información necesaria para evaluar la viabilidad de una colaboración estratégica y para la ejecución de nuestros servicios de consultoría.

2. Uso de la Información
La información proporcionada se utiliza exclusivamente para diagnosticar la situación actual de su empresa y evaluar el ajuste entre sus necesidades y nuestros servicios.

3. Protección de Datos
Implementamos estándares de seguridad rigurosos para proteger sus datos contra acceso no autorizado. No vendemos ni compartimos su información con terceros sin su consentimiento.`
      },
      terms: {
        title: "Términos y Condiciones",
        content: `Bienvenido a Baumann&Co. Al acceder a nuestros servicios y sitio web, usted acepta los siguientes términos y condiciones de uso.

1. Naturaleza de los Servicios
Baumann&Co ofrece servicios de consultoría estratégica y de gestión. La información proporcionada en este sitio web es de carácter informativo.

2. Propiedad Intelectual
Todo el contenido, metodología, logotipos y material presentado en este sitio son propiedad exclusiva de Baumann&Co.

3. Jurisdicción
Estos términos se rigen por las leyes de la República de Chile.`
      },
      ethics: {
        title: "Código de Ética",
        content: `Nuestro Código de Ética define los principios innegociables que guían cada interacción en Baumann&Co.

1. Integridad Absoluta
Actuamos con honestidad y transparencia. Si creemos que no podemos aportar valor real, lo comunicaremos abiertamente.

2. Confidencialidad Estricta
Tratamos toda la información del cliente con el máximo nivel de reserva.

3. Objetividad e Independencia
Nuestras recomendaciones se basan en análisis rigurosos y hechos.`
      }
    }
  },
  en: {
    nav: {
      about: "The Problem",
      services: "Phases",
      methodology: "Methodology",
      cta: "Book First Session"
    },
    hero: {
      tag: "Baumann&Co · Strategic Consulting",
      title_1: "Order. Profitability.",
      title_2: "Growth.",
      subtitle: "We support mid-sized business owners in bringing order to their business, regaining profitability, and growing with control.",
      cta_primary: "Book First Session",
      cta_secondary: "Our Way of Working"
    },
    problem: {
      tag: "The Problem",
      title_1: "Most mid-sized companies",
      title_2: "don't have a sales problem.",
      highlight: "They have a disorder problem.",
      bullets: [
        "Unclear roles.",
        "Intuition-based decisions.",
        "Owners trapped in operations."
      ],
      result: "The result: high effort, low profit, and risky growth."
    },
    methodology: {
      tag: "Our Way of Working",
      title: "Three consecutive phases",
      subtitle: "We don't believe in quick fixes or generic recipes. Each phase has a clear objective.",
      steps: [
        { 
          step: "01", 
          title: "Organizational Order", 
          desc: "We bring structure where there is currently confusion. Clear roles, defined responsibilities, and KPIs per position.",
          footer: "Without order, nothing works."
        },
        { 
          step: "02", 
          title: "Controlled Profitability", 
          desc: "We identify where money is gained and lost. We align focus, incentives, and decisions.",
          footer: "Selling more isn't always earning more."
        },
        { 
          step: "03", 
          title: "Growth with Control", 
          desc: "We design growth absorbable by the organization, not by the owner's extra effort.",
          footer: "Grow without breaking the company."
        }
      ]
    },
    fit: {
      is_for: {
        title: "Who It's For",
        items: [
          "Owners and General Managers",
          "Mid-sized companies",
          "Businesses wanting to grow without losing control"
        ]
      },
      is_not_for: {
        title: "Who It's Not For",
        items: [
          "Early-stage startups",
          "Companies without real sponsorship",
          "Owners unwilling to make tough decisions"
        ]
      }
    },
    booking: {
      tag: "Let's Talk",
      title: "If your company needs order before growth, let's talk.",
      subtitle: "First we understand the problem. Then we decide if it makes sense to work together.",
      steps: [
        { title: "Pre-evaluation", desc: "We validate if the problem is structural." },
        { title: "Diagnosis", desc: "We confirm if we are the right partner." },
        { title: "Meeting", desc: "30-min session to dive deeper." }
      ],
      cta: "Book First Session",
      confidential: "Confidential data"
    },
    services: {
      tag: "Intervention Phases",
      title_1: "We transform disorder",
      title_2: "into a profitable system.",
      subtitle: "We don't just intervene in one area; we organize the backbone of your business.",
      cards: [
        { title: "Data-Driven Decisions", desc: "Executive dashboards to stop deciding by intuition and start deciding by margins." },
        { title: "Command Structure", desc: "Corporate governance and roles where everyone knows exactly what is expected of them." },
        { title: "Commercial Systems", desc: "Sales that don't depend on the owner's calendar, but on a repeatable process." },
        { title: "Management Control", desc: "Total visibility on costs, cash, and operational efficiency in real-time." },
        { title: "Executive Leadership", desc: "We develop your team to make decisions without having to ask you everything." },
        { title: "Real Scalability", desc: "We prepare the operation so growth doesn't mean more chaos, but more value." }
      ]
    },
    testimonials: {
      tag: "Results",
      title: "Real impact on",
      title_italic: "running businesses."
    },
    footer: {
      desc: "Strategic consulting for companies seeking order, profitability, and growth with control.",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      ethics: "Code of Ethics",
      rights: "All rights reserved."
    },
    questionnaire: {
      cancel: "Cancel",
      title: "Profiling",
      subtitle: "Quick validation to ensure we can provide real value to your business.",
      step1: "Company Profile",
      step2: "Book Session",
      mob_step: "Step",
      mob_of: "of",
      final_step: "Final Step",
      select_time: "Select your time",
      step1_title: "Key Data",
      step1_subtitle: "To ensure we are the right partner.",
      role_label: "Your Current Role",
      role_ph: "Select your role",
      roles: {
        owner: "Owner / Partner / CEO",
        manager: "Manager / Area Director",
        consultant: "External Consultant",
        student: "Student / Research"
      },
      rev_label: "Annual Sales (Approx USD)",
      rev_opts: {
        l500: "< USD 500k",
        m500: "USD 500k - 1M",
        m1: "USD 1M - 10M",
        m10: "> USD 10M"
      },
      emp_label: "Team Size",
      emp_ph: "Select",
      emp_opts: {
        o1: "1 - 10 people",
        o11: "11 - 50 people",
        o51: "51 - 200 people",
        o200: "+200 people"
      },
      btn_next: "Check Availability",
      disqualify: {
        title: "We are not the right partner today",
        text_1: "Thank you for your interest. At Baumann&Co we focus exclusively on working directly with",
        text_bold: "owners and CEOs",
        text_2: "of companies with an existing structure.",
        text_3: "Based on your answers, we don't seem to be the ideal fit for your current situation.",
        btn: "Back to Home"
      }
    },
    legal_pages: {
      privacy: {
        title: "Privacy Policy",
        content: `At Baumann&Co, client confidentiality is the pillar of our operation.

1. Information Collection
We collect only the information necessary to evaluate the feasibility of a strategic partnership.

2. Use of Information
The information provided is used exclusively to diagnose your company's current situation.

3. Data Protection
We implement rigorous security standards to protect your data.`
      },
      terms: {
        title: "Terms and Conditions",
        content: `Welcome to Baumann&Co. By accessing our services and website, you agree to the following terms and conditions.

1. Nature of Services
Baumann&Co offers strategic and management consulting services.

2. Intellectual Property
All content presented on this site are the exclusive property of Baumann&Co.

3. Jurisdiction
These terms are governed by the laws of the Republic of Chile.`
      },
      ethics: {
        title: "Code of Ethics",
        content: `Our Code of Ethics defines the non-negotiable principles that guide every interaction at Baumann&Co.

1. Absolute Integrity
We act with honesty and transparency in all our recommendations.

2. Strict Confidentiality
We treat all client information with the highest level of privacy.

3. Objectivity and Independence
Our recommendations are based on rigorous analysis and facts.`
      }
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
    t: translations[language]
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
