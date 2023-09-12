import React, {useState, useEffect } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';
import config from '@/config';
import Personagem from '@/components/Personagem';
import DialogScreen from '@/components/DialogoBox';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json()); // Função para buscar dados

export default function Menu() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(`${config.apiUrl}/desafio`, fetcher);

  if (error) {
    console.error('Erro ao buscar dados:', error);
  }

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
        <CheckUser onFunction={()=>{}}/>
        <Personagem img={'m1/imagem3'} posicao={'10%'} tamanho={'60'}/>
        <DialogScreen tamanho={'20%'} posicao={'10%'}  cor={config.mentor.cor} dialogText={'Olá, aqui você tem disponível alguns desafios.'} complete={() => ({})}/>
        {isLoading && <Loading/>}
        <div className="challenge-list">
          {data && data.dataDesafio && data.dataDesafio.map((item, index) => (
            <div className="challenge-item" key={index}>
              <button className="btn-menu" onClick={() => handleStart(item.iddesafio)}>
                {item.titulo}
              </button>
            </div>
          ))}
        </div>
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
