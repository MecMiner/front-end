import React from 'react';
import Image from 'next/image';

const Mentor = ({img, posicao, inverter,tamanho}) => {
  return (
    <div className="mentor">
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              src ={`/src/personagens/${img}.svg`}
              width={tamanho? tamanho : 380}
              height={tamanho? tamanho: 380}
              alt="mentor"
              priority
            />
        <style jsx>{`
          .mentor {
            position: absolute;
            left: ${posicao};
            bottom: 0%;
            transform: translateX(-50%);
          }
        `}</style>
    </div>
  );
};

export default Mentor;
