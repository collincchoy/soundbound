import React from "react";

import classes from "./index.module.css";
import { useMusicPlayer } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayQueue from "./PlayQueue";

export default function MusicPlayer() {
  const { currentTrack, isPlaying, pause, play, playQueue } = useMusicPlayer();

  let contents;
  if (!currentTrack) {
    contents = <span>No track to play.</span>;
  } else {
    const albumArt =
      currentTrack.album.images[currentTrack.album.images.length - 1];
    contents = (
      <div className={`container ${classes.flexContainer}`}>
        <div className={classes.left}>
          <img
            src={albumArt.url}
            alt="Current track album art"
            width={albumArt.width}
            height={albumArt.height}
          />
          <div className={classes.trackInfo}>
            <p>{currentTrack.name}</p>
            <p>{currentTrack.artists.map(artist => artist.name).join(", ")}</p>
          </div>
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
