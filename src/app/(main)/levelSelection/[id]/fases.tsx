'use client'
import { Respostas } from "@/app/interfaces/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";

type FasesProps = {
    id: number
    data: Respostas
}

export default function Fases({id, data} : FasesProps){


    const router = useRouter()
    const handleButtonClick = (name: string) => {
        router.push(`/${name}/${id}`);
      };

    return (
        <div className="absolute left-[16.666667%] w-5/6 h-full top-0 flex justify-center">
                <h1 className="text-orange-500 mt-10 text-shadow-x1 font-bold text-xl">Select a level</h1>
                <div className='absolute top-1/2 -translate-y-1/2 flex items-center gap-[calc(100%/7)] w-4/5 '>
                    <div className='w-1/4 aspect-square relative'>
                        <button
                            className={`absolute w-full h-full z-10 hover:scale-110 transition-transform`}
                            onClick={() => handleButtonClick(`level-1`)}
                        >
                            <Image
                                className='rounded-full'
                                src={`/src/mapa/numero1.png`}
                                fill
                                alt={`number 1`}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
                                priority
                            />
                        </button>
                        <div className={`line ${data && data.nivel > 1 ? 'active' : ''}`} />
                    </div>
                    {[2, 3, 4].map((level, index, array) => (
                        <div key={level} className='w-1/4 aspect-square relative'>
                            <button
                                className={`absolute w-full h-full z-10 hover:scale-110 transition-transform`}
                                onClick={() => handleButtonClick(`level-${level}`)}
                                disabled={!data || data.nivel < level}
                            >
                                <Image
                                    className='rounded-full'
                                    src={`/src/mapa/numero${level}${data && data.nivel >= level ? '' : 'ds'}.png`}
                                    fill
                                    alt={`number ${level}`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 40vw"
                                    priority
                                />
                            </button>
                            {index < array.length - 1 && (
                                <div className={`line ${data && data.nivel > level ? 'active' : ''}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
    )
}