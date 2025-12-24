import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'standard' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 md:h-10", variant = 'standard' }) => {
  const isWhite = variant === 'white';
  
  // Colores exactos extraídos de las imágenes de marca
  const blueColor = isWhite ? "#FFFFFF" : "#1B365D";
  const grayColor = isWhite ? "#FFFFFF" : "#53565A";

  return (
    <div className={`flex items-center gap-3 leading-none ${className}`}>
      {/* Isotipo: Tres barras escalonadas alineadas a la derecha */}
      <svg 
        viewBox="0 0 140 100" 
        className="h-[60%] w-auto flex-shrink-0"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Barra superior (Corta) */}
        <rect x="90" y="10" width="45" height="18" rx="2" fill={blueColor} />
        {/* Barra media (Media) */}
        <rect x="50" y="41" width="85" height="18" rx="2" fill={blueColor} />
        {/* Barra inferior (Larga) */}
        <rect x="10" y="72" width="125" height="18" rx="2" fill={blueColor} />
      </svg>
      
      {/* Texto: Baumann (Azul) + &Co. (Gris) */}
      <div className="font-serif font-bold tracking-tight whitespace-nowrap flex items-baseline">
        <span style={{ color: blueColor, fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)' }}>Baumann</span>
        <span style={{ color: grayColor, fontSize: 'clamp(0.9rem, 2vw, 1.5rem)', marginLeft: '2px' }}>&Co.</span>
      </div>
    </div>
  );
};

export default Logo;