"use client"
import React from 'react';
import Image from 'next/image';

interface AdvanceButtonProps {
  buttonClick: () => void;
}

const AdvanceButton: React.FC<AdvanceButtonProps> = ({ buttonClick }) => {
  return (
    <div>
      <button
        className="absolute top-1/2 right-0 w-[10%] aspect-square rounded-full bg-transparent border-none transition-transform duration-300 hover:scale-110"
        onClick={buttonClick}
      >
        <Image
          className="w-full h-full object-contain"
          src="/src/mapa/seta.svg"
          alt="arrow"
          fill
          priority
        />
      </button>
    </div>
  );
};

export default AdvanceButton;
