import React from 'react';
import Image from 'next/image';

const Personagem = ({img, posicao, inverter, tamanho}) => {
  return (
    <div className="personagem">
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              src ={`/src/personagens/${img}.png`}
              width={tamanho? tamanho : 380}
              height={tamanho? tamanho: 380}
              alt="persongem"
              priority
            />
        <style jsx>{`
          .personagem {
            position: absolute;
            left: ${posicao};
            bottom: 0%;
            transform: translateX(-50%);
          }
        `}</style>
    </div>
  );
};

export default Personagem;
