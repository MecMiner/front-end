import React, { useState, useEffect, use } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import DialogoBox from '@/components/DialogoBox';
import { useRouter } from 'next/router';
import ConfirmationBox from '@/components/ConfirmationBox';
import Personagem from '@/components/Personagem';
import ButtonAdvance from '@/components/ButtonAdvance';
import ExercicioNivel1 from '@/components/ExercicioNivel1';
import config from '@/config';
import Desempenho from '@/components/Desempenho';
import Loading from '@/components/Loading';
import BarradeProgresso from '@/components/BarradeProgresso';
import Button from '@/components/Buttons';
import ExibirDica from '@/components/ExibirDica';
import Image from 'next/image';
import InfosGame from '@/components/InfosGame';


export default function Jogar({data}) {
  const [pag, setPag] = useState(1);
  const [user, setUser] = useState({});
  const tamanhoP = 60;
  const apiUrl = config.apiUrl;
  const fraseGrande = data?.dataDesafio?.etapasSolucao || " "
  const linhas = fraseGrande.split('\r\n');
  const [showMessage, setShowMessage] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [info, setInfo] = useState({});
  const personagem = config.personagem;
  const mentor = config.mentor;
  const router = useRouter();
  const { id } = router.query;
  const [usouDica, setUsouDica] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [userGame, setUserGame] = useState({
    bomDesempenho: false,
    otimoDesempenho: false,
  })

  const [showDica, setShowDica] = useState (false);



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
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    }


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
            setInfo(dados.response);
            console.log(dados.response);
          } else {
            router.push('/');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    };
  
    fetchUser();
    fetchData();
  }, [id]);


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

  const handleButtonClick = (mensagem) =>{
    setShowButton(false);
    if (mensagem){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setAnimationEnded(true);
        handleNextPag();
      }, 3000);
    } else {
      handleNextPag();
    }
  }

  const handleResetGame = () => {
    router.reload();
  }

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

  const handelCorrigirGame = (valor, exp, bom, otimo, errado) => {
    setUser(prevState => ({ ...prevState, pontos: prevState.pontos + valor }));
    setUser(prevState => ({ ...prevState, xp: prevState.xp + exp }));
    if(bom){
      setUser(prevState => ({ ...prevState, bomDesempenho: prevState.bomDesempenho + 1 }));
      setInfo(prevState => ({ ...prevState, nivel: 2 }));
      setUserGame(prevState => ({ ...prevState, bomDesempenho: true }));
      setShowButton(true);
      advancePag(4);
    }
    if(otimo){
      setUser(prevState => ({ ...prevState, otimoDesempenho: prevState.otimoDesempenho + 1 }));
      setInfo(prevState => ({ ...prevState, nivel: 2 }));
      setUserGame(prevState => ({ ...prevState, otimoDesempenho: true }));
      setShowButton(true);
      advancePag(4);
    }
    if(errado){
      setPag(28);
    }
  }

 const exibirDica = () => {
  if(!usouDica){
    setUser(prevState => ({ ...prevState, pontos: prevState.pontos - 10 }));
    setUsouDica(true);
  }
  setShowDica(true);
 }

 const handleSetBanco = async() => {
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
    if(response.ok){
      handleNextPag();
      console.log('Valores inseridos no banco');
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }

  try {
    const response = await fetch(`${apiUrl}/setPts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(user),
    })
    if(response.ok){
      console.log('Valores inseridos no banco');
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
  }
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
            <DialogoBox cor={personagem.cor} posicao={'25%'} tamanho={'50%'} posicaoY={'30%'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} é aluna do Segundo ano de Ciência da Computação.\n\nEla  fez um trabalho sobre projetos de Software Livre (SL) e se interessou muito pelo assunto, querendo se aprofundar mais para futuramente tentar fazer contribuições e ingressar em uma comunidade de SL.`} />
            <Personagem img={'p1/imagem2'} posicao={'50%'} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox  cor={mentor.cor} complete={() => setShowButton(true)} posicao={'25%'} posicaoY={'30%'}  tamanho={'50%'} dialogText={`${mentor.nome} já desenvolveu diversas pesquisas relacionadas aos projetos de SL e suas comunidades, e trabalhou em alguns projetos, fazendo contribuições importantes. ${mentor.nome} adora falar sobre esse universo para outras pessoas, e compartilhar o conhecimento que adquiriu ao longo dos anos.`} />
            <Personagem  posicao={"50%"} img={"m1/imagem2"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} tamanho={tamanhoP}/>}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} posicao={'25%'} tamanho={'40%'} posicaoY={'30%'} complete={() => setShowButton(true)} dialogText={`Como ${personagem.nome} gostaria de aprender mais sobre os projetos de SL e ${mentor.nome} adora ensinar, elas combinaram um encontro para que ${mentor.nome} possa ajudar Personagem a entender mais desse mundo.`} />
            <Personagem img={"p1/imagem2"} posicao={"30%"} tamanho={tamanhoP} />
            <Personagem img={"m1/imagem1"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleSetCoin(20, 5)} />}
            {showMessage && (
              <div className="ganhador-moedas">
                <Image src={'/src/moeda.gif'} width={100} height={100} alt='moeda' priority />
                Você ganhou 20 moedas e 5 XP!
              </div>
            )}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"15%"} dialogText={`Olá ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={"Estou ótima, e você como vai?"} posicao={"50%"} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={'50%'}  tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"30%"} dialogText={"Muito bem. Está pronta para começarmos a nossa jornada em busca do conhecimento?"} />
            <DialogoBox complete={() => setShowButton(true)} cor={personagem.cor} tamanho={"30%"} posicao={"50%"} dialogText={"Claro que sim, estou muito empolgada.\nEsse assunto me interessa muito."} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={"Eu também estou bem empolgada, falar sobre projetos de Software Livre para mim é muito legal."} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"30%"} posicao={"55%"} dialogText={"Que bom, pelo menos me ajudar não vai ser um problema tão grande para você."} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={"Claro que não, mas vamos lá, primeiro vou te explicar como vai funcionar nosso encontro\n\nPronta para começar?"} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleSetCoin(10,0)} onNo={() => {router.push(`/selecao-nivel?id=${id}`)}} />}
            {showMessage && (
              <div className="ganhador-moedas">
                
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 8:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={"Vamos lá, nesse encontro vamos ver um cenário que ocorreu dentro de um projeto de SL.."} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={"Mais especificamente, um problema que aconteceu, e foi resolvido pela comunidade, ok."} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"50%"} dialogText={"Ok, legal!"} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`O problema que vamos ver hoje ocorreu dentro do projeto ${data.dataDesafio.nomeProjeto}. \nVocê já ouviu falar?`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton && <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => advancePag(2)} onNo={() => advancePag(1)} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Está bem, vamos ver algumas informações sobre esse projeto`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"50%"} dialogText={"Ok!"} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => advancePag(2)} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Que bom, mas só parar relembrar, vamos ver algumas informações sobre esse projeto, ok.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"50%"} dialogText={"Ok!"} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={'45%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Bom, acho que deu para ter uma ideia geral sobre o que se trata o projeto, certo? Agora vamos ver primeiro a parte conceitual do problema.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"50%"} dialogText={"Sim, está bem!"} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`${data.dataDesafio.descProblema}`} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Gostaria que eu repetisse as informações?`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem3"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&   <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onNo={() => advancePag(2)} onYes={() => handleButtonClick()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`Está bem, vamos lá. \n${data.dataDesafio.descProblema}`} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"}  dialogText={`Agora vamos deixar as coisas mais claras, vamos ver como esse problema ocorreu na prática dentro do projeto ${data.dataDesafio.nomeProjeto}.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"50%"} dialogText={"Ok, vamos lá!"} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"} posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"50%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&<ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleButtonClick()} onNo={() => advancePag(2)} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Quando quiser podemos dar continuidade.`} />
            <Personagem img={"m1/imagem3"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem3"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton && (
              <ConfirmationBox posicaoX={'50%'} link={data.dataDesafio.materialComplementar} onYes={() => handleButtonClick()} texto1={'Pronto'} posicaoY={'50%'}/>
            )}
          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={'30%'} dialogText={`Então podemos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto ${data.dataDesafio.materialComplementar}, mas como esse problema foi solucionado pela comunidade?`} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Vamos ver isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"50%"} tamanho={"10%"} dialogText={`Vamos lá!!`} />
            <Personagem img={"m1/imagem5"} posicao={"10%"}  tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"}  tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`${data.dataDesafio.solucao}`} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 25:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Mas agora eu tenho um desafio para você, não achou que ia ser só ficar me ouvindo né.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"50%"} tamanho={"10%"} dialogText={`Ok!`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>) 
      case 26:
        return (
          <div>
            <DialogoBox cor={mentor.cor}  complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Já te disse como resolveram o problema, agora você deve organizar as etapas da solução.`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem3"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 27:
        return (
          <div>
            <ExercicioNivel1 frasesIniciais={linhas} onSuccess={handelCorrigirGame} dica={() => exibirDica()}/>
            {showDica && (
                <ExibirDica setExibirDica={setShowDica} dica={data.dataDesafio.dica}/>
            )}
          </div>)
      case 28:
        return (
          <div>
          <DialogoBox cor={mentor.cor}  complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Infelizmente você teve suas três tentativas e sua resposta não está correta, mas o importante é tentar.`} />         
          <Personagem img={"m1/imagem5"} posicao={"10%"} tamanho={tamanhoP}/>
          <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
          {showButton &&  <ButtonAdvance buttonClick={() => advancePag(2)} />}          
        </div>)
      case 30:
        return (
          <div>
          <DialogoBox cor={mentor.cor}  complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Desiste não, na próxima tu acerta.`} />         
          <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
          <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
          {showButton &&<ConfirmationBox posicaoX={'50%'} texto1={'Reiniciar'} texto2={'Sair'} onYes={() => handleResetGame()} onNo={() => {router.push('/')}} />}       
        </div>)
      case 31:
        return (
          <div>
            {isSave && <Loading texto={'Salvando informações...'}/>}
            {userGame.bomDesempenho && <Desempenho des={'bom'}/>}
            {userGame.otimoDesempenho && <Desempenho des={'otimo'}/>}    
            {!isSave && <Button onYes={() => saveGame()} texto1={'Salvar'} posicaoX={'43%'} posicaoY={'85%'}/>}   
            {isSave && <ButtonAdvance buttonClick={() => handleButtonClick()} />}         
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"20%"} dialogText={`Isso ai, parabéns, sua resposta está correta.`} />
            <Personagem img={"m1/imagem1"} posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem4"} posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 33:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"20%"} dialogText={`Vou ter mostrar novamente como ficam as estapas organizadas da forma correta.`} />
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"40%"} tamanho={"40%"} dialogText={`${data.dataDesafio.etapasSolucao}`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 34:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"20%"} dialogText={`Vamos prosseguir, vou te mostrar quais os impactos que a resolução desse tipo de problema pode ter no projeto.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"50%"} tamanho={"20%"} dialogText={`Está bem, vamos lá!`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 35:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} dialogText={`${data.dataDesafio.resultado}`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 36:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={"20%"} dialogText={`E ai, o que achou? Conseguiu aprender algo no nosso encontro?`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"} tamanho={tamanhoP}/>
            {showButton &&  <ConfirmationBox posicaoY={'50%'} posicaoX={'50%'} onYes={() => handleButtonClick()} onNo={() => advancePag(2)} />}          
          </div>)
      case 37:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} dialogText={`Que legal, fico muito feliz em estar te ajudando nessa caminhada.`} />
            <Personagem img={"m1/imagem3"}  posicao={"10%"} tamanho={tamanhoP}/>
            <Personagem img={"p1/imagem5"}  posicao={"50%"} tamanho={tamanhoP}/>
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
          <BarradeProgresso total={38} atual={pag}/>
        </div>
       
        
        
      </Layout>
      <style jsx>{`
        .renderPag{
          position: absolute;
          left: 15%;
          width: 85%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = config.apiUrl
  const { id } = context.query;
  const response = await fetch(`${apiUrl}/desafio1/${id}`);
  const data = await response.json();
  return { props: { data } };
}