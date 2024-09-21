interface LoginSubmitComponentProps {
  email: string;
  password: string;
  handleLogin: () => void;
}

export const LoginSubmitComponent = ({
  email,
  password,
  handleLogin,
}: LoginSubmitComponentProps ) => {
  const maskedPassword = "*".repeat(password.length);
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-gray-900 flex items-center justify-center flex-col">
      <div className="w-1/2 h-1/2 border-2 border-white rounded-lg">
        <h1 className="text-3xl text-center mt-12">ログイン情報</h1>
        <div className="flex flex-col gap-4 px-10 py-5">
          <div className="text-left">
            <p className="text-2xl">Email</p>
            <p className="text-xl text-gray-500">{email}</p>
          </div>
          <div className="text-left gap-4">
            <p className="text-2xl">Password</p>
            <p className="text-xl text-gray-500">{maskedPassword}</p>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-6">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg"
          >
            戻る
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg"
            onClick={handleLogin}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};