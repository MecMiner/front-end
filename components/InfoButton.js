import { useRouter } from 'next/router';
import { BiHelpCircle } from 'react-icons/bi';
import { useState } from 'react';

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);  
  const router = useRouter();

  const handleGoToHomePage = () => {
    setShowInfo(true);
  };

  const handleExit = () => {
    setShowInfo(false);
  }

  return (
    <div>
    {showInfo && (<div className='info'>
        <div className="close-button" onClick={() => handleExit()}>X</div> 
        <h1>Área de dúvidas</h1>   
    </div>)}
    <div className="homeButton" onClick={handleGoToHomePage}>
      <div className="linkContainer">
        <BiHelpCircle size={48} />
      </div>
    </div>
      <style jsx>{`

        .info{
            width: 500px;
            height: 500px;
            border: 2px solid #000;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            position: relative;
            z-index: 999999999;
        }

  
        .homeButton {
          position: absolute;
          top: 90%;
          left: 95%;
          z-index: 9999;
          cursor: pointer;
        }
        
        .linkContainer {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: #ffffff;
          border-radius: 50%;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;
        }
        
        .linkContainer:hover {
          background-color: #f0f0f0;
        }

        .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: red;
            cursor: pointer;
            transition: color 0.3s ease;
            
            &:hover {
              color: #ddd;
            }
            
            &:active {
              color: #ddd;
            }
          }
      `}</style>
    </div>
  );
};

export default InfoButton;
