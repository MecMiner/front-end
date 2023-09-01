const ExibirDica = (dica) => {
  return (
    <div>
        <div className='info-overlay'>
          <div className='info'>
            <div className='close-button' onClick={() => handleExit()}>
              X
            </div>
            <p>{dica}</p>
          </div>
        </div>
      <style jsx>{`
        .info-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .info {
          width: 500px;
          height: 500px;
          border: 2px solid #000;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          z-index: 9999999;
          position: relative;
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

export default ExibirDica;
