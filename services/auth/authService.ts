import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";

export const authService = {
  login: async (values: z.infer<typeof LoginSchema>) => {
    return await login(values);
  },
};
