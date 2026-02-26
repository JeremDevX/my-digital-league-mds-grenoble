"use client";

import styles from "./Card.module.scss";
import { ReactNode } from "react";
import { ArrowCircleRightIcon } from "../Icons/Icons";
import Button from "../Button/Button";
import { Event } from "@/generated/prisma/client";

export type CardVariant = "default" | "register" | "featured";
export type CardStatus = "upcoming" | "ongoing";

interface MetaInfo {
  label: string;
  value: string;
}

interface CardProps extends Event {
  name: string;
  icon?: ReactNode;
  description?: string;
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
        ${variant === "featured" && status === "ongoing" ? styles.featured : ""}
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
      {variant === "default" ? (
        <>
          <div className={styles.header}>
            {icon ? <div className={styles.iconWrapper}>{icon}</div> : null}
            <h3 className={styles.title}>{name}</h3>
          </div>

          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </>
      ) : variant === "register" ? (
        <>
          <div className={styles.header}>
            {icon ? <div className={styles.iconWrapper}>{icon}</div> : null}
            <h3 className={styles.title}>{name}</h3>
          </div>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Date</span>
              <span className={styles.value}>
                {formatDate(eventDate)}
              </span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>Heure</span>
              <span className={styles.value}>{heure}</span>
            </div>

            <div className={styles.detailRow}>
              <span className={styles.label}>Lieu</span>
              <span className={styles.value}>{lieu}</span>
            </div>
          </div>

          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}

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
      ) : (
        <>
          <div className={styles.header}>
            {icon ? <div className={styles.iconWrapper}>{icon}</div> : null}
            <div className={styles.titleSection}>
              <h3 className={styles.title}>{name}</h3>
            </div>
          </div>
          <div className={styles.metaInfo}>
            {animatedBy ? (
              <span className={styles.metaAnimé}>
                Animé par <span className={styles.metaValue}>{animatedBy}</span>
              </span>
            ) : null}

            <div className={styles.metaDate}>
              <span className={styles.metaDebut}>
                Débute dans {calculateDaysUntilEvent(eventDate)}
              </span>
              {duration ? (
                <span className={styles.metaDurée}>· Dure {duration}</span>
              ) : null}
            </div>
          </div>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}

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
      )}

    </div>
  );
}
