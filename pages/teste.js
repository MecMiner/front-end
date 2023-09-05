import Personagem from '@/components/Personagem';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function Teste() {
    
  return (
    <div className="text">
        <div className='game'>
            <div className='img-personagem'>
                <Image
                    src ={`/src/personagens/m1/imagem1.png`}
                    alt="persongem"
                    fill
                />
            </div>
        </div>
        <div className='block2'>
            <div className='dialog'></div>

        </div>
        <div className='atr'>
            <div className='gold'></div>
            <div className='exp'></div>
            <div className='colab'></div>
            <div className='otm'></div>
            <div className='bom'></div>
        </div>
      <style jsx>{`
        .text {
            position: absolute;
            background-color: green;
            width: 100vw;
            height: 100vh;

        }

        .game{
            background-color: pink;
            position: absolute;
            left: 15%;
            width:85%;
            height: 70%
        }
        .block2 {
            position: absolute;
            bottom: 0%;
            background-color: grey;
            left: 15%;
            width: 85%;
            height: 30%;
        }
        .dialog {
            position: absolute;
            background-color: red;
            width: 20%;
            height: 100%;
            right: 0%;
        }

        .atr {
            position: absolute;
            height: 100%;
            left: 0%;
            width: 15%;
            background-color: blue;
            display: flex;
            flex-direction: column;
            
        }

        .gold {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 10%;
            right: 0%;
            top: 10%;
        }

        .exp {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 10%;
            right: 0%;
            top: 20%;
        }
        .colab {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 10%;
            right: 0%;
            top: 40%;
        }

        .otm {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 10%;
            right: 0%;
            top: 50%;
        }

        .bom {
            position: absolute;
            background-color: red;
            width: 100%;
            height: 10%;
            right: 0%;
            top: 60%;
        }

        .img-personagem {
            position: absolute;
            background-color: red;
            height: 80%;
            aspect-ratio: 1 / 1;
            transform: translateX(-50%);
            left: 50%;
            bottom: 0%;
        }

      `}
      </style>
    </div>
  );
}

export default Teste;
