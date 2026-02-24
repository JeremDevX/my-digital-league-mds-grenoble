import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isOrga: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isOrga?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isOrga?: boolean;
  }
}
