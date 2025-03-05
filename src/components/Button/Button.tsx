import React from "react";

import styles from "./Button.styles.module.css";

type ButtonProps = {
  type: "primaryButton" | "secondaryButton" | "active" | "deleteButton";
  text: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
};

export const Button = (props: ButtonProps) => {
  const typeStyles = {
    primaryButton: styles.primaryButton,
    secondaryButton: styles.secondaryButton,
    deleteButton: styles.deleteButton,
    active: styles.active,
  };

  const buttonType = props.type || "primaryButton";
  const buttonClassName = `${typeStyles[buttonType]} ${
    props.active ? styles.active : ""
  }`;
  
  return (
    <button
      onClick={props.onClick}
      className={buttonClassName}
      style={props.style}
    >
      {props.text}
    </button>
  );
};
