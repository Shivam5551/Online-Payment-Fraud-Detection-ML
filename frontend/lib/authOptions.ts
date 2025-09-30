/* eslint-disable @typescript-eslint/no-explicit-any */
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { createUser, userExists } from './validateUser';

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ account, token }: any) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token) {
                session.accessToken = token.accessToken;
                session.user.id = token.sub;
            }
            const isExists = await userExists(session.user);
            if (!isExists) {
                session.user = null;
            }
            return session;
        },
        async signIn({ user, account }: any) {
            const isExists = await userExists(user);

            if (isExists) return true;
            const newUser = await createUser(user, account);
            return !!newUser;
        },
    },
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
};
