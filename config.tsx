interface Config {
  apiUrl: string,
  personagem: {
    nome: string, 
    cor: string
  },
  mentor: {
    nome: string,
    cor: string
  }
}


//apiUrl: 'https://workedexamplesgamification-b-38407a42cd98.herokuapp.com',
const config: Config = {
    apiUrl: 'http://localhost:8080',
    personagem: {nome: 'Maria', cor: '#f1f1f1'},
    mentor: {
      nome: 'Ana',
      cor: 'cornsilk'
    }
  };
  
export default config;
