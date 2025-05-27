"use client"
import React, {useEffect} from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { SparklesIcon } from "@heroicons/react/24/outline";

function Header() {
  const path=usePathname();
  useEffect(()=>{
    console.log(path)
  },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <div className="flex items-center space-x-2">
      <SparklesIcon className="h-10 w-10 text-blue-600" />
      <a href=".."><Image src={'/logo.svg'}  width={160} height={100} alt='logo'/></a>
      </div>
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/dashboard'&&'text-blue-700 font-bold'}
        `}
        
        ><a href="/dashboard">Dashboard</a></li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/Upgrade'&&'text-blue-700 font-bold'}
        `}><a href="/upgrade">Upgrade</a></li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/contact_us'&&'text-blue-700 font-bold'}
        `}>Contact Us</li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/feedback&review'&&'text-blue-700 font-bold'}
        `}><a href='/feedback&review'>Feedback & Reviews</a></li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
