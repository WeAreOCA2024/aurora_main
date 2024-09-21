"use client"

import { SignupComponent } from "./SignupInputForm"
import { LoginComponent } from "./LoginInpurForm"
import { useAuth } from "../hooks/useAuth"
import { ConfirmFormComponent } from "./ConfirmForm"

export const AuthComponent = () => {
  const {
    serverMode,
    setServerMode,
    index,
    maxIndex,
    email,
    setEmail,
    preferred_username,
    setPreferred_username,
    nickname,
    setNickname,
    birthday,
    setBirthday,
    password,
    setPassword,
    confirmCode,
    setConfirmCode,
    handleSubmit,
    handleLogin,
    handleSignup,
    handleConfirm,
  } = useAuth()
  return(
    <div className="mt-8 w-full max-w-md">
      <div className="w-full h-40 mt-5 flex flex-col justify-center items-center">
      {serverMode == null && (
        <div className="flex justify-center gap-24">
          <p
            className="text-xl px-10 py-4 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setServerMode("signup")}
          >
            新規登録
          </p>
          <p
            className="text-xl px-10 py-4 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setServerMode("login")}
          >
            ログイン
          </p>
        </div>
      )}
      {serverMode == "signup" && (
        <SignupComponent
          email={email}
          preferred_username={preferred_username}
          nickname={nickname}
          birthday={birthday}
          password={password}
          setEmail={setEmail}
          setPreferred_username={setPreferred_username}
          setNickname={setNickname}
          setBirthday={setBirthday}
          setPassword={setPassword}
          index={index}
          handleSubmit={handleSubmit}
          maxIndex={maxIndex}
          handleSignup={handleSignup}
        />
      )}
      {serverMode == "login" && (
        <LoginComponent
          index={index}
          email={email}
          password={password}
          maxIndex={maxIndex}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          handleLogin={handleLogin}
        />
      )}
      {serverMode == "confirm" && (
        <ConfirmFormComponent
          confirmCode={confirmCode}
          setConfirmCode={setConfirmCode}
          handleConfirm={handleConfirm}
        />
      )}
      </div>
    </div>
  )
}