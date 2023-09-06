import React from 'react';
import Image from 'next/image';

const ButtonAdvance = ({buttonClick}) => {
  return (
    <div >
        <button className='button-advance' onClick={buttonClick}>
              <Image
                className='circular-image'
                src="/src/mapa/seta.svg"
                fill
                alt="numero1"
                priority
              />
            </button>
            <style jsx>{`
              .button-advance{
                  width: 10%;
                  aspect-ratio: 1/1;
                  position: absolute;
                  top: 45%;
                  right: 0%;
                  border-radius: 50%;
                  background-color: #eaeaea00;
                  border: none;
                  transition: transform 0.3s;
              }

              .button-advance:hover {
                transform: scale(1.2);
              }
            
            `}</style>
    </div>
  );
};

export default ButtonAdvance;
