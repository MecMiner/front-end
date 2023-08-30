import Image from 'next/image';
import React from 'react';

const CoinsXP = ({coin, xp, colaboracao, otm, bom}) => {
    return (
        <div className="coins-xp-bar">
      <div className='badges'>
        <Image src={'/src/personagens/colaboracao.png'} width={30} height={30} alt='moeda' priority/>
        <span className="value">{colaboracao ? colaboracao : ''}</span>
        <Image src={'/src/personagens/bomDesempenho.png'} width={30} height={30} alt='moeda' priority/>
        <span className="value">{otm ? otm : ''}</span>
        <Image src={'/src/personagens/otimoDesempenho.png'} width={30} height={30} alt='moeda' priority/>
        <span className="value">{bom ? bom : ''}</span>
      </div>
      <div className="coin">
      <Image src={'/src/coin.png'} width={20} height={20} alt='moeda' priority/>
        <span className="value">{coin} Moedas</span>
      </div>
      <div className="experience-bar">
        <div className="fill"></div>
        <span className="xp">{xp} XP</span>
      </div>
      <style jsx>{`
        .coins-xp-bar {
          position: fixed;  
          top: 8%;
          right: 8%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: Arial, sans-serif; /* Substitua pela fonte desejada */
        }

        .coin {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .coin img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        .badges img {
          flex-wrap: wrap;
          width: 30px;
          right: 30px;
        }

        .experience-bar {
          width: 100%;
          height: 20px;
          background-color: #e4e4e4;
          position: relative;
        }

        .fill {
          height: 100%;
          width: ${xp >= 100? 100: xp}%;
          background-color: #ffc107;
          transition: width 0.3s ease;
        }

        .xp {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: black;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
      );
};

export default CoinsXP;