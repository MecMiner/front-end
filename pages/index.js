import Image from 'next/image'
import React, { useState } from 'react';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'
import { useRouter } from 'next/router';
import CheckUser from '@/components/CheckUser';
import Loading from '@/components/Loading';



export default function Home(/* {data} */) {
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
      const response = await fetch('http://localhost:8080/login', {
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
    </div>
  )
}

/* export async function getServerSideProps(){
  const response = await fetch('http://localhost:8080');
  const data = await response.json();
  return{props: {data}};
} */