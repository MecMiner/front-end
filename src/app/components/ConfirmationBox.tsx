"use client"
import React from 'react';

interface ConfirmationBoxProps {
  onYes?: () => void;
  onNo?: () => void;
  texto1?: string;
  texto2?: string;
  posicaoX?: string;
  posicaoY?: string;
  link?: string;
  tamanho?: string;
  textoLink?: string;
  texto?: string;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  onYes,
  onNo,
  texto1 = 'Yes',
  texto2 = 'No',
  posicaoX = '60%',
  posicaoY = '40%',
  link,
  tamanho,
  textoLink,
  texto,
}) => {
  return (
    <div
      className="absolute bg-gray-100 border border-black rounded-lg shadow-lg p-5 z-50"
      style={{
        top: posicaoY,
        left: posicaoX,
        transform: 'translateY(-100%)',
        width: tamanho || 'auto',
      }}
    >
      {texto && <p className="text-base mb-2">{texto}</p>}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {textoLink || link}
        </a>
      )}
      <div className="mt-3 flex gap-3">
        {onYes && (
          <button
            onClick={onYes}
            className="bg-green-600 text-white text-lg px-4 py-2 rounded-md hover:bg-green-500 transition-colors"
          >
            {texto1}
          </button>
        )}
        {onNo && (
          <button
            onClick={onNo}
            className="bg-red-600 text-white text-lg px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
          >
            {texto2}
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmationBox;
