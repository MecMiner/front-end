import React, { FormEvent, useEffect, useState } from 'react';
import { saveGame, saveUser } from '../utils/save';
import ExibirDica from './ExibirDica';
import { Respostas, respostasConstrutor, Usuario } from '../interfaces/interfaces';

type ExercicioNivel3Props = {
    dicaProfessor: string,
    dicaAluno: string,
    onSucess: (respostasnivel3: string) => void
    setUser: React.Dispatch<React.SetStateAction<Usuario>>
}

function ExercicioNivel3({ dicaAluno, dicaProfessor, onSucess, setUser }: ExercicioNivel3Props) {
    const [etapa2, setEtapa2] = useState('');
    const [res, setRes] = useState('')
    const [etapa4, setEtapa4] = useState('');
    const [etapa3, setEtapa3] = useState('');
    const [etapa1, setEtapa1] = useState('');
    const [tempoRestante, setTempoRestante] = useState(600);
    const [jogoEmAndamento, setJogoEmAndamento] = useState(true);
    const [mostrarCustoProf, setMostrarCustoProf] = useState(false);
    const [mostrarCustoAluno, setMostrarCustoAluno] = useState(false);
    const [showDicaColega, setShowDicaColega] = useState(false)
    const [showDicaProfessor, setShowDicaProfessor] = useState(false)
    const [dica, setDica] = useState(0)


    useEffect(() => {
        setRes(`Etapa1: ${etapa1}; Etapa 2 ${etapa2}; Etapa 4: ${etapa3};  Etapa 4: ${etapa4}`)
        console.log(res)
    },  [etapa2, etapa4])


    useEffect(() => {
        if (jogoEmAndamento && tempoRestante > 0) {
            const timer = setInterval(() => {
                setTempoRestante((prevTempo) => prevTempo - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (tempoRestante === 0) {
        }
    }, [jogoEmAndamento, tempoRestante]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSucess(res)
    };



    const handleDicaAluno = () => {
        if (dica != 1 && dica != 3) {
            setUser(state => ({
                ...state,
                pontos: state.pontos -5
            }))
            saveUser({ pontos: -5 })
            setDica(dica === 2 ? 3 : 1)
        }
        setShowDicaColega(true);
    };

    const handleDicaProf = () => {
        if (dica != 2 && dica != 3) {
            setUser(state => ({
                ...state,
                pontos: state.pontos -10
            }))
            saveUser({ pontos: -10 })
            setDica(dica === 1 ? 3 : 2)
        }
        setShowDicaProfessor(true);
    };

    return (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 shadow-lg w-8/12 border bg-white rounded flex flex-col items-center font-sans ">
            <h1 className="font-medium text-yellow-400 text-xl mb-4">Complete as Etapas</h1>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="min-w-[600px] w-full flex flex-col items-center mb-5">
                    <textarea
                        className="w-4/5 p-2.5 border border-gray-300 rounded resize-y min-h-[30px] overflow-auto"
                        placeholder="Digite a etapa 1"
                        value={etapa1}
                        onChange={(e) => setEtapa1(e.target.value)}
                    />
                </div>
                <div className="min-w-[600px] w-full flex flex-col items-center mb-5">
                    <textarea
                        className="w-4/5 p-2.5 border border-gray-300 rounded resize-y min-h-[30px] overflow-auto"
                        placeholder="Digite a etapa 2"
                        value={etapa2}
                        onChange={(e) => setEtapa2(e.target.value)}
                    />
                </div>
                <div className="min-w-[600px] w-full flex flex-col items-center mb-5">
                    <textarea
                        className="w-4/5 p-2.5 border border-gray-300 rounded resize-y min-h-[30px] overflow-auto"
                        placeholder="Digite a etapa 3"
                        value={etapa4}
                        onChange={(e) => setEtapa4(e.target.value)}
                    />
                </div>
                <div className="min-w-[600px] w-full flex flex-col items-center mb-5">
                    <textarea
                        className="w-4/5 p-2.5 border border-gray-300 rounded resize-y min-h-[30px] overflow-auto"
                        placeholder="Digite a etapa 4"
                        value={etapa3}
                        onChange={(e) => setEtapa3(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-center w-full">
                    <button
                        type="button"
                        className="relative bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onMouseEnter={() => setMostrarCustoAluno(true)}
                        onMouseLeave={() => setMostrarCustoAluno(false)}
                        onClick={handleDicaAluno}
                    >
                        Student Tip

                    </button>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="relative bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onMouseEnter={() => setMostrarCustoProf(true)}
                        onMouseLeave={() => setMostrarCustoProf(false)}
                        onClick={handleDicaProf}
                    >
                        Teacher Tip
                    </button>
                </div>
                <div className="flex justify-between w-4/5 p-2.5">
                    <div className="text-sm font-bold mb-2.5">{`Você tem  tentativas`}</div>
                    <div className="text-sm font-bold mb-2.5">
                        Tempo restante: {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
                    </div>
                </div>
            </form>
            {mostrarCustoProf && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2.5 py-0.5 rounded z-10">
                    Custo da Dica: 10 moedas
                </div>
            )}
            {mostrarCustoAluno && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-2.5 py-0.5 rounded z-10">
                    Custo da Dica: 5 moedas
                </div>
            )}
            {showDicaColega && <ExibirDica dica={dicaAluno} setExibirDica={setShowDicaColega} />}
            {showDicaProfessor && <ExibirDica dica={dicaProfessor} setExibirDica={setShowDicaProfessor} />}
        </div>
    );
}

export default ExercicioNivel3;