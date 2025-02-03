import type { Metadata } from "next";
import "./../../globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Gamified Worked Examples',
  description: 'A platform for gamifying worked examples.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const token = cookieStore.get("gamefied-token")?.value;
  
  if(token){
    redirect ("/")
  }

  return (
        <div className="min-h-screen flex justify-center items-center relative min-w-[1040px] bg-gray-500">
          <div className="w-full max-w-[1080px] border-2 border-black rounded-xl flex flex-col justify-center items-center bg-white relative aspect-video ">
            {children}
          </div>
        </div>
  );
}
