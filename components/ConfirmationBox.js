import React from 'react';

const ConfirmationBox = ({ onYes, onNo, texto1, texto2, posicaoX, posicaoY }) => {
  return (
    <div className="confirmation-box">
      <div className="buttons">
        {onYes && <button className="btn-yes" onClick={onYes}>{texto1 ? texto1 : 'Sim'}</button>}
        {onNo && <button className="btn-no" onClick={onNo}>{texto2 ? texto2 : 'Não'}</button>}      
      </div>
      <style jsx>{`
        .confirmation-box {
          position: absolute;
          top: ${posicaoY ? posicaoY : '50%'};
          right: ${posicaoX ? posicaoX : '10%'};
          transform: translateX(-50%);
          background-color: #f1f1f1;
          border: 1px solid #0a0a0a;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .buttons {
          margin-top: 10px;
        }
        
        .buttons button {
          margin-right: 10px;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .buttons button:hover {
          background-color: #ddd;
        }
        
        .btn-yes {
          color: #fff;
          background-color: #27ae60;
        }
        
        .btn-no {
          color: #fff;
          background-color: #c0392b;
        }
        
        
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
      `}</style>
    </div>
  );
};

export default ConfirmationBox;
