import { useState } from 'react';

const AvaliacaoStar = ({complete}) => {
  const [avaliacao, setavAliacao] = useState(0);

  const handleStarClick = (value) => {
    setavAliacao(value);
    complete();
  };

  return (
    <div style={{position: 'absolute'}}>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= avaliacao ? 'active' : ''}`}
            onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>
      <style>{`
        .star-conteiner {
            text-align: center;
          }
          
          .stars {
            display: inline-block;
            font-size: 50px;
            cursor: pointer;
          }
          
          .star {
            color: #ccc;
          }
          
          .star.active {
            color: #ffdd00;
          }
      `}</style>
    </div>
  );
};

export default AvaliacaoStar;
