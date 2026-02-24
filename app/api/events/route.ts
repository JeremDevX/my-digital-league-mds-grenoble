import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.event.findMany({
    include: {
      game: { select: { id: true, title: true } },
      _count: { select: { participants: true } },
    },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(events);
}

export const POST = auth(async (req) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const body = await req.json();
  const { name, date, inscriptionDeadline, rules, gameId } = body;

  if (!name || !date || !inscriptionDeadline || !rules || !gameId) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      name,
      date: new Date(date),
      inscriptionDeadline: new Date(inscriptionDeadline),
      rules,
      gameId,
    },
    include: {
      game: { select: { id: true, title: true } },
      _count: { select: { participants: true } },
    },
  });

  return NextResponse.json(event, { status: 201 });
});
