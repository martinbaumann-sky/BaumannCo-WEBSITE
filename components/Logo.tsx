import React from 'react';

interface LogoProps {
  className?: string;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 md:h-10", textColor = "currentColor" }) => {
  return (
    <div className={`flex items-center gap-2 md:gap-3 leading-none ${className}`}>
      {/* Isotipo: Las 3 barras azules escalonadas */}
      <svg 
        viewBox="0 0 140 100" 
        className="h-[80%] w-auto flex-shrink-0"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="66" width="48" height="15" rx="3" fill="#3B82F6" />
        <rect x="22" y="37" width="68" height="15" rx="3" fill="#3B82F6" />
        <rect x="52" y="8" width="88" height="15" rx="3" fill="#3B82F6" />
      </svg>
      
      {/* Texto en tipografía Inter */}
      <span 
        className="font-sans font-semibold tracking-tighter whitespace-nowrap"
        style={{ 
          color: textColor,
          fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
          lineHeight: '1'
        }}
      >
        BAUMANN&CO.
      </span>
    </div>
  );
};

export default Logo;