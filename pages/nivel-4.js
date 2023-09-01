import React, { useState, useEffect } from 'react';
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
import Button from '@/components/Buttons';
import ExercicioNivel4 from '@/components/ExercicioNivel4';
import BarradeProgresso from '@/components/BarradeProgresso';
import HomeButton from '@/components/HomeButton';
import InfoButton from '@/components/InfoButton';


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
  const [isSave, setIsSave] = useState(false);
  const tamanho = 430;
/* 
  useEffect(() => {
    console.log(JSON.stringify(info));
  }, [info]);
 */

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
/*             console.log('Dados recuperados:', dados);
 */
            if (dados.response.pontos > 2) {
              if (!dados.response.statusNivel4.jogou) {
                setInfo(prevInfo => {
                  const updatedstatusNivel4 = {
                    ...prevInfo.statusNivel4,
                    jogou: true,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                  };

                  return {
                    ...prevInfo,
                    statusNivel4: updatedstatusNivel4
                  };
                });
              } else {
                setPag(16);
                setInfo(prevInfo => ({ ...prevInfo, statusNivel4: dados.response.statusNivel4 }));

                if (!dados.response.statusNivel4.corrigido) {

                  setCheckBanco(true);
                }
                if (dados.response.statusNivel4.corrigido) {
                  if(dados.response.statusNivel4.certo) {
                    if(dados.response.statusNivel4.erros == 0){
                      setUser(prevInfo => ({ ...prevInfo, otimoDesempenho: prevState.otimoDesempenho + 1 }));
                    } else {
                      setUser(prevInfo => ({ ...prevInfo, bomDesempenho: prevState.bomDesempenho + 1  }));
                    }
                  }
                  setPag(16);
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


  const handleNextPag = (prepararBanco) => {
    if(prepararBanco) {handlePrepararBanco()}
    if (!animationEnded) {
      setPag(prevPag => prevPag + 1);
      setAnimationEnded(false);
    }
  }

  const handlePrepararBanco = () =>{
    setInfo(prevInfo => {
      const updatedstatusNivel4 = {
        ...prevInfo.statusNivel4,
        jogou: false,
        corrigido: false,
        certo: false,
        erros: 0,
        feedback: info.statusNivel2.feedback,
      };

      return {
        ...prevInfo,
        statusNivel4: updatedstatusNivel4
      };
    });
    setInfo(prevState => ({ ...prevState, colaboracao: true }));
    setInfo(prevState => ({ ...prevState, resposta4: ' ' }));
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
      const updatedstatusNivel4 = {
        ...prevInfo.statusNivel4,
        jogou: info.statusNivel4.jogou,
        corrigido: false,
        certo: false,
        erros: info.statusNivel4.erros,
        feedback: info.statusNivel4.feedback
      };

      return {
        ...prevInfo,
        statusNivel4: updatedstatusNivel4
      };
    });
    setPag(15);
  }

  const onChaneresposta4 = (valor) => {
    setInfo(prevInfo => ({ ...prevInfo, resposta4: valor }));
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

  const saveGame = () => {
    setIsSave(true);
    handleSetBanco();
  }


  const renderPag = () => {
    switch (pag) {
      case 1:
        return (
          <div>
            <DialogoBox cor={personagem.cor} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} trabalha na mesma empresa de software há mais de 18 anos, e possui uma vasta experiência. No entanto, está tentando um emprego em uma grande fundação de código aberto, e para conseguir a vaga precisa se aprofundar mais no mundo dos projetos de SL.`} />
            <Personagem img={'p4/imagem5'} tamanho={tamanho} posicao={'10%'} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={'10%'} tamanho={'50%'} dialogText={`${mentor.nome} está de volta para ajudá-la nessa missão.`} />
            <Personagem posicao={"60%"} tamanho={tamanho} img={"m4/imagem3"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`E ai, ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou bem, e você, como vai?"} posicao={"50%"} />
            <Personagem img={"m4/imagem8"} tamanho={tamanho} posicao={"10%"} />
            <Personagem tamanho={tamanho} img={"p4/imagem5"} posicao={'60%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={`Estou ótima.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Que bom!"} posicao={"50%"} />
            <Personagem img={"m4/imagem8"} tamanho={tamanho} posicao={"10%"} />
            <Personagem tamanho={tamanho} img={"p4/imagem5"} posicao={'60%'} inverter={true} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)    
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} dialogText={"Hoje vamos fazer algo diferente para encerrarmos nossa jornada juntos. Está preparada?"} />
            <Personagem img={"m4/imagem8"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p4/imagem4"} tamanho={tamanho} posicao={"50%"} />
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
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"}  dialogText={`Ok, legal. Até aqui eu era responsável por trazer um cenário com um problema que ocorreu em um projeto de SL, e estudávamos esse cenário juntos. Hoje vamos fazer diferente.`} />
            <Personagem img={"m4/imagem7"} tamanho={tamanho} posicao={"10%"} />
            <Personagem img={"p4/imagem4"} tamanho={tamanho} posicao={"60%"} />
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Minha proposta é que você explore o mundo dos projetos de SL e crie um exemplo como o que vimos durante nossas
interações..`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'55%'} tamanho={'10%'} dialogText={'Esse é um grande desafio.'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Mas com o que vimos até aqui, acho que vai ser moleza para você.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Está bem, vamos lá.'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}

          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`Para te ajudar vou te fornecer o link de um commit com um cenário e sua missão vai ser entende-lo e criar um exemplo.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={'60%'} tamanho={'10%'} dialogText={'Ok.'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem4"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'20%'} complete={() => setShowButton(true)} dialogText={`Aqui está o link, basta clicar para ter acesso ao commit!`} />
            <ConfirmationBox onYes={handleButtonClick} texto1={'Pronto'} link={data.dataDesafio.linkNivel} textoLink={'Link para o Commit'} posicaoY={'10%'} posicaoX={'30%'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem4"} posicao={"60%"} tamanho={tamanho}/>
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"30%"} complete={() => setShowButton(true)} dialogText={`Para criar o exemplo você deve utilizar o formulário disponível neste link. Para acessá-lo é necessário fazer login no sistema`} />
            <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php'} textoLink={'Formulário para Criação de Exemplos'} posicaoY={'10%'} posicaoX={'10%'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem3"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"30%"} complete={() => setShowButton(true)} dialogText={`Para criar o exemplo vou te fornecer algumas diretrizes. Essas diretrizes são encontradas no padrão disponível neste link. Fique atento a elas ao criar seu exemplo.`} />
            <ConfirmationBox  link={'https://portalworkedexamples.herokuapp.com/padrao.php'} textoLink={'Diretrizes para Criação de Exemplos'} posicaoY={'10%'} posicaoX={'15%'} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem3"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"40%"} dialogText={`Para melhorar, você pode pedir a ajuda de outros colegas nessa tarefa.`} />
            <Personagem img={"m4/imagem7"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
     case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"40%"} complete={() => setShowButton(true)} dialogText={`Boa sorte nesta missão, você tem 7 dias para completar esse desafio.`} />
            <Personagem img={"m4/imagem8"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem3"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 15:
        return (
          <div>
            <ExercicioNivel4 onSucess={handelCorrigirGame} setInfo={onChaneresposta4} linksite={data.dataDesafio.linkNivel}  />
            {info.statusNivel4 && !info.statusNivel4.certo && info.statusNivel4.erros < 3 && (
              <div style={{ position: 'absolute', top: '2%', width: '45%', backgroundColor: '#ff9800', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel4.erros} tentativa(s)
              </div>
            )}

          </div>)
      case 16:
        return (
          <div>
            <div style={{ width: '200px', border: '1px solid black', borderRadius: '4px', position: 'absolute', height: '200px', right: '20%', top: '20%' }}>
              {checkBanco && (
                <Loading infinite={true} />
              )}
              {info.statusNivel4.corrigido && (
                <Personagem
                  posicao={'50%'}
                  tamanho={200}
                  img={info.statusNivel4.certo ? 'm4/imagem10' : 'm4/imagem9'}
                />
              )}
            </div>
            <DialogoBox cor={mentor.cor} complete={() => { }} posicao={"10%"} tamanho={"30%"} dialogText={`Agora vou pedir a ajuda de um amigo mais experiente para verificar se a sua proposta de solução está correta, ok. 
Peço que aguarde até que meu amigo responda, e te devolva um feedback.`} />
            <Personagem img={"m4/imagem7"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {info.statusNivel4.corrigido && !info.statusNivel4.certo && info.statusNivel4.erros < 3 && (
              <ConfirmationBox texto={info.statusNivel4.feedback} posicaoY={'70%'} posicaoX={'20%'} texto1={'Refazer'} texto2={'Reiniciar'} onYes={handleErrorGame} onNo={handleResetGame} />
            )}
            {info.statusNivel4.corrigido && !info.statusNivel4.certo && info.statusNivel4.erros == 3 && (
              <ButtonAdvance buttonClick={() => handleButtonClick()} />
            )}
            {info.statusNivel4.corrigido && info.statusNivel4.certo && <ButtonAdvance buttonClick={() => advancePag(2)} />}
            {!info.statusNivel4.certo && info.statusNivel4.erros < 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: '#ff9800', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você tem {3 - info.statusNivel4.erros} tentativa(s)
              </div>
            )}
            {info.statusNivel4.erros == 3 && (
              <div style={{ transform: 'translateX(-50%)', position: 'absolute', top: '2%', left: '50%', width: '50%', backgroundColor: 'ff9800', borderRadius: '4px', textAlign: 'center', fontSize: '18px' }}>
                Você não tem mais tentativa(s)
              </div>
            )}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Infelizmente sua resposta não está correta, mas o importante é que você tentou.`} />
            <Personagem img={"m4/imagem7"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"60%"} tamanho={tamanho}/>
            {showButton && <ConfirmationBox texto1={'Reiniciar'} texto2={'Sair'} onYes={() => { router.reload() }} onNo={() => { router.push('/menu') }} />}
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"20%"} dialogText={`Isso aí, parabéns, sua resposta está correta.`} />
            <Personagem img={"m4/imagem7"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"20%"} dialogText={`Você foi muito bem! E vai alcançar todos os objetivos que deseja.`} />
            <Personagem img={"m4/imagem7"} posicao={"10%"} tamanho={tamanho}/>
            <Personagem img={"p4/imagem2"} posicao={"40%"} tamanho={tamanho}/>
            {showButton && <ButtonAdvance buttonClick={() => handleNextPag(true)} />}
          </div>)
      case 20:
        return (
          <div>
            {isSave && <Loading texto={'Savando informações...'}/>}
            {info.bomDesempenho && <Desempenho des={'bom'} col={info.colaboracao}/>}
            {info.otimoDesempenho && <Desempenho des={'otimo'} col={info.colaboracao}/>}     
            {!isSave && <Button onYes={() => saveGame()} texto1={'Salvar'} posicaoX={'43%'} posicaoY={'85%'}/>}   
            {isSave && <ButtonAdvance buttonClick={() => handleNextPag()} />}
          </div>)
      case 21:
        return (
          <div>
            <Loading texto={'Savando informações...'}/>
            <Personagem img={"m4/imagem11"} posicao={"50%"} tamanho={500}/>
            <Button onYes={() => router.push('/menu')} texto1={'Finalizar'} posicaoX={'0%'} posicaoY={'50%'}/>
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
        <BarradeProgresso atual={pag} total={21}/>
      <HomeButton/>
      <InfoButton/>
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