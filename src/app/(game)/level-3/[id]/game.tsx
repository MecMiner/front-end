'use client'
import AdvanceButton from "@/app/components/AdvanceButton";
import ConfirmationBox from "@/app/components/ConfirmationBox";
import Desempenho from "@/app/components/Desempenho";
import DialogScreen from "@/app/components/DialogScreen";
import ExercicioNivel3 from "@/app/components/ExercicioNivel3";
import InfosGame from "@/app/components/InfosGame";
import MostrarPontos from "@/app/components/MostrarPontos";
import Personagem from "@/app/components/Personagens";
import ProgressBar from "@/app/components/ProgressBar";
import { DesafioNivel3e4, GamePts, Respostas, Usuario } from "@/app/interfaces/interfaces";
import { revalidateRespostas } from "@/app/utils/fetching";
import { saveGame, saveUser } from "@/app/utils/save";
import textos3 from "@/app/utils/textos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type GameLevelTwoProps = {
  id: string,
  data: DesafioNivel3e4,
  respostas: Respostas,
  user: Usuario
}

export default function GameLevelThree({ id, data, respostas, user }: GameLevelTwoProps) {
  const [usuario, setUsuario] = useState(user)
  const [currentDialog, setCurrentDialog] = useState(
    respostas.statusNivel3.jogou ? 30 :
      0
  );
  const [randomImg, setRandomImg] = useState('imagem1');
  const textos = textos3(data, respostas.statusNivel3.feedback)
  const [showDialog, setShowDialog] = useState(true)
  const [showGame, setShowGame] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const [userGame, setUserGame] = useState(GamePts)
  const [showMessage, setShowMessage] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 5) + 1;
    setRandomImg(`imagem${randomImageNumber}`);
  }, [currentDialog]);

  useEffect(() => {
    if (!respostas.statusNivel3.jogou || respostas.statusNivel3.corrigido) return;
    const interval = setInterval(async () => {
      console.log("revalidando respostas");
      await revalidateRespostas();
    }, 10000);

    return () => clearInterval(interval);
  }, [respostas.statusNivel3.corrigido]);

  const handleNextDialog = (valor?: number) => {
    setShowButton(false);
    setShowDialog(true);
    setCurrentDialog(
      prevState => prevState + (valor ? valor : 1)
    )
  }


  const handleResetGame = async (restart?: boolean) => {
    const res = await saveGame(id, {
      nivel: 2, statusNivel3: {
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: '',
      }
    })

    if (res?.error) {
      console.log(res.mensar)
      return
    }

    if (restart) {
      setCurrentDialog(0);
    }

  }

  const handleSubmit = async (res: string) => {
    const response = await saveGame(id as string, {
      respostanivel3: res, statusNivel3: {
        certo: false,
        corrigido: false,
        jogou: true
      }
    })
    if (!response?.error) {
      console.log(response?.mensar)
    }
    handleNextDialog()
  };


  const handleSetUser = async (valor: number, exp?: number, pag?: number) => {
    await saveUser({ pontos: valor ? valor : 0, xp: exp ? exp : 0 })
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

  const handleCorrigirGame = async () => {
    console.log('teste')
    setUserGame({
      bomDesempenho: respostas.statusNivel3.erros === 1,
      otimoDesempenho: respostas.statusNivel3.erros === 0,
      pontos: respostas.statusNivel3.erros < 1 ? 50 : respostas.statusNivel3.erros < 2 ? 45 : 30,
      exp: respostas.statusNivel3.erros < 1 ? 10 : respostas.statusNivel3.erros < 2 ? 5 : 3,
      col: false
    })

    await saveGame(id, {nivel: 4})

    await saveUser({
      otimoDesempenho: respostas.statusNivel3.erros < 1 ? 1 : 0,
      bomDesempenho: respostas.statusNivel3.erros < 2 ? 1 : 0,
    })
    handleResetGame()
    handleSetUser(
      (respostas.statusNivel3.erros < 1 ? 50 : respostas.statusNivel3.erros < 2 ? 45 : 30),
      (respostas.statusNivel3.erros < 1 ? 10 : respostas.statusNivel3.erros < 2 ? 5 : 3),
      2
    )
  }

  const handleColab = () => {
    setUserGame(state => ({
      ...state,
      col: true
    }))
    saveUser({ colaboracao: 1 })
    setUsuario(state => ({ ...state, colaboracao: state.colaboracao + 1 }))
    setShowReward(true)
    setShowDialog(false)
  }

  const handleStartGame = () => {
    setShowGame(true),
      setShowDialog(false)
  }


  const renderButton = () => {
    switch (currentDialog) {
      case 5:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleSetUser(10)} onNo={() => { router.push('/') }} />}
            {showMessage && <MostrarPontos moeda={10} />}
          </div>
        )

      case 6:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleNextDialog(3)} onNo={() => handleNextDialog()} />}
          </div>
        )

      case 15:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleNextDialog()} onNo={() => handleNextDialog(3)} />}
          </div>
        )

      case 20:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleNextDialog(4)} onNo={() => handleNextDialog(0)} />}
          </div>
        )

      case 23:
        return (
          <div>
            {showButton && (
              <ConfirmationBox link={data.materialComplementar} textoLink="Complementary materail" posicaoX={'50%'} tamanho={'300px'} onYes={() => handleNextDialog()} texto1={"Ready"} />
            )}
          </div>
        )

      case 29:
        return (
          <div>
            {showButton && <AdvanceButton buttonClick={() => handleStartGame()} />}
            {showGame && <ExercicioNivel3 tentativas={(3 - respostas.statusNivel3.erros)} setUser={setUsuario} dicaProfessor={data.dica} dicaAluno={data.dicaColega} onSucess={handleSubmit} />}
          </div>
        )
      case 30:
        return (
          <div>
            {respostas.statusNivel3.corrigido && <AdvanceButton buttonClick={() => handleNextDialog()} />}
          </div>
        )
      case 31:
        return (
          <div>
            {!respostas.statusNivel3.certo && <div>
              {respostas.statusNivel3.erros < 3 ? (
                <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Repeat'} texto2={'Restart'} onYes={() => {
                  setShowGame(true)
                  setShowDialog(false)
                  setCurrentDialog(29)
                }} onNo={handleResetGame} />
              ) : (
                <AdvanceButton buttonClick={() => handleNextDialog()} />
              )}
            </div>}
            {respostas.statusNivel3.certo &&
              <div>
                <AdvanceButton buttonClick={handleCorrigirGame} />
              </div>}
            {showMessage && <MostrarPontos
              moeda={respostas.statusNivel3.erros < 1 ? 50 : respostas.statusNivel3.erros < 2 ? 45 : 30}
              exp={respostas.statusNivel3.erros < 1 ? 10 : respostas.statusNivel3.erros < 2 ? 5 : 3} />}
          </div>
        )
      case 32:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Restart'} texto2={'Exit'} onNo={() => router.push("/")} onYes={() => handleResetGame(true)} />}
          </div>
        )

      case 39:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleNextDialog(2)} onNo={() => handleNextDialog()} />}
          </div>
        )
      case 42:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleNextDialog(2)} onNo={() => handleNextDialog()} />}
          </div>
        )
      case 43:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} texto1="Restart" texto2="Exit" onYes={() => 
              setCurrentDialog(0)
            } onNo={() => {
              router.push('/')
            }} />}
        </div>
        )
      case 44: 
        return (
          <div>
            {showButton && (
              <ConfirmationBox link={'https://forms.gle/unuZ7k5GkZ6bCzKN8'} textoLink="Evaluation form" posicaoX={'50%'} tamanho={'300px'} onYes={handleColab} texto1={"Ready"} />
            )}
          </div>
        )
      case 46: 
      return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} texto1="Restart" texto2="Exit" onYes={() => 
              setCurrentDialog(0)
            } onNo={() => {
              router.push('/')
            }} />}
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
      <InfosGame user={usuario} />
      <div className="absolute left-[16.666667%] w-5/6 h-full top-0">
        <div className="w-full h-full overflow-hidden">
          <Image className="object-cover rounded-r-lg" alt="Teste" src={`/src/rua.jpg`} fill />
        </div>
        {showDialog &&
          <div>
            <DialogScreen name={textos[currentDialog].name} {...(textos[currentDialog].name === 'Maria' ? { left: true } : { right: true })} complete={() => setShowButton(true)} dialogText={textos[currentDialog].texto} />
            {textos[currentDialog].person === 1 && <Personagem img={`m3/${randomImg}`} left={20} />}
            {textos[currentDialog].person === 2 && <Personagem img={`p3/${randomImg}`} right={20} />}
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
        {!showGame && <ProgressBar total={46} atual={currentDialog} />}
      </div>

    </div>
  );
}
