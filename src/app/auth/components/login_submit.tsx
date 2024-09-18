import { handleLogin } from "../hooks/hooks";

interface SignupSubmitComponentProps {
  email: string;
  password: string;
  handlePrev: () => void;
}

export const LoginSubmitComponent = ({ email, password, handlePrev }: SignupSubmitComponentProps) => {
  const maskedPassword = "*".repeat(password.length);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto mt-24">
      <p className="border-b-2 border-blue-600 pb-3 text-xl pr-4">
        <span className="block w-40 font-semibold text-gray-700">Email:</span><span className="ml-5">{email}</span>
      </p>
      <p className="border-b-2 border-blue-600 pb-3 text-xl pr-4">
        <span className="block w-40 font-semibold text-gray-700">Password:</span><span className="ml-5">{maskedPassword}</span>
      </p>
      <div className="flex justify-center gap-8">
        <button className="mt-6 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg" onClick={handlePrev}>
          戻る
        </button>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg" onClick={() => handleLogin(email,password)}>
          ログイン
        </button>
      </div>
    </div>
  );
};