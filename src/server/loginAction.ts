"use server";

import { signIn } from "@/auth";
import { EmailLoginSchema, UsernameLoginSchema } from "@/schemas/authSchema";
import { z } from "zod";

export const loginByEmail = async (
  values: z.infer<typeof EmailLoginSchema>,
) => {
  console.log(values);
  try {
    await signIn("credentials", {
      iemail: values.email,
      ipassword: values.password,
      redirect: false,
    });
    return {
      success: true,
      message: "Login by email successful",
      error: "",
    };
  } catch (error) {
    return error
  }
};

export const loginByUsername = async (
  values: z.infer<typeof UsernameLoginSchema>,
) => {
  console.log(values);
  try {
    await signIn("credentials", {
      iusername: values.username,
      ipassword: values.password,
      redirect: false,
    });
  } catch (error) {
    return {error}
  }
  return {
    success: true,
    message: "Login by username successful",
    error: "",
  };
};
