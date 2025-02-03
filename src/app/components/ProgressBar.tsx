import React from "react";

interface ProgressBarProps {
  total: number;
  atual: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, atual }) => {
  const posicao = (atual * 100) / total;

  return (
    <div className="absolute top-0 left-1/2 w-full flex flex-col items-start transform -translate-x-1/2 rounded-tr-lg overflow-hidden font-sans">
      <div className="w-full h-1.5 bg-gray-300 rounded-tr-lg relative overflow-hidden">
        <div
          className="h-full bg-green-600 transition-width duration-300"
          style={{ width: `${posicao}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
