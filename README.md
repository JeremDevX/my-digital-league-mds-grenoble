This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# My Digital League MDS Grenoble

## Introduction

Projet LAN de MyDigitalSchool Grenoble - My Digital League.

## Installation

Pour installer le projet, suivez ces étapes :

1. Clonez le dépôt : `git clone <url-du-dépôt>`
2. Accédez au dossier du projet : `cd my-digital-league-mds-grenoble`
3. Installez les dépendances : `npm install`

## Structure du Projet

- **Racine du Projet**
  - `eslint.config.mjs`: Configuration pour ESLint.
  - `next-env.d.ts`: Déclarations de types pour Next.js.
  - `next.config.ts`: Configuration de Next.js.
  - `package.json`: Dépendances et scripts du projet.
  - `README.md`: Documentation du projet.
  - `tsconfig.json`: Configuration TypeScript.
  - `vitest.config.ts`: Configuration pour Vitest.
  - `vitest.shims.d.ts`: Déclarations de types pour Vitest.

- **Dossier `app/`**
  - `layout.tsx`: Composant de mise en page principal.
  - `page.module.scss`: Styles globaux pour la page.
  - `page.tsx`: Composant de la page principale.
  - **Dossier `components/`**: Contient des composants réutilisables.
    - **Dossier `Card/`**: Composant de carte.
      - `Card.module.scss`: Styles pour le composant de carte.
      - `Card.stories.tsx`: Histoires pour le composant de carte (pour Storybook).
      - `Card.tsx`: Composant de carte.
    - **Dossier `login/`**: Composant de connexion.
      - `page.module.scss`: Styles pour la page de connexion.
      - `page.tsx`: Composant de la page de connexion.

- **Dossier `styles/`**
  - `globals.scss`: Styles globaux pour l'application.
  - `reset.scss`: Styles de réinitialisation.
  - `utilities.scss`: Classes utilitaires.
  - `variables.scss`: Variables SCSS.

- **Dossier `public/`**: Contient des fichiers statiques accessibles publiquement.

## Utilisation

Pour démarrer le projet, exécutez : `npm run dev`

## Conventions de Codage

- Utilisez ESLint pour le style de code.
- Suivez les conventions de nommage [décrire les conventions].

## Contributions

Pour contribuer au projet :

1. Créez une branche pour votre fonctionnalité : `git checkout -b ma-fonctionnalité`
2. Effectuez vos modifications et validez : `git commit -m 'Ajout d'une nouvelle fonctionnalité'`
3. Poussez votre branche : `git push origin ma-fonctionnalité`
4. Ouvrez une pull request.
