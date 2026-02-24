"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { register } from "@/actions/register";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import styles from "./Auth.module.scss";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
       <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              {...form.register("name")}
              id="name"
              disabled={isPending}
              placeholder="John Doe"
            />
            {form.formState.errors.name && (
                <span className={styles.error}>{form.formState.errors.name.message}</span>
            )}
        </div>
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
        
        <FormError message={error} />
        <FormSuccess message={success} />
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating account..." : "Create an account"}
        </button>
      </form>
    </CardWrapper>
  );
};
