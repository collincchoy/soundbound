import React from "react";
import classes from "./index.module.css";
import { round } from "../../../utilities";

type HandleProps = {
  handle: {
    id: string;
    value: any;
    percent: any;
  };
  getHandleProps: (id: string) => any;
};

export default function Handle({
  handle: { id, value, percent },
  getHandleProps
}: HandleProps) {
  value = round(value, 2);
  return (
    <div
      className={classes.handle}
      style={{ left: `${percent}%` }}
      {...getHandleProps(id)}
    >
      <div className={classes.handleLabel}>{value}</div>
    </div>
  );
}
