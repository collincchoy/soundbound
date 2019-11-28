import React, { useEffect, useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns, Button } from 'react-bulma-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import { Track, TrackResponse, SpotifyError } from "./types";
import { CardGallery } from './cardGallery';
import { SpotifyErrorMessage } from './spotify/error';
import { useSpotifyApi } from './spotify/hooks';
import { useMusicPlayer } from './musicPlayer/MusicPlayerContext';

import { spotify } from "./spotify/api";

export function TrackGallery() {
  //const { data, error, setData, setError} = useSpotifyApi<TrackResponse>("/me/top/tracks");
  // const tracks = (data && data.items) || [];

  const [tracks, setTracks] = useState<Track[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [error, setError] = useState<{ status: number, message: string }>();
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    loadTrackData("/me/top/tracks", signal);
    return () => abortController.abort();
  }, []);

  function loadTrackData(endpoint: string, abortSignal?: AbortSignal) {
    spotify.get(endpoint, abortSignal)
      .then((data: TrackResponse) => {
        data.items && setTracks((prev) => [...prev, ...data.items]);
        setNextPage(data.next && data.next.split("v1")[1]);
      }).catch((error: SpotifyError) => setError(error.error));
  }

  const loadMoreTrackData = (page: number) => { nextPage && loadTrackData(nextPage) };

  return (error) ? <SpotifyErrorMessage { ...error } /> : (
    <CardGallery loadFunc={loadMoreTrackData} hasMore={!!nextPage}>
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
  const {currentTrack, changeTrack, play, pause, isPlaying, addToPlayQueue} = useMusicPlayer();

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
      <Card.Image src={album.images[1].url} alt={album.name} size="square"/>
      <Card.Content>
        <span>Artist(s): {artists.map(artist => artist.name).join(", ")}</span>
        <br/>
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