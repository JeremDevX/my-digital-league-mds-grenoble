"use client";

import { Controller } from "react-hook-form";
import Link from "next/link";

import { CardWrapper } from "@/app/components/auth/CardWrapper";
import { FormError } from "@/app/components/auth/FormError";
import { FormSuccess } from "@/app/components/auth/FormSuccess";
import styles from "./Auth.module.scss";

import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button/Button";
import { useLogin } from "@/hooks/auth/useLogin";
export const LoginForm = () => {
  const { form, error, success, isPending, onSubmit } = useLogin();

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                value={field.value}
                onChange={field.onChange}
                disabled={isPending}
                error={!!form.formState.errors.email}
                errorMessage={form.formState.errors.email?.message}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                placeholder="******"
                value={field.value}
                onChange={field.onChange}
                disabled={isPending}
                error={!!form.formState.errors.password}
                errorMessage={form.formState.errors.password?.message}
              />
            )}
          />
        </div>

        <Link href="/auth/reset" className={styles.forgotPassword}>
          Forgot password?
        </Link>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          label={isPending ? "Logging in..." : "Login"}
          type="primary"
          fullWidth
          disabled={isPending}
        />
      </form>
    </CardWrapper>
  );
};
