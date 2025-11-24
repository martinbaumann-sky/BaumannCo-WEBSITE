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
      about: "Nosotros",
      services: "Servicios",
      methodology: "Metodología",
      cta: "Agendar Primera Sesión"
    },
    hero: {
      tag: "Estrategia clara. Crecimiento real.",
      title_1: "Deja de depender de",
      title_2: "ti mismo.",
      subtitle: "Recupera el orden, el control y la rentabilidad de tu empresa.",
      cta_primary: "Agendar Primera Sesión",
      cta_secondary: "Cómo ayudamos"
    },
    about: {
      tag: "Sobre Nosotros",
      title_1: "¿Tu empresa crece, pero",
      title_2: "sin estructura?",
      p1: "Baumann&Co. es una consultora especializada en **empresas medianas** que están creciendo, pero se están quedando sin estructura.",
      p2: "Fundada en Santiago por Manuel Baumann, acompañamos a dueños que hicieron crecer su empresa con esfuerzo propio, pero hoy se enfrentan a un negocio que depende demasiado de ellos, no tiene control claro y está perdiendo velocidad.",
      p3: "Nuestro foco es simple: ordenar la operación, clarificar la estrategia y construir los sistemas que permiten crecer sin que el dueño tenga que estar en todo.",
      p4: "Trabajamos con un enfoque directo, ejecutivo y orientado a resultados: diagnosticamos rápido, definimos el plan y lo ejecutamos **contigo y tu equipo**.",
      location: "Santiago, Chile",
      reach: "Atendemos a todo LatAm y USA"
    },
    services: {
      tag: "Nuestras Soluciones",
      title_1: "Ordena tu empresa para",
      title_2: "volver a crecer.",
      subtitle: "Tu empresa creció, pero tu estructura no. Ordenamos el negocio para que el sistema trabaje, no tú.",
      cards: [
        { title: "Decisions sin depender del dueño", desc: "Gobierno corporativo y reglas claras para operar con autonomía: roles definidos y control ejecutivo." },
        { title: "Ventas que no dependen de contactos", desc: "Transformamos la intuición en un sistema comercial predecible, medible y escalable." },
        { title: "Números claros para decidir", desc: "Tableros ejecutivos con márgenes, costos y caja real para tomar decisiones informadas." },
        { title: "Gerentes que gerencian", desc: "Desarrollamos líderes que toman decisiones, ejecutan planes y rinden cuentas." },
        { title: "Procesos que escalan", desc: "Ordenamos flujos y controles para que el crecimiento no quiebre la operación." },
        { title: "Rentabilidad real", desc: "Identificamos y priorizamos lo que genera margen; cortamos lo que drena recursos." }
      ]
    },
    methodology: {
      tag: "Cómo Trabajamos",
      title: "3 Pasos Claros",
      subtitle: "Acciones directas, sin ruido. Ordenamos tu negocio para que pueda crecer sin depender de ti.",
      steps: [
        { step: "01", title: "Diagnóstico Exacto", desc: "Revisamos tus números, procesos y equipo para identificar los cuellos de botella estructurales. Te decimos exactamente qué está frenando tu crecimiento." },
        { step: "02", title: "Orden y Estructura", desc: "Diseñamos cómo debe funcionar la empresa: ventas, operación, roles, procesos y métricas. Dejamos la casa ordenada y con reglas claras." },
        { step: "03", title: "Crecimiento Sostenible", desc: "Con la estructura lista, aceleramos ventas, mejoramos márgenes y habilitamos nuevos mercados. Tu negocio crece; tú recuperas control." }
      ]
    },
    testimonials: {
      tag: "Trayectoria Probada",
      title: "Impacto real en",
      title_italic: "decisiones críticas."
    },
    booking: {
      tag: "Conversemos",
      title: "Veamos si realmente podemos ayudarte.",
      subtitle: "Trabajamos con empresas que están creciendo, pero sienten que su estructura ya no acompaña. Antes de reunirnos, hacemos una pre-evaluación breve para confirmar si lo que necesitas es algo que efectivamente resolvemos. Es la forma más eficiente de respetar tu tiempo y el nuestro.",
      steps: [
        { title: "Pre-evaluación", desc: "Responde algunas preguntas clave sobre tu negocio para entender tu situación actual." },
        { title: "Diagnóstico de Ajuste", desc: "Validamos si el problema que describes es estructural y si está dentro de nuestro ámbito de trabajo." },
        { title: "Reunión Estratégica", desc: "Si hay fit, coordinamos una sesión de 30 minutos para profundizar en tu caso y definir próximos pasos." }
      ],
      cta: "Agendar Primera Sesión",
      confidential: "Datos confidenciales"
    },
    footer: {
      desc: "Consultoría estratégica para empresas que buscan redefinir su futuro. Excelencia, integridad e innovación.",
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
      role_label: "Your Current Role",
      role_ph: "Select your role",
      roles: {
        owner: "Owner / Partner / CEO",
        manager: "Commercial Manager / Area Manager",
        consultant: "External Consultant / Agency",
        student: "Student / Researching"
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
        o1: "1 - 10 people",
        o11: "11 - 50 people",
        o51: "51 - 200 people",
        o200: "+200 people"
      },
      btn_next: "Ver disponibilidad",
      disqualify: {
        title: "No somos el socio adecuado hoy",
        text_1: "Muchas gracias por tu interés. En Baumann&Co nos enfocamos exclusivamente en trabajar directamente con",
        text_bold: "socios y gerentes generales",
        text_2: "on estructura y gestión integral.",
        text_3: "Según tus respuestas, parece que tu rol actual no calza con nuestro modelo de intervención directa con tomadores de decisión final.",
        btn: "Volver al inicio"
      }
    }
  },
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      methodology: "Methodology",
      cta: "Book First Session"
    },
    hero: {
      tag: "Clear Strategy. Real Growth.",
      title_1: "Stop depending on",
      title_2: "yourself.",
      subtitle: "Regain order, control, and profitability for your company.",
      cta_primary: "Book First Session",
      cta_secondary: "How we help"
    },
    about: {
      tag: "About Us",
      title_1: "Is your company growing,",
      title_2: "but without structure?",
      p1: "Baumann&Co. is a consulting firm specialized in **mid-sized companies** that are scaling but lacking structure.",
      p2: "Founded in Santiago by Manuel Baumann, we support owners who grew their business through sheer effort but now face an operation that depends too much on them, lacks clear control, and is losing momentum.",
      p3: "Our focus is simple: organize operations, clarify strategy, and build systems that allow growth without the owner having to be involved in everything.",
      p4: "We work with a direct, executive, and results-oriented approach: quick diagnosis, plan definition, and execution **with you and your team**.",
      location: "Santiago, Chile",
      reach: "Serving LatAm & USA"
    },
    services: {
      tag: "Our Solutions",
      title_1: "Organize your company",
      title_2: "to grow again.",
      subtitle: "Your company grew, but your structure didn't. We organize the business so the system works, not just you.",
      cards: [
        { title: "Decisions without owner dependency", desc: "Corporate governance and clear rules for autonomous operation: defined roles and executive control." },
        { title: "Sales not dependent on contacts", desc: "We transform intuition into a predictable, measurable, and scalable commercial system." },
        { title: "Clear numbers for decisions", desc: "Executive dashboards with real margins, costs, and cash flow for informed decision-making." },
        { title: "Managers who actually manage", desc: "We develop leaders who make decisions, execute plans, and are accountable." },
        { title: "Processes that scale", desc: "We organize workflows and controls so growth doesn't break the operation." },
        { title: "Real Profitability", desc: "We identify and prioritize what generates margin; we cut what drains resources." }
      ]
    },
    methodology: {
      tag: "How We Work",
      title: "3 Clear Steps",
      subtitle: "Direct actions, no noise. We organize your business so it can grow without depending on you.",
      steps: [
        { step: "01", title: "Exact Diagnosis", desc: "We review your numbers, processes, and team to identify structural bottlenecks. We tell you exactly what is stalling your growth." },
        { step: "02", title: "Order & Structure", desc: "We design how the company should function: sales, operations, roles, processes, and metrics. We leave the house in order with clear rules." },
        { step: "03", title: "Sustainable Growth", desc: "With the structure ready, we accelerate sales, improve margins, and enable new markets. Your business grows; you regain control." }
      ]
    },
    testimonials: {
      tag: "Proven Track Record",
      title: "Real impact on",
      title_italic: "critical decisions."
    },
    booking: {
      tag: "Let's Talk",
      title: "Let's see if we can really help you.",
      subtitle: "We work with companies that are growing but feel their structure no longer keeps up. Before meeting, we conduct a brief pre-evaluation to confirm if your needs match what we solve. It is the most efficient way to respect your time and ours.",
      steps: [
        { title: "Pre-evaluation", desc: "Answer a few key questions about your business to understand your current situation." },
        { title: "Fit Diagnosis", desc: "We validate if the problem you describe is structural and within our scope of work." },
        { title: "Strategic Meeting", desc: "If there is a fit, we coordinate a 30-minute session to dive deeper into your case and define next steps." }
      ],
      cta: "Book First Session",
      confidential: "Confidential data"
    },
    footer: {
      desc: "Strategic consulting for companies looking to redefine their future. Excellence, integrity, and innovation.",
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
        manager: "Commercial Manager / Area Manager",
        consultant: "External Consultant / Agency",
        student: "Student / Researching"
      },
      rev_label: "Annual Revenue (Approx USD)",
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
        text_bold: "partners and CEOs",
        text_2: "on structure and integral management issues.",
        text_3: "Based on your answers, it seems your current role does not fit our direct intervention model with final decision-makers.",
        btn: "Back to Home"
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Detect browser language
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