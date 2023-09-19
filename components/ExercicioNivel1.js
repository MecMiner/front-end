import { useState, useEffect } from 'react';

const ExercicioNivel1 = ({ onSuccess, frasesIniciais, dica }) => {
    const [frases, setFrases] = useState([]);
    const [frasesOrdenadas, setFrasesOrdenadas] = useState([]);
    const [ordemCorreta, setOrdemCorreta] = useState([]);
    const [verificar, setVerificar] = useState(false);
    const [erroMsg, setErroMsg] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(180);
    const [jogoEmAndamento, setJogoEmAndamento] = useState(true);
    const [mostrarCustoProf, setMostrarCustoProf] = useState(false);
    const [tentativas, setTentativas] = useState(1);


    useEffect(() => {
        if (jogoEmAndamento && tempoRestante > 0) {
            const timer = setInterval(() => {
                setTempoRestante((prevTempo) => prevTempo - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (tempoRestante === 0) {
            setJogoEmAndamento(false);
            handleVerificarOrdem();
        }
    }, [jogoEmAndamento, tempoRestante]);


    useEffect(() => {
        const shuffledFrases = shuffleArray(frasesIniciais);
        setFrases(shuffledFrases);
        setOrdemCorreta([...frasesIniciais]);
    }, []);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const handleCliqueFrase = (index) => {
        if (verificar) return;

        const fraseClicada = frases[index];
        const novasFrases = frases.filter((_, i) => i !== index);
        setFrases(novasFrases);
        setFrasesOrdenadas([...frasesOrdenadas, fraseClicada]);
    };

    const handleCliqueFraseOrdenada = (index) => {
        if (verificar) return;

        const fraseClicada = frasesOrdenadas[index];
        const novasFrasesOrdenadas = frasesOrdenadas.filter((_, i) => i !== index);
        setFrasesOrdenadas(novasFrasesOrdenadas);
        setFrases([...frases, fraseClicada]);
    };

    const handleVerificarOrdem = () => {
        if (JSON.stringify(frasesOrdenadas) === JSON.stringify(ordemCorreta)) {
            if(tentativas === 1){
                onSuccess(50,10,false,true,false);
            } else {
                if(tentativas === 2){
                    onSuccess(45,5,true,false,false)
                } else {
                    onSuccess(30,3,true,false,false)
                }
            }
            
        } else {
            if(tentativas === 1){
                setTentativas(2);
                setErroMsg(true)
                reiniciarJogo();
            } else {
                if(tentativas === 2){
                    setErroMsg(true)
                    reiniciarJogo();
                    setTentativas(3)
                } else {
                    onSuccess(0,0,false,false,true);
                }
            }        
            
        }
    };

    const reiniciarJogo = () => {
        setTempoRestante(180);
        setFrases(shuffleArray(frasesIniciais));
        setFrasesOrdenadas([]);
        setVerificar(false);
        setJogoEmAndamento(true);
    };

    const handleExibirDica = () => {
        dica();
    };


    return (
        <div className="sorting-game-container">
            <div className='quadros-frases'>
                <div style={{ position: 'absolute', width: '50%', left:'0%', height: '100%'}}>
                    <div style={{position: 'absolute', width: '100%', height: '10%'}}>
                        <h2 style={{textAlign: 'center'}} className='title'>Etapas desordenadas:</h2>
                    </div>  
                    <div className="frases-container">
                        <ul className="frases-lista">
                            {frases.map((frase, index) => (
                                <li key={index} onClick={() => handleCliqueFrase(index)}>
                                    {frase}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
                <div style={{position: 'absolute', width: '50%', left: '50%', height: '100%'}}>
                    <div style={{position: 'absolute', width: '100%', height: '10%'}}>
                        <h2 style={{textAlign: 'center'}} className='title'>Etapas ordenadas:</h2>
                    </div>
                    <div className="frases-ordenadas-container">
                        <ul className="frases-ordenadas-lista">
                            {frasesOrdenadas.map((frase, index) => (
                                <li key={index} onClick={() => handleCliqueFraseOrdenada(index)}>
                                    {frase}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
            
            <div className="actions-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', padding: '10px'}}>
                    <div className="tempo-restante">
                        {`Você tem ${4 - tentativas} tentativas`}
                    </div>
                    <div className='tempo-restante'>
                        Tempo: {Math.floor(tempoRestante / 60)}:
                        {(tempoRestante % 60).toString().padStart(2, '0')}
                    </div>
                </div>
                <div className="buttons-container">
                    <button className='button' onClick={handleVerificarOrdem}>Conferir</button>
                    <button type="button" className="button button-dica" onMouseEnter={() => setMostrarCustoProf(true)} onMouseLeave={() => setMostrarCustoProf(false)} onClick={handleExibirDica}>Dica Professor</button>
                    {mostrarCustoProf && (
                        <div className='mensagem-custo'>
                        Custo: 10 moedas
                        </div>
                    )}
                </div>
                <p className="erro-message">
                {erroMsg ? 'Ops! A ordem está incorreta. Tente novamente.' : ''}
                </p>
            </div>

            <style jsx>{`

            

    .sorting-game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        left: 50%;
        height: 90%;
        width: 90%;
        top: 5%;
        transform: translateX(-50%);      
        border-radius: 4px; 
    }

    .quadros-frases {
        position: absolute;
        opacity: 1.9;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        height: 80%;
    }

    .frases-container,
    .frases-ordenadas-container {
        padding: 5px;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95%; 
        height: 85%;
        top: 15%;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        overflow-y: auto;
    }
    
    .frases-lista,
    .frases-ordenadas-lista {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .frases-lista li,
    .frases-ordenadas-lista li {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }


    .actions-container {
        width: 100%;
        height: 20%;
        position: absolute;
        top: 80%;

      }

      .buttons-container {
        position: absolute;
        transform: translate(-50% , -50%);
        left:50%;
        top: 50%;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      .erro-message {
        position: absolute;
        transform: translate(-50% , -100%);
        left:50%;
        top: 80%;
        color: red;
        font-size: 14px; /* Ajuste o tamanho da fonte conforme necessário */
      }

      button {
        margin: 5px;
      }

      .mensagem-custo{
        left: 80%;
      }
    .title {
        color: #ff9800;
        margin-bottom: 20px;
        }

    
    `}</style>
        </div>
    );
};

export default ExercicioNivel1;
