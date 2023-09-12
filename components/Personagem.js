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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
            />
        <style jsx>{`
          .personagem {
            height:${tamanho? tamanho : '50'}%;
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
