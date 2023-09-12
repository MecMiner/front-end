import React, { useEffect, useState } from 'react';

function CompleteAsEtapa({frase1, frase2, onSucess, setInfo, dicaAluno, dicaProf, tentativas}) {
  const [etapa2, setEtapa2] = useState('');
  const [etapa4, setEtapa4] = useState('');
  const [tempoRestante, setTempoRestante] = useState(600); 
  const [jogoEmAndamento, setJogoEmAndamento] = useState(true);

  useEffect(() => {
    if (jogoEmAndamento && tempoRestante > 0) {
        const timer = setInterval(() => {
            setTempoRestante((prevTempo) => prevTempo - 1);
        }, 1000);
        return () => clearInterval(timer);
    } else if (tempoRestante === 0) {
        setJogoEmAndamento(false);
        onSucess();
    }
}, [jogoEmAndamento, tempoRestante]);

  useEffect(() =>{
    setInfo('Etapa 2: ' + etapa2 + '\nEtapa 4: ' + etapa4);
  },[etapa2 , etapa4]);

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
    onSucess();
  };

  const handleDicaAluno = () => {
    dicaAluno()
  };

  const handleDicaProf = () => {
   dicaProf()
  };

  return (
    <div className="complete-as-etapa">
      <h1 className="title">Complete as Etapas</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="step">
          <h2 className="step-title">{frase1}</h2>
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
          <h2 className="step-title">{frase2}</h2>
  
        </div>
        <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite a etapa 4'
            value={etapa4}
            onChange={(e) => handleInputChange(e, 4)}
          />
        </div>
        <div className="button-container">
          <button type="button" className="button button-dica" onClick={handleDicaAluno}>Dica Aluno</button>
          <button type="submit" className="button">Enviar</button>
          <button type="button" className="button button-dica" onClick={handleDicaProf}>Dica Professor</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', padding: '10px'}}>
          <div className="tempo-restante">
              {`Você tem ${tentativas} tentativas`}
          </div>
          <div className="tempo-restante">
                  Tempo restante: {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
            </div>
        </div>
      </form>
      <style jsx>{`
        .complete-as-etapa {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            border: 1px solid black;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            transform: translate(-50%, -50%);
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
            width: 100%;
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
            width: 80%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical; 
            min-height: 30px; 
            overflow: auto; 
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          
          
          .tempo-restante {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
            }
          
      `}</style>
    </div>
  );
}

export default CompleteAsEtapa;
