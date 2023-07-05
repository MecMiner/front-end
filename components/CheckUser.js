import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const CheckUser = () => {
    const router = useRouter();

    useEffect(() => {
        // Verifique se o token está armazenado no localStorage
        const token = localStorage.getItem('token');
    
        // Se o token não estiver presente, redirecione para a página de login
        if (!token) {
          router.push('/');
        } else {
          // Verifique a validade do token no servidor
          fetch('http://localhost:8080/verify-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.valid) {
                // Token válido, continue com o fluxo normal
                console.log(router.asPath);
                if(router.asPath === '/'){
                  router.push('/menu');
                }
                console.log('Token válido');
              } else {
                // Token inválido, redirecione para a página de login
                router.push('/');
              }
            })
            .catch((error) => {
              console.error('Erro ao verificar o token:', error);
              // Em caso de erro na verificação do token, redirecione para a página de login
              router.push('/');
            });
        }
      }, []);


    return null;
}

export default CheckUser;