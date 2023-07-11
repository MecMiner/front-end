import React from 'react';
import Image from 'next/image';

const Mentor = ({img, posicao, inverter,largura, altura}) => {
  return (
    <div>
        <Image
              className={`${inverter ? 'inverter' : ''}`}
              style={{ right: `${posicao}`, position: 'absolute', bottom: '0%' }}
              src ={`/src/personagens/${img}.svg`}
              width={largura? largura : 450}
              height={altura? altura: 450}
              alt="mentor"
              priority
            />
    </div>
  );
};

export default Mentor;
