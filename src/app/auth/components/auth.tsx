"use client"

import { useState } from "react"
import { SignupComponent } from "./signup_inputform"
import { LoginComponent } from "./login_inpurform"

export const AuthComponent = () => {
  const [mode, setMode] = useState<string | null>(null)

  return(
    <>
      {mode == null && (
        <div className="flex justify-center gap-32 mt-60">
          <p className="text-2xl" onClick={() => setMode("signup")}>新規登録</p>
          <p className="text-2xl" onClick={() => setMode("login")}>ログイン</p>
        </div>
      )}
      {mode == "signup" && ( <SignupComponent /> )}
      {mode == "login" && ( <LoginComponent /> )}
    </>
  )
}