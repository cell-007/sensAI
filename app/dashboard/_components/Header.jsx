"use client"
import React, {useEffect} from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { SparklesIcon } from "@heroicons/react/24/outline";
import { FaRocket } from 'react-icons/fa'

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
        
        >Dashboard</li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/upgrade'&&'text-blue-700 font-bold'}
        `}><a href="/upgrade">Upgrade</a></li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/contact_us'&&'text-blue-700 font-bold'}
        `}><a href='/contact_us'>Contact Us</a></li>
        <li className={`hover:text-blue-800 hover:font-bold transition-all cursor-pointer
          ${path=='/feedback&review'&&'text-blue-700 font-bold'}
        `}><a href='/feedback&review'>Feedback & Reviews</a></li>
      </ul>

      <div className='flex items-center space-x-4'>
        <UserButton afterSignOutUrl='/' />
          <div className='hidden md:block bg-white rounded-xl p-1 shadow-sm pr-2'>
            <div className='flex items-center space-x-2'>
              <div className='bg-blue-100 p-2 rounded-lg'>
                <FaRocket className='text-blue-600' />
              </div>
              <div>
                <p className='text-xs text-gray-500'>Plan</p>
                <p className='font-xs'>Pro</p>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Header
