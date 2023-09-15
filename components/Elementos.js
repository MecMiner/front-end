import Image from 'next/image';
import React from 'react';

const Nome = ({name}) => {
    return (
        <div className="name" style={{textAlign: 'center'}}>
          <span className="value"> {name} </span>
        <style jsx>{`
          .name {       
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  };

const Colaboracao = ({info}) => {
    return (
        <div className="coin">
          <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
              <Image src={'/src/personagens/colaboracao.png'} fill alt='moeda' priority />
          </div>
          
          <div className="text-container">
            <span className="value"> {info} </span>
          </div>              
        <style jsx>{`
          .coin {       
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding:5px;
          }
          .text-container {
            flex: 1; /* O texto ocupa todo o espaço disponível */
            display: flex;
            align-items: center;
            justify-content: center; /* Alinha o texto ao centro */
          }
  
        `}</style>
      </div>
    );
  };

const BomDesempenho = ({info}) => {
    return (
        <div className="coin">
          <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
              <Image src={'/src/personagens/bomDesempenho.png'} fill alt='moeda' priority />
          </div>
          
          <div className="text-container">
            <span className="value"> {info} </span>
          </div>              
        <style jsx>{`
          .coin {       
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding:5px;
          }
          .text-container {
            flex: 1; /* O texto ocupa todo o espaço disponível */
            display: flex;
            align-items: center;
            justify-content: center; /* Alinha o texto ao centro */
          }
  
        `}</style>
      </div>
    );
  };

const OtimoDesempenho = ({info}) => {
  return (
      <div className="img">
        <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
            <Image src={'/src/personagens/otimoDesempenho.png'} fill alt='moeda' priority />
        </div>
        <div className="text-container">
          <span className="value"> {info} </span>
        </div>              
      <style jsx>{`
        .img { 
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding:5px;
        }
        .text-container {
          flex: 1; /* O texto ocupa todo o espaço disponível */
          display: flex;
          align-items: center;
          justify-content: center; /* Alinha o texto ao centro */
        }

      `}</style>
    </div>
  );
};

const Coin = ({info}) => {
    return (
        <div className="coin">
          <div style={{position: 'relative' ,height: '50%' ,aspectRatio: '1/1'}}>
              <Image src={'/src/moeda.gif'} fill alt='moeda' priority />
          </div>
          
          <div className="text-container">
            <span className="value"> {info} </span>
          </div>              
        <style jsx>{`
          .coin {       
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding:5px;
          }
          .text-container {
            flex: 1; /* O texto ocupa todo o espaço disponível */
            display: flex;
            align-items: center;
            justify-content: center; /* Alinha o texto ao centro */
          }
  
  
        `}</style>
      </div>
    );
  };

  const XP = ({ info}) => {
    return (
      <div className="coin">
        <div className="experience-bar">
          <div className="fill"></div>
          <span className="xp">{info} XP</span>
        </div>
        <style jsx>{`
           .coin {       
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
          }
  
          .experience-bar {
            width: 100%;
            height: 20px;
            background-color: #e4e4e4;
            position: relative;
          }
  
          .fill {
            height: 100%;
            width: ${info >= 100 ? 100 : info}%;
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

  const Copyright = () => {
    return (
        <div className="coin">
     
          <p style={{color: 'black'}} className="value"> © Jeferson Souza</p>
        <style jsx>{`
          .coin { 
            position: absolute;      
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
          }
        `}</style>
      </div>
    );
  };


  export {Nome, Colaboracao, BomDesempenho, OtimoDesempenho, Coin, XP, Copyright};
  