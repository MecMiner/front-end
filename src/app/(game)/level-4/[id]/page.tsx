'use server'
import { fetchUserData } from "@/app/utils/auth";
import { fecthDataDesafio2, fecthDataDesafio3, fecthRespostas } from "@/app/utils/fetching";
import { redirect } from "next/navigation";
import GameLevelFour from "./game";

interface Props {
    params: Promise<{id: string}>
}

 export default async function LevelOne({params} : Props) {
     const {id} = await params;
     const user = await fetchUserData()
     const data = await fecthDataDesafio3(id)
     const res = await fecthRespostas(id)
     
    if(!user || !data || !res || !id) redirect('/')

    return (
        <div>
                <GameLevelFour id={id} user={user} data={data} respostas={res}/>
        </div>
    )  
}