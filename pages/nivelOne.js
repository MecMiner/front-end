import React, { useState, useRef, use } from 'react';
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


export default function Jogar({ data }) {
  const fraseGrande = data.dataDesafio.etapasSolucao
  const linhas = fraseGrande.split('\r\n');
  const [showMessage, setShowMessage] = useState(false);
  const [showDica, setShowDica] = useState(false);
  const [showMessageFailed, setShowMessageFailed] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [usouDica, setUsouDica] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [coin, setCoin] = useState(0);
  const [xp, setXp] = useState(0);
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
    setShowButton(false)
    console.log("opa");
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
      }, 3000); // Aguardar 3 segundos antes de avançar
    } else {
      handleNextPag();
    }
  }



  const handleResetGame = () => {
    setShowMessageFailed(true);
      setTimeout(() => {
        setShowMessageFailed(false);
        setAnimationEnded(true);
        setCoin(0);
        setXp(0);
        setPag(1);
      }, 3000);
  }

  const handleSetCoin = async (valor, exp, zerar) => {
    setShowButton(false);
    if (zerar) {
      if (coin !== 0){
        setCoin(0);
        setXp(0)
      }
    } 
    setCoin(coin => coin + valor);
    setXp(xp => xp + exp);
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
  setShowDica(true);
      setTimeout(() => {
        setShowDica(false);
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
            <DialogoBox  cor={mentor.cor} complete={() => setShowButton(true)} posicao={'20%'} tamanho={'50%'} dialogText={`${mentor.nome} já desenvolveu diversas pesquisas relacionadas aos projetos de SL e suas comunidades, e trabalhou em alguns projetos, fazendo contribuições importantes. ${mentor.nome} adora falar sobre esse universo para outras pessoas, e compartilhar o conhecimento que adquiriu ao longo dos anos.`} />
            <Mentor  posicao={"70%"} img={"m1/imagem2"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 3:
        return (
          <div>
            <DialogoBox cor={personagem.cor} posicao={'5%'} tamanho={'30%'} complete={() => setShowButton(true)} dialogText={`Como ${personagem.nome} gostaria de aprender mais sobre os projetos de SL e Mentor adora ensinar, elas combinaram um encontro para que Mentor possa ajudar Personagem a entender mais desse mundo.`} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} />
            <Mentor img={"m1/imagem3"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleSetCoin(20, 5,true)} />}
            {showMessage && (
              <div className="ganhador-moedas">
                Você ganhou 20 moedas e 5 XP
              </div>
            )}
          </div>)
      case 4:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"10%"} dialogText={`Olá ${personagem.nome}, como vai?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} dialogText={"Estou ótima, e você como vai?"} posicao={"60%"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem className='inverter' img={"p1/imagem5"} posicao={'10%'} inverter={true} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 5:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} cor={mentor.cor} tamanho={"300px"} posicao={"10%"} dialogText={"Muito bem. Está pronta para começarmos a nossa jornada em busca do conhecimento?"} />
            <DialogoBox complete={() => setShowButton(true)} cor={personagem.cor} tamanho={"200px"} posicao={"60%"} dialogText={"Claro que sim, estou muito empolgada.\nEsse assunto me interessa muito"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 6:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"300px"} posicao={"10%"} dialogText={"Eu também estou bem empolgada, falar sobre projetos de Software Livre para mim é muito legal"} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"300px"} posicao={"60%"} dialogText={"Que bom, pelo menos me ajudar não vai ser um problema tão grande para você."} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 7:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={"Claro que não, mas vamos lá, primeirou vou te explicar como vai funcionar nosso enconstro\n\nPronta para começar?"} />
            <Mentor img={"m1/imagem6"} posicao={"50%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} inverter={true}/>
            {showButton && <ConfirmationBox onYes={() => handleSetCoin(10,0,false)} onNo={() => {router.push(`/selectNivel?id=${id}`)}} />}
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
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 9:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={"Mais especificamente, um problema que aconteceu, e foi resolvido pela comunidade, ok."} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"55%"} dialogText={"Personagem: Ok, legal!"} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 10:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`O problema que vamos ver hoje ocorreu dentro do projeto ${data.dataDesafio.nomeProjeto} \nVocê já ouviu falar?`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"30%"} inverter={true}/>
            {showButton && <ConfirmationBox onYes={() => advancePag(2)} onNo={() => advancePag(1)} />}
          </div>)
      case 11:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Está bem, vamos ver algumas informações sobre esse projeto`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"200px"} posicao={"55%"} dialogText={"Ok!"} />
            <Mentor img={"m1/imagem1"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => advancePag(2)} />}
          </div>)
      case 12:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} dialogText={`Que bom, mas só parar relembrar, vamos algumas informações sobre esse projeto, ok.`} />
            <DialogoBox complete={() => setShowButton(true)} tamanho={"200px"} posicao={"55%"} dialogText={"Ok!"} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}
          </div>)
      case 13:
        return (
          <div>
            <DialogoBox cor={mentor.cor} posicao={"20%"} tamanho={'40%'} complete={() => setShowButton(true)} dialogText={`${data.dataDesafio.dadosProj}`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 14:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Bom, acho que deu para ter uma ideia geral sobre o que se trata o projeto, certo? Agora vamos ver primeiro a parte conceitual do problema.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} tamanho={"20%"} posicao={"55%"} dialogText={"Sim, está bem!"} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 15:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"70%"} posicao={"12%"} dialogText={`${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem1"} posicao={"75%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 16:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} tamanho={"20%"} posicao={"10%"} dialogText={`Gostaria que eu repetisse as informações?`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&   <ConfirmationBox onNo={() => advancePag(2)} onYes={() => handleNextPag()} />}
          </div>)
      case 17:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} tamanho={"70%"} posicao={"12%"} dialogText={`Mentor: Está bem, vamos lá:\n${data.dataDesafio.descProblema}`} />
            <Mentor img={"m1/imagem1"} posicao={"75%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 18:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} posicao={"10%"} dialogText={`Agora vamos deixar as coisas mais claras, vamos ver como esse problema ocorreu na prática dentro do projeto ${data.dataDesafio.nomeProjeto}`} />
            <DialogoBox complete={() => setShowButton(true)} tamanho={"20%"} posicao={"55%"} dialogText={"Ok, vamos lá!"} />
            <Mentor img={"m1/imagem1"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} posicao={"20%"} inverter={true}/>
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 19:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"20%"} tamanho={"40%"} dialogText={`${data.dataDesafio.contextoProblema}`} />
            <Mentor img={"m1/imagem6"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"10%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 20:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"5%"} tamanho={"30%"} dialogText={`Mentor: Para te ajudar eu tenho um material complementar sobre esse problema, que tal dar uma olhada e tentar entender melhor?`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"10%"} dialogText={"Ok, vamos lá!"} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton &&<ConfirmationBox onYes={() => handleNextPag()} onNo={() => advancePag(2)} />}
          </div>)
      case 21:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} tamanho={"30%"} posicao={"10%"} dialogText={`Quando quiser podemos dar continuidade.`} />
            <Mentor img={"m1/imagem3"} posicao={"60%"} />
            <Personagem img={"p1/imagem3"} posicao={"20%"} />
            {showButton && (
              <div className="confirmation-box" style={{ left: "65%", top: "10%", alignitemss: 'center' }}>
                <a href={`${data.dataDesafio.materialComplementar}`} target="_blank">{`${data.dataDesafio.materialComplementar}`}</a>
                <div className="buttons" style={{}}>
                  <button className="btn-yes" onClick={() => handleNextPag()}>Pronto</button>
                </div>
              </div>
            )}
          </div>)
      case 22:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} dialogText={`Então podemos continuar, já vimos o problema de uma forma genérica e vimos como ele ocorreu dentro do projeto ${data.dataDesafio.materialComplementar}, mas como esse problema foi solucionado pela comunidade?`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 23:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"20%"} dialogText={`Vamos ver isso agora!`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"10%"} dialogText={`Vamos lá!!`} />
            <Mentor img={"m1/imagem6"} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 24:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"70%"} dialogText={`${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem1"} posicao={"70%"} />
            <Personagem img={"p1/imagem4"} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 25:
        return (
          <div>
            <DialogoBox cor={mentor.cor} complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Mas agora eu tenho um desafio para você, não achou que ia ser só ficar me ouvindo né.`} />
            <DialogoBox cor={personagem.cor} complete={() => setShowButton(true)} posicao={"55%"} tamanho={"10%"} dialogText={`Ok!`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"60%"} />
            <Personagem img={"p1/imagem5"} inverter={true} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>) 
      case 26:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"30%"} dialogText={`Já te disse como resolveram o problema, agora você deve organizar as etapas da solução.`} />
            <Mentor img={"m1/imagem3"} inverter={true} posicao={"60%"} />
            <Personagem img={"p1/imagem3"} posicao={"20%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 27:
        return (
          <div>
            <SortingGame frasesIniciais={linhas} onSuccess={() => handleSetCoin(50,40)} dica={() => exibirDica()} onFailed={() => handleResetGame()}/>
            {showMessage && (
              <div className="ganhador-moedas">
                Parabéns, você foi muito bem
              </div>
            )}
            {showDica && (
              <div className="ganhador-moedas">
                {data.dataDesafio.dica}
              </div>
            )}
            {showMessageFailed && (
              <div className="ganhador-moedas">
                Não foi dessa vez
              </div>
            )}
          </div>)
      case 28:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 29:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.etapasSolucao}`} />
            
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 30:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 31:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
          </div>)
      case 32:
        return (
          <div>
            <DialogoBox complete={() => setShowButton(true)} posicao={"10%"} tamanho={"60%"} dialogText={`Mentor: ${data.dataDesafio.solucao}`} />
            <Mentor img={"m1/imagem3"} posicao={"50%"} />
            <Personagem img={"p1/imagem3"} posicao={"30%"} />
            {showButton &&  <ButtonAdvance buttonClick={() => handleButtonClick()} />}          
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
        <CoinsXP coin={coin} xp={xp}/>
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