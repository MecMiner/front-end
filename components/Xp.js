
import React from 'react';

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

export default XP;