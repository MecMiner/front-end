import React, { useEffect, useState } from 'react';

function ExercicioNivel4({onSucess, setInfo, linksite}) {
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
      <h1 className="title">Envie seu link</h1>
      <div className="step">
          <a className="step-title" href={linksite} target='_blank'>{linksite}</a>
          <a className="step-title" href='https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php' target='_blank'>https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php</a>
          <a className="step-title" href='https://portalworkedexamples.herokuapp.com/padrao.php' target='_blank'>https://portalworkedexamples.herokuapp.com/padrao.php</a>
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
      <style jsx>{`
        .complete-as-etapa {
            width: 100%;
            border: 1px solid black;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            z-index: 999;
          }
          
          .title {
            color: #ff9800;
            font-size: 24px;
            margin-bottom: 20px;
          }
          
          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .step-title {
            color: black;
            font-size: 12px;
            margin-bottom: 10px;
            margin-right: 20px;
            margin-left: 20px;
          }
          
          .textarea {
            width: 500px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            resize: vertical; /* Permite redimensionamento vertical */
            min-height: 50px; /* Altura mínima inicial */
            overflow: auto; /* Adiciona barra de rolagem quando o conteúdo excede a altura */
          }
          
          .button {
            padding: 10px 20px;
            margin-bottom: 10px;
            background-color: #ff9800;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          
          .button:hover {
            background-color: #ffac33;
          }
          
      `}</style>
    </div>
  );
}

export default ExercicioNivel4;
