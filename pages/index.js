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
        <Personagem img={'m1/imagem3'} posicao={'10%'} tamanho={'60'}/>
        <DialogScreen tamanho={'20%'} posicao={'10%'} posicaoY={'20%'} cor={config.mentor.cor} dialogText={'Olá,  asdsasd asd sadsas sda sd asdsaasdas asdassd asdda asdsas asdas aqui você tem disponível alguns desafios.'} complete={() => ({})}/>
        {isLoad && <Loading/>}
        <div className="challenge-list">
          {data.dataDesafio.map((item, index) => (
            <div className="challenge-item" key={index}>
              <button className="btn-menu" onClick={() => handleStart(item.iddesafio)}>
                {item.titulo}
              </button>
            </div>
          ))}
        </div>
        <button className="fullscreen-button" onClick={() => requestFullScreen()}>Tela Cheia</button>
          <div className="close-button" onClick={() => handleLogout()}>Sair</div>
      </Layout>
      <style jsx>{`

        .challenge-list {
          width: 30%;
          display: flex;
          flex-direction: column; /* Alinhar verticalmente */
          gap: 1rem;
          padding: 1rem;
          max-height: 100%;
          overflow-y: auto;
        }

        .challenge-item {
          text-align: center;
        }

        .btn-menu {
          width: 100%;
          padding: 1rem;
          background-color: #2980b9;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;

        
          &:hover {
            background-color: #1a5276;
          }
        
          &:active {
            background-color: #154360;
          }
        }
        .close-button {
          position: absolute;
          top: 2%;
          right: 2%;
          font-size: 18px;
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