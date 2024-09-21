import { useState } from "react";
import { useRouter } from "next/navigation";
import { Confirm } from "../usecase/Confirm";
import { Login } from "../usecase/Login";
import { Signup } from "../usecase/Signup";

export const useAuth = () => {
  const router = useRouter();

  const [serverMode, setServerMode] = useState<"login" | "signup" | "confirm" | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [preferred_username, setPreferred_username] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const maxIndex: { [key: string]: number } = {
    "signup": 5,
    "login": 2
  }

  const handleSignup = async () => {
    const attributes = {nickname,birthday,preferred_username};
    Signup({
      email,
      password,
      attributes,
      setServerMode
    });
  }

  const handleLogin = async () => {
    Login({
      email,
      password,
      router
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(index === maxIndex[serverMode!]){
      return
    }
    setIndex(index + 1);
  };

  const handleConfirm = () => {
    Confirm({
      email,
      confirmCode,
      setServerMode,
      router
    });
  }

  return {
    serverMode,
    setServerMode,
    index,
    setIndex,
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
    handleSignup,
    handleLogin,
    handleSubmit,
    handleConfirm,
    maxIndex: maxIndex[serverMode!],
  }
}