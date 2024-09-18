import { CognitoLogin } from "../services/cognito/Login";
import { signUp } from "../services/cognito/test";

export const handleSignup = async (username:string,email:string,password:string,birthdate:string,nickname:string,preferred_username:string) => {
  const rest = await signUp(username,password,{email,birthdate,nickname,preferred_username});
}

export const handleLogin = async (email:string,password:string) => {
  const res = await CognitoLogin(email,password);
}