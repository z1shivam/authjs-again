"use server";

import dbConnect from "@/lib/dbConnect";
import  User from "@/models/userModel";
import { RegisterSchema } from "@/schemas/authSchema";
import bcrypt from 'bcryptjs';
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    throw new Error("Invalid data");
  }
  console.log(values);
  await dbConnect();

const existingUser = await User.findOne({ username: values.username });
  if (existingUser) {
    return {
      success: false,
      message: "",
      error: "username already exists",
      data: values,
    };
  }
  if(values.password !== values.rePassword){
    return {
      success: false,
      message: "",
      error: "Passwords do not match",
      data: values,
    };
  }
  const hashedPassword = await bcrypt.hash(values.password, 10);
  // Ensure the database is connected before proceeding

  // Create a new user
  await User.create({
    name: values.name,
    email: values.email,
    username: values.username,
    passwordHash: hashedPassword,
    githubId: "",
    googleId: "",
  });

  return {
    success: true,
    message: "Registration successful!",
    error: "",
    data: values,
  };
};
