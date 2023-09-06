import Image from 'next/image';
import React from 'react';

const Copyright = () => {
  return (
      <div className="coin">
   
        <span style={{color: 'white'}} className="value"> © Jeferson Souza</span>
      <style jsx>{`
        .coin {       
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Copyright;