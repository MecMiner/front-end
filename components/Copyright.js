import Image from 'next/image';
import React from 'react';

const Copyright = () => {
  return (
      <div className="coin">
   
        <p style={{color: 'black'}} className="value"> © Jeferson Souza</p>
      <style jsx>{`
        .coin { 
          position: absolute;      
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
        }
      `}</style>
    </div>
  );
};

export default Copyright;