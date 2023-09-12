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
import Button from '@/components/Buttons';
import ExercicioNivel3 from '@/components/ExercicioNivel3';
import BarradeProgresso from '@/components/BarradeProgresso';
import InfosGame from '@/components/InfosGame';
import ExibirDica from '@/components/ExibirDica';
import { fetchUser, sendRequest } from './api/api';



export default function Jogar({ data }) {
  const [user,setUser] = useState({});
  const apiUrl = config.apiUrl;
  const [showMessage, setShowMessage] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [info, setInfo] = useState({});
  const personagem = config.personagem;
  const mentor = config.mentor;
  const router = useRouter();
  const { id } = router.query;
  const [pag, setPag] = useState(1);
  const [checkBanco, setCheckBanco] = useState(false);
  const [showDicaProfessor, setShowDicaProfessor] = useState(false);
  const [showDicaColega, setShowDicaColega] = useState(false);
  const [usouDicaProfessor, setUsouDicaProfessor] = useState(false);
  const [usouDicaColega, setUsouDicaColega] = useState(false);
  const [userGame, setUserGame] = useState({
    bomDesempenho: false,
    otimoDesempenho: false,
  })
  const tamanho = 60;


  const [isSave, setIsSave] = useState(false);

  useEffect(() =>{
    const setDesempenho = () => {
      if (userGame.bomDesempenho && !userGame.colaboracao) {
        setUser(prevState => ({ ...prevState, bomDesempenho: prevState.bomDesempenho + 1 }));
      }
      if (userGame.otimoDesempenho && !userGame.colaboracao) {
        setUser(prevState => ({ ...prevState, otimoDesempenho: prevState.otimoDesempenho + 1 }));
      }    
    }

    setDesempenho();
  },[userGame])

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      router.push('/');
    } else {
      const getUser = async () => {
        try {
          const user = await fetchUser(token);
          setUser(user);
          console.log(user);
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
          const response = await fetch(`${apiUrl}/respostas/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });

          const dados = await response.json();

          if (response.ok) {
            if (dados.response.nivel >= 1) {
              if (!dados.response.statusNivel3.jogou) {
                setInfo(prevInfo => {
                  const updatedstatusNivel3 = {
                    ...prevInfo.statusNivel3,
                    jogou: true,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                  };

                  return {
                    ...prevInfo,
                    statusNivel3: updatedstatusNivel3
                  };
                });
              } else {
                setPag(26);
                setInfo(prevInfo => ({ ...prevInfo, statusNivel3: dados.response.statusNivel3 }));

                if (!dados.response.statusNivel3.corrigido) {

                  setCheckBanco(true);
                }
                if (dados.response.statusNivel3.corrigido) {
                  if(dados.response.statusNivel3.certo) {
                    if(dados.response.statusNivel3.erros == 0){
                      setUserGame(prevState => ({...prevState, otimoDesempenho: true}));
                    } else {
                      setUserGame(prevState => ({...prevState, bomDesempenho: true}));
                    }
                  }
                  setPag(26);
                  setCheckBanco(false);
                  setShowButton(true);
                }
              }
            } else {
              router.push('/');
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


  const handleNextPag = () => {
    if (!animationEnded) {
      setPag(prevPag => prevPag + 1);
      setAnimationEnded(false);
    }
  }

  const advancePag = (atPg) => {
    setShowButton(false)
    setPag(prevPag => prevPag + atPg);
  }


  const saveGame = () => {
    setIsSave(true);
    handleSetBanco();
  }


  const handleButtonClick = (mensagem) => {
    setShowButton(false);
    if (mensagem) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setAnimationEnded(true);
        handleNextPag();
      }, 3000); // Aguardar 3 segundos antes de avançar
    } else {
      handleNextPag();
    }
  }

  const handleResetGame = () => {
    router.reload();
  }

  const handleErrorGame = () => {
    setInfo(prevInfo => {
      const updatedstatusNivel3 = {
        ...prevInfo.statusNivel3,
        jogou: info.statusNivel3.jogou,
        corrigido: false,
        certo: false,
        erros: info.statusNivel3.erros,
        feedback: info.statusNivel3.feedback,
      };

      return {
        ...prevInfo,
        statusNivel3: updatedstatusNivel3
      };
    });
    setPag(25);
  }

  const onChangeresposta3 = (valor) => {
    setInfo(prevInfo => ({ ...prevInfo, resposta3: valor }));
  };


  const handleSetCoin = (valor, exp) => {
    setShowButton(false);
    setUser(prevState => ({ ...prevState, pontos: prevState.pontos + valor }));
    setUser(prevState => ({ ...prevState, xp: prevState.xp + exp }));
    // Ocultar a mensagem após 3 segundos
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setAnimationEnded(true);
      handleNextPag();
    }, 3000); // Aguardar 3 segundos antes de avançar
  };


  const handleSetBanco = async () => {
    try {
      const response1 = await sendRequest(`${apiUrl}/respostas/${id}`, 'POST', {}, info);
      const response2 = await sendRequest(`${apiUrl}/setPts`, 'POST', {}, user);
      if (response1.ok && response2.ok) {
        handleNextPag();
      }
    } catch (error) {
      console.log('Erro ao inserir no banco')
    }
  };


  const handelCorrigirGame = () => {
    setShowButton(false);
    handleSetBanco();
    setCheckBanco(true);
  }

  const exibirDica = (professor) => {
    if (professor) {
      if (!usouDicaProfessor){
        setUser(prevState => ({ ...prevState, pontos: prevState.pontos - 10 }));
        setUsouDicaProfessor(true)
      }
      setShowDicaProfessor(true);
    } else {
      if (!usouDicaColega){
        setUser(prevState => ({ ...prevState, pontos: prevState.pontos - 5 }));
        setUsouDicaColega(true)
      }
      setShowDicaColega(true);
    }
    
  }
  const handleAvaliacao = () =>{
    setInfo(prevInfo => {
      const updatedstatusNivel3 = {
        ...prevInfo.statusNivel3,
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: info.statusNivel3.feedback,
      };

      return {
        ...prevInfo,
        statusNivel3: updatedstatusNivel3
      };
    });
    setUser(prevState => ({ ...prevState, colaboracao: prevState.colaboracao + 1 }));
    setUserGame(prevState => ({ ...prevState, colaboracao: true }));
    setInfo(prevState => ({ ...prevState, nivel: 4 }));
    setInfo(prevState => ({ ...prevState, resposta3: ' ' }));
    handleSetCoin(10,5);
  } 

  const handleNoAvaliable = () => {
    setInfo(prevInfo => {
        const updatedstatusNivel3 = {
          ...prevInfo.statusNivel3,
          jogou: false,
          corrigido: false,
          certo: false,
          erros: 0
        };
  
        return {
          ...prevInfo,
          statusNivel3: updatedstatusNivel3
        };
      });
      setInfo(prevState => ({ ...prevState, colaboracao: false }));
      setInfo(prevState => ({ ...prevState, nivel: 3 }));
      setInfo(prevState => ({ ...prevState, resposta3: ' ' }));
      advancePag(2)
  }


  const renderPag = () => {
    switch (pag) {
      case 1:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'50%'} posicao={'25%'} posicaoY={'30%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} foi promovida na empresa em que trabalha. Tal empresa está interessada em ingressar no mundo dos projetos de SL, mas para isso precisam avaliar se é uma boa opção e entender mais sobre como as comunidades funcionam. ${personagem.nome} ficou encarregada de tomar a frente do projeto, diante do contato que já teve com o mundo dos projetos de SL. Desta forma, deve estudar mais e posteriormente passar o conhecimento adquirido`} />
            <Personagem img={'p3/imagem5'} tamanho={tamanho} posicao={'50%'} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'50%'} posicao={'25%'} posicaoY={'30%'} dialogText={`${mentor.nome} está de volta para ajudar ${personagem.nome} mais uma vez, e incentivá-la a continuar estudando sobre os projetos de SL.`} />
            <Personagem posicao={"50%"} tamanho={tamanho} img={"m3/imagem3"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} precisa da ajuda de ${mentor.nome} novamente, e marcaram um encontro para falar sobre os projetos de SL.`} />
            <Personagem img={"p3/imagem1"} tamanho={tamanho} posicao={"50%"}/>
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`E ai, ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou bem, e você, como vai?"} posicao={"50%"} />
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            <Personagem tamanho={tamanho} img={"p3/imagem5"} posicao={'50%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} dialogText={"Estou ótima, pronta para mais um desafio?"} />
            <Personagem img={"m3/imagem3"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p3/imagem4"} tamanho={tamanho} posicao={"50%"} />
            {showButton && <ConfirmationBox posicaoX={'50%'}  onYes={() => handleSetCoin(10, 0)} onNo={() => { router.push('/') }} />}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"}  dialogText={`Vamos lá. \nO problema que vamos ver hoje ocorreu no projeto ${data.dataDesafio.nomeProjeto}, já ouviu falar desse projeto?`} />
            <Personagem img={"m3/imagem6"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p3/imagem4"} tamanho={tamanho} posicao={"50%"} />
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
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
            {showButton && <ButtonAdvance buttonClick={() => advancePag(2)} />}

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
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'70%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem4"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Agora que já temos uma ideia sobre o projeto que vamos abordar, vamos ver primeiro a parte conceitual do problema.`} />
            <DialogoBox cor={personagem.cor} tamanho={'10%'} posicao={'50%'}complete={() => setShowButton(true)} dialogText={`Ok, está bem.`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem4"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'20%'} complete={() => setShowButton(true)} dialogText={`Gostaria que eu repetisse essas informações?`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => handleButtonClick()} onNo={() => advancePag(3)} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`Esta bem. Vamos lá:`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
     case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Agora vamos ver como esse problema ocorreu na prática, no projeto ${data.dataDesafio.nomeProjeto}.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} posicao={"10%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Personagem img={"m3/imagem5"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={"70%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Conseguiu
entender até aqui?`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ConfirmationBox posicaoX={'50%'} onYes={() => advancePag(3)} onNo={() => handleButtonClick()} />}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={'50%'}dialogText={"Ok, vamos lá!"} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Quando quiser podermos dar continuidade!`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && (
              <ConfirmationBox link={data.dataDesafio.materialComplementar} posicaoX={'50%'} tamanho={'300px'} onYes={() => handleNextPag()} texto1={"Pronto"}/>
            )}
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Então vamos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto do ${data.dataDesafio.nomeProjeto}, mas o que foi feito pelos contribuidores do projeto para solucionar o problema?`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Vamos ver isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"10%"} posicao={'50%'}dialogText={`Vamos lá!`} />
            <Personagem img={"m3/imagem3"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem5"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'60%'} dialogText={`${data.dataDesafio.solucao}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Já te disse como resolveram o problema,
agora você deve criar as etapas de
solução. Seja o mais detalhista possível.`} />
            <Personagem img={"m3/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Você pode solicitar uma dica, caso seja necessário.`} />
            <Personagem img={"m3/imagem5"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem3"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 25:
        return (
          <div>        
            <ExercicioNivel3 dicaAluno={()=> exibirDica(false)} dicaProf={()=>exibirDica(true)} tentativas={3 - info.statusNivel3.erros} onSucess={handelCorrigirGame} setInfo={onChangeresposta3} />
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
              <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Refazer'} texto2={'Reiniciar'} onYes={handleErrorGame} onNo={handleResetGame} />
              <DialogoBox cor={mentor.cor} posicaoY={'70%'} posicao={'60%'} complete={() => { }} tamanho={"30%"} dialogText={info.statusNivel3.feedback} />
            </div>
            )}
            {info.statusNivel3.corrigido && !info.statusNivel3.certo && info.statusNivel3.erros == 3 && (
              <ButtonAdvance buttonClick={() => handleButtonClick()} />
            )}
            {info.statusNivel3.corrigido && info.statusNivel3.certo && (
              <div>
              <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} texto1={'Continuar'} onYes={() => {advancePag(2)}}/>
              <DialogoBox cor={mentor.cor} posicaoY={'70%'} posicao={'60%'}  tamanho={"30%"}  complete={() => { }} dialogText={info.statusNivel3.feedback} />
            </div>
            )}
            
          </div>)
      case 27:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Infelizmente sua resposta não está correta, mas o importante é que você tentou.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={() => { router.reload() }} onNo={() => { router.push('/') }} />}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Isso aí, parabéns, sua resposta está correta.`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Vou te mostrar novamente como ficam as estapas completas.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"50%"}tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Vamos continuar, vou te mostrar quais os impactos que a resolução desse tipo de problema pode ter no projeto.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'50%'}tamanho={"20%"} dialogText={`Está bem, vamos lá`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={'50%'}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleNextPag()} />}
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`E ai,o que achou? Conseguiu aprender alguma no encontro de hoje?`} />
            <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
            {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
          </div>)
        case 33:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`É uma pena`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => advancePag(2)} />}
              </div>)
        case 34:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Que legal, fico muito feliz!`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => handleNextPag()} />}
              </div>)
         case 35:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Agora eu gostaria de saber se poderia me ajudar a evoluir os conteúdos dos meus exemplos. Poderia avaliar os conteúdos que vimos?`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
              </div>)
            case 36:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Tudo bem, sem problemas`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ButtonAdvance buttonClick={() => handleNoAvaliable()} />}
              </div>)
        case 37:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`Que legal, aqui está o formulário para a avaliação`} />
                <Personagem img={"m3/imagem6"} posicao={"10%"} tamanho={tamanho}/>
                <Personagem img={"p3/imagem2"} posicao={"50%"}tamanho={tamanho}/>
                {showButton && <ConfirmationBox onYes={() => handleAvaliacao()} texto1={'pronto'} link={'https://forms.gle/unuZ7k5GkZ6bCzKN8'} />}
              </div>)
      case 38:
        return (
          <div>
            {isSave && <Loading texto={'Salvando informações...'}/>}
            {userGame.bomDesempenho && <Desempenho des={'bom'} col={userGame.colaboracao}/>}
            {userGame.otimoDesempenho && <Desempenho des={'otimo'} col={userGame.colaboracao}/>}     
            {!isSave && <Button onYes={() => saveGame()} texto1={'Salvar'} posicaoX={'43%'} posicaoY={'85%'}/>}     
          </div>)
      case 39:
        return (
          <div>
            <Loading texto={'Savando informações'}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Obrigada por deixar sua avaliação, fico muito feliz em estar te ajudando nessa caminhada.`} />
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