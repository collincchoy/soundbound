import React from "react";

import classes from "./index.module.css";
import { useMusicPlayer } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayQueue from "./PlayQueue";
import TrackInfo from "./TrackInfo";

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
          {isPlaying ? (
            <button className="button" onClick={pause}>
              <FontAwesomeIcon className="icon" icon={faPause} />
            </button>
          ) : (
            <button className="button" onClick={play}>
              <FontAwesomeIcon className="icon" icon={faPlay} />
            </button>
          )}
        </div>
        <div className={classes.right}>
          <PlayQueue queue={playQueue} currentIndex={2} />
        </div>
      </div>
    );
  }
  return <div className={classes.MusicPlayer}>{contents}</div>;
}
