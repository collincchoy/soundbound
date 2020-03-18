import React from "react";

import classes from "./index.module.css";
import { useMusicPlayer } from "./Context";
import PlayQueue from "./PlayQueue";
import TrackInfo from "./TrackInfo";
import PlayPauseButton from "./PlayPauseButton";

export default function MusicPlayer() {
  const { currentTrack, isPlaying, pause, play, playQueue } = useMusicPlayer();

  let contents;
  if (!currentTrack) {
    contents = <span>No track to play.</span>;
  } else {
    contents = (
      <div className={`container ${classes.flexContainer}`}>
        <div className={classes.left}>
          <TrackInfo track={currentTrack} />
        </div>
        <div className={classes.middle}>
          <PlayPauseButton {...{ play, pause, isPlaying }} />
        </div>
        <div className={classes.right}>
          <PlayQueue queue={playQueue} currentIndex={2} />
        </div>
      </div>
    );
  }
  return <div className={classes.MusicPlayer}>{contents}</div>;
}
