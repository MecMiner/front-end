'use server'
import InfosGame from "@/app/components/InfosGame";
import GameLevelOne from "./game";
import { fetchUserData } from "@/app/utils/auth";
import { fecthDataDesafio1, fecthRespostas } from "@/app/utils/fetching";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{id: string}>
}

 export default async function LevelOne({params} : Props) {
    const {id} = await params;
    if(!id) redirect ('/')
    const user = await fetchUserData()
    const data = await fecthDataDesafio1(id)

    if(!user) redirect('/login')

    return (
        <div>
                <InfosGame user={user}/>
                <GameLevelOne id={id} data={data}/>
        </div>
    )  
}