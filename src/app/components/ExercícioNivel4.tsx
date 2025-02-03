import React, { FormEvent, useState } from 'react';
import { Usuario } from '../interfaces/interfaces';
import Link from 'next/link';

type ExercicioNivel4Props = {
    onSucess: (respostasnivel3: string) => void;
    setUser: React.Dispatch<React.SetStateAction<Usuario>>;
    linksite: string;
    tentativas: number;
};

function ExercicioNivel4({ onSucess, setUser, linksite, tentativas }: ExercicioNivel4Props) {
    const [link, setLink] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSucess(link);
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8/12 border bg-white rounded flex flex-col items-center font-sans">
            <h1 className="font-medium text-yellow-400 text-xl mb-2">Submit the Link to the Created Example</h1>
            <p className='text-sm mb-4'>
                You must create the example, search for it in the examples portal, and paste its link in this area.
            </p>
            <div className="min-w-[600px] w-full flex flex-col items-center mb-4">
                <Link className="text-indigo-400 border w-2/3 mb-2" href={linksite} target='_blank'>
                    Link to the Commit
                </Link>
                <Link className="text-indigo-400 border w-2/3 mb-2" href='https://portalworkedexamples.herokuapp.com/Login/Logado/Formulario/formulario.php' target='_blank'>
                    Example Creation Form
                </Link>
                <Link className="text-indigo-400 border w-2/3 mb-2" href='https://portalworkedexamples.herokuapp.com/padrao.php' target='_blank'>
                    Creation Guidelines
                </Link>
                <Link className="text-indigo-400 border w-2/3 mb-2" href='https://drive.google.com/file/d/1Ffc7VtlLX3sgPQ3QUYAnhmo1MXUKt4rn/view?usp=sharing' target='_blank'>
                    Step-by-Step Video
                </Link>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="min-w-[600px] w-full flex flex-col items-center mb-5">
                    <textarea
                        className="w-4/5 p-2.5 border border-gray-300 rounded resize-y min-h-[30px] overflow-auto"
                        placeholder="Enter your link"
                        value={link}
                        required
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center justify-center w-full">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700">
                        Submit
                    </button>
                </div>
            </form>
            <div className="text-sm font-bold mb-2.5">{`You have ${tentativas} attempts`}</div>
        </div>
    );
}

export default ExercicioNivel4;