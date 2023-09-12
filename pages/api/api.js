import config from '@/config';

export const sendRequest = async (url, method, headers, body) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          ...headers,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log('Valores inseridos no banco');
      }
      return response;
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
      throw error;
    }
  };

export const fetchUser = async (token) => {
    const apiUrl = config.apiUrl;
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.dataUsuario;
      } else {
        throw new Error('Erro na resposta da API');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };