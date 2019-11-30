import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns, Button } from 'react-bulma-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { Track } from "./types";
import { CardGallery } from './cardGallery';
import { SpotifyErrorMessage } from './spotify/error';
import { usePaginatedSpotifyApi } from './spotify/hooks';
import { useMusicPlayer } from './musicPlayer/MusicPlayerContext';


export function TrackGallery() {
  const { items: tracks, error, loadMoreItems, nextPage } = usePaginatedSpotifyApi<Track>("/me/top/tracks");

  return (error) ? <SpotifyErrorMessage {...error} /> : (
    <CardGallery loadFunc={loadMoreItems} hasMore={!!nextPage}>
      {tracks.map(track =>
        <Columns.Column size={3} key={track.id}>
          <TrackCard track={track} />
        </Columns.Column>
      )}
    </CardGallery>
  );
}

interface TrackCardProps {
  track: Track,
}

function TrackCard(props: TrackCardProps) {
  console.log("rendering a track");
  const { name, artists, href, id, album, popularity } = props.track;
  const { currentTrack, changeTrack, play, pause, isPlaying, addToPlayQueue } = useMusicPlayer();

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
        <span className="card-header-icon">
          {popularity}
        </span>
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
            {(currentTrack && currentTrack.id === id && isPlaying) ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </Button>
          <Button onClick={() => addToPlayQueue(props.track)}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  )
}