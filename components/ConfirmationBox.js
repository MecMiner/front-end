import React from 'react';

const ConfirmationBox = ({ onYes, onNo, texto1, texto2 }) => {
  return (
    <div className="confirmation-box">
      <div className="buttons">
        {onYes && <button className="btn-yes" onClick={onYes}>{texto1 ? texto1 : 'Sim'}</button>}
        {onNo && <button className="btn-no" onClick={onNo}>{texto2 ? texto2 : 'Não'}</button>}      
      </div>
    </div>
  );
};

export default ConfirmationBox;
