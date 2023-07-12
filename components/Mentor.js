import React from 'react';
import Image from 'next/image';

const Mentor = ({img, posicao, inverter,largura, altura}) => {
  return (
    <div className="mentor">
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              src ={`/src/personagens/${img}.svg`}
              width={largura? largura : 380}
              height={altura? altura: 380}
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
