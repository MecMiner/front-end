import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import config from '@/config';
import HomeButton from '@/components/HomeButton';
import InfoButton from '@/components/InfoButton';
import CheckOrientacao from '@/components/Orientacao';

export default function Jogar() {
  const apiUrl = config.apiUrl;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      router.push('/menu');
    } else {
      buscarId();
    }
  }, [id, router]);

  const buscarId = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch(`${apiUrl}/respostas/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.ok) {
        const dados = await response.json();
        if (dados) {
          setData(dados);
        } else {
          router.push('/menu');
        }
      } else {
        console.error('Erro ao buscar dados:', response.status);
      }

    } catch (error) {
      router.push('/menu');
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleButtonClick = (name) => {
    router.push(`/${name}?id=${id}`);
  };

  return (
    <div>
      <MyHead />
      <Layout>
        <CheckOrientacao>
        <Loading />
        <div className='select-level'>
          
          <h1>Selecione um nível</h1>
          <div className='level-frame'>
          
          {[1, 2, 3, 4].map((level, index, array) => (
            <div key={level} className='level-button-container'>
              <button
                className={`circular-button circular-button-${level} level-button`}
                onClick={() => handleButtonClick(`nivel-${level}`)}
                disabled={!data || !data.response || data.response.nivel < level}
              >
                  <Image
                    className='circular-image'
                    src={`/src/mapa/numero${level}${data && data.response && data.response.nivel >= level ? '' : 'ds'}.png`}
                    width={150}
                    height={150}
                    alt={`numero${level}`}
                    priority
                  />
                </button>
                {index < array.length - 1 && (
                <div className={`line ${data && data.response && data.response.nivel > level ? 'active' : ''}`} />
              )}
                </div>
              ))}
          </div>
        </div>
        <HomeButton />
        <InfoButton/>
        </CheckOrientacao>
      </Layout>
      <style jsx>{`
        .select-level {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100vh;
          padding-top: 20px;
        }

        h1 {
          font-size: 36px;
          color: #ff9900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin-top: 40px;
        }

        .level-frame {
          display: flex;
          align-items: center;
          gap: 100px;
          margin-top: 150px;
        }

        .level-button-container {
          position: relative;
        }

        .level-button {
          display: inline-block;
        }

        .line {
          position: absolute;
          width: calc(100% + 80px);
          height: 10px; 
          background-color: #858383; /* Cor da linha */
          top: calc(50% - 0.5px);
          left: calc(50% + 15px);
        }
        
        .line.active {
          background-color: rgb(43, 202, 107);
        }
        
        .circular-button {
          position: relative;
          top: 50%;
          z-index: 99;
        }

        .circular-button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );    
}
