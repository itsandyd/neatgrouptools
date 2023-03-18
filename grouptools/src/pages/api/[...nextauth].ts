import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { supabase } from "../../../lib/initSupabase";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { user, error } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        });
        if (error) throw new Error(error.message);
        return user;
      },
    }),
    Providers.Supabase({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account?.type === "supabase") {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
