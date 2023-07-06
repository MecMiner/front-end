import Image from 'next/image'
import React, { useState } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';
import config from '@/config';



export default function Home() {
  const apiUrl = config.apiUrl
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState({
    email: '',
    senha: ''
  })

  const onChangeInput = e => setContent({...content, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: JSON.stringify(content),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        const data = await response.json();
        // Faça o que desejar com o token retornado, como armazená-lo no localStorage
        localStorage.setItem('token', data.token);
        // Redirecione para a página de menu
        router.push({
          pathname: '/menu',
          query: {token: data.token}
        });
      } else {
        console.log('Credenciais inválidas');
      }
    } catch (error) {
      console.log('Erro ao fazer login. Tente novamente.');
    }
  
    setIsLoading(false);
    
  };
  return (
    <div>
      <MyHead />
      <Layout>
        <CheckUser/>
        <Loading/>
        <div className="login-screen">
        <div className= "loginContainer">
          <div className="image-login">
            <Image
              src="/../public/src/loginsemfundo.png"
              alt="Imagem de Login"
              width={200}
              height={200}
              priority={true}
            />
          </div>
          <form onSubmit={handleLogin}>
            <input className="input-login" name="email" type="text" placeholder="Nome de usuário" onChange={onChangeInput} value={content.email}/>
            <input className="input-login" name="senha" type="password" placeholder="Senha" onChange={onChangeInput} value={content.senha} />
            <button className="button-login" type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Entrar'}
            </button>
          </form>
        </div>
        </div>
        
      </Layout>
      <style jsx>{`
      .login-screen {
          width: 50%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
      }
      
      .loginContainer {
          padding: 2rem;
          background-color: #ecf0f1;
          border: 2px solid #34495e;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      
      .input-login {
          padding: 0.5rem;
          margin-bottom: 1rem;
          width: 100%;
          border: 1px solid #95a5a6;
          border-radius: 4px;
      }
      
      .button-login {
          padding: 0.5rem 1rem;
          background-color: #2980b9;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          cursor: pointer;
          transform-origin: center center;
      
          &:hover {
              background-color: #1a5276;
          }
      
          &:active {
              background-color: #154360;
          }
      }
      
      .image-login {
          width: 200px;
          height: 200px;
          margin-bottom: 1rem;
      }      
      `}</style>
    </div>
  )
}
