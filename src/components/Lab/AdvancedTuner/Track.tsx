import React from "react";
import classes from "./index.module.css";

type TrackProps = {
  source: { percent: number };
  target: { percent: number };
  getTrackProps: () => any;
};

/**
 * Slider portion that overlays between and around handles.
 * Note: the underlying bar is a single bar denoted as the "Rail"
 *       and "Tracks" sit on top of the "Rail"
 */
export default function Track({ source, target, getTrackProps }: TrackProps) {
  return (
    <div
      className={classes.track}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      /* this will set up events if you want it to be clickeable (optional) */
      {...getTrackProps()}
    />
  );
}
