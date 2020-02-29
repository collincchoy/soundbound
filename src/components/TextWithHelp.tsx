import React from "react";
import classes from "./TextWithHelp.module.css";

type TextWithHelpProps = {
  text: string;
  tip: string;
};

export default function TextWithHelp({ text, tip }: TextWithHelpProps) {
  return (
    <div className={classes.tooltip}>
      {text}
      <span className={classes.tooltiptext}>{tip}</span>
    </div>
  );
}
