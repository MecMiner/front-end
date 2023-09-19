import React, { useState, useEffect } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import DialogoBox from '@/components/DialogoBox';
import { useRouter } from 'next/router';
import ConfirmationBox from '@/components/ConfirmationBox';
import Personagem from '@/components/Personagem';
import ButtonAdvance from '@/components/ButtonAdvance';
import config from '@/config';
import Desempenho from '@/components/Desempenho';
import Loading from '@/components/Loading';
import ExercicioNivel3 from '@/components/ExercicioNivel3';
import BarradeProgresso from '@/components/BarradeProgresso';
import InfosGame from '@/components/InfosGame';
import ExibirDica from '@/components/ExibirDica';
import { fetchResponse, fetchUser, setBom, setCoin, setCol, setOtm } from './api/api';
import Image from 'next/image';
import { SaveGame, SaveUser } from '@/components/SaveGame';



export default function Jogar({ data }) {
  const [user,setUser] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [info, setInfo] = useState({});
  const personagem = config.personagem;
  const mentor = config.mentor;
  const router = useRouter();
  const { id } = router.query;
  const [pag, setPag] = useState(0);
  const [checkBanco, setCheckBanco] = useState(false);
  const [showDicaProfessor, setShowDicaProfessor] = useState(false);
  const [showDicaColega, setShowDicaColega] = useState(false);
  const [usouDicaProfessor, setUsouDicaProfessor] = useState(false);
  const [usouDicaColega, setUsouDicaColega] = useState(false);
  const tamanho = 60;


  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/');
    } else {
      const getUser = async () => {
        try {
          const user = await fetchUser(token);
          setUser(user);
        } catch (error) {
          router.push('/');
        }
      };
      getUser();
    }
  }, [id]);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
      } else {
        try {
          const dados = await fetchResponse(id);
          setInfo(prevInfo => ({ ...prevInfo, statusNivel3: dados.statusNivel3 }));
            if (dados.nivel >= 1) {
              if(dados.statusNivel3.pag){
                setPag(dados.statusNivel3.pag)
              } else {
                setPag(1);
              }
              if (dados.statusNivel3.jogou){
                if (!dados.statusNivel3.corrigido) {
                  setCheckBanco(true);
                }
                if (dados.statusNivel3.corrigido) {
                  if (dados.statusNivel2.certo) {
                    setInfo(prevState => ({ ...prevState, nivel: 4 }));
                  }
                  setCheckBanco(false);
                  setShowButton(true);
                }
              }
            } else {
              router.push('/');
            }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    };

    const interval = setInterval(fetchData, 60000);

    if (!checkBanco) {
      fetchData();
      clearInterval(interval); // Limpar o intervalo quando a verificação não estiver habilitada
    }

    return () => {
      clearInterval(interval);
    };
  }, [id, checkBanco]);


  const nextPag = (pular) => {
    setInfo(prevInfo => ({
      ...prevInfo,
      statusNivel3: {
        ...prevInfo.statusNivel3,
        pag: pag + (pular ? pular : 1),
      },
    }))
    setShowButton(false);
    if (!animationEnded) {
      setPag(prevPag => prevPag + (pular ? pular : 1));
      setAnimationEnded(false);
    }

  }

  const zerarValor = () => {

  }


  const handleResetGame = () => {
    setInfo(prevInfo => {
      const updatedStatusNivel3 = {
        ...prevInfo.statusNivel3,
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: '',
        pag: 1,
      };

      return {
        ...prevInfo,
        statusNivel3: updatedStatusNivel3
      };
    });
    setIsSave(false);
    setPag(1);
  }

  const onChangeResposta = (valor) => {
    setInfo(prevInfo => {
      const updatedstatusNivel3 = {
        ...prevInfo.statusNivel3,
        jogou: true,
        corrigido: false,
        certo: false,
        erros: info.statusNivel3.erros,
        feedback: "",
      };

      return {
        ...prevInfo,
        statusNivel3: updatedstatusNivel3
      };
    });
    setInfo(prevInfo => ({ ...prevInfo, resposta3: valor }));

  };


  const handleSetUser = (valor, exp, otm, bom, col,pag) => {
    setShowButton(false);
    setCoin(setUser, valor, exp);
    if (otm) setOtm(setUser);
    if (bom) setBom(setUser);
    if (col) setCol(setUser);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setAnimationEnded(true);
      nextPag((pag ? pag : 1));
    }, 3000);
  };


  const handelCorrigirGame = () => {
    setCheckBanco(true);
    setIsSave(true);
    nextPag();
  }

  const exibirDica = (professor) => {
    if (professor) {
      if (!usouDicaProfessor){
        setCoin(setUser,-10,0)
        setUsouDicaProfessor(true)
      }
      setShowDicaProfessor(true);
    } else {
      if (!usouDicaColega){
        setCoin(setUser,-5,0)
        setUsouDicaColega(true)
      }
      setShowDicaColega(true);
    }
    
  }

  const renderPag = () => {
    switch (pag) {
      case 0:
        return  (
          <div>
              <Loading texto={'Carregando...'}/>
          </div>
        )
      case 1:
        return (
          <div>
            <SaveGame id={id} info={info}/>
            <DialogoBox cor={personagem.cor} tamanho={'50%'} posicao={'25%'} posicaoY={'30%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} foi promovida na empresa em que trabalha. Tal empresa está interessada em ingressar no mundo dos projetos de SL, mas para isso precisam avaliar se é uma boa opção e entender mais sobre como as comunidades funcionam. ${personagem.nome} ficou encarregada de tomar a frente do projeto, diante do contato que já teve com o mundo dos projetos de SL. Desta forma, deve estudar mais e posteriormente passar o conhecimento adquirido`} />
            <Personagem img={'p3/imagem5'} tamanho={tamanho} posicao={'50%'} />
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'50%'} posicao={'25%'} posicaoY={'30%'} dialogText={`${mentor.nome} está de volta para ajudar ${personagem.nome} mais uma vez, e incentivá-la a continuar estudando sobre os projetos de SL.`} />
            <Personagem posicao={"50%"} tamanho={tamanho} img={"m3/imagem3"} />
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} precisa da ajuda de ${mentor.nome} novamente, e marcaram um encontro para falar sobre os projetos de SL.`} />
            <Personagem img={"p3/imagem1"} tamanho={tamanho} posicao={"50%"}/>
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`E ai, ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou bem, e você, como vai?"} posicao={"50%"} />
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            <Personagem tamanho={tamanho} img={"p3/imagem5"} posicao={'50%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} dialogText={"Estou ótima, pronta para mais um desafio?"} />
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p3/imagem4"} tamanho={tamanho} posicao={"50%"} />
            {showButton && <ConfirmationBox posicaoX={'50%'}  onYes={() => handleSetUser(10, 0)} onNo={() => { router.push('/') }} />}
            {showMessage && (
              <div className="ganhador-moedas">
                <Image src={'/src/moeda.gif'} width={100} height={100} alt='moeda' priority />
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 6:
        return (
          <div>
            <SaveGame id={id} info={info}/>
            <SaveUser user={user}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"}  dialogText={`Vamos lá. \nO problema que vamos ver hoje ocorreu no projeto ${data.dataDesafio.nomeProjeto}, já ouviu falar desse projeto?`} />
            <Personagem img={"m3/imagem6"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p3/imagem4"} tamanho={tamanho} posicao={"50%"} />
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => nextPag(2)} onNo={() => nextPag()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Está bem, vamos ver
algumas informações
sobre esse projeto.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'50%'} tamanho={'10%'} dialogText={'Ok!'} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag(2)} />}

          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Que legal, então
vamos apenas
relembrar, Ok.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'50%'} tamanho={'10%'} dialogText={'Ok!'} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}

          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'70%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem4"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Agora que já temos uma ideia sobre o projeto que vamos abordar, vamos ver primeiro a parte conceitual do problema.`} />
            <DialogoBox cor={personagem.cor} tamanho={'10%'} posicao={'50%'}complete={() => setShowButton(true)} dialogText={`Ok, está bem.`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem4"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'20%'} complete={() => setShowButton(true)} dialogText={`Gostaria que eu repetisse essas informações?`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => nextPag()} onNo={() => nextPag(3)} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`Esta bem. Vamos lá:`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
     case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Agora vamos ver como esse problema ocorreu na prática, no projeto ${data.dataDesafio.nomeProjeto}.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} posicao={"10%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Personagem img={"m3/imagem5"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={"70%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Conseguiu
entender até aqui?`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => nextPag(3)} onNo={() => nextPag()} />}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={'50%'}dialogText={"Ok, vamos lá!"} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Quando quiser podermos dar continuidade!`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && (
              <ConfirmationBox link={data.dataDesafio.materialComplementar} posicaoX={'50%'} tamanho={'300px'} onYes={() => nextPag()} texto1={"Pronto"}/>
            )}
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Então vamos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto do ${data.dataDesafio.nomeProjeto}, mas o que foi feito pelos contribuidores do projeto para solucionar o problema?`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Vamos ver isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"10%"} posicao={'50%'}dialogText={`Vamos lá!`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}

          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'60%'} dialogText={`${data.dataDesafio.solucao}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Já te disse como resolveram o problema,
agora você deve criar as etapas de
solução. Seja o mais detalhista possível.`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Você pode solicitar uma dica, caso seja necessário.`} />
            <Personagem img={"m3/imagem5"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 25:
        return (
          <div>        
            <ExercicioNivel3 dicaAluno={()=> exibirDica(false)} dicaProf={()=>exibirDica(true)} tentativas={3 - info.statusNivel3.erros} onSucess={handelCorrigirGame} setInfo={onChangeResposta} />
            {showDicaProfessor && (
              <ExibirDica dica={data.dataDesafio.dica} setExibirDica={setShowDicaProfessor}/>
            )}
            {showDicaColega && (
              <ExibirDica dica={data.dataDesafio.dicaColega} setExibirDica={setShowDicaColega}/>
            )}
          </div>)
      case 26:
        return (
          <div>
            {isSave && <SaveGame id={id} info={info}/>}
            {isSave && <SaveUser user={user}/>}
            <div style={{ transform: 'translateX(-50%)' ,height: '20%', border: '1px solid black', borderRadius: '4px', position: 'absolute', aspectRatio: '1/1', right: '10%', top: '70%' }}>
              {checkBanco && (
                <Loading infinite={true} />
              )}
                {info.statusNivel3.corrigido && (
                <Personagem
                  posicao={'50%'}
                  tamanho={100}
                  img={info.statusNivel3.certo ? 'm2/imagem8' : 'm2/imagem7'}
                />
              )}
            </div>
            <DialogoBox cor={mentor.cor} complete={() => { }} posicao={"10%"} tamanho={"30%"} dialogText={`Agora vou pedir a ajuda de um amigo mais experiente para verificar se a sua proposta de solução está correta, ok. 
Peço que aguarde até que meu amigo responda, e te devolva um feedback.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {info.statusNivel3.corrigido && !info.statusNivel3.certo && info.statusNivel3.erros < 3 && (
              <div>
              <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Refazer'} texto2={'Reiniciar'} onYes={() => setPag(25)} onNo={handleResetGame} />
              <DialogoBox cor={mentor.cor} posicaoY={'70%'} posicao={'60%'} complete={() => { }} tamanho={"30%"} dialogText={info.statusNivel3.feedback} />
            </div>
            )}
            {info.statusNivel3.corrigido && !info.statusNivel3.certo && info.statusNivel3.erros == 3 && (
              <ButtonAdvance buttonClick={() => nextPag()} />
            )}
                        {info.statusNivel3.corrigido && info.statusNivel3.certo && (
              <div>
                {showButton && <ButtonAdvance buttonClick={() => {
                    if (info.statusNivel3.erros == 0) handleSetUser(50,10,false, false, false, 2);  
                    if (info.statusNivel3.erros == 1) handleSetUser(40,8, false, false, false, 2);
                    if (info.statusNivel3.erros == 2) handleSetUser(35,5, false, false, false, 2);
                  }} />}
                <DialogoBox cor={mentor.cor} posicaoY={'70%'} posicao={'60%'} complete={() => { }} dialogText={info.statusNivel3.feedback} />
              </div>
            )} 
            {showMessage && (
              <div className="ganhador-moedas">
                <Image src={'/src/moeda.gif'} width={100} height={100} alt='moeda' priority />
                {`Você ganhou ${info.statusNivel3.erros == 0 ? 50 : (info.statusNivel3.erros == 1 ? 40 : 35)} moedas, ${info.statusNivel3.erros == 0 ? 10 : (info.statusNivel3.erros == 1 ? 8 : 5)} XP.`}
              </div>
            )}   
            
          </div>)
      case 27:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Infelizmente sua resposta não está correta, mas o importante é que você tentou.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={handleResetGame} onNo={() => { router.push('/') }} />}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Isso aí, parabéns, sua resposta está correta.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Vou te mostrar novamente como ficam as estapas completas.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"50%"}tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Vamos continuar, vou te mostrar quais os impactos que a resolução desse tipo de problema pode ter no projeto.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'50%'}tamanho={"20%"} dialogText={`Está bem, vamos lá`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`E ai,o que achou? Conseguiu aprender alguma no encontro de hoje?`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ConfirmationBox onYes={() => nextPag(2)} onNo={() => nextPag()} />}
          </div>)
        case 33:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`É uma pena`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => nextPag(2)} />}
              </div>)
        case 34:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Que legal, fico muito feliz!`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => nextPag()} />}
              </div>)
         case 35:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Agora eu gostaria de saber se poderia me ajudar a evoluir os conteúdos dos meus exemplos. Poderia avaliar os conteúdos que vimos?`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ConfirmationBox onYes={() => nextPag(2)} onNo={() => nextPag()} />}
              </div>)
            case 36:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Tudo bem, sem problemas`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => handleSetUser(0,0,info.statusNivel3.erros == 0,!info.statusNivel3.erros == 0,false,3)} />}
                {showMessage && (
                  <div className="ganhador-moedas">
                    Que pena.
                  </div>
                )}
              </div>)
        case 37:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Que legal, aqui está o formulário para a avaliação`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ConfirmationBox onYes={() => handleSetUser(0,0,info.statusNivel3.erros == 0,!info.statusNivel3.erros == 0,true)} texto1={'pronto'} link={'https://forms.gle/unuZ7k5GkZ6bCzKN8'} />}
                {showMessage && (
                  <div className="ganhador-moedas">
                    Obrigado pela colaboração.
                  </div>
                )}
              </div>)
      case 38:
        return (
          <div>
            {!info.statusNivel3.erros == 0 && <Desempenho des={'bom'} col={true} />}
            {info.statusNivel3.erros == 0 && <Desempenho des={'otimo'} col={true} />} 
            <ButtonAdvance buttonClick={() => nextPag(2)} />
          </div>)
      case 39:
        return (
          <div>
            {!info.statusNivel3.erros == 0 && <Desempenho des={'bom'} col={false} />}
            {info.statusNivel3.erros == 0 && <Desempenho des={'otimo'} col={false} />} 
            <ButtonAdvance buttonClick={() => nextPag(2)} />
          </div>)
      case 40:
        return (
          <div>
            <SaveGame id={id} info={info}/>
            <SaveUser user={user}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Obrigada por deixar sua avaliação, fico muito feliz em estar te ajudando nessa caminhada.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton &&  <ConfirmationBox texto1={'Continuar'} texto2={'Refazer'} posicaoY={'50%'} posicaoX={'50%'} onNo={() => handleResetGame()} onYes={() => {router.push(`/selecao-nivel?id=${id}`)}} />}
          </div>)
      case 41:
        return (
          <div>
            <SaveGame id={id} info={info}/>
            <SaveUser user={user}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Obrigada por participar de nosso jogo.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton &&  <ConfirmationBox texto1={'Continuar'} texto2={'Refazer'} posicaoY={'50%'} posicaoX={'50%'} onNo={() => handleResetGame()} onYes={() => {router.push(`/selecao-nivel?id=${id}`)}} />}
          </div>)
      default:
        router.push(`/selectNivel?id=${id}`);
        break;
    }
  }

  return (
    <div>
    <MyHead />
    <Layout>
      <InfosGame  user={user}/>  
      <div className='renderPag'>
        {renderPag()}
        <BarradeProgresso total={39} atual={pag}/>
      </div>   
    </Layout>
  </div>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = config.apiUrl
  const { id } = context.query;
  const response = await fetch(`${apiUrl}/desafio3/${id}`);
  const data = await response.json();
  return { props: { data } };
}