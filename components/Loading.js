import { useState, useEffect } from "react";
import React from 'react';

const Loading = ({texto, infinite}) => {
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      if (infinite) {
        
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    }, [infinite]);
  
    if (isLoading) {
      return (
        <div className="loading-container">
          {texto && <h2 style={{ position: 'absolute',display: 'block', bottom:'30%'}}>{texto}</h2>}
          <div className="spinner">       
          </div>
          <style jsx>{`
              .loading-container {
                position: absolute;
                border-radius: 2%;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(255, 255, 255, 1); /* Define um fundo semi-transparente */
                z-index: 9999; /* Certifique-se de que o loading fique acima dos outros elementos */
              }
              
              .spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: #7986cb;
                animation: spin 1s infinite linear;
                border-radius: 50%;
                width: 40px;
                height: 40px;
              }
              
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
              
            
          `}</style>
        </div>
      );
    }
  
    return null;
  };
export default Loading;
