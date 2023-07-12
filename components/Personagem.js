import React from 'react';
import Image from 'next/image';

const Personagem = ({img, posicao, inverter, largura, altura}) => {
  return (
    <div className="personagem">
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              src ={`/src/personagens/${img}.svg`}
              width={largura? largura : 380}
              height={altura? altura: 380}
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
