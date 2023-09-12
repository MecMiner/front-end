import React, { useEffect, useState } from 'react';

function ExercicioNivel4({onSucess, setInfo, linksite, tentativas}) {
  const [link, setlink] = useState('');

  useEffect(() =>{
    setInfo('Link:' + link);
  },[link]);

  const handleInputChange = (event) => {
    const { value } = event.target;

    setlink(value);
    
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    onSucess();
  };

  return (
    <div className="complete-as-etapa">
      <h1 className="title">Envie o Link do Exemplo Criado</h1>
      <p>Você deve criar o exemplo, busca-lo no portal de exemplos e colocar seu link nesta área.</p>
      <div className="step">
          <a className="step-title" href={linksite} target='_blank'>Link para o Commit</a>
          <a className="step-title" href='https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php' target='_blank'>Formulário de Criação do Exemplo</a>
          <a className="step-title" href='https://portalworkedexamples.herokuapp.com/padrao.php' target='_blank'>Diretrizes para Criação</a>
          <a className="step-title" href='https://drive.google.com/file/d/1Ffc7VtlLX3sgPQ3QUYAnhmo1MXUKt4rn/view?usp=sharing' target='_blank'>Vídeo passo a passo</a>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="step">
          <textarea
            className="textarea"
            placeholder='Digite seu link'
            value={link}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button type="submit" className="button">Enviar</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', padding: '10px'}}>
          <div className="tempo-restante">
              {`Você tem ${tentativas} tentativas`}
          </div>
        </div>
    </div>
  );
}

export default ExercicioNivel4;
