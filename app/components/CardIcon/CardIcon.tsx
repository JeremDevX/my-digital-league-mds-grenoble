import { ReactNode } from "react";
import "./CardIcon.module.scss";

interface CardIconProps {
  icon: ReactNode;
  titre: string;
  sousTitre: string;
}

export default function CardIcon(props: CardIconProps) {
  return (
    <div className="cardIconContainer">
      {props.icon}
      <div className="cardIconText">
        <h3>{props.titre}</h3>
        <p>{props.sousTitre}</p>
      </div>
    </div>
  );
}
