"use client"
import React from 'react';

interface ButtonProps {
  onYes?: () => void;
  onNo?: () => void;
  texto1?: string;
  texto2?: string;
  posicaoX?: string;
  posicaoY?: string;
  link?: string;
  tamanho?: string;
}

const Button: React.FC<ButtonProps> = ({
  onYes,
  onNo,
  texto1,
  texto2,
  posicaoX,
  posicaoY,
  link,
  tamanho
}) => {
  return (
    <div
      className={`absolute ${posicaoY ? posicaoY : 'top-1/2'} ${posicaoX ? posicaoX : 'right-10'} transform -translate-x-1/2 z-50`}
      style={{ width: tamanho || 'auto' }}
    >
      {link && (
        <a href={link} target="_blank" className="text-blue-500 hover:underline">
          {link}
        </a>
      )}
      <div className="mt-2 flex">
        {onYes && (
          <button
            className="mr-2 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-400 transition-colors"
            onClick={onYes}
          >
            {texto1 || 'Yes'}
          </button>
        )}
        {onNo && (
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-400 transition-colors"
            onClick={onNo}
          >
            {texto2 || 'No'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Button;
