import React from "react";
import styles from "./TextWithHelp.module.css";

type TextWithHelpProps = {
  text: string;
  tip: string;
};

export default function TextWithHelp({ text, tip }: TextWithHelpProps) {
  return (
    <div className={styles.tooltip}>
      {text}
      <span className={styles.tooltiptext}>{tip}</span>
    </div>
  );
}
