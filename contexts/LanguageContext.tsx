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
    },
    legal_pages: {
      privacy: {
        title: "Aviso de Privacidad",
        content: `En Baumann&Co, la confidencialidad de nuestros clientes es el pilar de nuestra operación. Entendemos que la información estratégica, financiera y operativa que comparte con nosotros es el activo más valioso de su organización.

1. Recolección de Información
Recopilamos únicamente la información necesaria para evaluar la viabilidad de una colaboración estratégica y para la ejecución de nuestros servicios de consultoría. Esto incluye datos de contacto, métricas financieras generales y desafíos operativos.

2. Uso de la Información
La información proporcionada se utiliza exclusivamente para:
- Diagnosticar la situación actual de su empresa.
- Evaluar el ajuste entre sus necesidades y nuestros servicios.
- Ejecutar los servicios de consultoría contratados.
- Comunicaciones directas sobre su proyecto.

3. Protección de Datos
Implementamos estándares de seguridad rigurosos para proteger sus datos contra acceso no autorizado, alteración o divulgación. No vendemos, alquilamos ni compartimos su información con terceros sin su consentimiento explícito, salvo obligación legal.

4. Retención
Mantenemos su información solo el tiempo necesario para cumplir con los propósitos descritos o según lo requiera la ley.

Para ejercer sus derechos de acceso, rectificación o eliminación de datos, contacte directamente a contacto@baumann-co.com.`
      },
      terms: {
        title: "Términos y Condiciones",
        content: `Bienvenido a Baumann&Co. Al acceder a nuestros servicios y sitio web, usted acepta los siguientes términos y condiciones de uso.

1. Naturaleza de los Servicios
Baumann&Co ofrece servicios de consultoría estratégica y de gestión. La información proporcionada en este sitio web es de carácter informativo y no constituye asesoramiento legal o financiero vinculante hasta la firma de un contrato de servicios formal.

2. Propiedad Intelectual
Todo el contenido, metodología, logotipos y material presentado en este sitio son propiedad exclusiva de Baumann&Co. Está prohibida su reproducción, distribución o uso comercial sin autorización escrita.

3. Limitación de Responsabilidad
Baumann&Co trabaja para asegurar la precisión de la información presentada, pero no garantiza resultados específicos, ya que el éxito de la implementación estratégica depende también de la ejecución por parte del cliente.

4. Modificaciones
Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuo de nuestros servicios implica la aceptación de dichos cambios.

5. Jurisdicción
Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa será resuelta en los tribunales de Santiago.`
      },
      ethics: {
        title: "Código de Ética",
        content: `Nuestro Código de Ética define los principios innegociables que guían cada interacción y proyecto en Baumann&Co.

1. Integridad Absoluta
Actuamos con honestidad y transparencia en todas nuestras recomendaciones. Si creemos que no podemos aportar valor real a un cliente, lo comunicaremos abiertamente antes de iniciar cualquier compromiso.

2. Confidencialidad Estricta
Tratamos toda la información del cliente con el máximo nivel de reserva. Firmamos acuerdos de confidencialidad (NDA) y garantizamos que los datos sensibles nunca sean expuestos.

3. Objetividad e Independencia
Nuestras recomendaciones se basan en análisis rigurosos y hechos, no en intereses personales o de terceros. Mantenemos nuestra independencia de criterio en todo momento.

4. Competencia Profesional
Solo aceptamos proyectos para los cuales estamos calificados. Nos comprometemos al desarrollo profesional continuo para ofrecer soluciones de vanguardia.

5. Respeto
Fomentamos un ambiente de respeto mutuo con nuestros clientes, colaboradores y proveedores, valorando la diversidad de pensamiento y experiencia.`
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
    },
    legal_pages: {
      privacy: {
        title: "Privacy Policy",
        content: `At Baumann&Co, client confidentiality is the pillar of our operation. We understand that the strategic, financial, and operational information you share with us is your organization's most valuable asset.

1. Information Collection
We collect only the information necessary to evaluate the feasibility of a strategic partnership and for the execution of our consulting services. This includes contact details, general financial metrics, and operational challenges.

2. Use of Information
The information provided is used exclusively to:
- Diagnose your company's current situation.
- Evaluate the fit between your needs and our services.
- Execute the contracted consulting services.
- Direct communications regarding your project.

3. Data Protection
We implement rigorous security standards to protect your data against unauthorized access, alteration, or disclosure. We do not sell, rent, or share your information with third parties without your explicit consent, unless legally required.

4. Retention
We retain your information only as long as necessary to fulfill the described purposes or as required by law.

To exercise your rights of access, rectification, or deletion of data, please contact contacto@baumann-co.com directly.`
      },
      terms: {
        title: "Terms and Conditions",
        content: `Welcome to Baumann&Co. By accessing our services and website, you agree to the following terms and conditions of use.

1. Nature of Services
Baumann&Co offers strategic and management consulting services. The information provided on this website is for informational purposes and does not constitute binding legal or financial advice until a formal service contract is signed.

2. Intellectual Property
All content, methodology, logos, and material presented on this site are the exclusive property of Baumann&Co. Reproduction, distribution, or commercial use without written authorization is prohibited.

3. Limitation of Liability
Baumann&Co works to ensure the accuracy of the information presented but does not guarantee specific results, as the success of strategic implementation also depends on execution by the client.

4. Modifications
We reserve the right to modify these terms at any time. Continued use of our services implies acceptance of such changes.

5. Jurisdiction
These terms are governed by the laws of the Republic of Chile. Any dispute will be resolved in the courts of Santiago.`
      },
      ethics: {
        title: "Code of Ethics",
        content: `Our Code of Ethics defines the non-negotiable principles that guide every interaction and project at Baumann&Co.

1. Absolute Integrity
We act with honesty and transparency in all our recommendations. If we believe we cannot provide real value to a client, we will communicate this openly before initiating any engagement.

2. Strict Confidentiality
We treat all client information with the highest level of privacy. We sign non-disclosure agreements (NDAs) and guarantee that sensitive data is never exposed.

3. Objectivity and Independence
Our recommendations are based on rigorous analysis and facts, not on personal or third-party interests. We maintain our independent judgment at all times.

4. Professional Competence
We only accept projects for which we are qualified. We are committed to continuous professional development to offer cutting-edge solutions.

5. Respect
We foster an environment of mutual respect with our clients, collaborators, and suppliers, valuing diversity of thought and experience.`
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