import { SignIn } from "./compornents/signin";
import { SignOut } from "./compornents/signout";
import UserInfo from "./compornents/UserInfo";


export default function Page() {
  
  return (
    <main className="flex">
      <SignIn />
      <SignOut />
      <UserInfo />
    </main>
  );
}