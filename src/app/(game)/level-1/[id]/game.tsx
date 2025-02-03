"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Desafio, GamePts, GamePtsProps, Respostas, respostasConstrutor, Usuario } from "@/app/interfaces/interfaces";
import AdvanceButton from "@/app/components/AdvanceButton";
import DialogScreen from "@/app/components/DialogScreen";
import Personagem from "@/app/components/Personagens";
import Image from "next/image";
import ConfirmationBox from "@/app/components/ConfirmationBox";
import Desempenho from "@/app/components/Desempenho";
import ProgressBar from "@/app/components/ProgressBar";
import { textos1 } from "@/app/utils/textos";
import ExercicioNivel1 from "@/app/components/ExercicioNivel1";
import MostrarPontos from "@/app/components/MostrarPontos";
import { saveGame, saveUser } from "@/app/utils/save";

type GameLevelOneProps = {
  id: string,
  data: Desafio
}

export default function GameLevelOne({id, data }: GameLevelOneProps) {
  const router = useRouter();
  const textos = textos1(data)
  const [currentDialog, setCurrentDialog] = useState<number>(0)
  const [randomImg, setRandomImg] = useState('imagem1');
  const [showDialog, setShowDialog] = useState(true)
  const [showGame, setShowGame] = useState(false)

  useEffect(() => {
    // Gera o imagem diferente para cada diálogo
    const randomImageNumber = Math.floor(Math.random() * 5) + 1;
    setRandomImg(`imagem${randomImageNumber}`);
  }, [currentDialog]);



  const fraseGrande = data.etapasSolucao || " "
  const linhas = fraseGrande.split(';');
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showReward, setShowReward] = useState(false);
  const [userGame, setUserGame] = useState<GamePtsProps>(GamePts)
  
  const handleNextDialog = (valor?: number) => {
    setShowButton(false);
    setShowDialog(true);
    setCurrentDialog(
      prevState => prevState + (valor ? valor : 1)
    )
  }


  const handleSetCoin = async (valor: number, exp: number, pag?: number) => {
    setShowButton(false);
    await saveUser({ pontos: valor, xp: exp })
    setShowMessage(true);
    setTimeout(() => {
      setShowGame(false)
      setShowMessage(false);
      handleNextDialog((pag ? pag : 1));
    }, 3000);
  };



  const corrigirGame = async (gamePontos: GamePtsProps) => {
    console.log(gamePontos)
    setShowGame(false)
    if (gamePontos.pontos <= 0) {
      setShowDialog(true)
      setCurrentDialog(36);
      return
    }
    setUserGame(gamePontos);
    await saveUser({
      pontos: gamePontos.pontos,
      bomDesempenho: gamePontos.bomDesempenho ? 1 : 0,
      otimoDesempenho: gamePontos.otimoDesempenho ? 1 : 0,
      xp: gamePontos.exp,
    })

    await saveGame(id as string, {nivel: 2})

    setShowReward(true)
  }

  const startGame = () => {
    setShowButton(false)
    setShowDialog(false)
    setShowGame(true)
  }

  const renderButton = () => {
    switch (currentDialog) {
      case 2: return (
        <div>
          {showButton && <AdvanceButton buttonClick={() => handleSetCoin(20, 5)} />}
          {showMessage && <MostrarPontos moeda={20} exp={5} />}
        </div>

      )

      case 9: return (
        <div>
          {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleSetCoin(10, 0)} onNo={() => { router.push(`/levelSelection?id=${id}`) }} />}
          {showMessage && <MostrarPontos moeda={10} />}
        </div>
      )

      case 13: return (
        <div>
          {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleNextDialog(3)} onNo={() => handleNextDialog()} />}
        </div>
      )
      case 15: return (
        <div>
          {showButton && <AdvanceButton buttonClick={() => handleNextDialog(3)} />}
        </div>
      )
      case 22: return (
        <div>
          {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onNo={() => handleNextDialog(2)} onYes={() => handleNextDialog()} />}
        </div>
      )
      case 27: return (
        <div>
          {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleNextDialog()} onNo={() => handleNextDialog(2)} />}
        </div>
      )
      case 28: return (
        <div>
          {showButton && (
            <ConfirmationBox posicaoX={'50%'} link={data.materialComplementar} onYes={() => handleNextDialog()} texto1={'Pronto'} posicaoY={'50%'} />
          )}
        </div>
      )
      case 35: return (
        <div>
          {showButton && <AdvanceButton buttonClick={() => startGame()} />}
        </div>
      )
      case 37: return (
        <div>
          {showButton && <ConfirmationBox posicaoX={'50%'} texto1={'Restart'} texto2={'Exit'} onYes={() => {
            window.location.reload()
          }} onNo={() => { router.push('/') }} />}
        </div>
      )
      case 44: return (
        <div>
          {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleNextDialog()} onNo={() => router.push(`/levelSelection${id}`)} />}
        </div>
      )
      case 45: return (
        <div>
          {showButton && <ConfirmationBox texto1={'Continue'} texto2={'Again'} posicaoY={'50%'} posicaoX={'50%'} onNo={() => setCurrentDialog(0)} onYes={() => { router.push(`/level-2?id=${id}`) }} />}
        </div>
      )
      default: return (
        <div>
          {showButton && <AdvanceButton buttonClick={() => handleNextDialog()} />}
        </div>
      )
    }
  }


  return (
    <div>
      <div className="absolute left-[16.666667%] w-5/6 h-full top-0">
        <div className="w-full h-full overflow-hidden">
          <Image className="object-cover rounded-r-lg" alt="Teste" src={`/src/rua.jpg`} fill />
        </div>
        {showDialog &&
          <div>
            <DialogScreen name={textos[currentDialog].name} {...(textos[currentDialog].name === 'Maria' ? { left: true } : { right: true })} complete={() => setShowButton(true)} dialogText={textos[currentDialog].texto} />
            {textos[currentDialog].person === 1 && <Personagem img={`m1/${randomImg}`} left={20} />}
            {textos[currentDialog].person === 2 && <Personagem img={`p1/${randomImg}`} right={20} />}
            {textos[currentDialog].person === 3 &&
              <div>
                <Personagem img={`m1/${randomImg}`} left={20} />
                <Personagem img={`p1/${randomImg}`} right={20} />
              </div>
            }

          </div>
        }
        {showGame &&
          <div className="absolute top-0 left-0 w-full h-full">
            <ExercicioNivel1 frasesIniciais={linhas} onSuccess={corrigirGame} dica={data.dica} />

            {showMessage && <MostrarPontos moeda={userGame.pontos} exp={userGame.exp} />}
          </div>
        }
        {showReward &&
          <div>
            <Desempenho gamePontos={userGame} />
            <AdvanceButton buttonClick={() => {
              setCurrentDialog(38)
              setShowGame(false)
              setShowReward(false)
              setShowDialog(true)
            }} />
          </div>
        }
        {renderButton()}
        {!showGame && <ProgressBar total={38} atual={currentDialog} />}
      </div>

    </div>
  )
}
