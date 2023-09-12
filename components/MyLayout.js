import React, { useState } from 'react';

const Layout = ({ children }) => {

  const checkIsMobile = () => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }
    return false; // Trata como não sendo um dispositivo móvel se `window` não estiver definido
  };

  const isMobile = checkIsMobile();

  return (
    <div className="layout">
      <div className="game-frame">
          {children}
        </div>
      <style jsx>{`
        .layout {
          min-width: ${isMobile ? '1040px' : '1040px'};
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
      
        .game-frame {
            width: 100%;
            max-width: 90%;
            aspect-ratio: 16 / 8;
            border: 2px solid #000;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            position: relative;
        }   
        
  
      `}</style>
    </div>
    
  );
};

export default Layout;
