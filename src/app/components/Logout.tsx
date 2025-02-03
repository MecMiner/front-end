'use client'
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

export default function Logout() {
    const router = useRouter()

    const handleLogout = () => {
        destroyCookie(undefined, 'gamefied-token')
        router.push('/login');
    };


    return (
        <div className="absolute top-4 right-4 text-red-500 text-[18px] cursor-pointer transition-colors duration-300 ease-in-out hover:text-[#ddd] active:text-[#ddd]" onClick={handleLogout}>Exit</div>
    )
}