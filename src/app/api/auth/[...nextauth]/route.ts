import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import type { NextAuthOptions, Account, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        accessToken?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account }: { token: JWT; account: Account | null }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = token.accessToken
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
