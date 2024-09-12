import { auth } from "@/auth"
 
export default async function UserInfo() {
  const session = await auth()
  
  if (!session?.user) return null
 
  return (
    <div>
      <p>{session?.user.email}</p>
      <p>{session?.user.id}</p>
      <p>{session?.user.name}</p>
    </div>
  )
}