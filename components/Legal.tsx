import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalProps {
  type: 'privacy' | 'terms' | 'ethics';
  onBack: () => void;
}

const Legal: React.FC<LegalProps> = ({ type, onBack }) => {
  const { t } = useLanguage();
  
  const content = t.legal_pages[type];

  // Helper to process newlines into paragraphs
  const renderContent = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-6 leading-relaxed whitespace-pre-line">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-white text-brand-grey animate-fade-in">
      <header className="bg-brand-primary py-6 px-6 md:px-12 text-white sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 hover:text-brand-accent transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
            {t.questionnaire.cancel || 'Volver'}
          </button>
          <div className="h-6 w-px bg-white/20 mx-2"></div>
          <span className="font-serif italic opacity-80">Legal</span>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-12 md:py-20 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-serif text-brand-primary mb-12">{content.title}</h1>
        
        <div className="prose prose-lg text-brand-grey max-w-none font-light">
          {renderContent(content.content)}
        </div>
        
        <div className="mt-16 pt-8 border-t border-brand-accent/30">
          <button 
            onClick={onBack}
            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors underline"
          >
            {t.questionnaire.disqualify.btn || 'Volver al inicio'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Legal;