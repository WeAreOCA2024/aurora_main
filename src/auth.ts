import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
 
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [Cognito],
})