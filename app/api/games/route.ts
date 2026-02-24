import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const games = await prisma.game.findMany({
    include: { _count: { select: { events: true } } },
    orderBy: { title: "asc" },
  });
  return NextResponse.json(games);
}

export const POST = auth(async (req) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { title, description } = await req.json();

  if (!title) {
    return NextResponse.json({ error: "Le titre est requis" }, { status: 400 });
  }

  const game = await prisma.game.create({
    data: { title, description: description || null },
    include: { _count: { select: { events: true } } },
  });

  return NextResponse.json(game, { status: 201 });
});
