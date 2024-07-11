import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserWithPassword } from "./data/getUserWithPassword";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import User from "./models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const { email, password } = credentials;
        await dbConnect();
        const userWithPassword = await User.findOne({ email })
        console.log(userWithPassword);
        const isPasswordMatch = await bcrypt.compare(
          password as string,
          userWithPassword?.password!,
        );
        return {
          name: "shivam",
          email: "shivam",
        };
      },
    }),
  ],
});
