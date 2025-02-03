'use server'

import { cookies } from "next/headers";
import config from "../../../config";
import { redirect } from "next/navigation";
import { Usuario } from "../interfaces/interfaces";

export async function singin(state: any, formData: FormData) {
    const cookieStored = await cookies();
    const email = formData.get('email')
    const senha = formData.get('senha')

    if (!email || !senha) {
        return {
            error: true,
            email,
            message: 'All fields are required'
        }
    }

    try {
        const response = await fetch(`${config.apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, senha }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        const { error, message, token } = data

        if (!token) {
            return {
                error,
                email,
                message
            }
        }
        cookieStored.set('gamefied-token', token, { maxAge: 60 * 60 * 1 })

    } catch (error) {
        console.error(error)
    }
    redirect("/")

}

export async function fetchUserData(): Promise<Usuario | null> {
    const cookieStored = await cookies();
    const token = cookieStored.get('gamefied-token')
    try {
        const response = await fetch(`${config.apiUrl}/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
            next: {
                tags: ['user']
            }
        });
       
        if (response.ok) {
            const { dataUsuario } = await response.json();  // Lê o corpo da resposta e armazena-o
            return dataUsuario;  // Retorna os dados lidos
        } else {
            return null
        }

    } catch (error) {
        console.error(error)
    }

    redirect('/login')

}
