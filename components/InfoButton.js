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
            <div className="info-title-container">
              <h3 className="info-title">{`Informações`}</h3>
              <div
                className='close-button'
                onClick={() => handleExit()}
              >
                X
              </div>
            </div>
            <div>
              <p>{`Cada desafio é composto por 4 níveis, e a medida que avança esses níveis são liberados. Em cada nível você será desafiado a resolver um problema, e terá 3 tentativas para fazer isso`}</p>

              <p>{`No decorrer do desafio você recebe algumas recompensas, sendo elas: moedas, XPs e badges.:`}</p>

              <ul>
                <li>{`💰 Moedas: Use suas moedas para adquirir dicas valiosas que podem ajudá-lo a superar os obstáculos. Lembre-se, a dica de um colega custa apenas 5 moedas, enquanto a dica do professor requer 10 moedas.`}</li>
                <li>{`🌟 XPs: Acumule XPs para demonstrar sua habilidade e experiência na plataforma.`}</li>
                <li>{`🏆 Badges: Colete distintivos que representam suas conquistas. Há três tipos de distintivos disponíveis:`}</li>
                <ul>
                  <li>{`🥇 Ótimo Desempenho: Ganhe este distintivo ao acertar respostas na primeira tentativa.`}</li>
                  <li>{`🥈 Bom Desempenho: Mostre sua perseverança e conquiste este distintivo ao acertar a resposta na segunda ou terceira tentativa.`}</li>
                  <li>{`🤝 Colaboração: Contribua para a comunidade avaliando conteúdos e criando novos exemplos. Este distintivo é uma recompensa pela sua generosidade.`}</li>
                </ul>
              </ul>
            </div>

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
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .info {
          position: relative;
          width: 80%;
          height: 80%;
          border: 2px solid #000;
          border-radius: 10px;
          background-color: #fff;
          z-index: 9999;
          overflow-y: auto;
          padding: 20px;
        }

        .info-title-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
        }

        .info-title {
          font-size: 24px;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
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

        .info-content {
          padding: 10px;
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
      `}</style>
    </div>
  );
};

export default InfoButton;
