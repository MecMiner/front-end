import Image from 'next/image'
import React, { useState } from 'react';
import { styled } from 'styled-components';
import MyHead from '@/components/MyHead'
import Layout from '@/components/MyLayout'

const GameScreen = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  padding: 2rem;
  background-color: #ecf0f1;
  border: 2px solid #34495e;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #95a5a6;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a5276;
  }

  &:active {
    background-color: #154360;
  }
`;


export default function Corrigir() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulando uma requisição de login assíncrona
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div>
      <MyHead />
      <Layout>
        <GameScreen>
        <LoginContainer>
          <ImageWrapper>
            <Image
              src="/../public/src/loginsemfundo.png"
              alt="Imagem de Login"
              width={200}
              height={200}
            />
          </ImageWrapper>
          <form onSubmit={handleLogin}>
            <Input type="text" placeholder="Nome de usuário" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </form>
        </LoginContainer>
        </GameScreen>
        
      </Layout>
    </div>
  )
}
