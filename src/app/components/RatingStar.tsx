"use client"
import { useState } from 'react';

interface RatingStarProps {
  complete: () => void;
}

const RatingStar: React.FC<RatingStarProps> = ({ complete }) => {
  const [avaliacao, setAvaliacao] = useState<number>(0);

  const handleStarClick = (value: number) => {
    setAvaliacao(value);
    complete();
  };

  return (
    <div className="absolute">
      <div className="inline-block text-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`text-4xl cursor-pointer ${value <= avaliacao ? 'text-yellow-400' : 'text-gray-400'}`}
              onClick={() => handleStarClick(value)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingStar;
