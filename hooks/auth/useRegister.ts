import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { authService } from "@/services/auth/authService";

export const useRegister = () => {
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
      authService
        .register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() =>
          setError("Une erreur est survenue lors de l'inscription.")
        );
    });
  };

  return {
    form,
    onSubmit,
    error,
    success,
    isPending,
  };
};
