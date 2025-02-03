'use server'

import { cookies } from "next/headers";
import config from "../../../config";
import { Desafio, DesafioNivel2, DesafioNivel3e4, Respostas } from "../interfaces/interfaces";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const fecthRespostas = async (id: number | string): Promise<Respostas> => {
    const cookieStored = await cookies()
    const token = cookieStored.get('gamefied-token')

    if(!token) redirect('./')
    const apiUrl = config.apiUrl;
    const response = await fetch(`${apiUrl}/respostas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }, 
        next :{
            tags: ['respostas']
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const { respostas } = await response.json()

    return respostas
}

export async function fetchDesafio(): Promise<Desafio[] | null> {
    const cookieStored = await cookies()
    const token = cookieStored.get('gamefied-token')
    try {
        const response = await fetch(`${config.apiUrl}/desafio`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          });
        
        
          const {dataDesafio} = await response.json();
        
          return  dataDesafio
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function fecthDataDesafio1(id: string | number): Promise<Desafio> {
    const response = await fetch(`${config.apiUrl}/desafio1/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const { dataDesafio } = await response.json()

    return dataDesafio
}

export async function fecthDataDesafio2(id: string | number): Promise<DesafioNivel2> {
    const response = await fetch(`${config.apiUrl}/desafio2/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const { dataDesafio } = await response.json()

    return dataDesafio
}

export async function fecthDataDesafio3(id: string | number): Promise<DesafioNivel3e4> {
    const response = await fetch(`${config.apiUrl}/desafio3/${id}`)

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const { dataDesafio } = await response.json()

    return dataDesafio
}


export async function revalidateRespostas(){
    console.log("revalidando dados")
    revalidateTag('repostas')
}