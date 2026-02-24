"use client";

import styles from "./Card.module.scss";
import { ReactNode } from "react";
import { ArrowCircleRightIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { Event } from "@/generated/prisma/client";

export type CardVariant = "default" | "compact" | "vedette";
export type CardStatus = "upcoming" | "ongoing";

interface MetaInfo {
  label: string;
  value: string;
}

interface CardProps extends Event {
  icon: ReactNode;
  description: string;
  heure?: string;
  lieu?: string;
  animatedBy?: string;
  duration?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: CardVariant;
  status?: CardStatus;
  metaInfo?: MetaInfo;
}

export default function Card({
  icon,
  name,
  date,
  inscriptionDeadline,
  description,
  heure,
  lieu,
  animatedBy,
  duration,
  onClick,
  disabled = false,
  variant = "default",
  status = "upcoming",
}: CardProps) {
  const isClickable = onClick && !disabled;
  const eventDate = new Date(date);
  const deadline = inscriptionDeadline ? new Date(inscriptionDeadline) : null;

  const calculateDaysUntilEvent = (eventDate: Date): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Aujourd'hui";
    if (diffDays === 1) return "un jour";
    return `${diffDays} jours`;
  };

  const formatDate = (date: Date | string) => {
    try {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) {
        return "Inconnu";
      }
      return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    } catch {
      return "Inconnu";
    }
  };

  return (
    <div
      className={`
        ${styles.card}
        ${styles[variant]}
        ${status === "ongoing" ? styles.featured : ""}
      `}
      onClick={isClickable ? onClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {variant === "vedette" ? (
        <>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>{icon}</div>
            <div className={styles.titleSection}>
              <h3 className={styles.title}>{name}</h3>
            </div>
          </div>
          <div className={styles.metaInfo}>
                <span className={styles.metaAnimé}>Animé par <span className={styles.metaValue}>{animatedBy}</span></span>
                
                <div className={styles.metaDate}>
                <span className={styles.metaDebut}>
                  Débute dans {calculateDaysUntilEvent(eventDate)} 
                </span>
                   <span className={styles.metaDurée}>· Dure {duration}</span>
                </div>
              </div>
          <p className={styles.description}>{description}</p>
         
          <div className={styles.buttonWrapper}>
            <Button
              label={status === "ongoing" ? "S'inscrire" : "Voir détails"}
              type="primary"
              icon={<ArrowCircleRightIcon />}
              iconPosition="right"
              onClick={() => {
                onClick?.();
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.iconWrapper}>{icon}</div>
            <h3 className={styles.title}>{name}</h3>
          </div>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Date</span>
              <span className={styles.value}>{formatDate(eventDate)}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>Heure</span>
              <span className={styles.value}>
                {heure}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>Lieu</span>
              <span className={styles.value}>
                {lieu}
              </span>
            </div>

          </div>

          <p className={styles.description}>{description}</p>

        
          <div className={styles.buttonWrapper}>
            <Button
              label={status === "ongoing" ? "S'inscrire" : "Voir détails"}
              type="primary"
              onClick={() => {
                onClick?.();
              }}
            />
          </div>
        </>
      )}

    </div>
  );
}
