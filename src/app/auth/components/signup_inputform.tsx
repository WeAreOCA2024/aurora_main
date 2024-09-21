import { useState } from "react";
import { SignupSubmitComponent } from "./signup_submit";
import { AuthFormComponent } from "./authform";
import { AuthFormButtonsComponent } from "./formbuttons";

export const SignupComponent = ({index,setIndex}:{index:number, setIndex: (i:number) => void}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [systemMessage, setSystemMessage] = useState<string>("");
  const inputListName = ["Username", "Email", "Password"];
  const inputList = [username, email, password];
  const inputSetList = [setUsername, setEmail, setPassword];
  const minLength = [1, 3, 8];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSetList[index](e.target.value);
  };
  const handlePrev = () => {
    setSystemMessage("");
    setIndex(index !== 0 ? index - 1 : 0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(index === 3){
      return
    }
    if (inputList[index].length < minLength[index]) {
      setSystemMessage(`${inputListName[index]}は${minLength[index]}文字以上で入力してください`);
      return;
    }
    setSystemMessage("");
    setIndex(index + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-2">
    {index < 3 ? (
      <>
        <AuthFormComponent index={index} systemMessage={systemMessage} inputListName={inputListName} inputList={inputList} handleInputChange={handleInputChange} />
        <AuthFormButtonsComponent handlePrev={handlePrev} />
      </>
    ):(
      <SignupSubmitComponent username={username} email={email} password={password} handlePrev={handlePrev} />
    )}
  </form>
  );
};