import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;

  const participant = await prisma.participant.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      event: { select: { id: true, name: true } },
    },
  });

  if (!participant) {
    return NextResponse.json(
      { error: "Participant introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(participant);
}

export const PUT = auth(async (req, context) => {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  const { id } = await (context as Context).params;

  const participant = await prisma.participant.findUnique({ where: { id } });
  if (!participant) {
    return NextResponse.json(
      { error: "Participant introuvable" },
      { status: 404 }
    );
  }

  const isSelf = participant.userId === req.auth.user.id;
  const isOrga = req.auth.user.isOrga;

  if (!isSelf && !isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const { pseudo, avatarUrl, killingSentence, level } = await req.json();

  if (pseudo && pseudo !== participant.pseudo) {
    const pseudoTaken = await prisma.participant.findUnique({
      where: { pseudo_eventId: { pseudo, eventId: participant.eventId } },
    });
    if (pseudoTaken) {
      return NextResponse.json(
        { error: "Ce pseudo est déjà pris pour cet événement" },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.participant.update({
    where: { id },
    data: {
      ...(pseudo && { pseudo }),
      ...(avatarUrl !== undefined && { avatarUrl: avatarUrl || null }),
      ...(killingSentence !== undefined && {
        killingSentence: killingSentence || null,
      }),
      ...(level !== undefined && { level: level || null }),
    },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(updated);
});

export const DELETE = auth(async (req, context) => {
  if (!req.auth?.user) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  const { id } = await (context as Context).params;

  const participant = await prisma.participant.findUnique({ where: { id } });
  if (!participant) {
    return NextResponse.json(
      { error: "Participant introuvable" },
      { status: 404 }
    );
  }

  const isSelf = participant.userId === req.auth.user.id;
  const isOrga = req.auth.user.isOrga;

  if (!isSelf && !isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  await prisma.participant.delete({ where: { id } });

  return NextResponse.json({ success: true });
});
