'use client'
import AdvanceButton from "@/app/components/AdvanceButton";
import ConfirmationBox from "@/app/components/ConfirmationBox";
import Desempenho from "@/app/components/Desempenho";
import DialogScreen from "@/app/components/DialogScreen";
import ExercicioNivel4 from "@/app/components/ExercícioNivel4";
import InfosGame from "@/app/components/InfosGame";
import MostrarPontos from "@/app/components/MostrarPontos";
import Personagem from "@/app/components/Personagens";
import ProgressBar from "@/app/components/ProgressBar";
import { DesafioNivel3e4, GamePts, Respostas, Usuario } from "@/app/interfaces/interfaces";
import { revalidateRespostas } from "@/app/utils/fetching";
import { saveGame, saveUser } from "@/app/utils/save";
import { textos4 } from "@/app/utils/textos";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type GameLevelFourProps = {
  id: string,
  data: DesafioNivel3e4,
  respostas: Respostas,
  user: Usuario
}

export default function GameLevelFour({ id, data, respostas, user }: GameLevelFourProps) {
  const [usuario, setUsuario] = useState(user)
  const [currentDialog, setCurrentDialog] = useState(
    respostas.statusNivel4.jogou ? 19 :
      0
  );
  const [randomImg, setRandomImg] = useState('imagem1');
  const textos = textos4(respostas.statusNivel4.feedback)
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
    if (!respostas.statusNivel4.jogou || respostas.statusNivel4.corrigido) return;
    const interval = setInterval(async () => {
      console.log("revalidando respostas");
      await revalidateRespostas();
    }, 10000);

    return () => clearInterval(interval);
  }, [respostas.statusNivel4.corrigido]);

  const handleNextDialog = (valor?: number) => {
    setShowButton(false);
    setShowDialog(true);
    setCurrentDialog(
      prevState => prevState + (valor ? valor : 1)
    )
  }


  const handleResetGame = async (restart?: boolean) => {
    const res = await saveGame(id, {
      nivel: 2, statusNivel4: {
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
      respostanivel4: res, statusNivel4: {
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
      bomDesempenho: respostas.statusNivel4.erros === 1,
      otimoDesempenho: respostas.statusNivel4.erros === 0,
      pontos: respostas.statusNivel4.erros < 1 ? 50 : respostas.statusNivel4.erros < 2 ? 45 : 30,
      exp: respostas.statusNivel4.erros < 1 ? 10 : respostas.statusNivel4.erros < 2 ? 5 : 3,
      col: false
    })
    await saveUser({
      otimoDesempenho: respostas.statusNivel4.erros < 1 ? 1 : 0,
      bomDesempenho: respostas.statusNivel4.erros < 2 ? 1 : 0,
    })
    handleResetGame()
    handleSetUser(
      (respostas.statusNivel4.erros < 1 ? 50 : respostas.statusNivel4.erros < 2 ? 45 : 30),
      (respostas.statusNivel4.erros < 1 ? 10 : respostas.statusNivel4.erros < 2 ? 5 : 3),
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
    setShowButton(false)
    setShowGame(true),
    setShowDialog(false)
  }


  const renderButton = () => {
    switch (currentDialog) {
      case 6:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleSetUser(10)} onNo={() => router.push('/')} />}
            {showMessage &&
              <MostrarPontos moeda={10}/>
            }
          </div>
        )

      case 14:
        return (
          <div>
            <ConfirmationBox onYes={() => handleNextDialog()} texto1={'Ready'} link={data.linkNivel} textoLink={'Link to committ'}  posicaoX={'50%'} />
          </div>
        )
      case 15:
        return (
          <div>
            <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php'} textoLink={'Example Creation Form'} posicaoX={'50%'} onYes={() => handleNextDialog()} texto1="Ready"/>
          </div>
        )
        case 16:
          return (
            <div>
              {showButton && <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/padrao.php'} textoLink={'Guidelines for Creating Examples'} posicaoX={'50%'} onYes={() => handleNextDialog()} texto1="Ready"/>}
            </div>
          )
        case 18: 
          return (
            <div>
              {showButton && <AdvanceButton buttonClick={handleStartGame}/>}
                {showGame && <ExercicioNivel4 linksite={data.linkNivel} setUser={setUsuario} onSucess={handleSubmit} tentativas={(3-respostas.statusNivel4.erros)}/>}
            </div>
          )
        
      case 19:
        return (
          <div>
            {respostas.statusNivel4.corrigido && <AdvanceButton buttonClick={() => handleNextDialog()} />}
          </div>
        )
      
      case 20:
        return (
          <div>
            {!respostas.statusNivel4.certo && <div>
              {respostas.statusNivel4.erros < 3 ? (
                <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Repeat'} texto2={'Restart'} onYes={() => {
                  setShowGame(true)
                  setShowDialog(false)
                  setCurrentDialog(18)
                }} onNo={handleResetGame} />
              ) : (
                <AdvanceButton buttonClick={() => handleNextDialog()} />
              )}
            </div>}
            {!respostas.statusNivel4.certo &&
              <div>
                <AdvanceButton buttonClick={handleCorrigirGame} />
              </div>}
            {showMessage && <MostrarPontos
              moeda={respostas.statusNivel4.erros < 1 ? 50 : respostas.statusNivel4.erros < 2 ? 45 : 30}
              exp={respostas.statusNivel4.erros < 1 ? 10 : respostas.statusNivel4.erros < 2 ? 5 : 3} />}
          </div>
        )

      case 22:
        return (
          <div>
            {showButton && <AdvanceButton buttonClick={() => handleColab()} />}
          </div>
        )
      
      case 23:
        return (
          <div>
            {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Restart'} texto2={'Exit'} onNo={() => router.push("/")} onYes={() => handleResetGame(true)} />}
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
                <Personagem img={`m4/${randomImg}`} left={20} />
                <Personagem img={`p4/${randomImg}`} right={20} />
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
