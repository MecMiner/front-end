import React, { useState, useEffect, use } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import DialogoBox from '@/components/DialogoBox';
import { useRouter } from 'next/router';
import ConfirmationBox from '@/components/ConfirmationBox';
import Mentor from '@/components/Mentor';
import Personagem from '@/components/Personagem';
import ButtonAdvance from '@/components/ButtonAdvance';
import SortingGame from '@/components/SortingGame';
import config from '@/config';
import CoinsXP from '@/components/CoinsXp';
import Desempenho from '@/components/Desempenho';
import Loading from '@/components/Loading';
import CompleteAsEtapa from '@/components/CompleteAsEtapas';


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
  const [pag, setPag] = useState(25);
  const [checkBanco, setCheckBanco] = useState(false);
  const [inicio, setInicio] = useState(true);

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
              if(inicio){
                setInfo(dados.response); 
                setInfo(prevInfo => {
                  const updatedStatusNivel2 = {
                    ...prevInfo.statusNivel2,
                    jogou: true,
                    corrigido: false,
                    certo: false,
                    erros: 0
                  };
              
                  return {
                    ...prevInfo,
                    statusNivel2: updatedStatusNivel2
                  };
                });    
                if(dados.response.statusNivel2.jogou && !dados.response.statusNivel2.corrigido){
                  setPag(26);
                  setCheckBanco(true);
                }   
                setInicio(false);      
              } else {
                if(dados.response.statusNivel2.corrigido){
                  setInfo(dados.response);
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

  const onChaneResposta2 = (valor) => {
    setInfo(prevInfo => ({...prevInfo, resposta2: valor}));
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



  const handelCorrigirGame = async () => {
    setShowButton(false);
    handleSetBanco();
    setCheckBanco(true);
  }

  const exibirDica = () => {
    if (!usouDica) {
      setUsouDica(true);
    }
    showMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setAnimationEnded(true);
    }, 5000);
  }



  const renderPag = () => {
    switch (pag) {
      case 1:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} acabou de se formar, e está trabalhando em uma empresa como desenvolvedora Junior. Desde a faculdade, quando fez o trabalho sobre os projetos de SL, se interessou pelo assunto, chegou a se encontrar com ${mentor.nome} para obter mais informações, mas acabou não tendo tempo de se aprofundar depois do encontro.`} />
            <Personagem img={'p1/imagem2'} posicao={'50%'} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={'20%'} tamanho={'50%'} dialogText={`${mentor.nome} resolveu ajudar ${personagem.nome} mais uma vez, e incentivá-la a continuar estudando sobre os projetos de SL.`} />
            <Mentor posicao={"70%"} img={"m1/imagem2"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} posicao={'5%'} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`Como ${personagem.nome} está disposta a tentar de novo, ela e ${mentor.nome} marcaram novamente um encontro para falar sobre os projetos de SL.`} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <Mentor img={"m1/imagem3"} posicao={"10%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"10%"} dialogText={`Olá ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou ótima, e você?"} posicao={"60%"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem className='inverter' img={"p1/imagem5"} posicao={'10%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} posicao={"10%"} dialogText={"Muito bem. Está pronta para começarmos a nossa jornada em busca do conhecimento?"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton && <ConfirmationBox onYes={() => handleSetCoin(10,0)} onNo={() =>{router.push('/menu')}}/>}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"} posicao={"10%"} dialogText={`Então vamos lá. \nO problema que vamos ver hoje ocorreu no projeto ${data.dataDesafio.nomeProjeto}, já ouviu falar desse projeto?`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => handleButtonClick()}/>}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Ok, vamos ver um pouco sobre ele então.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Ok'}/>
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => advancePag(2)}/>}
  
          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Muito bom, só vamos relembrar então quais os objetivos dele, ok?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Ok'}/>
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()}/>}
  
          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'70%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Bom, acho que deu para ter uma ideia geral sobre o que se trata o projeto, certo? Você ainda pode pesquisar mais sobre o projeto depois.`} />
            <DialogoBox cor={personagem.cor} tamanho={'10%'} posicao={'55%'} complete={() => setShowButton(true)} dialogText={`Ok, legal.`}/>
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Agora vamos ver primeiro a parte conceitual do problema que vamos estudar.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"55%"} dialogText={"Está bem"} />
            <Mentor img={"m1/imagem1"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"60%"} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} posicao={"20%"} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`Gostaria que eu repetisse essas informações?`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton && <ConfirmationBox onYes={() => handleButtonClick()} onNo={() => advancePag(2)}/>}
          </div>)
      case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`Que bom, agora vamo ver esse problema na prática, dentro do projeto ${data.dataDesafio.nomeProjeto}`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"50%"} posicao={"10%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"12%"} dialogText={`Tudo bem até aqui?`} />
            <Mentor img={"m1/imagem1"} posicao={"75%"} />
            {showButton && <ConfirmationBox onYes={()=> advancePag(3)} onNo={() => handleButtonClick()}/>}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} posicao={"10%"} dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"55%"} dialogText={"Ok, vamos lá!"} />
            <Mentor img={"m1/imagem1"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Quando quiser podermos dar continuidade`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton && (
              <div className="confirmation-box" style={{ left: "65%", top: "10%", alignitemss: 'center' }}>
                <a href={`${data.dataDesafio.materialComplementar}`} target="_blank">{`${data.dataDesafio.materialComplementar}`}</a>
                <div className="buttons" style={{}}>
                  <button className="btn-yes" onClick={() => handleButtonClick()}>Pronto</button>
                </div>
              </div>)
            }
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Legal, então podemos continuar. Só relembrando, vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto do ${data.dataDesafio.nomeProjeto}, mas como você acha que esse problema foi solucionado pela comunidade que contribui para o projeto?`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} posicao={"10%"} dialogText={`Veremos isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"10%"} posicao={"55%"} dialogText={`Vamos lá!`}/>
            <Mentor img={"m1/imagem3"} posicao={"60%"} />
            <Personagem img={"p1/imagem3"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'60%'} dialogText={`${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"30%"} dialogText={`Eu vou apresentar as etapas para você, mas eu tenho um desafio, você precisa completar as etapas de solução.`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"50%"} dialogText={`Essas são as etapas, mas está faltando a etapa 2 e 4, quais informações deveriam estar nessas etapas?`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 25:
        return (
          <div style={{width: '50%', border: '1px solid black', borderRadius: '4px'}}>
              <DialogoBox cor={mentor.cor} complete={()=> setShowButton(true)} tamanho={'10%'} dialogText={`Você pode solicitar uma dica caso se sinta confuso sobre como devem ser a etapas de solução de desse problema`}/>
              <DialogoBox posicaoY={'40%'} cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"10%"} dialogText={`Essa dica pode ser uma dica do professor, ou uma dica de um colega, você pode escolher.`} />
              <CompleteAsEtapa frase1={linhas[0]} frase2={linhas[2]} onSucess={handelCorrigirGame} setInfo={onChaneResposta2}/>
          </div>)
      case 26:
        return (
          <div>
            <div style={{width: '200px', border: '1px solid black', borderRadius: '4px', position: 'relative', height: '200px', left: '100%'}}>
            {checkBanco && (
              <Loading infinite={true}/>
            )}
            {info.statusNivel2.corrigido && !info.statusNivel2.certo && (
              <Mentor largura={200} altura={200} img={'m2/imagem9'}/>
            )}
            {info.statusNivel2.corrigido && info.statusNivel2.certo && (
              <Mentor largura={200} altura={200} img={'m2/imagem6'}/>
            )}
            </div>
            <DialogoBox cor={mentor.cor} complete={() => {}} posicao={"10%"} tamanho={"30%"} dialogText={`Agora vou pedir a ajuda de um amigo mais experiente para verificar se a sua proposta de solução está correta, ok. Peço que aguarde até que meu amigo responda, e te devolva um feedback.`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"60%"} />
            <Personagem img={"p1/imagem3"} posicao={"45%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 27:
        return (
          <div>
            {showMessage && (
              <div className="ganhador-moedas">
                {data.dataDesafio.dica}
              </div>
            )}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Infelizmente você teve suas três tentativas e sua resposta não está correta, mas o importante é tentar.`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"40%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"40%"} tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem3"} inverter={true} posicao={"50%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Desiste não, na próxima tu acerta.`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"40%"} />
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={() => handleResetGame()} onNo={() => { router.push('/menu') }} />}
          </div>)
      case 31:
        return (
          <div>
            {info.bomDesempenho && <Desempenho des={'bom'} />}
            {info.otimoDesempenho && <Desempenho des={'otimo'} />}
            <ButtonAdvance buttonClick={() => handleSetBanco()} />
          </div>)
      case 32:
        return (
          <div>
            <Loading texto={'Savando informações'} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Isso ai, parabéns, sua resposta está correta.`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"40%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 33:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vou ter mostrar novamente como ficam as estapas organizadas da forma correta.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"40%"} tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} posicao={"50%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 34:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vamos prosseguir, vou te mostra quais os impactos que a resolução desse tipo de problema pode ter no projeto`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"20%"} dialogText={`Está bem, vamos lá`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 35:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 36:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`E ai, o que achou? Conseguiu aprender algo no nosso encontro?`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ConfirmationBox onYes={() => handleButtonClick()} onNo={() => advancePag(2)} />}
          </div>)
      case 37:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Que legal, fico muito feliz em estar te ajudando nessa caminhada.`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ConfirmationBox texto1={'Refazer'} texto2={'Sair'} onYes={() => handleResetGame()} onNo={() => advancePag(2)} />}
          </div>)
      case 38:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`E ai, o que achou? Conseguiu aprender algo no nosso encontro?`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"30"} tamanho={"10%"} dialogText={`${linhas[0]}\n\n${linhas[2]}`}/>
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton && <ConfirmationBox onYes={handleNextPag} onNo={advancePag(2)} />}
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