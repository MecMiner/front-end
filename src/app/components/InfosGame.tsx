"use client";

import React from "react";
import FullScreen from "./FullScreen";
import HomeButton from "./HomeButton";
import InfoButton from "./InformationButton";
import { Usuario } from "../interfaces/interfaces";
import Image from "next/image";

interface InfosGameProps {
  user: Usuario | null;
}

const InfosGame: React.FC<InfosGameProps> = ({ user }) => {
  return (
    <div className="absolute top-0 left-0 w-1/6 h-full bg-teal-500 bg-opacity-50 rounded-l-xl capitalize">
      <div className="flex flex-col items-center space-y-4 p-4 mt-8">
        <div className="w-full text-center mb-5">
          <span className="value">{user?.nome}</span>
        </div>

        <div className="flex items-center w-full space-x-2">
          <div className="relative w-8 h-8">
            <Image unoptimized src={"/src/moeda.gif"} fill alt="coin" sizes="32px" priority />
          </div>
          <span className="value">{user?.pontos}</span>
        </div>

        <div className="w-full h-5 bg-gray-200 rounded relative">
          <div
            className="h-full bg-yellow-400 rounded"
            style={{
              width: `${user?.xp ? Math.min(user.xp, 100) : 0}%`,
            }}
          ></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-sm font-bold">
            {user?.xp} XP
          </span>
        </div>

        <div className="flex items-center w-full space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={"/src/personagens/colaboracao.png"}
              fill
              alt="collaboration"
              priority
              sizes="32px"
            />
          </div>
          <span className="value">{user?.colaboracao}</span>
        </div>

        <div className="flex items-center w-full space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={"/src/personagens/otimoDesempenho.png"}
              fill
              alt="excellent performance"
              sizes="32px"
              priority
            />
          </div>
          <span className="value">{user?.otimoDesempenho}</span>
        </div>

        <div className="flex items-center w-full space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={"/src/personagens/bomDesempenho.png"}
              fill
              alt="good performance"
              priority
              sizes="32px"
            />
          </div>
          <span className="value">{user?.bomDesempenho}</span>
        </div>

        <div className="w-full absolute bottom-0">
          <div className="flex justify-center gap-4 flex-row w-full h-10">
            <HomeButton />
            <FullScreen />
            <InfoButton />
          </div>

          <div className="flex items-center justify-center w-full h-10 mt-2 text-xs text-black">
            <p className="value">© Jeferson Souza</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfosGame;
