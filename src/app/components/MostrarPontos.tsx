'use cliente'
import Image from "next/image";
import { useEffect, useState } from "react";

type MostrarPontosProps = {
    moeda: number,
    exp?: number
}

export default function MostrarPontos({ moeda, exp }: MostrarPontosProps) {
    const [showPts, setShowPts] = useState<boolean>(false)

    useEffect(()=>{
        setShowPts(true)
        setTimeout(() => {
            setShowPts(false)
        }, 3000)

    },[])
    
    return (
        <div>
            {showPts && (
                <div className="absolute bottom-0 left-[50%] transform -translate-x-1/2 p-2 bg-gray-800 text-[rgb(255,183,3)] text-xl font-bold rounded-t-lg border gap-2 border-gray-500 animate-[fadeInOut_5s] flex flex-row items-center justify-start z-[999999]">
                    <Image src={'/src/moeda.gif'} width={50} height={50} alt='moeda' priority unoptimized />
                    {
                        !exp ? (`Você ganhou ${moeda} moedas`): (`Você ganhou ${moeda} moedas e ${exp} XP.`)
                    }
                    
                </div>
            ) }
        </div>

    )
}