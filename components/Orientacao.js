import { Children, useEffect, useState } from 'react';

const CheckOrientacao = ({children}) => {
    const [isLandscape, setIsLandscape] = useState(true);

    useEffect(() => {
      function checkOrientation() {
        const isCurrentLandscape = window.matchMedia('(orientation: landscape)').matches;
        setIsLandscape(isCurrentLandscape);
      }
  
      // Verifique a orientação ao carregar a página
      checkOrientation();
  
      // Adicione um ouvinte de evento de orientação
      window.addEventListener('orientationchange', checkOrientation);
  
      return () => {
        // Remova o ouvinte de evento ao desmontar o componente
        window.removeEventListener('orientationchange', checkOrientation);
      };
    }, []);
  
    useEffect(() => {
      // Bloqueie a orientação para paisagem
      if (!isLandscape) {
        // Força a orientação paisagem se não estiver nela
        if (window.screen.orientation) {
          window.screen.orientation.lock('landscape');
        } else if (window.screen.lockOrientation) {
          window.screen.lockOrientation('landscape');
        }
      }
    }, [isLandscape]);

  return (
    <div>
      {isLandscape && (
        <div className="orientation-message">
          <p>Gire o dispositivo para a orientação paisagem para uma melhor experiência.</p>
        </div>
      )}
      {children}
      <style jsx>{`
  .orientation-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9); /* Fundo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999999999999; /* Coloque acima de outros elementos */
  }

  .orientation-message p {
    color: white;
    font-size: 20px;
    text-align: center;
  }
`}</style>
    </div>
  );
};

export default CheckOrientacao;
