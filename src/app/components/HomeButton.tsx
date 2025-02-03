"use client"
import { useRouter } from 'next/navigation';
import { FiHome } from 'react-icons/fi';

type HomeButtoProps = {
  className?: string
}

const HomeButton: React.FC<HomeButtoProps> = ({className}) => {
  const router = useRouter();

  const handleGoToHomePage = () => {
    router.push('/');
  };

  return (
      <button className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 ${className}`} onClick={handleGoToHomePage}>
        <FiHome size={24} />
      </button>
  );
};

export default HomeButton;
