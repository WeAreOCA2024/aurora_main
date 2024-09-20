import { Menu, Phone } from 'lucide-react'
import { Inter } from 'next/font/google'
import React from 'react'
import Call from '@/assets/svg/call.svg'
import DmInputComponent from './dminput'
import DmDateComponent from './dmdate'

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
            <Call />
            <Menu className="w-6 h-6" />
          </div>
        </div>
        <hr className='size-px text-white w-11/12 mx-auto' />
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <DmDateComponent />
        {['8:10', '9:33', '9:55'].map((time, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="bg-gray-700 rounded-lg p-2 max-w-xs">
              <p className="text-sm">おお森山神社！</p>
            </div>
            <span className="text-xs text-gray-500 self-end ml-2">{time} PM</span>
          </div>
        ))}
        {['9:54', '9:54'].map((time, index) => (
          <div key={index} className="flex items-start justify-end mb-4">
            <span className="text-xs text-gray-500 self-end mr-2">{time} PM</span>
            <div className="bg-blue-500 rounded-lg p-2 max-w-xs">
              <p className="text-sm">やっほ</p>
            </div>
          </div>
        ))}
      </div>
      <DmInputComponent />
    </div>
  )
}

export default DMCompornent