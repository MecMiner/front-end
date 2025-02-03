'use server'
import { cookies } from "next/headers";
import config from "../../../config";
import { revalidateTag } from "next/cache";

interface UserParams {
  pontos?: number;
  xp?: number;
  bomDesempenho?: number;
  otimoDesempenho?: number;
  colaboracao?: number;
}

export async function saveUser(userParams: UserParams = {}) {
    const cookieStored = await cookies();
    const token = cookieStored.get('gamefied-token');
    if (!token) {
        return {
            error: true,
            mensar: 'Invalid Token'
        };
    }

    try {
        const response = await fetch(`${config.apiUrl}/setPts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`,
            },
            body: JSON.stringify(userParams),  // Passando diretamente os parâmetros
        });

        if (response.ok) {
            revalidateTag('user');
            return {
                error: false,
                mensagem: 'User saved'
            };
        }
    } catch (error) {
        console.log(error);
        return {
            error: true,
            mensage: 'Error when making request'
        };
    }
};

interface GameParams {
    nivel?: number  ;
    respostanivel2?: string  ;
    respostanivel3?: string  ;
    respostanivel4?: string  ;
    statusNivel2?: {
        jogou?: boolean,
        corrigido?: boolean,
        certo?: boolean,
        erros?: number,
        feedback?: string
    }  ; // JSON parseado
    statusNivel3?: {
        jogou?: boolean,
        corrigido?: boolean,
        certo?: boolean,
        erros?: number,
        feedback?: string
    }  ; // JSON parseado
    statusNivel4?: {
        jogou?: boolean,
        corrigido?: boolean,
        certo?: boolean,
        erros?: number,
        feedback?: string
    }  ;
}


export async function saveGame(id: string, game : GameParams = {}) {
    const cookieStored = await cookies();
    const token = cookieStored.get('gamefied-token')
    if (!token) {
        return {
            error: true,
            mensar: 'Invalid Token'
        }
    }
    try {
        const response = await fetch(`${config.apiUrl}/respostas/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token?.value}`,
            },
            body: JSON.stringify(game),
        });
        if (response.ok) {
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
}