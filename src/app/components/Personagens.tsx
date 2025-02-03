"use client";

import React from 'react';
import Image from 'next/image';

interface PersonagemProps {
    img: string;
    inverter?: boolean;
    tamanho?: string;
    left?: string | number,
    right?: string | number
}

const Personagem: React.FC<PersonagemProps> = ({ img, left, right, inverter }) => {
    return (
        <div
            className="absolute bottom-4"
            style={{ left: left || undefined, right: right || undefined }}
        >
            <Image
                className={`${inverter ? 'transform scale-x-[-1]' : ''}`}
                src={`/src/personagens/${img}.png`}
                width={320}
                height={320}
                alt="character"
                priority
                loading="eager"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
                style={{height: 'auto'}}
            />
        </div>
    );
};

export default Personagem;
