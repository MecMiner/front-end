'use server'
import { redirect } from "next/navigation";
import DialogScreen from "../components/DialogScreen";
import Personagem from "../components/Personagens";
import Link from "next/link";
import Logout from "../components/Logout";
import { fetchDesafio } from "../utils/fetching";

export default async function Home() {
  const desafio = await fetchDesafio()
  if(!desafio) redirect('/login')
    
  return (
    <div>
        <div className="absolute left-[16.666667%] w-5/6 h-full top-0 flex items-center justify-center">
          <Personagem img="m1/imagem3" left={10} tamanho="60"/>
          <DialogScreen left cor={"mentor"} dialogText="Hello, here you have some challenges available."/>
          <div className="w-1/3, flex flex-col gap-4 p-4 max-h-[100%]">
            {desafio.map((index, id) => {
              return (
                  <Link className="w-full p-4 bg-[#2980b9] text-white border-none rounded-lg cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#1a5276] active:bg-[#154360]" key={id} href={`/levelSelection/${index.iddesafio}`} >{index.titulo}</Link>
              )
            })}
          </div>
          <Logout/>
        </div>
   </div>
  );
}
