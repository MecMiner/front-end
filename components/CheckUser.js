import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import config from '@/config';

const CheckUser = ({onFunction}) => {
    const apiUrl = config.apiUrl;
    const router = useRouter();

    useEffect(() => {
        // Verifique se o token está armazenado no localStorage
        const token = localStorage.getItem('token');
    
        // Se o token não estiver presente, redirecione para a página de login
        if (!token) {
          router.push('/');
        } else {
          // Verifique a validade do token no servidor
          fetch(`${apiUrl}/verify-token`, {
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
                if(router.asPath === '/'){
                  router.push('/menu');
                }
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
        onFunction();
      }, []);


    return null;
}

export default CheckUser;