import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth((req) => {
  const session = req.auth;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    isOrga: session.user.isOrga,
  });
});
