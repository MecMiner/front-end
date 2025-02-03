import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../../globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex justify-center items-center relative min-w-[1040px]">
          <div className="w-full max-w-[1080px] aspect-[16/8] border-2 border-black rounded-xl flex flex-col justify-center items-center bg-white relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
