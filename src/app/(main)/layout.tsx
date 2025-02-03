
import "./../globals.css";
import React from "react";
import { fetchUserData } from "../utils/auth";
import { redirect } from "next/navigation";
import InfosGame from "../components/InfosGame";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await fetchUserData();
  if (!user) redirect('/login')
  return (
        <div className="min-h-screen flex justify-center items-center relative min-w-[1040px] bg-slate-500">
          <div className="w-[1080px] aspect-[16/8] border-2 border-black rounded-xl flex flex-col justify-center items-center bg-white relative">
          <InfosGame user={user}></InfosGame>
            {children}
          </div>
        </div>
  );
}
