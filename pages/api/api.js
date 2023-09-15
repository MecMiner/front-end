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


export  const fetchResponse = async (id) => {
    const token = localStorage.getItem('token');
    const apiUrl = config.apiUrl;

    try {
      const response = await fetch(`${apiUrl}/respostas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.response;
      } else {
        throw new Error('Erro na resposta da API');
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

export const fetchUser = async () => {
    const token = localStorage.getItem('token');
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

  export const setCoin = (setUser, pontos, exp) => {
    setUser(prevState => ({ ...prevState, pontos: prevState.pontos + pontos }));
    setUser(prevState => ({ ...prevState, xp: prevState.xp + exp }));
  }

  export const setBom = (setUser) => {
    setUser(prevState => ({ ...prevState, bomDesempenho: prevState.bomDesempenho + 1}));
  }

  export const setOtm = (setUser) => {
    setUser(prevState => ({ ...prevState, otimoDesempenho: prevState.otimoDesempenho + 1}));
  }

  export const setCol = (setUser) => {
    setUser(prevState => ({ ...prevState, colaboracao: prevState.colaboracao + 1}));
  }