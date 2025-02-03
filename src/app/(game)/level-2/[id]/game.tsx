'use client'
import AdvanceButton from "@/app/components/AdvanceButton";
import ConfirmationBox from "@/app/components/ConfirmationBox";
import Desempenho from "@/app/components/Desempenho";
import DialogScreen from "@/app/components/DialogScreen";
import ExercicioNivel2 from "@/app/components/ExercicioNivel2";
import InfosGame from "@/app/components/InfosGame";
import MostrarPontos from "@/app/components/MostrarPontos";
import Personagem from "@/app/components/Personagens";
import ProgressBar from "@/app/components/ProgressBar";
import StarRating from "@/app/components/StarRating";
import { DesafioNivel2, GamePts, Respostas, Usuario } from "@/app/interfaces/interfaces";
import { revalidateRespostas } from "@/app/utils/fetching";
import { saveGame, saveUser } from "@/app/utils/save";
import { textos2 } from "@/app/utils/textos";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


type GameLevelTwoProps = {
    id: string,
    data: DesafioNivel2,
    respostas: Respostas,
    user: Usuario
}

export default function GameLevelTwo({id, data, respostas, user }: GameLevelTwoProps) {
    const [usuario, setUsuario] = useState(user)
    const [currentDialog, setCurrentDialog] = useState(
        respostas.statusNivel2.jogou ? 33:
        42
    );
    const [randomImg, setRandomImg] = useState('imagem1');
    const fraseGrande = data.etapasSolucao
    const linhas = fraseGrande.split(';');
    const textos = textos2(data, respostas.statusNivel2.feedback, linhas)
    const [showDialog, setShowDialog] = useState(true)
    const [showGame, setShowGame] = useState(false)
    const [showReward, setShowReward] = useState(false)
    
    const [userGame, setUserGame] =  useState(GamePts)
    const [showMessage, setShowMessage] = useState(false);

    const [showButton, setShowButton] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const randomImageNumber = Math.floor(Math.random() * 5) + 1;
        setRandomImg(`imagem${randomImageNumber}`);
    }, [currentDialog]);

    useEffect(() => {
        if (!respostas.statusNivel2.jogou || respostas.statusNivel2.corrigido) return;
        const interval = setInterval(async () => {
          console.log("revalidando respostas");
          await revalidateRespostas();
        }, 10000);
    
        return () => clearInterval(interval);
      }, [respostas.statusNivel2.corrigido]);

    const handleNextDialog = (valor?: number) => {
        setShowButton(false);
        setShowDialog(true);
        setCurrentDialog(
          prevState => prevState + (valor ? valor : 1)
        )
      }
    

const handleResetGame = async (restart?: boolean) => {
    const res = await saveGame(id,{nivel: 2 , statusNivel2: {
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: '',}})
    
    if (res?.error){
        console.log(res.mensar)
        return
    }

    if(restart){
        setCurrentDialog(0);
    }

}

const handleSubmit = async (res : string) => {
   const response = await saveGame(id as string, {respostanivel2: res, statusNivel2: {
    certo: false,
    corrigido: false,
    jogou: true
   }})
   if (!response?.error){
    console.log(response?.mensar)
   }
   handleNextDialog()
};


const  handleSetUser = async (valor: number, exp?: number, pag?: number) => {
    await saveUser({pontos: valor ? valor: 0, xp: exp ? exp : 0})
    setUsuario(state => ({
        ...state, 
        pontos: state.pontos + valor,
        xp: state.xp + (exp ? exp : 0)
    }))
    handleResetGame();
    setShowMessage(true);
    setTimeout(() => {
        setShowMessage(false);
        handleNextDialog((pag ? pag : 1));
    }, 3000);
};

const handleCorrigirGame = () => {
    setUserGame({
        bomDesempenho: respostas.statusNivel2.erros === 1,
        otimoDesempenho: respostas.statusNivel2.erros === 0,
        pontos: respostas.statusNivel2.erros < 1 ? 50 : respostas.statusNivel2.erros < 2 ? 45 : 30,
        exp: respostas.statusNivel2.erros < 1 ? 10 : respostas.statusNivel2.erros < 2 ? 5 : 3,
        col: false
    })

    saveUser({
        pontos: respostas.statusNivel2.erros < 1 ? 50 : respostas.statusNivel2.erros < 2 ? 45 : 30,
        xp: respostas.statusNivel2.erros < 1 ? 10 : respostas.statusNivel2.erros < 2 ? 5 : 3,
        otimoDesempenho: respostas.statusNivel2.erros < 1 ? 1: 0,
        bomDesempenho: respostas.statusNivel2.erros < 2 ? 1 : 0,
    })

    handleSetUser(
        (respostas.statusNivel2.erros < 1 ? 50 : respostas.statusNivel2.erros < 2 ? 45 : 30),
        (respostas.statusNivel2.erros < 1 ? 10 : respostas.statusNivel2.erros < 2 ? 5 : 3), 
        2
    )
}

const handleColab = () => {
    setUserGame(state =>({
        ...state,
        col: true
    }))
    saveUser({colaboracao: 1})
    setUsuario(state => ({...state, colaboracao: state.colaboracao + 1}))
    setShowReward(true)
    setShowDialog(false)
}


const renderButton = () => {
    switch (currentDialog) {
        case 5:
            return (
                <div>
                    {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleSetUser(10)} onNo={() => router.push('/')} />}
                    {showMessage &&  <MostrarPontos moeda={10}/>}
                </div>)
        case 6:
            return (
                <div>
                    {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleNextDialog(3)} onNo={() => handleNextDialog()} />}
                </div>)
        case 7:
            return (
                <div>
                    {showButton && <AdvanceButton buttonClick={() => handleNextDialog(3)} />}

                </div>)

        case 17:
            return (
                <div>
                    {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleNextDialog()} onNo={() => handleNextDialog(2)} />}
                </div>)
        case 25:
            return (
                <div>
                    {showButton && (
                        <ConfirmationBox link={data.materialComplementar} textoLink={'Material Complementar'} posicaoX={'50%'} tamanho={'300px'} onYes={() => handleNextDialog()} texto1={"Pronto"} />
                    )}
                </div>)

        case 32:
            return (
                <div>
                    {showButton &&
                        <div className="absolute top-0 left-0 w-full h-full">
                            <ExercicioNivel2 dicaAluno={data.dicaColega} dicaProfessor={data.dica} onSucess={handleSubmit}/>
                        </div>
                      }
                </div>
            )
        case 33:
            return (
                <div>
                    {respostas.statusNivel2.corrigido && <AdvanceButton buttonClick={() => handleNextDialog()} />}
                </div>
            )
       
        case 34:
            return (
                <div>
                    {!respostas.statusNivel2.certo && <div>
                        {respostas.statusNivel2.erros < 3 ? (
                            <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Repeat'} texto2={'Restart'} onYes={() => setCurrentDialog(32)} onNo={handleResetGame} />
                        ): (
                            <AdvanceButton buttonClick={() => handleNextDialog()} />
                        )}
                    </div> }
                    {respostas.statusNivel2.certo && 
                    <div>
                        <AdvanceButton buttonClick={() => handleCorrigirGame}/>
                    </div>} 
                    {showMessage && <MostrarPontos 
                    moeda={respostas.statusNivel2.erros < 1 ? 50 : respostas.statusNivel2.erros < 2 ? 45 : 30} 
                    exp={respostas.statusNivel2.erros < 1 ? 10 : respostas.statusNivel2.erros < 2 ? 5 : 3} />}
                </div>
            )
        case 35:
            return (
                <div>
                    {showButton && <ConfirmationBox texto1={'Restart'} texto2={'Exit'} onYes={handleResetGame} onNo={() => { router.push('/') }} />}
                </div>
            )

        case 42:
            return (
                <div>
                    <StarRating complete={handleColab}/>
                </div>
            )
        case 43:
            return (
                <div>
                    {showButton &&  <ConfirmationBox texto1={'Continue'} texto2={'Remake'} posicaoY={'50%'} posicaoX={'50%'} onNo={() => handleResetGame()} onYes={() => {router.push(`/levelSelection/${id}`)}} />}
                </div>
            )
        default:
            return (
                <div>
                    {showButton && <AdvanceButton buttonClick={() => handleNextDialog()} />}
                </div>)
    }
}

return (
    <div className="overflow-hidden">
    <InfosGame user={usuario}/>
    <div className="absolute left-[16.666667%] w-5/6 h-full top-0">
      <div className="w-full h-full overflow-hidden">
        <Image className="object-cover rounded-r-lg" alt="Teste" src={`/src/rua.jpg`} fill />
      </div>
      {showDialog &&
        <div>
          <DialogScreen name={textos[currentDialog].name} {...(textos[currentDialog].name === 'Maria' ? { left: true } : { right: true })} complete={() => setShowButton(true)} dialogText={textos[currentDialog].texto} />
          {textos[currentDialog].person === 1 && <Personagem img={`m2/${randomImg}`} left={20} />}
          {textos[currentDialog].person === 2 && <Personagem img={`p2/${randomImg}`} right={20} />}
          {textos[currentDialog].person === 3 &&
            <div>
              <Personagem img={`m2/${randomImg}`} left={20} />
              <Personagem img={`p2/${randomImg}`} right={20} />
            </div>
          }

        </div>
      }

      {showReward &&
        <div>
          <Desempenho gamePontos={userGame} />
          <AdvanceButton buttonClick={() => {
            handleNextDialog()
            setShowGame(false)
            setShowReward(false)
            setShowDialog(true)
          }} />
        </div>
      }
      {!showReward && renderButton()}
      <span className="font-bold text-xl">{currentDialog}</span>
      {!showGame && <ProgressBar total={43} atual={currentDialog} />}
    </div>

  </div>
);
}
