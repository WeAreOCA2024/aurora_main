import Link from 'next/link';

export const Header = () => {
  const headerOptions = (name:string,link:string) => {
    return (
      <Link href={link}>
        <li className="relative text-base cursor-pointer group px-2 text-center text-white">
          {name}
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-200 transition-all duration-700 group-hover:w-full mt-3"></span>
        </li>
      </Link>
    )
  }
  return(
    <header className='w-screen bg-gray-900'>
      <section className="flex justify-between w-11/12 mx-auto py-4 items-end">
        <h1 className="text-5xl text-white">Aurora</h1>
        <ul className="flex gap-3">
          {headerOptions("プロダクト","/product")}
          {headerOptions("料金","/price")}
          {headerOptions("問い合わせ","/contact")}
        </ul>
      </section>
    </header>
  )
}