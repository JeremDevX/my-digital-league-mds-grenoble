"use client";

import * as z from "zod";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { login } from "@/actions/login";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import styles from "./Auth.module.scss";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          if (isRedirectError(error)) throw error;
            setError("Something went wrong");
          });
        });
      };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              {...form.register("email")}
              id="email"
              disabled={isPending}
              placeholder="john.doe@example.com"
              type="email"
            />
            {form.formState.errors.email && (
                <span className={styles.error}>{form.formState.errors.email.message}</span>
            )}
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              {...form.register("password")}
              id="password"
              disabled={isPending}
              placeholder="******"
              type="password"
            />
             {form.formState.errors.password && (
                <span className={styles.error}>{form.formState.errors.password.message}</span>
            )}
        </div>
        
        <Link href="/auth/reset" className={styles.forgotPassword}>
            Forgot password?
        </Link>
        
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </CardWrapper>
  );
};
