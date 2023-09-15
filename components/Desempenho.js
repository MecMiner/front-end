import Image from "next/image";

const Desempenho = ({ des, col, pontos, xp }) => {
  return (
    <div className="container">
      <div className="imagesContainer">
        <Image
          style={{margin: '0 50px'}}
          src={`/src/personagens/${des}Desempenho.png`}
          width={150}
          height={150}
          alt={des}
          priority
        />
        {col &&
          <Image
            style={{margin: '0 50px'}}
            src={`/src/personagens/colaboracao.png`}
            width={150}
            height={150}
            alt={`colaboracao`}
            priority
          />
        }

      </div>
      <p className="texto">{`Parabéns, você recebeu um Badge de ${des} Desempenho`}</p>
      <div>
        <p className="texto">{`${pontos} Moedas e ${xp} pontos de experiências`}</p>
        <Image src={'/src/moeda.gif'} width={100} height={100} alt='moeda' priority /> 
      </div>
      {col && <p className="texto">{`E um badge de colaboração`}</p>}

      <style jsx>{`
        .container {
          display: flex;    
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .imagesContainer {
          display: flex;
          justify-content: center;
        }

        .texto {
          margin-top: 20px;
          font-size: 18px;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
};

export default Desempenho;