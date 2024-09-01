import { Menu, Phone } from 'lucide-react'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const DMCompornent = () => {
  return (
    <div className={`flex flex-col h-screen bg-black text-white ${inter.className}`}>
      <header>
        <div className='flex items-center justify-between px-8 py-2'>
          <div className="flex items-center">
            <div className='flex items-center gap-3  rounded-lg'>
              <div className={`border-2, iconM-frame`}>
                <div className="iconM"/>
              </div>
              <p className="text-white truncate font-normal">Jiba</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6" />
            <Menu className="w-6 h-6" />
          </div>
        </div>
        <hr className='size-px text-white w-11/12 mx-auto' />
      </header>
    </div>
  )
}

export default DMCompornent