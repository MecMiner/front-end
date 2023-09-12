import React from 'react';

const ConfirmationBox = ({ onYes, onNo, texto1, texto2, posicaoX, posicaoY, link, tamanho, textoLink, texto }) => {
  return (
    <div className="confirmation-box">
        {texto && <p className="texto">{texto}</p>}
        {link && (
          <a href={link} target="_blank">{textoLink? textoLink: link}</a>
        )}  
      <div className="buttons">      
        {onYes && <button className="btn-yes" onClick={onYes}>{texto1 ? texto1 : 'Sim'}</button>}
        {onNo && <button className="btn-no" onClick={onNo}>{texto2 ? texto2 : 'Não'}</button>}    
      </div>
      <style jsx>{`
        .confirmation-box {
          position: absolute;
          ${tamanho ? `width: ${tamanho};` : '' }
          top: ${posicaoY ? posicaoY : '50%'};
          left: ${posicaoX ? posicaoX : '60%'};
          transform: translateY(-100%);
          background-color: #f1f1f1;
          border: 1px solid #0a0a0a;
          padding: 20px;
          border-radius: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .texto {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .buttons {
          margin-top: 10px;
        }
        
        .buttons button {
          margin-right: 10px;
          padding: 4px 8px;
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
          font-size: 24px;
        }
        
        .btn-no {
          color: #fff;
          background-color: #c0392b;
          font-size: 24px;
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
