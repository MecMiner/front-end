import Image from "next/image";
import React, { useState, useEffect } from "react";

const Desempenho = ({des}) => {
  return (
    <div className="container">
      <div className="imagesContainer">
        <img src={`src/personagens/${des}Desempenho.png`} alt="Imagem 1" />
      </div>
      <p className="texto">{`Parabéns, você teve um ${des} Desempenho`}</p>

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

        .imagesContainer img {
          margin: 0 10px;
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