import Image from "next/image";
import { GamePtsProps } from "../interfaces/interfaces";

interface DesempenhoProps {
  gamePontos: GamePtsProps
}

const Desempenho: React.FC<DesempenhoProps> = ({gamePontos}: DesempenhoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-center flex-row gap-4">
        <Image
          src={`/src/personagens/${gamePontos.bomDesempenho ? 'bom' : 'otimo'}Desempenho.png`}
          width={150}
          height={150}
          alt={`${gamePontos.bomDesempenho ? 'bom' : 'otimo'}`}
          priority
          className="mx-12"
        />
        {gamePontos.col && (
          <Image
            src={`/src/personagens/colaboracao.png`}
            width={150}
            height={150}
            alt="colaboracao"
            priority
            className="mx-12"
          />
        )}
      </div>
      <p className="mt-5 text-lg text-gray-700 uppercase tracking-widest font-bold text-center">
        {`Parabéns, você recebeu um Badge de ${gamePontos.bomDesempenho ? 'bom' : 'otimo'} Desempenho`}
      </p>
      {gamePontos.col && (
        <p className="mt-2 text-lg text-gray-700 uppercase tracking-widest font-bold">
          {`Além disso ganhou um badge de colaboração`}
        </p>
      )}
      <div className="flex justify-center gap-12">
      </div>
    </div>
  );
};

export default Desempenho;
