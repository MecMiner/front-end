import { useRouter } from 'next/router';
import { BiHelpCircle } from 'react-icons/bi';
import { useState } from 'react';

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  const handleGoToHomePage = () => {
    setShowInfo(true);
  };

  const handleExit = () => {
    setShowInfo(false);
  };

  return (
    <div>
      {showInfo && (
        <div className='info-overlay'>
          <div className='info'>
            <div className='close-button' onClick={() => handleExit()}>
              X
            </div>
            <p>{`Informações

Cada desafio é composto por 4 níveis, e a medida que avança esses níveis são liberados. Em cada nível você será desafiado a resolver um problema, e terá 3 tentativas para fazer isso.

No decorrer do desafio você recebe algumas recompensas, sendo elas: moedas, XPs e badges.

As moedas podem ser utilizadas para comprar dicas, ou seja, para comprar informações que podem te ajudar a resolver os problemas propostos.

Os XPs e badges indicam sua evolução dentro da plataforma. Existem 3 badges distintos:
Ótimo desempenho: recebe quando acerta as respostas na primeira tentativa.
Bom desempenho: recebe quando acerta a resposta na segunda ou terceira tentativa.
Colaboração: recebe quando contribui com a plataforma de alguma maneira, seja avaliando os conteúdos, ou até mesmo criando novos exemplos.`}</p>
          </div>
        </div>
      )}
      <div className='homeButton' onClick={handleGoToHomePage}>
        <div className='linkContainer'>
          <BiHelpCircle size={24} />
        </div>
      </div>
      <style jsx>{`
        .info-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .info {
          width: 50%;
          height: 50%;
          border: 2px solid #000;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          z-index: 9999;
          position: relative;
          overflow-y: auto;
        }

        .homeButton {
          position: absolute;
          transform: translateX(-50%);
          left: 50%;
          z-index: 99;
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

        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: red;
            cursor: pointer;
            transition: color 0.3s ease;
            
            &:hover {
              color: #ddd;
            }
            
            &:active {
              color: #ddd;
            }
          }
      `}</style>
    </div>
  );
};

export default InfoButton;
