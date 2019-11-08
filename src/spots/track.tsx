import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns } from 'react-bulma-components';

import { Track, TrackResponse } from "./types";
import { CardGallery } from './cardGallery';
import { SpotifyErrorMessage } from './spotify/error';
import { useSpotifyApi } from './spotify/hooks';

export function TrackGallery() {
  const { data, error } = useSpotifyApi<TrackResponse>("/me/top/tracks");
  const tracks = (data && data.items) || [];

  return (error) ? <SpotifyErrorMessage { ...error } /> : (
    <CardGallery>
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
  const { name, artists, href, preview_url, album, popularity } = props.track;

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
      <Card.Image src={album.images[1].url} alt={album.name} size="square"/>
      <Card.Content>
        <span>Artist(s): {artists.map(artist => artist.name).join(", ")}</span>
        <br/>
        <span>Album: {album.name}</span>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item>
        <audio controls>
          <source src={preview_url}/>
          <p>Your browser doesn't support HTML5 audio. Here is a <a href={preview_url}>link to the audio</a> instead.</p>
        </audio>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  )
}