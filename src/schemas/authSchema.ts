import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    rePassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    username: z
      .string()
      .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, {
        message: "This username is not allowed.",
      })
      .min(3, { message: "Username must be at least 3 characters long" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const UsernameLoginSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, {
      message: "This username is not allowed.",
    })
    .min(3, { message: "Username must be at least 3 characters long" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});

export const EmailLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});