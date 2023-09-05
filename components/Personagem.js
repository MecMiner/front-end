import React from 'react';
import Image from 'next/image';

const Personagem = ({img, posicao, inverter, tamanho}) => {
  return (
    <div className="personagem">
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              src ={`/src/personagens/${img}.png`}
              fill
              alt="persongem"
              priority
              loading="eager"
            />
        <style jsx>{`
          .personagem {
            height:${tamanho? tamanho : '10'}%;
            aspect-ratio: 1 / 1;
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
