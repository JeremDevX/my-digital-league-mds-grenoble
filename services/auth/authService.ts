import { register } from "@/actions/register";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const authService = {
  /**
   * Service de création de compte
   */
  register: async (values: z.infer<typeof RegisterSchema>) => {
    return await register(values);
  },
};
