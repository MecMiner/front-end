'use server'
import { fetchUserData } from "@/app/utils/auth";
import { fecthDataDesafio2, fecthDataDesafio3, fecthRespostas } from "@/app/utils/fetching";
import { redirect } from "next/navigation";
import GameLevelThree from "./game";

interface Props {
    params: {id: string}
}

 export default async function LevelOne({params} : Props) {
     const {id} = await params;
     const user = await fetchUserData()
     const data = await fecthDataDesafio3(id)
     const res = await fecthRespostas(id)
     
    if(!user || !data || !res || !id) redirect('/')

    return (
        <div>
            <GameLevelThree id={id} data={data} respostas={res} user={user}/>
        </div>
    )  
}