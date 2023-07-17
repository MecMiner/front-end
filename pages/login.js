import Image from 'next/image'
import React, { useState } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';
import config from '@/config';
import { FaUser } from 'react-icons/fa';

export default function Home() {
  
  const apiUrl = config.apiUrl
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(true)
  const [isSenhaIncorreta, setIsSenhaIncorreta] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        router.push('/');
      } else {
        setIsSenhaIncorreta(true);
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Credenciais inválidas');
      }
    } catch (error) {
      console.log('Erro ao fazer login. Tente novamente.');
      setErrorMessage('Erro ao fazer login. Tente novamente.');
    }

    setIsLoading(false);
  };

  const handleCadastr = () => {
    window.open('https://portalworkedexamples.herokuapp.com/Login/Form_cadastrarUsuario.php', '_blank');
  }

  return (
    <div>
      <MyHead />
      <Layout>
        <CheckUser onFunction={() => {}}/>
         <Loading/>
        <div className="login-screen">
        <div className= "loginContainer">
          <div className="image-login">
            <FaUser size={200} />
          </div>
          <form onSubmit={handleLogin}>
            <input className="input-login" name="email" type="text" placeholder="Nome de usuário" onChange={onChangeInput} value={content.email}/>
            <input className="input-login" name="senha" type="password" placeholder="Senha" onChange={onChangeInput} value={content.senha} />
            {isSenhaIncorreta && <p className="senha-incorreta">Usuário ou senha incorreto</p>}
            <div className="button-container">
              <button className="button-login" type="submit" disabled={isLoading}>
                {isLoading ? 'Carregando...' : 'Entrar'}
              </button>
              <button className="button-cadastrar" type='button' onClick={handleCadastr}>Cadastrar</button>
            </div>
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
      
      .button-cadastrar {
          padding: 0.5rem 1rem;
          background-color: #2ecc71;
          color: #fff;
          border: none;
          border-radius: 4px;
          margin-left: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          cursor: pointer;
          transform-origin: center center;
      
          &:hover {
              background-color: #27ae60;
          }
      
          &:active {
              background-color: #1f8b4c;
          }
      }
      
      .senha-incorreta {
          color: red;
          margin-top: 0.5rem;
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
