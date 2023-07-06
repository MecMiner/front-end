import React, { useState, useRef } from 'react';
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


export default function Jogar({ data }) {
  const fraseGrande = data.dataDesafio.etapasSolucao
  const linhas = fraseGrande.split('\r\n');
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageFailed, setShowMessageFailed] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [usouDica, setUsouDica] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [pontos, setPontos] = useState(0);
  const personagem = config.personagem;
  const mentor = config.mentor;

  const router = useRouter();
  const { id } = router.query;
  const [pag, setPag] = useState(1);


  const handleNextPag = () => {
    if (!animationEnded) {
      setPag(prevPag => prevPag + 1);
      setAnimationEnded(false);
    }
  }

  const advancePag = (atPg) => {
    console.log("opa");
    setPag(prevPag => prevPag + atPg);
  }

  const handleButtonClick = () =>{
    setShowButton(false);
    handleNextPag();
  }

  const resetGame = () => {
    if (!animationEnded) {
      setPag(1);
      setAnimationEnded(false);
    }
    
  }

  const handleResetGame = () => {
    setShowMessageFailed(true);
      setTimeout(() => {
        setShowMessageFailed(false);
        setAnimationEnded(true);
        resetGame();
      }, 3000);
  }

  const handleSetPontos = async (valor, zerar) => {
    if (zerar) {
      if (pontos !== 0){
        setPontos(0);
      }
    } 
    setPontos(pontos => pontos + valor);
   // Ocultar a mensagem após 3 segundos
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setAnimationEnded(true);
        handleNextPag();
      }, 3000); // Aguardar 3 segundos antes de avançar
  };

 const exibirDica = () => {
  if(!usouDica){
    setUsouDica(true);
  }
  setShowMessage(true);
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
            <DialogoBox cor={personagem.cor} tamanho={'700px'} complete={() => setShowButton(true)} dialogText={`${personagem.nome} é aluna do Segundo ano de Ciência da Computação.\n\nEla  fez um trabalho sobre projetos de Software Livre (SL) e se interessou muito pelo assunto, querendo se aprofundar mais para futuramente tentar fazer contribuições e ingressar em uma comunidade de SL.`} />
            <Personagem img={'p1/imagem2'} posicao={'50%'} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 2:
        return (
          <div>
            <DialogoBox  cor={mentor.cor} complete={() => setShowButton(true)}  tamanho={'700px'} dialogText={`${mentor.nome} já desenvolveu diversas pesquisas relacionadas aos projetos de SL e suas comunidades, e trabalhou em alguns projetos, fazendo contribuições importantes. ${mentor.nome} adora falar sobre esse universo para outras pessoas, e compartilhar o conhecimento que adquiriu ao longo dos anos.`} />
            <Mentor  posicao={"70%"} img={"m1/imagem2"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={''} tamanho={'400px'} complete={() => setShowButton(true)} dialogText={`Como ${personagem.nome} gostaria de aprender mais sobre os projetos de SL e Mentor adora ensinar, elas combinaram um encontro para que Mentor possa ajudar Personagem a entender mais desse mundo.`} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <Mentor img={"m1/imagem3"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 20 moedas e 5 XP
              </div>
            )}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"200px"} posicao={"10%"} dialogText={`Olá ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} tamanho={"200px"} dialogText={"Estou ótima, e você como vai?"} posicao={"60%"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem className='inverter' img={"p1/imagem5"} posicao={'10%'} inverter={true} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox cor={mentor.cor} tamanho={"300px"} posicao={"10%"} dialogText={"Muito bem. Está pronta para começarmos a nossa jornada em busca do conhecimento?"} />
            <DialogoBox cor={personagem.cor} tamanho={"200px"} posicao={"60%"} dialogText={"Claro que sim, estou muito empolgada.\nEsse assunto me interessa muito"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox tamanho={"300px"} posicao={"10%"} dialogText={"Eu também estou bem empolgada, falar sobre projetos de Software Livre para mim é muito legal"} />
            <DialogoBox tamanho={"300px"} posicao={"60%"} dialogText={"Que bom, pelo menos me ajudar não vai ser um problema tão grande para você."} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox dialogText={"Mentor: Claro que não, mas vamos lá, primeirou vou te explicar como vai funcionar nosso enconstro\n\nPronta para começar?"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ConfirmationBox onYes={() => setPoint(10, true)} onNo={() => { console.log("Nãooo") }} />
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 10 moedas
              </div>
            )}
          </div>)
      case 8:
        return (
          <div>
            <DialogoBox dialogText={"Mentor: Vamos lá, nesse encontro vamos ver um cenário que ocorreu dentro de um projeto de SL.."} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 9:
        return (
          <div>
            <DialogoBox dialogText={"Mentor: Mais especificamente, um problema que aconteceu, e foi resolvido pela comunidade, ok."} />
            <DialogoBox tamanho={"200px"} posicao={"60%"} dialogText={"Personagem: Ok, legal!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox dialogText={`Mentor: O problema que vamos ver hoje ocorreu dentro do projeto ${data.dataDesafio.nomeProjeto} \nVocê já ouviu falar?`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ConfirmationBox onYes={() => advancePag(1)} onNo={() => handleNextPag()} />
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox dialogText={`Mentor: Está bem, vamos ver algumas informações sobre esse projeto`} />
            <DialogoBox tamanho={"200px"} posicao={"60%"} dialogText={"Ok!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox dialogText={`Mentor: Que bom, mas só parar relembrar, vamos algumas informações sobre esse projeto, ok.`} />
            <DialogoBox tamanho={"200px"} posicao={"60%"} dialogText={"Ok!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox dialogText={`Mentor: Bom, acho que deu para ter uma ideia geral sobre o que se trata o projeto, certo? Agora vamos ver primeiro a parte conceitual do problema.`} />
            <DialogoBox tamanho={"200px"} posicao={"60%"} dialogText={"Sim, está bem!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 14:
        return (
          <div>
            <DialogoBox tamanho={"60%"} posicao={"20%"} dialogText={`Mentor: ${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem3"} posicao={"70%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox tamanho={"20%"} posicao={"10%"} dialogText={`Mentor: Gostaria que eu repetisse as informações?`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ConfirmationBox onNo={() => advancePag(1)} onYes={() => handleNextPag()} />
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox tamanho={"60%"} posicao={"20%"} dialogText={`Mentor: Está bem, vamos lá:\n${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem3"} posicao={"70%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox tamanho={"30%"} posicao={"10%"} dialogText={`Mentor: Agora vamos deixar as coisas mais claras, vamos ver como esse problema ocorreu na prática dentro do projeto ${data.dataDesafio.nomeProjeto}`} />
            <DialogoBox tamanho={"30%"} posicao={"60%"} dialogText={"Personagem: Ok, vamos lá!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"40%"} dialogText={`Mentor: ${data.dataDesafio.contextoProblema}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"40%"} dialogText={`Mentor: Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox posicao={"60%"} tamanho={"10%"} dialogText={"Ok, vamos lá!"} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ConfirmationBox onYes={() => handleNextPag()} onNo={() => advancePag(1)} />
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox tamanho={"30%"} posicao={"10%"} dialogText={`Mentor: Quando quiser podemos dar continuidade.`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <div className="confirmation-box" style={{ left: "70%", top: "10%", alignitemss: 'center' }}>
              <span>{`${data.dataDesafio.materialComplementar}`}</span>
              <div className="buttons" style={{}}>
                <button className="btn-yes" onClick={() => handleNextPag()}>Pronto</button>
              </div>
            </div>
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox dialogText={`Então podemos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto ${data.dataDesafio.materialComplementar}, mas como esse problema foi solucionado pela comunidade?`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 22:
        return (
          <div>
            <DialogoBox dialogText={`Vamos ver isso agora!`} />
            <DialogoBox posicao={"60%"} tamanho={"10%"} dialogText={`Vamos lá!!`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"30%"} dialogText={`Mentor: Mas agora eu tenho um desafio para você, não achou que ia ser só ficar me ouvindo né.`} />
            <DialogoBox posicao={"60%"} tamanho={"10%"} dialogText={`Ok!`} />
           <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>) 
      case 25:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"30%"} dialogText={`Mentor:Já te disse como resolveram o problema, agora você deve organizar as etapas da solução.`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 26:
        return (
          <div>
            <DialogoBox posicao={"1%"} tamanho={"20%"} dialogText={`Mentor: Você pode solicitar uma dica se quiser!`} />
            <Personagem img={"p1/imagem3"} posicao={"0%"} />
            <SortingGame frasesIniciais={linhas} onSuccess={() => handleNextPag()} dica={() => exibirDica()} onFailed={() => handleResetGame()}/>
            {showMessage && (
              <div className="ganhador-moedas">
                {data.dataDesafio.dica}
              </div>
            )}
            {showMessageFailed && (
              <div className="ganhador-moedas">
                Não foi dessa vez
              </div>
            )}
            <Mentor img={"m1/imagem3"} posicao={"70%"} />
          </div>)
      case 27:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.etapasSolucao}`} />
            
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            <ButtonAdvance buttonClick={() => handleNextPag()} />
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
        {renderPag()}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const response = await fetch(`http://localhost:8080/desafio1/${id}`);
  const data = await response.json();
  return { props: { data } };
}