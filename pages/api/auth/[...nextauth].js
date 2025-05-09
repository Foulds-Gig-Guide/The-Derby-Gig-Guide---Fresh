import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';

export default NextAuth({
  providers: [
    Providers.Email({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM }),
  ],
  adapter: SupabaseAdapter({ url: process.env.SUPABASE_URL, secret: process.env.SUPABASE_KEY }),
  secret: process.env.NEXTAUTH_SECRET,
  session: { jwt: true },
  callbacks: {
    async session(session, user) {
      session.user.id = user.sub;
      session.user.isAdmin = user.user_metadata?.isAdmin || false;
      return session;
    },
  },
});