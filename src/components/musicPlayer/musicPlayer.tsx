import React from "react";

import './MusicPlayer.css';
import { useMusicPlayer } from "./MusicPlayerContext";
import { Container, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function MusicPlayer() {
  const { currentTrack, isPlaying, pause, play } = useMusicPlayer();

  let contents;
  if (!currentTrack) {
    contents = <span>No track to play.</span>;
  } else {
    contents = (
      <Container>
        <p>{currentTrack.name}</p>
        {(isPlaying) ?
          <Button onClick={pause} >
            <FontAwesomeIcon icon={faPause} />
          </Button> :
          <Button onClick={play}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        }
      </Container>
    );
  }
  return (
    <div className="MusicPlayer">
      {contents}
    </div>
  );
}
