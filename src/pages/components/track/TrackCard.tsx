import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Card, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

import { Track } from "../../../spotify/types";
import { useMusicPlayer } from "../../../components/musicPlayer/MusicPlayerContext";

type TrackCardProps = {
  track: Track;
};

export default function TrackCard(props: TrackCardProps) {
  console.log("rendering a track");
  const { name, artists, href, id, album, popularity } = props.track;
  const {
    currentTrack,
    changeTrack,
    play,
    pause,
    isPlaying,
    addToPlayQueue
  } = useMusicPlayer();

  function togglePlayTrack() {
    if (currentTrack && currentTrack.id === id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      changeTrack(props.track);
      play();
    }
  }

  return (
    <Card>
      <Card.Header>
        <p className="card-header-title">
          <a href={href}>{name}</a>
        </p>
        <span className="card-header-icon">{popularity}</span>
      </Card.Header>
      <Card.Image src={album.images[1].url} alt={album.name} size="square" />
      <Card.Content>
        <span>Artist(s): {artists.map(artist => artist.name).join(", ")}</span>
        <br />
        <span>Album: {album.name}</span>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item>
          <Button onClick={() => togglePlayTrack()}>
            {currentTrack && currentTrack.id === id && isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </Button>
          <Button onClick={() => addToPlayQueue(props.track)}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
}
