import { useState } from "react";

type AvaliacaoStarProps = {
  complete: () => void;
};

const AvaliacaoStar: React.FC<AvaliacaoStarProps> = ({ complete }) => {
  const [avaliacao, setAvaliacao] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleStarClick = (value: number) => {
    setAvaliacao(value);
    complete();
  };

  return (
    <div className="absolute bottom-0 -translate-x-1/2 left-1/2 bg-white p-2 rounded-t-lg border shadow-lg">
      <div className="flex space-x-2 text-4xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`transition-colors duration-200 ${
              value <= (hover ?? avaliacao) ? "text-yellow-500" : "text-gray-400"
            } hover:text-yellow-300`}
            onClick={() => handleStarClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default AvaliacaoStar;
