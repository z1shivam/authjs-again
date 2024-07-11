"use client";

import { UsernameLoginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthCardWrapper } from "./AuthCardWrapper";
import { Form } from "../ui/form";
import { ErrorToast } from "../global/ErrorToast";
import { SuccessToast } from "../global/SuccessToast";
import CustomFormField from "./FormField";
import SubmitButton from "../global/SubmitButton";
import { loginByUsername } from "@/server/loginAction";

export default function UsernameLogin() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoggingIn, startLogin] = useTransition();

  const form = useForm<z.infer<typeof UsernameLoginSchema>>({
    resolver: zodResolver(UsernameLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const usernameLoginHandler = (data: z.infer<typeof UsernameLoginSchema>) => {
    console.log(data);
    startLogin(async () => {
      setError("");
      setSuccess("");
      const loginResponse = await loginByUsername(data);
      if (loginResponse.success) {
        setSuccess(loginResponse.message);
      } else {
        setError(loginResponse.error);
      }
    });
  };

  return (
    <AuthCardWrapper
      backButtonHref="/register"
      backButtonLabel="Do not have account? Register"
      headerLabel="Login to your account"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(usernameLoginHandler)}
          className="space-y-4"
        >
          <ErrorToast message={error} />
          <SuccessToast message={success} />
          <CustomFormField
            control={form.control}
            isPending={isLoggingIn}
            formLabel="Enter your username"
            name="username"
            type="text"
            placeholder="yourname"
          />
          <CustomFormField
            control={form.control}
            isPending={isLoggingIn}
            formLabel="Enter your password"
            name="password"
            type="password"
            placeholder="********"
          />
          <SubmitButton isPending={isLoggingIn} className="w-full">Login</SubmitButton>
        </form>
      </Form>
    </AuthCardWrapper>
  );
}
