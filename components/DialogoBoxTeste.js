import React, { useState } from 'react';

const DialogScreen = ({ tamanho, posicao, dialogText, cor, complete, posicaoY }) => {
  const [currentPart, setCurrentPart] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(true);

  const parts = dialogText.split('\n'); // Dividindo o texto em partes usando quebra de linha (\n)

  const handleNextPart = () => {
    if (currentPart + 1 < parts.length) {
      setCurrentPart(currentPart + 1);
    } else {
      complete();
    }
  };

  return (
    <div className='centerDown'>
      {dialogVisible && (
        <div className='dialogoBox'>
          <span style={{ whiteSpace: 'pre-wrap', fontSize: '18px' }}>{parts[currentPart]}</span>
          {currentPart + 1 < parts.length && (
            <div className='arrow' onClick={handleNextPart}>
              ➡️
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .dialogoBox {
          font-size: 10px;
          position: absolute;
          width: ${tamanho ? tamanho : '20%'};
          left: ${posicao ? posicao : '5%'};
          background-color: ${cor ? cor : 'blue'};
          top: ${posicaoY ? posicaoY : '10%'};
          padding: 10px;
          color: rgb(15, 5, 5);
          font-size: 16px;
          border: 1px solid #0a0a0a;
          height: auto;
          min-height: 100px;
          z-index: 999;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .centerDown {
          position: fixed;
          left: 50%;
          top: 20%;
        }

        .arrow {
          cursor: pointer;
          font-size: 24px;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default DialogScreen;
