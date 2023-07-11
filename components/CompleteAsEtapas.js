import React, { useEffect, useState } from 'react';

function CompleteAsEtapa({frase1, frase2, onSucess, setResposta}) {
  const [etapa2, setEtapa2] = useState('');
  const [etapa4, setEtapa4] = useState('');

  useEffect(()=> {
    setResposta('Etapa 2:' + etapa2);
  }),[etapa2,etapa4]

  const handleInputChange = (event, etapa) => {
    const { value } = event.target;

    switch (etapa) {
      case 2:
        setEtapa2(value);
        break;
      case 4:
        setEtapa4(value);
        break;
      default:
        break;
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const resposta = 'Etapa 2: ' + etapa2 + '\n' + 'Etapa 4: '  + etapa4;
    onSucess(resposta);
  };

  return (
    <div className="complete-as-etapa">
      <h1 className="title">Complete as Etapas</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="step">
          <h2 className="step-title">{frase1}</h2>
        </div>
        <div className="step">
          <h2 className="step-title"></h2>
          <textarea
            className="textarea"
            placeholder='Digite a etapa 2'
            value={etapa2}
            onChange={(e) => handleInputChange(e, 2)}
          />
        </div>
        <div className="step">
          <h2 className="step-title">{frase2}</h2>
  
        </div>
        <div className="step">
          <h2 className="step-title"></h2>
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
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
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
            font-size: 18px;
            margin-bottom: 10px;
          }
          
          .textarea {
            width: 500px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical; /* Permite redimensionamento vertical */
            min-height: 100px; /* Altura mínima inicial */
            overflow: auto; /* Adiciona barra de rolagem quando o conteúdo excede a altura */
          }
          
          .button {
            padding: 10px 20px;
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

export default CompleteAsEtapa;
