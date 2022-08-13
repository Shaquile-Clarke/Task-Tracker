import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../lib/db";
import { Users } from "../../../models/user.model";

export default NextAuth({
  session: { stratergy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      pages: {
        signIn: "/login",
      },

      async authorize(credentials, req) {
        db();

        const user = await Users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Incorrect email or password");
        }

        return { email: user.email, name: user.firstName };
      },
    }),
  ],
});
