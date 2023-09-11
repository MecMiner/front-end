import { useState, useEffect } from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

function FullScren() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement || !!document.webkitFullscreenElement);
    };

    // Verificar o estado da tela cheia assim que o componente for montado  
    handleFullScreenChange();

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (!isFullScreen) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  return (
    <div className="homeButton" onClick={toggleFullScreen}>
      <div className="linkContainer">
        {isFullScreen ? (
            <BsFullscreenExit size={24}/>
            
        ) : (
            <BsFullscreen size={24}/>
        )}
      </div>
      <style jsx>{`
        .homeButton {
          position: absolute;
          transform: translateX(-50%);
          left: 50%;
          z-index: 9999;
          cursor: pointer;
        }
        
        .linkContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 50%;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }
        
        .linkContainer:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
    
  );
}

export default FullScren;
