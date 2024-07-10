"use client";

import { RegisterSchema } from "@/schemas/authSchema";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorToast } from "../global/ErrorToast";
import SubmitButton from "../global/SubmitButton";
import { SuccessToast } from "../global/SuccessToast";
import { Form } from "../ui/form";
import { AuthCardWrapper } from "./AuthCardWrapper";
import CustomFormField from "./FormField";
import { registerAction } from "@/server/registerAction";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isRegistering, startRegister] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      username: "",
    },
  });

  const registerSubmitHandler = (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startRegister(async () => {
      try {
        const registerReturn = await registerAction(data);
        setSuccess(registerReturn.message);
        setError(registerReturn.error);
        if (registerReturn.success) form.reset();
      } catch (err) {
        setError(`An error occurred. - ${err}`);
      }
    });
  }; 

  return (
    <AuthCardWrapper
      backButtonHref="/login"
      backButtonLabel="Already have an account? Login"
      headerLabel="Create a new Account. We do not recommend Email-Password method as it is less secure."
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(registerSubmitHandler)}
          className="space-y-4"
        >
          <ErrorToast message={error} />
          <SuccessToast message={success} />

          <CustomFormField
            control={form.control}
            isPending={isRegistering}
            formLabel="Enter your name"
            name="name"
            type="text"
            placeholder="Your Name"
          />
          <CustomFormField
            control={form.control}
            isPending={isRegistering}
            formLabel="Enter your username"
            name="username"
            type="text"
            placeholder="yourname"
          />
          <CustomFormField
            control={form.control}
            isPending={isRegistering}
            formLabel="Enter your email"
            name="email"
            type="email"
            placeholder="yourname@mail.com"
          />
          <CustomFormField
            control={form.control}
            isPending={isRegistering}
            formLabel="Enter a strong password"
            name="password"
            type="password"
            placeholder="********"
          />
          <CustomFormField
            control={form.control}
            isPending={isRegistering}
            formLabel="Re-enter your password"
            name="rePassword"
            type="password"
            placeholder="********"
          />
          <SubmitButton className="w-full" isPending={isRegistering}>
            Register
          </SubmitButton>
        </form>
      </Form>
    </AuthCardWrapper>
  );
}
