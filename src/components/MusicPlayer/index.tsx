import React from "react";

import "./index.css";
import { useMusicPlayer } from "./Context";
import { Container, Button } from "react-bulma-components";
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
      <Container className="level">
        <div className="level-item level-left">
          <div className="level-item" style={{ justifyContent: "flex-start" }}>
            <img
              src={albumArt.url}
              alt="Current track album art"
              width={albumArt.width}
              height={albumArt.height}
            />
            <p>{currentTrack.name}</p>
          </div>
        </div>
        <div className="level-item">
          {isPlaying ? (
            <Button onClick={pause}>
              <FontAwesomeIcon className="icon" icon={faPause} />
            </Button>
          ) : (
            <Button onClick={play}>
              <FontAwesomeIcon className="icon" icon={faPlay} />
            </Button>
          )}
        </div>
        <div className="level-item level-right">
          <PlayQueue queue={playQueue} currentIndex={2} />
        </div>
      </Container>
    );
  }
  return <div className="MusicPlayer">{contents}</div>;
}
