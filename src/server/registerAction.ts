"use server"

import { RegisterSchema } from "@/schemas/authSchema"
import { z } from "zod"

export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values)
  if (!validatedValues.success) {
    throw new Error("Invalid data")
  }
  console.log(values)
  return {success: true, message: "Registration successful!", error: "", data: values}
}