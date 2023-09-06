import { useRouter } from 'next/router';
import { FiHome } from 'react-icons/fi';

const HomeButton = () => {
  const router = useRouter();

  const handleGoToHomePage = () => {
    router.push('/');
  };

  return (
    <div className="homeButton" onClick={handleGoToHomePage}>
      <div className="linkContainer">
        <FiHome size={24} />
      </div>
      <style jsx>{`
        .homeButton {
          width: 100%;
          z-index: 999999;
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
      `}</style>
    </div>
  );
};

export default HomeButton;
