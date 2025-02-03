'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-6'>
      <h2 className='text-4xl font-bold text-red-500'>404 - Page Not Found</h2>
      <p className='text-lg mt-4 text-gray-300'>Unable to find the requested resource:</p>
      <p className='text-lg font-mono bg-gray-800 px-4 py-2 rounded-md mt-2'>{pathname}</p>
      <p className='mt-6 text-gray-400'>
        Return to <Link href="/" className='text-blue-400 hover:underline'>Home page</Link>
      </p>
    </div>
  )
}