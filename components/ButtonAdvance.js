import React from 'react';
import Image from 'next/image';

const ButtonAdvance = ({buttonClick}) => {
  return (
    <div>
        <button className='circular-button nextButton' onClick={buttonClick}>
              <Image
                className='circular-image'
                src="/src/mapa/seta.png"
                width={100}
                height={100}
                alt="numero1"
                priority
              />
            </button>
    </div>
  );
};

export default ButtonAdvance;
