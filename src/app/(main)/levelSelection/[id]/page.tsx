"use server"
import { fecthRespostas } from "@/app/utils/fetching"
import Fases from "./fases"

interface Props {
    params: {id: number}
}

export default async function LevelSelection({params} : Props) {
    const {id} = await params
    const info  = await fecthRespostas(id)

    return (
        <div>
            <Fases id={id} data={info}/>
        </div>
    )
}