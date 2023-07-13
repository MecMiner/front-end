import React from 'react';

const Button = ({ onYes, onNo, texto1, texto2, posicaoX, posicaoY, link, tamanho }) => {
  return (
    <div className="confirmation-box">
        {link && (
          <a href={link} target="_blank">{link}</a>
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
          right: ${posicaoX ? posicaoX : '10%'};
          transform: translateX(-50%);
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

export default Button;
