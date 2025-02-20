import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from "next-auth/providers/google";
import { createUser, getUserById, sendVerificationRequest } from '@/actions/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub, 
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      const user = await getUserById(token.sub)

      if (user) {
        session.user.verified = user.verified;
        session.user.subscriptionActive = user.subscriptionActive;
      }

      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (profile && account) {
        token.sub =  profile?.sub || account.providerAccountId;
      }
      return token;
    },
    async signIn({ profile }) {
      if (!profile) return false

      const user = await getUserById(profile.sub!);

      if (!user) {
        await createUser({
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        });

        await sendVerificationRequest(profile.email!)
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
