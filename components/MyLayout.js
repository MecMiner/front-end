import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="game-frame">
        {children}
      </div>
      <style jsx>{`
        .layout {
          max-width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
      
        .game-frame {
            width: 90%;
            max-width: 90%;
            height: 90%;
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
