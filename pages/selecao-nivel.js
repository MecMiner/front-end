import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { fetchResponse, fetchUser } from './api/api';
import InfosGame from '@/components/InfosGame';


export default function Jogar() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      router.push('/');
    } else {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/');
      } else {
        const getUser = async () => {
          try {
            const user = await fetchUser();
            setUser(user);
          } catch (error) {
            router.push('/');
          }
        };
  
        const getInfo = async () => {
          try {
            const info = await fetchResponse(id);
            console.log(info);
            setData(info);
          } catch (error) {
            router.push('/');
          }
        };
  
        if (id){
          getInfo();
          getUser();
        }      
      }
    }
  }, [id]);


  const handleButtonClick = (name) => {
    router.push(`/${name}?id=${id}`);
  };

  return (
    <div>
      <MyHead />
      <Layout>
        <InfosGame user={user}/>
        <div className='renderPag'>
          <Loading />
          <div className='select-level'>
            <h1 title='title'>Selecione um nível</h1>
            <div className='level-frame'>

              {[1, 2, 3, 4].map((level, index, array) => (
                <div key={level} className='level-button-container'>
                  <button
                    className={`circular-button`}
                    onClick={() => handleButtonClick(`nivel-${level}`)}
                    disabled={!data || data.nivel < level}
                  >
                    <Image
                      className='circular-image'
                      src={`/src/mapa/numero${level}${data && data.nivel >= level ? '' : 'ds'}.png`}
                      fill
                      alt={`numero${level}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
                      priority
                    />
                  </button>              
                  {index < array.length - 1 && (
                    <div className={`line ${data && data.nivel > level ? 'active' : ''}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Layout>
      <style jsx>{`
        .select-level {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        h1 {
          color: #ff9900;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          margin-top: 40px;
        }

        .level-frame {
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: calc(100% / 7);
          width: 80%;
        }

        .level-button-container {
          width: 25%;
          aspect-ratio: 1/1;
          position: relative;
        }

        .level-button {
          display: inline-block;
        }

        .line {
          position: absolute;
          width: 200%;
          height: 10px; 
          background-color: #858383;
          top: calc(50% - 0.5px);
          left: calc(50% + 15px);
        }
        
        .line.active {
          background-color: rgb(43, 202, 107);
        }
        
        .circular-button {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 9;
        }

        .circular-button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
