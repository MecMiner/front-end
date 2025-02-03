import config from "../../../config";
import { Desafio, DesafioNivel2, DesafioNivel3e4, Respostas, Usuario } from "../interfaces/interfaces";


const setValue = <K extends keyof Usuario>(
    setUser: React.Dispatch<React.SetStateAction<Usuario>>,
    key: K,
    value: Usuario[K]
) => {
    setUser((prevState) => {
        const currentValue = prevState[key];

        if (typeof currentValue === "number" && typeof value === "number") {
            return {
                ...prevState,
                [key]: currentValue + value, // Soma numérica
            };
        }
        console.error(`Incompatible types for addition: ${typeof currentValue} and ${typeof value}`);
        return prevState;
    });
};



  const saveGame = async (id: number | string, token: string, data: Respostas) => {
    try {
        const response = await fetch(`${config.apiUrl}/respostas/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer: ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};

const saveUser = async (token: string, user: Usuario) => {
    try {
        const response = await fetch(`${config.apiUrl}/setPts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(user),
        })
        if (response.ok) {
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};

export { setValue, saveGame, saveUser }