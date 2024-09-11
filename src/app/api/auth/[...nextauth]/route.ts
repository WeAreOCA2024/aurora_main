import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      issuer: process.env.AUTH_COGNITO_ISSUER,
    }),
  ],
})

export { GET, POST } from "@/auth";