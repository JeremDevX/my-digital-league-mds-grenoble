"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { reset } from "@/actions/reset";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import styles from "./Auth.module.scss";


export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
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
        
        <FormError message={error} />
        <FormSuccess message={success} />
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Sending email..." : "Send reset email"}
        </button>
      </form>
    </CardWrapper>
  );
};
