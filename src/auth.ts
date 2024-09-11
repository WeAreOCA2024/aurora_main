import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Cognito],
})