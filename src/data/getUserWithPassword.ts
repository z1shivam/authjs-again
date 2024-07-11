// this function returns user with password.

import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";
import { z } from "zod";

const isEmail = z.string().email();

export const getUserWithPassword = async (id: string) => {
  let user;
  await dbConnect();
  if (isEmail.safeParse(id).success) {
    user = await User.findOne({ email: id }).select("+password");
    return user;
  } else {
    user = await User.findOne({ username: id }).select("+password");
    return user;
  }
};
