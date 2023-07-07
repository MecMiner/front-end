import React from 'react';
import Image from 'next/image';

const Personagem = ({img, posicao, inverter}) => {
  return (
    <div>
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              style={{ right: `${posicao}`, position: 'absolute', bottom: '0%' }}
              src ={`/src/personagens/${img}.svg`}
              width={450}
              height={450}
              alt="personagem"
              priority
            />
    </div>
  );
};

export default Personagem;
