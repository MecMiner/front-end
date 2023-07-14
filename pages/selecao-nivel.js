import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import MyHead from '@/components/MyHead';
import Layout from '@/components/MyLayout';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import config from '@/config';

export default function Jogar() {
  const apiUrl = config.apiUrl;
  const [data, setData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const[isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id){
      router.push('/menu')
    } else {
      buscarId();
    }
  }, [id, router]);

  const buscarId = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/'); // Redirecionar se o token não estiver disponível
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
          setIsLoading(false);
        } else {
          router.push('/menu');
        }
      } else {
        console.error('Erro ao buscar dados:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };


  const handleButtonClick = (name) => {
    router.push(`/${name}?id=${id}`);
  };


 
  return (
    <div>
      <MyHead/>
      <Layout>
          {isLoading && <Loading/>}
          <button className='circular-button circular-button-one' onClick={() => handleButtonClick('nivel-1')}>
            <Image
              className='circular-image'
              src="/src/mapa/numero1.png"
              width={150}
              height={150}
              alt="numero1"
              priority
            />
          </button>
          {data && data.response && data.response.nivel >= 1  ?  (
            <button className='circular-button circular-button-two' onClick={() => handleButtonClick('nivel-2')}>
            <Image
              className='circular-image'
              src="/src/mapa/numero2.png"
              width={150}
              height={150}
              alt="numero3"
              priority
            />
          </button>
          ) : (
            <button className='circular-button circular-button-two'>
            <Image
              className='circular-image'
              src="/src/mapa/numero2ds.png"
              width={150}
              height={150}
              alt="numero3"
              priority
            />
          </button>
          )}
          {data && data.response && data.response.nivel >= 2  ?  (
            <button className='circular-button circular-button-three' onClick={() => handleButtonClick('nivel-3')}>
            <Image
              className='circular-image'
              src="/src/mapa/numero3.png"
              width={150}
              height={150}
              alt="numero3"
              priority
            />
          </button>
          ) : (
            <button className='circular-button circular-button-three'>
            <Image
              className='circular-image'
              src="/src/mapa/numero3ds.png"
              width={150}
              height={150}
              alt="numero3"
              priority
            />
          </button>
          )}
          
          {data && data.response && data.response.nivel >= 3  ?  (
            <button className='circular-button circular-button-four' onClick={() => handleButtonClick('nivel-4')}>
              <Image
                className='circular-image'
                src={ "/src/mapa/numero4.png"}
                width={150}
                height={150}
                alt="numero4"
                priority
              />
            </button>
          ) : (
            <button className='circular-button circular-button-four'>
              <Image
                className='circular-image'
                src={ "/src/mapa/numero4ds.png"}
                width={150}
                height={150}
                alt="numero4"
                priority
              />
            </button>
          )}
      </Layout>    
    </div>
  );
}
