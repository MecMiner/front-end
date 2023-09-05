import React, {useState, useEffect } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';
import config from '@/config';
import Personagem from '@/components/Personagem';
import DialogScreen from '@/components/DialogoBox';

export default function Menu({ data }) {
  const [isLoad,setIsLoad] = useState(true);
  const router = useRouter();
  // Função para ativar o modo de tela cheia
  const requestFullScreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari e Opera
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  };

  const handleStart = (id) => {
    router.push(`/selecao-nivel?id=${id}`)
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <MyHead />
      <Layout>
        <CheckUser onFunction={() => setIsLoad(false)}/>
        <Personagem img={'m1/imagem3'} posicao={'10%'} tamanho={'50'}/>
        <DialogScreen cor={config.mentor.cor} dialogText={'Olá, aqui você tem disponível alguns desafios, para iniciá-los, basta clicar sobre eles e eu te guiarei'} complete={() => ({})}/>
        {isLoad && <Loading/>}
        <div className="challenge-list">
          {data.dataDesafio.map((item, index) => (
            <div className="challenge-item" key={index}>
              <button className="btn-menu" style={{ fontSize: '20px' }} onClick={() => handleStart(item.iddesafio)}>
                {item.titulo}
              </button>
            </div>
          ))}
        </div>
          {/* <button className="fullscreen-button" onClick={() => requestFullScreen()}>Tela Cheia</button> */}
          <div className="close-button" onClick={() => handleLogout()}>Sair</div>
      </Layout>
      <style jsx>{`

        .challenge-list {
          display: flex;
          flex-direction: column; /* Alinhar verticalmente */
          gap: 1rem;
          padding: 1rem;
          max-width: 100%; /* Largura máxima responsiva */
        }

        .challenge-item {
          text-align: center;
        }

        .btn-menu {
          padding: 2rem;
          background-color: #2980b9;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin: 0 1rem;
        
          &:hover {
            background-color: #1a5276;
          }
        
          &:active {
            background-color: #154360;
          }
        }
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          color: red;
          cursor: pointer;
          transition: color 0.3s ease;
          
          &:hover {
            color: #ddd;
          }
          
          &:active {
            color: #ddd;
          }
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  const apiUrl = config.apiUrl
  const response = await fetch(`${apiUrl}/desafio`);
  const data = await response.json();
  return { props: { data } };
}