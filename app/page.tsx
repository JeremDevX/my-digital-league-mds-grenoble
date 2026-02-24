"use client";

import styles from "./page.module.scss";
import Card from "./components/Card/Card";
import { MessageSquareIcon } from "./components/Icons/Icons";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <section style={{ marginBottom: "3rem" }}>
          <h2>Card Standard (Default)</h2>
          
            <Card 
              id="1"
              variant="default"
              status="ongoing"
              icon={<MessageSquareIcon />}
              name="Rocket League – Aerial Cup"
              description="48 heures pour créer un jeu vidéo en équipe. Créativité, collaboration et passion au rendez-vous."
              date={new Date("2025-01-15T14:00:00")}
              inscriptionDeadline={new Date("2025-01-10T23:59:59")}
              heure="14h00"
              lieu="MyDigitalSchool"
              rules="Be respectful and creative"
              gameId="game1"
              createdAt={new Date()}
              updatedAt={new Date()}
            />
            </section>
    <section style={{ marginBottom: "3rem" }}>
            <h2>Card Default (Info)</h2>
             <Card
            id="7"
            variant="vedette"
            status="upcoming"
            duration="2 jours"
            animatedBy="Stella @ MyDigitalSchool"
            icon={<MessageSquareIcon />}
            name="Winter Game Jam 2025 – Create & Play"
            description="48 heures pour créer un jeu vidéo en équipe. Créativité, collaboration et passion au rendez-vous."
            date={new Date("2025-02-22T14:00:00")}
            inscriptionDeadline={new Date("2025-02-20T23:59:59")}
            rules="Creative rules"
            gameId="game7"
            createdAt={new Date()}
            updatedAt={new Date()}
          />

        </section>

        <section>
          <h2>Card Compact (Mini)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <Card 
              id="4"
              variant="compact"
              status="upcoming"
              icon={<MessageSquareIcon />}
              name="Rassemblez vos coéquipiers"
              description="Formez une équipe et participez ensemble."
              date={new Date("2025-01-15T14:00:00")}
              inscriptionDeadline={new Date("2025-01-10T23:59:59")}
              heure="14h"
              lieu="Campus"
              rules="Team rules"
              gameId="game4"
              createdAt={new Date()}
              updatedAt={new Date()}
            />
           
          </div>
        </section>
      </main>
    </div>
  );
}
