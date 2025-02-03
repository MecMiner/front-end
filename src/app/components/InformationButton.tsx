"use client"
import { BiHelpCircle } from 'react-icons/bi';
import { useState } from 'react';

type InformationButtonProps = {
  className? : string
}

const InformationButton: React.FC<InformationButtonProps> = ({className}) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleGoToHomePage = () => {
    setShowInfo(true);
  };

  const handleExit = () => {
    setShowInfo(false);
  };

  return (
    <div>
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-4/5 h-4/5 border-2 border-black rounded-lg bg-white overflow-y-auto p-5">
            <div className="flex justify-between items-center p-2">
              <h3 className="text-2xl">Informações</h3>
              <div
                className="absolute top-2 right-2 text-2xl text-red-500 cursor-pointer hover:text-gray-300 active:text-gray-300 transition-colors"
                onClick={handleExit}
              >
                X
              </div>
            </div>
            <div>
              <p>
                Cada desafio é composto por 4 níveis, e à medida que avança, esses níveis são liberados. Em cada nível você será desafiado a resolver um problema, e terá 3 tentativas para fazer isso.
              </p>
              <p>
                No decorrer do desafio você recebe algumas recompensas, sendo elas: moedas, XPs e badges:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  💰 Moedas: Use suas moedas para adquirir dicas valiosas que podem ajudá-lo a superar os obstáculos. Lembre-se, a dica de um colega custa apenas 5 moedas, enquanto a dica do professor requer 10 moedas.
                </li>
                <li>🌟 XPs: Acumule XPs para demonstrar sua habilidade e experiência na plataforma.</li>
                <li>🏆 Badges: Colete distintivos que representam suas conquistas. Há três tipos de distintivos disponíveis:</li>
                <ul className="list-inside list-decimal pl-5">
                  <li>🥇 Ótimo Desempenho: Ganhe este distintivo ao acertar respostas na primeira tentativa.</li>
                  <li>🥈 Bom Desempenho: Mostre sua perseverança e conquiste este distintivo ao acertar a resposta na segunda ou terceira tentativa.</li>
                  <li>🤝 Colaboração: Contribua para a comunidade avaliando conteúdos e criando novos exemplos. Este distintivo é uma recompensa pela sua generosidade.</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      )}
        <button className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 ${className}`} onClick={handleGoToHomePage}>
          <BiHelpCircle size={24} />
        </button>
    </div>
  );
};

export default InformationButton;
