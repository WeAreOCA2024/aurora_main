import { SignupSubmitComponent } from "./SignupSubmit";
import { AuthFormComponent } from "./AuthForm";

interface SignupComponentProps {
  index: number;
  email: string;
  preferred_username: string;
  nickname: string;
  birthday: string;
  password: string;
  maxIndex: number;
  setEmail: (s: string) => void;
  setPreferred_username: (s: string) => void;
  setNickname: (s: string) => void;
  setBirthday: (s: string) => void;
  setPassword: (s: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSignup: () => void;
}

export const SignupComponent = ({
  index,
  email,
  preferred_username,
  nickname,birthday,
  password,
  maxIndex,
  setEmail,
  setPreferred_username,
  setNickname,
  setBirthday,
  setPassword,
  handleSubmit,
  handleSignup,
} : SignupComponentProps) => {
  const inputListType = ["email","text", "text","date","Password"];
  const inputListName = ["email","Preferred_username", "nickname","birthday","Password"];
  const inputList = [email, preferred_username, nickname, birthday, password];
  const inputSetList = [setEmail, setPreferred_username, setNickname, setBirthday, setPassword];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputSetList[index](e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-2"
    >
      {index < maxIndex ? (
        <div className="flex justify-center gap-4">
          <AuthFormComponent
            inputListName={inputListName[index]}
            inputList={inputList[index]}
            inputListType={inputListType[index]}
            handleInputChange={handleInputChange}
          />
        </div>
      ) : (
        <SignupSubmitComponent
          email={email}
          preferred_username={preferred_username}
          nickname={nickname}
          birthday={birthday}
          password={password}
          handleSignup={handleSignup}
        />
      )}
    </form>
  );
};