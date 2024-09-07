import { useState } from "react";
import { LoginSubmitComponent } from "./login_submit";
import { AuthFormComponent } from "./authform";
import { AuthFormButtonsComponent } from "./formbuttons";

export const LoginComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [systemMessage, setSystemMessage] = useState<string>("");
  const inputListName = ["Username", "Password"];
  const inputList = [username, password];
  const inputSetList = [setUsername, setPassword];
  const minLength = [1, 8];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSetList[index](e.target.value);
  };
  const handlePrev = () => {
    setSystemMessage("");
    setIndex(index !== 0 ? index - 1 : 0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(index === 2){
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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
        {index < 2 ? (
          <>
            <AuthFormComponent index={index} username={username} systemMessage={systemMessage} inputListName={inputListName} inputList={inputList} handleInputChange={handleInputChange} />
            <AuthFormButtonsComponent handlePrev={handlePrev} />
          </>
        ):(
          <LoginSubmitComponent username={username} password={password} handlePrev={handlePrev} />
        )}
      </form>
    </>
  );
};