import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white 
        rounded-2xl 
        border 
        border-neutral-200 
        shadow-sm 
        p-6 
        ${hoverEffect ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
