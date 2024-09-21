import React from 'react';
import { AuthComponent } from './components/Auth';
import { Header } from '../components/header';

const AuroraUnderline = () => (
  <div className="h-1 w-8/12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse" />
);

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mt-36 mb-3">
          全ての会話が、もっと
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
            クリエイティブ
          </span>
          に
        </h1>
        <AuroraUnderline />
        <AuthComponent />
      </main>
    </div>
  );
}