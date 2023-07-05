import React from 'react';

const ConfirmationBox = ({ onYes, onNo }) => {
  return (
    <div className="confirmation-box">
      <div className="buttons">
        <button className="btn-yes" onClick={onYes}>Sim</button>
        <button className="btn-no" onClick={onNo}>Não</button>
      </div>
    </div>
  );
};

export default ConfirmationBox;
