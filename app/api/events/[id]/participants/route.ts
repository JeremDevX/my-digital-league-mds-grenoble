import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id: eventId } = await params;

  const participants = await prisma.participant.findMany({
    where: { eventId },
    include: { user: { select: { id: true, name: true, image: true } } },
    orderBy: { registeredAt: "asc" },
  });

  return NextResponse.json(participants);
}

export const POST = auth(async (req, context) => {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  const { id: eventId } = await (context as Context).params;
  const userId = req.auth.user.id;

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json(
      { error: "Événement introuvable" },
      { status: 404 }
    );
  }

  if (new Date() > event.inscriptionDeadline) {
    return NextResponse.json(
      { error: "Les inscriptions sont fermées" },
      { status: 403 }
    );
  }

  const alreadyRegistered = await prisma.participant.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (alreadyRegistered) {
    return NextResponse.json(
      { error: "Vous êtes déjà inscrit à cet événement" },
      { status: 409 }
    );
  }

  const { pseudo, avatarUrl, killingSentence, level } = await req.json();

  if (!pseudo) {
    return NextResponse.json(
      { error: "Le pseudo est requis" },
      { status: 400 }
    );
  }

  const pseudoTaken = await prisma.participant.findUnique({
    where: { pseudo_eventId: { pseudo, eventId } },
  });
  if (pseudoTaken) {
    return NextResponse.json(
      { error: "Ce pseudo est déjà pris pour cet événement" },
      { status: 409 }
    );
  }

  const participant = await prisma.participant.create({
    data: {
      pseudo,
      avatarUrl: avatarUrl || null,
      killingSentence: killingSentence || null,
      level: level || null,
      userId,
      eventId,
    },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(participant, { status: 201 });
});
