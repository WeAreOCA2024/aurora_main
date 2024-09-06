import { useState } from "react";
import { SignupSubmitComponent } from "./signup_submit";

export const SignupComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const inputSetList = [setUsername, setEmail, setPassword];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSetList[index](e.target.value);
  };
  const handlePrev = () => {
    setIndex(index !== 0 ? index - 1 : 0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIndex(index + 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
        {index < 3 && (
          <div className="flex justify-center mt-80">
            <input
              type={index === 0 ? "text" : index === 1 ? "email" : "password"}
              value={index === 0 ? username : index === 1 ? email : password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-1/4"
              maxLength={index === 0 ? 20 : index === 1 ? 30 : 20}
              placeholder={index === 0 ? "Username" : index === 1 ? "Email" : "Password"}
            />
          </div>
        )}
        <div className="flex justify-center gap-20 mt-5">
          {index < 3 ? (
            <>
              <button type="button" onClick={handlePrev} className="text-xl px-3 py-2 bg-neutral-300 rounded-md hover:bg-neutral-400 transition-colors">戻る</button>
              <button type="submit" className="text-xl px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-colors">次へ</button>
            </>
          ):(
            <SignupSubmitComponent username={username} email={email} password={password} handlePrev={handlePrev} />
          )}
        </div>
      </form>
    </>
  );
};