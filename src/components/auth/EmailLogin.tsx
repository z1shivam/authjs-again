"use client";

import { EmailLoginSchema } from "@/schemas/authSchema";
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
import { loginByEmail } from "@/server/loginAction";

export default function EmailLogin() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoggingIn, startLogin] = useTransition();

  const form = useForm<z.infer<typeof EmailLoginSchema>>({
    resolver: zodResolver(EmailLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailLoginHandler = (data: z.infer<typeof EmailLoginSchema>) => {
    console.log(data);
    startLogin(async () => {
      setError("");
      setSuccess("");
      const loginResponse = await loginByEmail(data);
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
          onSubmit={form.handleSubmit(emailLoginHandler)}
          className="space-y-4"
        >
          <ErrorToast message={error} />
          <SuccessToast message={success} />
          <CustomFormField
            control={form.control}
            isPending={isLoggingIn}
            formLabel="Enter your email"
            name="email"
            type="email"
            placeholder="yourname@mail.com"
          />
          <CustomFormField
            control={form.control}
            isPending={isLoggingIn}
            formLabel="Enter your password"
            name="password"
            type="password"
            placeholder="********"
          />
          <SubmitButton isPending={isLoggingIn} className="w-full">
            Login
          </SubmitButton>
        </form>
      </Form>
    </AuthCardWrapper>
  );
}
