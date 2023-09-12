import React, { useEffect, useState } from 'react';

function CompleteAsEtapa3({onSucess, setInfo, tentativas, dicaAluno, dicaProf}) {
  const [etapa1, setEtapa1] = useState('');
  const [etapa2, setEtapa2] = useState('');
  const [etapa3, setEtapa3] = useState('');
  const [etapa4, setEtapa4] = useState('');

  const [tempoRestante, setTempoRestante] = useState(600); // 3 minutos (em segundos)
  const [jogoEmAndamento, setJogoEmAndamento] = useState(true);

  useEffect(() => {
    if (jogoEmAndamento && tempoRestante > 0) {
        const timer = setInterval(() => {
            setTempoRestante((prevTempo) => prevTempo - 1);
        }, 1000);
        return () => clearInterval(timer);
    } else if (tempoRestante === 0) {
        // Se o tempo acabar, marque o jogo como encerrado e verifique a ordem
        setJogoEmAndamento(false);
        onSucess();
    }
  }, [jogoEmAndamento, tempoRestante]);

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
    </div>
  );
}

export default CompleteAsEtapa3;
