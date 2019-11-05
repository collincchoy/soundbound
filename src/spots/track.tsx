import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Columns } from 'react-bulma-components';

import { spotify } from './auth'
import { SpotifyError, Track } from "./types";
import { CardGallery, SpotifyErrorMessage } from './cardGallery';

interface TrackGalleryState {
  tracks: Track[];
  error?: {
    status: number,
    message: string,
  };
}

export class TrackGallery extends React.Component<{}, TrackGalleryState> {
  _abortController: AbortController;
  constructor(props: {}) {
    super(props);
    this.state = {
      tracks: [],
    };
    this._abortController = new AbortController();
  }

  componentDidMount() {
    const endpoint = "/me/top/tracks";
    spotify.fetch(endpoint, {
      method: 'GET',
      headers: {},
      signal: this._abortController.signal,
    }).then((data: any) => {
      console.log(`bah data is: ${data.items.length}`);
      this.setState({
        tracks: data.items,
      });
    }).catch((error: SpotifyError) => this.setState({ error: error.error }));
  }

  componentWillUnmount() {
    this._abortController.abort();
  }

  render() {
    console.log("rendering trackgallery")
    const {error, tracks} = this.state;
    if (error) {
      return <SpotifyErrorMessage status={error.status} message={error.message} />
    }

    const trackCards = tracks.map(track => 
      <Columns.Column size={3} key={track.id}>
        <TrackCard data={track} />
      </Columns.Column>
    );

    return (
      <CardGallery>
        {trackCards}
      </CardGallery>
    )
  }
}

interface TrackCardProps {
  data: Track,
}

class TrackCard extends React.Component<TrackCardProps, {}> {
  render() {
    console.log("rendering a track");
    const artistName = this.props.data.artists[0].name,
          trackTitle = this.props.data.name,
          trackLink = this.props.data.href,
          trackPreviewLink = this.props.data.preview_url,
          trackAlbumName = this.props.data.album.name,
          trackAlbumImage = this.props.data.album.images[1].url;
    return (
      <Card>
        <Card.Header>
          <p className="card-header-title">
            <a href={trackLink}>{trackTitle}</a>
          </p>
          <span className="card-header-icon">
            {this.props.data.popularity}
          </span>
        </Card.Header>
        <Card.Image src={trackAlbumImage} alt={trackAlbumName} size="square"/>
        <Card.Content>
          <span>Artist: {artistName}</span>
          <br/>
          <span>Album: {trackAlbumName}</span>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
          <audio controls>
            <source src={trackPreviewLink}/>
            <p>Your browser doesn't support HTML5 audio. Here is a <a href={trackPreviewLink}>link to the audio</a> instead.</p>
          </audio>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    )
  }
}