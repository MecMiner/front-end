import React from 'react';

const ExibirDica = ({ dica, setExibirDica }) => {
  const handleExit = () => {
    setExibirDica(false);
  };

  return (
    <div>
      <div className='info-overlay'>
        <div className='info'>
          <div className='close-button' onClick={handleExit}>
            X
          </div>
          <h2>Dica</h2>
          <p>{dica}</p>
        </div>
      </div>
      <style jsx>{`
        .info-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          min-width: 1040px;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .info {
          width: 500px;
          height: auto;
          max-height: 80vh;
          border: 2px solid #000;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          z-index: 9999999;
          position: relative;
          padding: 20px;
          overflow-y: auto;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 10px;
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

export default ExibirDica;
