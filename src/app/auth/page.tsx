import Link from 'next/link';
import { AuthComponent } from './components/auth';

export default function Page() {
  const headerOptions = (name:string,link:string) => {
    return (
      <Link href={link}>
        <li className="relative text-base cursor-pointer group px-2 text-center">
          {name}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-300 transition-all duration-700 group-hover:w-full mt-3"></span>
        </li>
      </Link>
    )
  }

  return (
    <>
      <header className="flex justify-around w-1/2 mx-[calc(100%/4)] py-4 items-end">
        <h1 className="text-5xl">Aurora</h1>
        <ul className="flex gap-3">
          {headerOptions("プロダクト","/product")}
          {headerOptions("料金","/price")}
          {headerOptions("問い合わせ","/contact")}
        </ul>
      </header>
      <main className="">
        <AuthComponent />
      </main>
    </>
  );
}