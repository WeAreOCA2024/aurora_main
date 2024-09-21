import { LoginSubmitComponent } from "./LoginSubmit";
import { AuthFormComponent } from "./AuthForm";

interface LoginComponentProps {
  index: number;
  email: string;
  password: string;
  maxIndex: number;
  setEmail: (s: string) => void;
  setPassword: (s: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: () => void;
}

export const LoginComponent = ({
  index,
  email,
  password,
  maxIndex,
  setEmail,
  setPassword,
  handleSubmit,
  handleLogin
} : LoginComponentProps ) =>{
  const inputListName = ["Email", "Password"];
  const inputList = [email, password];
  const inputListType = ["email", "password"];
  const inputSetList = [setEmail, setPassword];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSetList[index](e.target.value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-2"
      >
        {index < maxIndex ? (
          <>
            <AuthFormComponent
              inputListName={inputListName[index]}
              inputList={inputList[index]}
              inputListType={inputListType[index]}
              handleInputChange={handleInputChange}
            />
          </>
        ):(
          <LoginSubmitComponent
            email={email}
            password={password}
            handleLogin={handleLogin}
          />
        )}
      </form>
    </>
  );
};