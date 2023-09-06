import React from 'react';

const BarradeProgresso = ({ total, atual }) => {
    const posicao = atual*100/total;
    return (
        <div className="coins-xp-bar" style={{borderRadius: '20px'}}>
            <div className="experience-bar">
                <div className="fill"></div>
                
            </div>
            <style jsx>{`
        .coins-xp-bar {
          position: absolute;  
          width: 100%;
          top: calc(100% - 4px);
          left: 50%;
          display: flex;
          flex-direction: column;
          border-radius:  40px 100px 0px 0px ;
          align-items: flex-start;
          transform: translateX(-50%);
          font-family: Arial, sans-serif; /* Substitua pela fonte desejada */
        }

        .experience-bar {
          width: 100%;
          height: 5px;
          background-color: #e4e4e4;
          border-radius: 10px;
          position: relative;
        }

        .fill {
          height: 100%;
          width: ${posicao}%;
          background-color: #00bf63;
          transition: width 0.3s ease;
          border-radius: 0px 0px 40px 100px ;
        }

      `}</style>
        </div>
    );
};

export default BarradeProgresso;
