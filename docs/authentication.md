# Authentification

Ce projet utilise **Auth.js v5 (NextAuth)** avec une stratégie **JWT**, une vérification d'e-mail et une réinitialisation de mot de passe.

## Sommaire

- [Variables d'environnement](#variables-denvironnement)
- [Flux d'authentification](#flux-dauthentification)
- [Architecture JWT](#architecture-jwt)
- [Utilisation côté serveur](#utilisation-côté-serveur)
- [Utilisation côté client](#utilisation-côté-client)
- [Protéger une route API](#protéger-une-route-api)
- [Protéger une page](#protéger-une-page)
- [Protéger des routes via le middleware](#protéger-des-routes-via-le-middleware)
- [Déconnexion](#déconnexion)
- [Envoi d'e-mails](#envoi-de-mails)

---

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner :

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."              # générer avec : npx auth secret
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Email — Mailtrap sandbox (prototypage uniquement)
# Remplacer par Resend + domaine vérifié en production
MAILTRAP_TOKEN="votre_token_api"
MAILTRAP_INBOX_ID="votre_inbox_id"
```

---

## Flux d'authentification

```
Inscription
  → register action → hachage mot de passe (bcrypt) → création User en base
  → génération VerificationToken (UUID, TTL 1h) → envoi e-mail de confirmation

Vérification e-mail
  → clic sur le lien → newVerification action → emailVerified mis à jour → token supprimé

Connexion
  → login action → vérification emailVerified → signIn Credentials → émission JWT

Réinitialisation de mot de passe
  → reset action → génération PasswordResetToken (UUID, TTL 1h) → envoi e-mail
  → clic sur le lien → newPassword action → nouveau mot de passe haché → token supprimé
```

---

## Architecture JWT

Le JWT est stocké dans un **cookie HTTP-only** signé avec `AUTH_SECRET`. Il n'est jamais accessible directement depuis le navigateur.

| Champ | Description |
|---|---|
| `sub` | ID utilisateur (cuid Prisma) |
| `name` / `email` | Informations du profil |
| `isOrga` | `true` si l'utilisateur est organisateur |
| `iat` | Date d'émission du token |
| `exp` | Date d'expiration du token |

La session est lue via `auth()` côté serveur ou `useSession()` côté client (qui appelle `/api/auth/session`).

---

## Utilisation côté serveur

```ts
import { auth } from "@/auth";

const session = await auth();

if (!session) {
  // utilisateur non connecté
}

const userId  = session.user.id;
const isOrga  = session.user.isOrga;
const email   = session.user.email;
```

---

## Utilisation côté client

`useSession` nécessite le `SessionProvider` — déjà configuré dans `app/layout.tsx`.

```tsx
"use client";
import { useSession } from "next-auth/react";

export function MonComposant() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Chargement...</p>;
  if (!session)             return <a href="/auth/login">Se connecter</a>;

  return <p>Connecté en tant que {session.user.name}</p>;
}
```

---

## Protéger une route API

```ts
// app/api/exemple/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth((req) => {
  const session = req.auth;

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Accès réservé aux organisateurs
  if (!session.user.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  return NextResponse.json({ message: "Bonjour " + session.user.name });
});
```

---

## Protéger une page

```ts
// app/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/auth/login");

  return <div>Bienvenue {session.user.name}</div>;
}
```

---

## Protéger des routes via le middleware

Par défaut, le middleware redirige uniquement les utilisateurs **déjà connectés** hors des routes `/auth/*`.

Pour activer une protection globale (toutes les routes sauf `/`), décommenter dans `middleware.ts` :

```ts
if (!isLoggedIn && !isPublicRoute) {
  return Response.redirect(new URL("/auth/login", nextUrl));
}
```

---

## Déconnexion

**Depuis un Client Component :**

```tsx
"use client";
import { signOut } from "next-auth/react";

<button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
  Se déconnecter
</button>
```

**Depuis un Server Component (Server Action) :**

```tsx
import { signOut } from "@/auth";

<form action={async () => {
  "use server";
  await signOut({ redirectTo: "/auth/login" });
}}>
  <button type="submit">Se déconnecter</button>
</form>
```

---

## Envoi d'e-mails

Les e-mails sont envoyés via **Nodemailer + Mailtrap** (sandbox). En prototypage, tous les e-mails sont interceptés dans le dashboard Mailtrap — ils n'arrivent pas dans de vraies boîtes mail.

Les fonctions d'envoi sont dans `lib/mail.ts` :

| Fonction | Déclencheur | Sujet |
|---|---|---|
| `sendVerificationEmail` | Inscription / connexion non vérifiée | Confirmez votre adresse e-mail |
| `sendPasswordResetEmail` | Demande de réinitialisation | Réinitialisation de votre mot de passe |

> En production, remplacer Mailtrap par **Resend** avec un domaine vérifié et mettre à jour `lib/mail.ts`.
