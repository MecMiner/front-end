import React, { useEffect, useState } from 'react';

function CompleteAsEtapa3({onSucess, setInfo}) {
  const [etapa1, setEtapa1] = useState('');
  const [etapa2, setEtapa2] = useState('');
  const [etapa3, setEtapa3] = useState('');
  const [etapa4, setEtapa4] = useState('');

  useEffect(() =>{
    setInfo('Etapa 1: ' + etapa1 + '\nEtapa 2: ' + etapa2 + '\nEtapa 3: ' + etapa3 + '\nEtapa 4: ' + etapa4);
  },[etapa1, etapa2 , etapa3, etapa4]);

  const handleInputChange = (event, etapa) => {
    const { value } = event.target;

    switch (etapa) {
      case 1:
        setEtapa1(value);
        break;
      case 2:
        setEtapa2(value);
        break;
      case 3:
        setEtapa3(value);
        break
      case 4:
        setEtapa4(value);
        break;
      default:
        break;
    }
    
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    onSucess();
  };

  return (
    <div className="complete-as-etapa">
      <h1 className="title">Complete as Etapas</h1>
      <form className="form" onSubmit={handleSubmit}>
      <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite a etapa 1'
            value={etapa1}
            onChange={(e) => handleInputChange(e, 1)}
          />
        </div>
        <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite a etapa 2'
            value={etapa2}
            onChange={(e) => handleInputChange(e, 2)}
          />
        </div>
        <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite a etapa 3'
            value={etapa3}
            onChange={(e) => handleInputChange(e, 3)}
          />
        </div>
        <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite a etapa 4'
            value={etapa4}
            onChange={(e) => handleInputChange(e, 4)}
          />
        </div>
        <button type="submit" className="button">Enviar</button>
      </form>
      <style jsx>{`
        .complete-as-etapa {
            width: 100%;
            border: 1px solid black;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            z-index: 999;
          }
          
          .title {
            color: #ff9800;
            font-size: 24px;
            margin-bottom: 20px;
          }
          
          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .step-title {
            color: black;
            font-size: 12px;
            margin-bottom: 10px;
            margin-right: 20px;
            margin-left: 20px;
          }
          
          .textarea {
            width: 500px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical; /* Permite redimensionamento vertical */
            min-height: 50px; /* Altura mínima inicial */
            overflow: auto; /* Adiciona barra de rolagem quando o conteúdo excede a altura */
          }
          
          .button {
            padding: 10px 20px;
            margin-bottom: 10px;
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          
          .button:hover {
            background-color: #ffac33;
          }
          
      `}</style>
    </div>
  );
}

export default CompleteAsEtapa3;
