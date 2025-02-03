import React, { useState, useEffect } from "react";
import ExibirDica from "./ExibirDica";
import { GamePts, GamePtsProps, Usuario } from "../interfaces/interfaces";
import { saveUser } from "../utils/save";

interface ExercicioNivel1Props {
  onSuccess: (gamePontos: GamePtsProps) => void;
  frasesIniciais: string[];
  dica: string;
}

const ExercicioNivel1: React.FC<ExercicioNivel1Props> = ({ onSuccess, frasesIniciais, dica }) => {
  const [frases, setFrases] = useState<string[]>([]);
  const [frasesOrdenadas, setFrasesOrdenadas] = useState<string[]>([]);
  const [ordemCorreta, setOrdemCorreta] = useState<string[]>([]);
  const [erroMsg, setErroMsg] = useState<string | null>(null);
  const [tempoRestante, setTempoRestante] = useState(180);
  const [jogoEmAndamento, setJogoEmAndamento] = useState(true);
  const [tentativas, setTentativas] = useState(1);
  const [mostrarCustoProf, setMostrarCustoProf] = useState(false);
  const [showDica, setShowDica] = useState(false)
  const [usouDica, setUsouDica] = useState(false)
  let gamePontos: GamePtsProps = GamePts

  // Inicia as frases embaralhadas e define a ordem correta
  useEffect(() => {
    setFrases(shuffleArray(frasesIniciais));
    setOrdemCorreta(frasesIniciais);
  }, [frasesIniciais]);

  // Controla o temporizador
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

  const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCliqueFrase = (index: number) => {
    if (!jogoEmAndamento) return;

    const fraseClicada = frases[index];
    setFrases((prev) => prev.filter((_, i) => i !== index));
    setFrasesOrdenadas((prev) => [...prev, fraseClicada]);
  };

  const handleCliqueFraseOrdenada = (index: number) => {
    if (!jogoEmAndamento) return;

    const fraseClicada = frasesOrdenadas[index];
    setFrasesOrdenadas((prev) => prev.filter((_, i) => i !== index));
    setFrases((prev) => [...prev, fraseClicada]);
  };

  //Corrigir o jogo

  const handleVerificarOrdem = () => {
    if (frases.length > 0) {
      setErroMsg("You need to move all the sentences to the sorted list before checking the order. Try again!");
      setTimeout(() => setErroMsg(null), 2000);
      return;
    }

    if (JSON.stringify(frasesOrdenadas) === JSON.stringify(ordemCorreta)) {
      if(tentativas === 1) gamePontos = {...gamePontos , pontos: 50, exp: 10, otimoDesempenho: true}
      if(tentativas === 2) gamePontos = {...gamePontos , pontos: 45, exp: 5, bomDesempenho: true}
      if(tentativas === 3) gamePontos = {...gamePontos , pontos: 30, exp: 3, bomDesempenho: true}
        console.log(gamePontos)

      onSuccess(gamePontos);
    } else {
      setErroMsg("Oops! The order is incorrect. Please try again.");

      if (tentativas < 3) {
        setTentativas((prev) => prev + 1);
        setTimeout(() => setErroMsg(null), 2000);
        reiniciarJogo();
      } else {
        onSuccess(gamePontos);
      }
    }
  };

  const reiniciarJogo = () => {
    setFrases(shuffleArray(frasesIniciais));
    setFrasesOrdenadas([]);
    setTempoRestante(180);
    setJogoEmAndamento(true);
  };

  const handleExibirDica = () => {
    setShowDica(true)
    if(!usouDica){
      setUsouDica(true)
      saveUser({pontos: -10})
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 justify-center">
      <div className="flex justify-between w-full mb-4">
        <div className="w-1/2">
          <h2 className="bg-blue-700 opacity-75 text-center text-white font-bold uppercase">Disorderly Steps:</h2>
          <ul className="border p-2 h-64 overflow-y-auto">
            {frases.map((frase, index) => (
              <li
                key={index}
                className="bg-blue-700 opacity-90 border mb-2 p-2 cursor-pointer"
                onClick={() => handleCliqueFrase(index)}
              >
                {frase}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-center text-white font-bold bg-red-700 opacity-75 uppercase">Ordered Steps:</h2>
          <ul className="border p-2 h-64 overflow-y-auto">
            {frasesOrdenadas.map((frase, index) => (
              <li
                key={index}
                className="bg-red-700 opacity-85 border mb-2 p-2 cursor-pointer"
                onClick={() => handleCliqueFraseOrdenada(index)}
              >
                {frase}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full flex flex-row gap-4 items-center justify-center mb-4  ml-4 mr-4">
        <span className=" border bg-white shadow-md rounded-lg p-2 font-bold">
          {`Você tem ${3 - tentativas + 1} tentativas restantes`}
        </span>
        <span className=" border bg-white shadow-md rounded-lg p-2 font-bold">
          Tempo: {Math.floor(tempoRestante / 60)}:
          {(tempoRestante % 60).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleVerificarOrdem}
        >
          Check
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded relative"
          onMouseEnter={() => setMostrarCustoProf(true)}
          onMouseLeave={() => setMostrarCustoProf(false)}
          onClick={handleExibirDica}
        >
          Teacher's Tip
        </button>
        {mostrarCustoProf && (
          <span className="absolute bottom-0 left-0 transform mt-2 bg-gray-200 p-2 rounded shadow">
            Custo: 10 moedas
          </span>
        )}
      </div>

      {erroMsg && (
        <p className="text-red-500 mt-4 bg-slate-900 absolute bottom-0 rounded-t-lg p-2">
          {erroMsg}
        </p>
      )}

      {showDica && (
                    <ExibirDica setExibirDica={setShowDica} dica={dica} />
                  )}
    </div>
  );
};

export default ExercicioNivel1;