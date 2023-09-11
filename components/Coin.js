import Image from 'next/image';
import React from 'react';

const Coin = ({info}) => {
  return (
      <div className="coin">
        <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
            <Image src={'/src/moeda.gif'} fill alt='moeda' priority />
        </div>
        
        <div className="text-container">
          <span className="value"> {info} </span>
        </div>              
      <style jsx>{`
        .coin {       
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding:5px;
        }
        .text-container {
          flex: 1; /* O texto ocupa todo o espaço disponível */
          display: flex;
          align-items: center;
          justify-content: center; /* Alinha o texto ao centro */
        }


      `}</style>
    </div>
  );
};

export default Coin;