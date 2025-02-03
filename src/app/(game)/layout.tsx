import "./../globals.css";
import React from "react"



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
          <div className="min-h-screen flex justify-center items-center relative min-w-[1040px]  bg-slate-500">
            <div className="w-[1080px] aspect-[16/8] border-2 border-black rounded-xl flex flex-col justify-center items-center bg-white relative">
              {children}
            </div>
          </div>
    );
}
