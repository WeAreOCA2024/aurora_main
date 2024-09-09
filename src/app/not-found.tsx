import Link from "next/link";
import { Header } from "./components/header";

const AuroraUnderline = () => (
  <div className="h-1 w-8/12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse" />
);

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold text-center mt-48 mb-3">
          404
          <span className="pl-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
          Not-Found
          </span>
        </h1>
        <AuroraUnderline />
        <Link href={"/auth"}>
          <button className="mt-32 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200 text-lg">
            ログイン
          </button>
        </Link>
      </main>
    </div>
  );
}