import Image from 'next/image';
import React from 'react';

const Coin = ({coin}) => {
  return (
      <div className="coin">
        <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
            <Image src={'/src/moeda.gif'} fill alt='moeda' priority />
        </div>
        
        <span className="value"> {coin} </span>
      <style jsx>{`
        .coin {       
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 5%;
        }

      `}</style>
    </div>
  );
};

export default Coin;