import React from 'react';
import Image from 'next/image';

const Personagem = ({img, posicao, inverter}) => {
  return (
    <div>
        <Image
              className={`personagem ${inverter ? 'inverter' : ''}`}
              style={{ right: `${posicao}` }}
              src ={`/src/personagens/${img}.svg`}
              width={450}
              height={450}
              alt="mentor"
              priority
            />
    </div>
  );
};

export default Personagem;
