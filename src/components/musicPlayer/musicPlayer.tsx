import React, { useContext } from "react";

import './musicPlayer.css'
import {MusicPlayerContext} from "./MusicPlayerContext";
import { Container, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

export function MusicPlayer() {
  const {currentTrack, isPlaying, pause, play} = useContext(MusicPlayerContext);

  let contents;
  if (!currentTrack) {
    contents = <span>No track to play.</span>;
  } else {
    contents = (
      <Container>
        <span>{currentTrack.name}</span>
        <Button onClick={(isPlaying) ? pause : play}>
          {(isPlaying) ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </Button>
      </Container>
    );
  }
  return (
    <div className="MusicPlayer">
      {contents}
    </div>
  );
}
