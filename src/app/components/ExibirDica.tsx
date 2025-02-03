import React from 'react';

interface ExibirDicaProps {
  dica: string;
  setExibirDica: (value: boolean) => void;
}

const ExibirDica: React.FC<ExibirDicaProps> = ({ dica, setExibirDica }) => {
  const handleExit = () => {
    setExibirDica(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="relative w-96 max-h-[80vh] bg-white border-2 border-black rounded-lg p-5 overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-red-500 text-xl hover:text-gray-300 focus:outline-none"
          onClick={handleExit}
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Dica</h2>
        <p className="text-base text-gray-700">{dica}</p>
      </div>
    </div>
  );
};

export default ExibirDica;
