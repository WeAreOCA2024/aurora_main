import { handleLogin } from "../hooks/hooks";

interface SignupSubmitComponentProps {
  username: string;
  password: string;
  handlePrev: () => void;
}

export const LoginSubmitComponent = ({ username, password, handlePrev }: SignupSubmitComponentProps) => {
  const maskedPassword = "*".repeat(password.length);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-lg mx-auto mt-24">
      <p className="border-b-2 border-blue-600 pb-3 text-xl pr-4">
        <span className="inline-block w-40 font-semibold text-gray-700">Username:</span>{username}
      </p>
      <p className="border-b-2 border-blue-600 pb-3 text-xl pr-4">
        <span className="inline-block w-40 font-semibold text-gray-700">Password:</span>{maskedPassword}
      </p>
      <div className="flex justify-center gap-8">
        <button className="mt-6 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg" onClick={handlePrev}>
          戻る
        </button>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg" onClick={() => handleLogin({username,password})}>
          ログイン
        </button>
      </div>
    </div>
  );
};