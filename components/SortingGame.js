import { useState, useEffect } from 'react';
import Image from 'next/image';

const SortingGame = ({ onSuccess, frasesIniciais, dica }) => {
    const [frases, setFrases] = useState([]);
    const [frasesOrdenadas, setFrasesOrdenadas] = useState([]);
    const [ordemCorreta, setOrdemCorreta] = useState([]);
    const [verificar, setVerificar] = useState(false);
    const [erroMsg, setErroMsg] = useState(false);


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
            onSuccess();
        } else {
            setErroMsg(true);
            reiniciarJogo();
        }
    };

    const reiniciarJogo = () => {
        setFrases(shuffleArray(frasesIniciais));
        setFrasesOrdenadas([]);
        setVerificar(false);
    };

    const handleExibirDica = () => {
        dica();
    };


    return (
        <div className="sorting-game-container">
            <div className='quadros-frases'>
                <div>
                    <h2>Frases para ordenar:</h2>
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
                    <h2>Frases ordenadas:</h2>
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
                <button onClick={handleVerificarOrdem}>Conferir</button>
                {erroMsg && (
                    <p className="erro-message">Ops! A ordem está incorreta. Tente novamente.</p>
                )}
                <button className="dica-button" onClick={handleExibirDica}>
                    <Image src={'/src/dica.svg'} alt="Dica do professor" width={40} height={40} />
                </button>
            </div>

            <style jsx>{`
      .sorting-game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 9999;
      }

      .quadros-frases {
        opacity: 1.9;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        heigth: 100%;
      }

      .frases-container,
      .frases-ordenadas-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 380px;
        height: 400px;
        border: 1px solid #ccc;
        padding: 10px;
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
        margin-bottom: 20px;
      }

      .erro-message {
        color: red;
        margin-bottom: 10px;
      }

      button {
        padding: 10px 20px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      .dica-button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: none;
        border: none;
        cursor: pointer;
      }
      .dica-button:hover {
        transform: scale(1.1);
      }
    `}</style>
        </div>
    );
};

export default SortingGame;
