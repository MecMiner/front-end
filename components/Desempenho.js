import Image from "next/image";

const Desempenho = ({ des, col}) => {
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
      {col && <p className="texto">{`E um badge de colaboração`}</p>}

      <style jsx>{`
        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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