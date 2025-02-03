'use server'
import { fetchUserData } from "@/app/utils/auth";
import { fecthDataDesafio2, fecthRespostas } from "@/app/utils/fetching";
import { redirect } from "next/navigation";
import GameLevelTwo from "./game";

interface Props {
    params: {id: string}
}

 export default async function LevelOne({params} : Props) {
     const {id} = await params;
     const user = await fetchUserData()
     const data = await fecthDataDesafio2(id)
     const res = await fecthRespostas(id)
     
    if(!user) redirect('/login')
    if(!id) redirect ('/')

    return (
        <div>
                <GameLevelTwo id={id} user={user} data={data} respostas={res}/>
        </div>
    )  
}