import { useState, useEffect } from 'react';
import Button from './Buttons';

const ExercicioNivel1 = ({ onSuccess, frasesIniciais, dica }) => {
    const [frases, setFrases] = useState([]);
    const [frasesOrdenadas, setFrasesOrdenadas] = useState([]);
    const [ordemCorreta, setOrdemCorreta] = useState([]);
    const [verificar, setVerificar] = useState(false);
    const [erroMsg, setErroMsg] = useState(false);
    const [tentativaOne, setTentativaOne] = useState(false);
    const [tentativaTwo, setTentativaTwo] = useState(false);
    const [tempoRestante, setTempoRestante] = useState(180); // 3 minutos (em segundos)
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
            handleVerificarOrdem();
        }
    }, [jogoEmAndamento, tempoRestante]);


    useEffect(() => {
        // Embaralhar as frases recebidas como parâmetro
        const shuffledFrases = shuffleArray(frasesIniciais);
        setFrases(shuffledFrases);
        setOrdemCorreta([...frasesIniciais]);
    }, [frasesIniciais]);

    const shuffleArray = (array) => {
        // Embaralhar o array utilizando o algoritmo Fisher-Yates
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
            if(!tentativaOne){
                onSuccess(50,10,false,true,false);
            } else {
                if(!tentativaTwo){
                    onSuccess(45,5,true,false,false)
                } else {
                    onSuccess(30,3,true,false,false)
                }
            }
            
        } else {
            if(!tentativaOne){
                setTentativaOne(true);
                setErroMsg(true)
                reiniciarJogo();
            } else {
                if(!tentativaTwo){
                    setTentativaTwo(true);
                    setErroMsg(true)
                    reiniciarJogo();
                } else {
                    onSuccess(0,0,false,false,true);
                }
            }        
            
        }
    };

    const reiniciarJogo = () => {
        setTempoRestante(180); // Reiniciar o tempo para 3 minutos
        setFrases(shuffleArray(frasesIniciais));
        setFrasesOrdenadas([]);
        setVerificar(false);
        setJogoEmAndamento(true); // Marcar o jogo como em andamento novamente
    };

    const handleExibirDica = () => {
        setFrases(shuffleArray(frasesIniciais));
        setFrasesOrdenadas([]);
        dica();
    };


    return (
        <div className="sorting-game-container">
            <div className='quadros-frases'>
                <div>
                    <h2 style={{textAlign: 'center'}} className='title'>Etapas desordenadas:</h2>
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
                <div>
                    <h2 style={{textAlign: 'center'}} className='title'>Etapas ordenadas:</h2>
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
                <div className="tempo-restante">
                    Tempo restante: {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
                </div>
                <div style={{flexDirection: 'row', width: '100%'}}>
                    <button onClick={handleVerificarOrdem}>Conferir</button>
                    <button className='dica-button' onClick={handleExibirDica}>Dica do Professor</button>
                </div>               
                <p  className="erro-message">{erroMsg? 'Ops! A ordem está incorreta. Tente novamente.' : ''}</p>
            </div>

            <style jsx>{`

            

    .sorting-game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 5%;
        left: 50%;
        height: 90%;
        width: 70%;
        min-width: 800px;
        z-index: 9999;
        border: 1px solid black;
        border-radius: 10px;
        transform: translateX(-50%);
    }

    .quadros-frases {
        opacity: 1.9;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }

    .frases-container,
    .frases-ordenadas-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 380px;
        height: 330px;
        border: 1px solid #ccc;
        padding: 5px;
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

    .frases-container h2,
    .frases-ordenadas-container h2 {
        margin: 0;
    }

    .actions-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .erro-message {
        color: red;
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        margin-bottom: 10px;
        background-color: green;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        margin: 0 15px;
    }
    .dica-button {
        background-color: #ff9800;
    }
    button:hover {
        transform: scale(1.2);
    }
    .tempo-restante {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        }

        .title {
            color: #ff9800;
            font-size: 24px;
            margin-bottom: 20px;
          }
    `}</style>
        </div>
    );
};

export default ExercicioNivel1;
