import { Menu, Phone } from 'lucide-react'
import { Inter } from 'next/font/google'
import React from 'react'
import Call from '@/assets/svg/call.svg'
import Meeting from './meeting'

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
            <Meeting />
            <Menu className="w-6 h-6" />
          </div>
        </div>
        <hr className='size-px text-white w-11/12 mx-auto' />
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="text-center text-sm text-gray-500 my-2">Today</div>
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
      <div className="px-4 py-2">
        <div className="flex items-center">
          <button className="text-gray1 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <input type="text" className="flex-1 bg-gray2 rounded-xl px-4 py-2 text-sm focus:outline-none" />
        </div>
      </div>
    </div>
  )
}

export default DMCompornent