"use client"

import { useState } from "react"
import { SignupComponent } from "./signup_inputform"
import { LoginComponent } from "./login_inpurform"

export const AuthComponent = () => {
  const [mode, setMode] = useState<string | null>(null)
  const [index, setIndex] = useState<number>(0);
  const maxIndex: { [key: string]: number } = {
    "signup": 3,
    "login": 2
  }

  return(
    <div className="mt-12 w-full max-w-md">
      <div className="w-full h-40 mt-5 flex flex-col justify-center items-center">
      {mode == null && (
        <div className="flex justify-center gap-32">
          <p className="text-2xl" onClick={() => setMode("signup")}>新規登録</p>
          <p className="text-2xl" onClick={() => setMode("login")}>ログイン</p>
        </div>
      )}
      {mode == "signup" && ( <SignupComponent index={index} setIndex={setIndex}/> )}
      {mode == "login" && ( <LoginComponent index={index} setIndex={setIndex} /> )}
      </div>
      {(mode == null || (mode !== null && maxIndex[mode] > index)) && (
        <div className="flex flex-col gap-5 mt-5 items-center">
          <button className="w-3/4 h-12 border-2 border-white hover:bg-gray-800 transition-colors">
            Google
          </button>
          <button className="w-3/4 h-12 border-2 border-white hover:bg-gray-800 transition-colors">
            GitHub
          </button>
        </div>
      )}
    </div>
  )
}