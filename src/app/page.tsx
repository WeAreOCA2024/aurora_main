import Link from "next/link"

export default function Page(){
  return (
    <main className="w-screen h-screen bg-neutral-800 flex items-center justify-center">
      <div className="bg-blue-200 w-1/2 h-3/4 rounded-md py-4 flex flex-col gap-4">
        <PageLink name="authentication"/>
        <PageLink name="main"/>
      </div>
    </main>
  )
}
const PageLink = ({name} : {name: string}) => {
  return (
    <Link href={`/${name}`} className="text-blue-500 hover:text-white text-center">
      <p>{name}</p>
    </Link>
  )
}