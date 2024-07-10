"use server";

import dbConnect from "@/lib/dbConnect";
import {User} from "@/models/userModel";
import { RegisterSchema } from "@/schemas/authSchema";
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    throw new Error("Invalid data");
  }
  console.log(values);
  dbConnect().then(()=>{
    User.create({

    })
  })
  return {
    success: true,
    message: "Registration successful!",
    error: "",
    data: values,
  };
};
