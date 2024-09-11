import NextAuth from "next-auth"
import Cognito from "next-auth/providers/cognito"
 
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [Cognito],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      return session
    }
  },
})