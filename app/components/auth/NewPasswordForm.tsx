"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { NewPasswordSchema } from "@/schemas";
import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { newPassword } from "@/actions/new-password";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import styles from "./Auth.module.scss";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
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
        
        <FormError message={error} />
        <FormSuccess message={success} />
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Resetting password..." : "Reset password"}
        </button>
      </form>
    </CardWrapper>
  );
};
