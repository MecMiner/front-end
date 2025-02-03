"use client";
import React, { useState, useEffect } from 'react';

interface DialogScreenProps {
  left?: boolean;
  right?: boolean;
  dialogText: string;
  cor?: string;
  complete?: () => void;
  name?: string | null;
}

const DialogScreen: React.FC<DialogScreenProps> = ({ left, right, dialogText, cor, complete, name }) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentLength, setCurrentLength] = useState<number>(0);
  const [dialogVisible, setDialogVisible] = useState<boolean>(true);

  useEffect(() => {
    setCurrentText('');
    setCurrentLength(0);
  }, [dialogText]);

  useEffect(() => {
    if (currentLength < dialogText.length) {
      const interval = setInterval(() => {
        setCurrentLength((prevLength) => {
          const newLength = prevLength + 1;
          setCurrentText(dialogText.slice(0, newLength));
          if (newLength >= dialogText.length) {
            clearInterval(interval);
            if (complete) {
              setTimeout(() => complete(), 0); // Corrige o erro
            }
          }
          return newLength;
        });
      }, 0); // Ajuste o tempo conforme necessário

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentLength, dialogText, complete]);

  return (
    <div>
      {dialogVisible && (
        <div
          className={`
            absolute
          bg-blue-100
            top-4
            left-0
            p-3
            text-black
            h-52
            opacity-85
            border border-solid border-spacing-0
          `}
          style={{
            width: '100%', 
            maxHeight: '160px', 
          }}
        >
          <div className='h-full w-full overflow-x-hidden'>
            <span className="whitespace-pre-wrap overflow-y-auto text-justify" style={{
              paddingRight: "10px", // Espaço para barra de rolagem
            }}>{currentText}</span>
          </div>
          {name && <div className='absolute font-bold text-slate-50 bottom-[-25px] text-center bg-red-200 rounded-lg py-1 px-2'
            style={{
              left: `${left ? '10rem' : ''}`,
              right: `${right ? '10rem' : ''}`,
            }}
          >{name}
          </div>}
        </div>
      )}
    </div>
  );
};

export default DialogScreen;
