import React, { useState, useEffect, use } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import DialogoBox from '@/components/DialogoBox';
import { useRouter } from 'next/router';
import ConfirmationBox from '@/components/ConfirmationBox';
import Mentor from '@/components/Mentor';
import Personagem from '@/components/Personagem';
import ButtonAdvance from '@/components/ButtonAdvance';
import config from '@/config';
import CoinsXP from '@/components/CoinsXp';
import Desempenho from '@/components/Desempenho';
import Loading from '@/components/Loading';
import CompleteAsEtapa from '@/components/CompleteAsEtapas';
import AvaliacaoStar from '@/components/AvaliacaoStar';
import Button from '@/components/Buttons';
import CompleteAsEtapa3 from '@/components/CompleteAsEtapas3';


export default function Jogar({ data }) {
  const apiUrl = config.apiUrl;
  const fraseGrande = data.dataDesafio.etapasSolucao
  const linhas = fraseGrande.split('\r\n');
  const [showMessage, setShowMessage] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [usouDica, setUsouDica] = useState(false);
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

  useEffect(() => {
    console.log(JSON.stringify(info));
  }, [info]);

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
            console.log('Dados recuperados:', dados);

            if (dados.response.pontos >= 50) {
              if (!dados.response.statusNivel3.jogou) {
                setInfo(prevInfo => ({ ...prevInfo, pontos: dados.response.pontos }));
                setInfo(prevInfo => ({ ...prevInfo, xp: dados.response.xp }));
                setInfo(prevInfo => {
                  const updatedstatusNivel3 = {
                    ...prevInfo.statusNivel3,
                    jogou: true,
                    corrigido: false,
                    certo: false,
                    erros: 0
                  };

                  return {
                    ...prevInfo,
                    statusNivel3: updatedstatusNivel3
                  };
                });
              } else {
                setPag(26);
                setInfo(prevInfo => ({ ...prevInfo, pontos: dados.response.pontos }));
                setInfo(prevInfo => ({ ...prevInfo, xp: dados.response.xp }));
                setInfo(prevInfo => ({ ...prevInfo, statusNivel3: dados.response.statusNivel3 }));

                if (!dados.response.statusNivel3.corrigido) {

                  setCheckBanco(true);
                }
                if (dados.response.statusNivel3.corrigido) {
                  if(dados.response.statusNivel3.certo) {
                    if(dados.response.statusNivel3.erros == 0){
                      setInfo(prevInfo => ({ ...prevInfo, otimoDesempenho: true }));
                    } else {
                      setInfo(prevInfo => ({ ...prevInfo, bomDesempenho: true }));
                    }
                  }
                  setPag(26);
                  setCheckBanco(false);
                  setShowButton(true);
                }
              }
            } else {
              console.log("Você não tem pontos para esse nível")
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
      const updatedstatusNivel3 = {
        ...prevInfo.statusNivel3,
        jogou: info.statusNivel3.jogou,
        corrigido: false,
        certo: false,
        erros: info.statusNivel3.erros
      };

      return {
        ...prevInfo,
        statusNivel3: updatedstatusNivel3
      };
    });
    setPag(25);
  }

  const onChaneresposta3 = (valor) => {
    setInfo(prevInfo => ({ ...prevInfo, resposta3: valor }));
  };


  const handleSetCoin = (valor, exp) => {
    setShowButton(false);
    setInfo(prevState => ({ ...prevState, pontos: prevState.pontos + valor }));
    setInfo(prevState => ({ ...prevState, xp: prevState.xp + exp }));
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
        console.log('Valores inseridos no banco');
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
    setUsouDica(true);
    if (professor) {
      setShowDicaProfessor(true);
      setTimeout(() => {
        setShowDicaProfessor(false);
        setAnimationEnded(true);
      }, 5000);
    } else {
      setShowDicaColega(true);
      setTimeout(() => {
        setShowDicaColega(false);
        setAnimationEnded(true);
      }, 5000);
    }
    
  }

  const handleAvaliacao = () =>{
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
    setInfo(prevState => ({ ...prevState, colaboracao: true }));
    setInfo(prevState => ({ ...prevState, nivel: 3 }));
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
            <DialogoBox cor={personagem.cor} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} trabalha na mesma empresa de software
há mais de 18 anos, e possui uma vasta experiência. No
entanto, está tentando um emprego em uma grande
fundação de código aberto, e para conseguir a vaga
precisa se aprofundar mais no mundo dos projetos de
SL.`} />
            <Personagem img={'p2/imagem5'} tamanho={330} posicao={'10%'} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={'10%'} tamanho={'50%'} dialogText={`${mentor.nome} está de volta para ajudá-la nessa
missão.`} />
            <Mentor posicao={"60%"} tamanho={330} img={"m2/imagem3"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`E ai, ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou bem, e você, como vai?"} posicao={"50%"} />
            <Mentor img={"m2/imagem8"} tamanho={330} posicao={"10%"} />
            <Personagem tamanho={330} img={"p2/imagem5"} posicao={'60%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`Estou ótima`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Que bom"} posicao={"50%"} />
            <Mentor img={"m2/imagem8"} tamanho={330} posicao={"10%"} />
            <Personagem tamanho={330} img={"p2/imagem5"} posicao={'60%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)    
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} dialogText={"Hoje vamos fazer algo diferente para encerrarmos nossa jornada juntos."} />
            <Mentor img={"m2/imagem8"} tamanho={330} posicao={"10%"} />
            <Personagem img={"p2/imagem4"} tamanho={330} posicao={"50%"} />
            {showButton && <ConfirmationBox onYes={() => handleSetCoin(10, 0)} onNo={() => { router.push('/menu') }} />}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"}  dialogText={`Ok, legal. Até aqui eu era responsável por trazer um cenário
com um problema que ocorreu em um projeto de SL, e
estudávamos esse cenário juntos. Hoje vamos fazer diferente.`} />
            <Mentor img={"m2/imagem7"} tamanho={330} posicao={"10%"} />
            <Personagem img={"p2/imagem4"} tamanho={330} posicao={"60%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Minha proposta é que você explore o mundo dos projetos de
SL e crie um exemplo como o que vimos durante nossas
interações..`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'55%'} tamanho={'10%'} dialogText={'Esse é um grande desafio.'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Mas com o que vimos até aqui, acho que vai ser moleza para
você.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Está bem, vamos lá.'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`Para te ajudar vou te fornecer o link de um commit onde
ocorreu a refatoração e sua missão vai ser entende-lo e criar o
exemplo.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Ok.'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem4"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Aqui está o link:`} />
            <ConfirmationBox onYes={handleButtonClick} texto1={'Pronto'} link={data.dataDesafio.linkNivel} textoLink={'Commit'} posicaoY={'10%'} posicaoX={'50%'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem4"} posicao={"60%"} tamanho={330}/>
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"30%"} complete={() => setShowButton(true)} dialogText={`Você deve criar o exemplo seguindo o formulário disponível em:`} />
            <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php'} textoLink={'aqui'} posicaoY={'10%'} posicaoX={'50%'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem3"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"30%"} complete={() => setShowButton(true)} dialogText={`Temos também um padrão de criação dos exemplos, que
explica quais informações devem ser inseridas em cada um dos
campos:`} />
            <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/padrao.php'} textoLink={'aqui'} posicaoY={'10%'} posicaoX={'50%'} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem3"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`Para melhorar, você pode pedir a ajuda de outros colegas nessa tarefa.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
     case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`Boa sorte na missão, você tem 7 dias para completar esse desafio.`} />
            <Mentor img={"m2/imagem8"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem3"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Agora vamos ver como esse
problema ocorreu na prática,
no projeto ${data.dataDesafio.nomeProjeto}`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} posicao={"10%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"70%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Conseguiu
entender até aqui?`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ConfirmationBox onYes={() => advancePag(3)} onNo={() => handleButtonClick()} />}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"55%"} dialogText={"Ok, vamos lá!"} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Quando quiser podermos dar continuidade`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && (
              <ConfirmationBox link={data.dataDesafio.materialComplementar} posicaoY={'10%'} tamanho={'300px'} onYes={() => handleNextPag()} texto1={"Pronto"}/>
            )}
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Então vamos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto do ${data.dataDesafio.nomeProjeto}, mas o que foi feito pelos contribuidores do projeto para solucionar o problema?`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Vamos ver isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"10%"} posicao={"55%"} dialogText={`Vamos lá!`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'60%'} dialogText={`${data.dataDesafio.solucao}`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Já te disse como resolveram o problema,
agora você deve criar as etapas de
solução. Seja o mais detalhista possível.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Você pode solicitar uma dica, caso seja necessário.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 25:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'15%'} dialogText={`Você pode solicitar uma dica, caso seja necessário`} />
            <CompleteAsEtapa3 onSucess={handelCorrigirGame} setInfo={onChaneresposta3} />
            <Button onYes={()=>exibirDica(true)} texto1={'Dica do Professor'} posicaoY={'90%'} posicaoX={'20%'}/>
            <Button onYes={()=>exibirDica(false)} texto1={'Dica do Aluno'} posicaoY={'90%'} posicaoX={'60%'}/>
            {info.statusNivel3 && !info.statusNivel3.certo && info.statusNivel3.erros < 3 && (
              <div style={{ position: 'absolute', top: '2%', width: '50%', backgroundColor: 'blue', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel3.erros} tentativa(s)
              </div>
            )}
            {showDicaProfessor && (
              <div className="ganhador-moedas">
                {data.dataDesafio.dica}
              </div>
            )}
            {showDicaColega && (
              <div className="ganhador-moedas">
                {data.dataDesafio.dicaColega}
              </div>
            )}

          </div>)
      case 26:
        return (
          <div>
            <div style={{ width: '200px', border: '1px solid black', borderRadius: '4px', position: 'absolute', height: '200px', right: '20%', top: '20%' }}>
              {checkBanco && (
                <Loading infinite={true} />
              )}
              {info.statusNivel3.corrigido && (
                <Mentor
                  posicao={'50%'}
                  tamanho={200}
                  img={info.statusNivel3.certo ? 'm2/imagem6' : 'm2/imagem9'}
                />
              )}
            </div>
            <DialogoBox cor={mentor.cor} complete={() => { }} posicao={"10%"} tamanho={"30%"} dialogText={`Agora vou pedir a ajuda de um amigo mais experiente para verificar se a sua proposta de solução está correta, ok. Peço que aguarde até que meu amigo responda, e te devolva um feedback.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {info.statusNivel3.corrigido && !info.statusNivel3.certo && info.statusNivel3.erros < 3 && (
              <ConfirmationBox posicaoY={'70%'} posicaoX={'20%'} texto1={'Refazer'} texto2={'Reiniciar'} onYes={handleErrorGame} onNo={handleResetGame} />
            )}
            {info.statusNivel3.corrigido && !info.statusNivel3.certo && info.statusNivel3.erros == 3 && (
              <ButtonAdvance buttonClick={() => handleButtonClick()} />
            )}
            {info.statusNivel3.corrigido && info.statusNivel3.certo && <ButtonAdvance buttonClick={() => advancePag(2)} />}
            {!info.statusNivel3.certo && info.statusNivel3.erros < 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: 'SlateBlue', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel3.erros} tentativa(s)
              </div>
            )}
            {info.statusNivel3.erros == 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: 'SlateBlue', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você não tem mais tentativa(s)
              </div>
            )}
          </div>)
      case 27:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Infelizmente sua resposta não está correta, mas o importante é que você tentou.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={() => { router.reload() }} onNo={() => { router.push('/menu') }} />}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Isso aí, parabéns, sua resposta está correta.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vou ter mostrar novamente como ficam as estapas completas.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"40%"} tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vamos continuar, vou te mostra quais os impactos que a resolução desse tipo de problema pode ter no projeto`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"20%"} dialogText={`Está bem, vamos lá`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"60%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {showButton && <ButtonAdvance buttonClick={() => handleNextPag()} />}
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`E ai,o que achou? Conseguiu aprender alguma no encontro de hoje?`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
          </div>)
        case 33:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`É uma pena`} />
                <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
                <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
                {showButton && <ButtonAdvance buttonClick={() => advancePag(2)} />}
              </div>)
        case 34:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Que legal, fico muito feliz`} />
                <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
                <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
                {showButton && <ButtonAdvance buttonClick={() => handleNextPag()} />}
              </div>)
         case 35:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Agora eu gostaria de saber se poderia me ajudar a evoluir os conteúdos dos meus exemplos. Poderia avaliar os conteúdos que vimos?`} />
                <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
                <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
                {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => handleButtonClick()} />}
              </div>)
            case 36:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Tudo bem, sem problemas`} />
                <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
                <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
                {showButton && <ButtonAdvance buttonClick={() => handleNoAvaliable()} />}
              </div>)
        case 37:
            return (
              <div>
                <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Que legal, aqui está o formulário para a avaliação`} />
                <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
                <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
                {showButton && <ConfirmationBox onYes={() => handleAvaliacao()} texto1={'pronto'} link={'https://forms.gle/unuZ7k5GkZ6bCzKN8'} />}
              </div>)
      case 38:
        return (
          <div>
            {info.bomDesempenho && <Desempenho des={'bom'} col={info.colaboracao}/>}
            {info.otimoDesempenho && <Desempenho des={'otimo'} col={info.colaboracao}/>}     
            <ButtonAdvance buttonClick={() => handleSetBanco()} />         
          </div>)
      case 39:
        return (
          <div>
            <Loading texto={'Savando informações'}/>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Obrigada por deixar sua avaliação, fico muito feliz em estar te ajudando nessa caminhada.`} />
            <Mentor img={"m2/imagem7"} posicao={"10%"} tamanho={330}/>
            <Personagem img={"p2/imagem2"} posicao={"40%"} tamanho={330}/>
            {showButton && <ConfirmationBox texto1={'Refazer'} texto2={'Sair'} onYes={() => handleResetGame()} onNo={() => advancePag(2)} />}
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
        <CoinsXP coin={info.pontos} xp={info.xp} />
        {renderPag()}

      </Layout>
      <style jsx>{`
        .render-pag {
          position: absolute; 
          height: 100%;
          width: 100%;
        }
      `}</style>
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