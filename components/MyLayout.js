import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {

  const [shouldShowSite, setShouldShowSite] = useState(false);

  useEffect(() => {
    function handleResize() {
      setShouldShowSite(window.innerWidth >= 1024);
    }

    // Inicialização
    handleResize();

    // Adiciona um listener para o evento de resize
    window.addEventListener('resize', handleResize);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="layout">
      {shouldShowSite ? (
        <div className="game-frame">
          {children}
        </div>
      ) : (
        <p>O site não pode ser exibido em telas tão pequenas.</p>
      )}
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
            width: 100%;
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
