import React, { useState, useEffect, use } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import DialogoBox from '@/components/DialogoBox';
import { useRouter } from 'next/router';
import ConfirmationBox from '@/components/ConfirmationBox';
import Personagem from '@/components/Personagem';
import ButtonAdvance from '@/components/ButtonAdvance';
import config from '@/config';
import CoinsXP from '@/components/CoinsXp';
import Desempenho from '@/components/Desempenho';
import Loading from '@/components/Loading';
import ExercicioNivel2 from '@/components/ExercicioNivel2';
import AvaliacaoStar from '@/components/AvaliacaoStar';
import Button from '@/components/Buttons';
import HomeButton from '@/components/HomeButton';
import BarradeProgresso from '@/components/BarradeProgresso';
import InfoButton from '@/components/InfoButton';
import ExibirDica from '@/components/ExibirDica';


export default function Jogar({ data }) {
  const [pag, setPag] = useState(24);
  const [user,setUser] = useState({});
  const apiUrl = config.apiUrl;
  const fraseGrande = data.dataDesafio.etapasSolucao
  const linhas = fraseGrande.split('\r\n');
  const [showMessage, setShowMessage] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  
  const [showButton, setShowButton] = useState(false);
  const [info, setInfo] = useState({});
  const personagem = config.personagem;
  const mentor = config.mentor;
  const router = useRouter();
  const { id } = router.query;
  
  const [checkBanco, setCheckBanco] = useState(false);
  const [showDicaProfessor, setShowDicaProfessor] = useState(false);
  const [showDicaColega, setShowDicaColega] = useState(false);
  const [usouDicaProfessor, setUsouDicaProfessor] = useState(false);
  const [usouDicaColega, setUsouDicaColega] = useState(false);
  const [userGame, setUserGame] = useState({
    bomDesempenho: false,
    otimoDesempenho: false,
  })
  const tamanho = 400;  

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/'); // Não tiver token, vai para página de login
      } else {
        try {
          const response = await fetch(`${apiUrl}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
  
          const dados = await response.json();
  
          if (response.ok) {
            setUser(dados.dataUsuario);
            console.log(dados.dataUsuario);
          } else {
            router.push('/');
            // Trate o erro de acordo com suas necessidades
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          // Trate o erro de acordo com suas necessidades
        }
      }
    }

    fetchUser();
  })

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/'); // Não tiver token, vai para página de login
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
        /*     console.log('Dados recuperados:', dados); */

            if (dados.response.nivel >= 1) {
              if (!dados.response.statusNivel2.jogou) {
                setInfo(prevInfo => {
                  const updatedStatusNivel2 = {
                    ...prevInfo.statusNivel2,
                    jogou: true,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                  };

                  return {
                    ...prevInfo,
                    statusNivel2: updatedStatusNivel2
                  };
                });
              } else {
                setPag(26);
                setInfo(prevInfo => ({ ...prevInfo, statusNivel2: dados.response.statusNivel2 }));

                if (!dados.response.statusNivel2.corrigido) {

                  setCheckBanco(true);
                }
                if (dados.response.statusNivel2.corrigido) {
                  if(dados.response.statusNivel2.certo) {
                    if(dados.response.statusNivel2.erros == 0){
                      setUser(prevState => ({ ...prevState, otimoDesempenho: prevState.otimoDesempenho + 1 }));
                      setUserGame(prevState => ({...prevState, otimoDesempenho: true}));
                    } else {
                      setUser(prevState => ({ ...prevState, bomDesempenho: prevState.bomDesempenho + 1 }));
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

    const interval = setInterval(fetchData, 5000);

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
      const updatedStatusNivel2 = {
        ...prevInfo.statusNivel2,
        jogou: info.statusNivel2.jogou,
        corrigido: false,
        certo: false,
        erros: info.statusNivel2.erros,
        feedback: info.statusNivel2.feedback,
      };

      return {
        ...prevInfo,
        statusNivel2: updatedStatusNivel2
      };
    });
    setPag(25);
  }

  const onChaneResposta2 = (valor) => {
    setInfo(prevInfo => ({ ...prevInfo, resposta2: valor }));
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
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiUrl}/respostas/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(info),
      })
      if (response.ok) {
        /* console.log('Valores inseridos no banco'); */
        handleNextPag();
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  }



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
      const updatedStatusNivel2 = {
        ...prevInfo.statusNivel2,
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: info.statusNivel2.feedback,
      };

      return {
        ...prevInfo,
        statusNivel2: updatedStatusNivel2
      };
    });
    setUserGame(prevState => ({ ...prevState, colaboracao: true }));
    setInfo(prevState => ({ ...prevState, nivel: 2 }));
    setInfo(prevState => ({ ...prevState, resposta2: '' }));
    handleSetCoin(10,5);
  } 


  const renderPag = () => {
    switch (pag) {
      case 1:
        return (
          <div>
            <DialogoBox cor={personagem.cor} posicao={'30%'} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} acabou de se formar, e está trabalhando em uma empresa como desenvolvedora Junior. Desde a faculdade, quando fez o trabalho sobre os projetos de SL, se interessou pelo assunto, chegou a se encontrar com ${mentor.nome} para obter mais informações, mas acabou não tendo tempo de se aprofundar depois do encontro.`} />
            <Personagem img={'p2/imagem5'} tamanho={tamanho} posicao={'50%'} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor}  posicao={'30%'} complete={() => setShowButton(true)} tamanho={'40%'} dialogText={`${mentor.nome} resolveu ajudar ${personagem.nome} mais uma vez, e incentivá-la a continuar estudando sobre os projetos de SL.`} />
            <Personagem posicao={"50%"} tamanho={tamanho} img={"m2/imagem3"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`Como ${personagem.nome} está disposta a tentar de novo, ela e ${mentor.nome} marcaram novamente um encontro para falar sobre os projetos de SL.`} />
            <Personagem img={"p2/imagem1"} tamanho={tamanho} posicao={"60%"} />
            <Personagem img={"m2/imagem2"} tamanho={tamanho} posicao={"10%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`Olá ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou ótima, e você?"} posicao={"50%"} />
            <Personagem img={"m2/imagem2"} tamanho={tamanho} posicao={"10%"} />
            <Personagem tamanho={tamanho} img={"p2/imagem5"} posicao={'60%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} dialogText={"Estou muito bem, pronto para começar?"} />
            <Personagem img={"m2/imagem2"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p2/imagem4"} tamanho={tamanho} posicao={"50%"} />
            {showButton && <ConfirmationBox posicaoY={'10%'} onYes={() => handleSetCoin(10, 0)} onNo={() => { router.push('/') }} />}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"}  dialogText={`Então vamos lá. \nO problema que vamos ver hoje ocorreu no projeto ${data.dataDesafio.nomeProjeto}, já ouviu falar desse projeto?`} />
            <Personagem img={"m2/imagem6"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p2/imagem4"} tamanho={tamanho} posicao={"60%"} />
            {showButton && <ConfirmationBox posicaoY={'10%'} onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Ok, vamos ver um pouco sobre ele então.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'55%'} tamanho={'10%'} dialogText={'Ok'} />
            <Personagem img={"m2/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => advancePag(2)} />}

          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Muito bom, só vamos relembrar então quais os objetivos dele, ok?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Ok!'} />
            <Personagem img={"m2/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'70%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Personagem img={"m2/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem4"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Bom, acho que deu para ter uma ideia geral sobre o que se trata o projeto, certo? Você ainda pode pesquisar mais sobre o projeto depois.`} />
            <DialogoBox cor={personagem.cor} tamanho={'10%'} posicao={'55%'} complete={() => setShowButton(true)} dialogText={`Ok, legal.`} />
            <Personagem img={"m2/imagem2"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem4"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Agora vamos ver primeiro a parte conceitual do problema que vamos estudar.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"55%"} dialogText={"Está bem."} />
            <Personagem img={"m2/imagem1"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem3"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m2/imagem2"} posicao={"80%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`Gostaria que eu repetisse essas informações?`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox onYes={() => handleButtonClick()} onNo={() => advancePag(2)} />}
          </div>)
      case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"60%"} dialogText={`Esta bem. Vamos lá: \n${data.dataDesafio.descProblema}`} />
            <Personagem img={"m2/imagem6"} posicao={"80%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Que bom, agora vamos ver esse problema na prática, dentro do projeto ${data.dataDesafio.nomeProjeto}.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"70%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Tudo bem até aqui?`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox posicaoY={'10%'} onYes={() => advancePag(3)} onNo={() => handleButtonClick()} />}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"55%"} dialogText={"Ok, vamos lá!"} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Quando quiser podermos dar continuidade`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && (
              <ConfirmationBox link={data.dataDesafio.materialComplementar} posicaoY={'10%'} tamanho={'300px'} onYes={() => handleNextPag()} texto1={"Pronto"}/>
            )}
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Legal, então podemos continuar. Só relembrando, vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto do ${data.dataDesafio.nomeProjeto}, mas como você acha que esse problema foi solucionado pela comunidade que contribui para o projeto?`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Veremos isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"10%"} posicao={"55%"} dialogText={`Vamos lá!`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'60%'} dialogText={`${data.dataDesafio.solucao}`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Eu vou apresentar as etapas para você, mas eu tenho um desafio, você precisa completar as etapas de solução.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Essas são as etapas, mas está faltando a etapa 2 e 4, quais informações deveriam estar nessas etapas?`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={'30%'} tamanho={"40%"} dialogText={`Etapa 1: ${linhas[0]}\n\nEtapa 3: ${linhas[2]}`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 25:
        return (
          <div>
            <ExercicioNivel2 frase1={linhas[0]} frase2={linhas[2]} onSucess={handelCorrigirGame} setInfo={onChaneResposta2} />
            <Button onYes={()=>exibirDica(true)} texto1={'Dica do Professor'} posicaoY={'90%'} posicaoX={'20%'}/>
            <Button onYes={()=>exibirDica(false)} texto1={'Dica do Aluno'} posicaoY={'90%'} posicaoX={'60%'}/>
            {info.statusNivel2 && !info.statusNivel2.certo && info.statusNivel2.erros < 3 && (
              <div style={{ position: 'absolute', top: '2%', width: '50%', backgroundColor: 'white', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel2.erros} tentativa(s)
              </div>
            )}
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
            <div style={{ transform: 'translateX(-50%)' ,width: '200px', border: '1px solid black', borderRadius: '4px', position: 'absolute', height: '200px', right: '10%', top: '50%' }}>
              {checkBanco && (
                <Loading infinite={true} />
              )}
              {info.statusNivel2.corrigido && (
                <Personagem
                  posicao={'50%'}
                  tamanho={200}
                  img={info.statusNivel2.certo ? 'm2/imagem8' : 'm2/imagem7'}
                />
              )}
            </div>
            <DialogoBox cor={mentor.cor} complete={() => { }} tamanho={"30%"} dialogText={`Agora vou pedir a ajuda de um amigo mais experiente para verificar se a sua proposta de solução está correta, ok.
Peço que aguarde até que meu amigo responda, e te devolva um feedback.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {info.statusNivel2.corrigido && !info.statusNivel2.certo && info.statusNivel2.erros < 3 && (
              <ConfirmationBox  texto={info.statusNivel2.feedback} posicaoY={'10%'} posicaoX={'20%'} texto1={'Refazer'} texto2={'Reiniciar'} onYes={handleErrorGame} onNo={handleResetGame} />
            )}
            {info.statusNivel2.corrigido && !info.statusNivel2.certo && info.statusNivel2.erros == 3 && (
              <ButtonAdvance buttonClick={() => handleButtonClick()} />
            )}
            {info.statusNivel2.corrigido && info.statusNivel2.certo && <ConfirmationBox texto={info.statusNivel2.feedback} posicaoY={'10%'} posicaoX={'10%'} texto1={'Continuar'} onYes={() => {advancePag(2)}}/>}
            {!info.statusNivel2.certo && info.statusNivel2.erros < 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: 'white', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel2.erros} tentativa(s)
              </div>
            )}
            {info.statusNivel2.erros == 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: 'SlateBlue', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você não tem mais tentativa(s)
              </div>
            )}
          </div>)
      case 27:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Infelizmente sua resposta não está correta, mas o importante é que você tentou.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={() => { router.reload() }} onNo={() => { router.push('/') }} />}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Isso aí, parabéns, sua resposta está correta.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vou te mostrar novamente como ficam as estapas completas.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"40%"} tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vamos prosseguir, vou te mostrar quais os impactos que a resolução desse tipo de problema pode ter no projeto.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"20%"} dialogText={`Está bem, vamos lá`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => {}} posicao={"5%"} tamanho={"20%"} dialogText={`E ai, o que achou? Gostaria que você avaliasse o conteúdo de hoje por meio de estrelas.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            <AvaliacaoStar complete={() => handleAvaliacao()}/>
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas, 2 XP  e um Badge de Colaboração pela avaliação.
              </div>
            )}
          </div>)
      case 33:
        return (
          <div>
            {userGame.bomDesempenho && <Desempenho des={'bom'} col={true}/>}
            {userGame.otimoDesempenho && <Desempenho des={'otimo'} col={true}/>}     
            <ButtonAdvance buttonClick={() => handleSetBanco()} />         
          </div>)
      case 34:
        return (
          <div>
            <Loading texto={'Savando informações'}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Obrigada por deixar sua avaliação, fico muito feliz em estar te ajudando nessa caminhada.`} />
            <Personagem img={"m2/imagem6"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox texto1={'Refazer'} texto2={'Sair'} onYes={() => handleResetGame()} onNo={() => {router.push(`/selecao-nivel?id=${id}`)}} />}
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
        <CoinsXP coin={user.pontos} xp={user.xp} bom={user.bomDesempenho} otm={user.otimoDesempenho} colaboracao={user.colaboracao}/>
        {renderPag()}
        <HomeButton/>
        <InfoButton/>
        <BarradeProgresso total={34} atual={pag}/>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = config.apiUrl
  const { id } = context.query;
  const response = await fetch(`${apiUrl}/desafio2/${id}`);
  const data = await response.json();
  return { props: { data } };
}