import * as z from "zod";
import { login } from "@/actions/login";
import { register } from "@/actions/register";
import { LoginSchema, RegisterSchema } from "@/schemas";

export const authService = {
  login: async (values: z.infer<typeof LoginSchema>) => {
    return await login(values);
  },

  /**
   * Service de création de compte
   */
  register: async (values: z.infer<typeof RegisterSchema>) => {
    return await register(values);
  },
};