import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card } from 'react-bulma-components';

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
  constructor(props: {}) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    const endpoint = "/me/top/tracks";
    spotify.fetch(endpoint, {
      method: 'GET',
      headers: {},
    }).then((data: any) => {
      console.log(`bah data is: ${data.items.length}`);
      this.setState({
        tracks: data.items,
      });
    }).catch((error: SpotifyError) => this.setState({ error: error.error }));
  }

  renderTrack(track: Track): any {
    return <TrackCard data={track} />;
  }

  render() {
    console.log("rendering trackgallery")
    if (this.state.error) {
      return <SpotifyErrorMessage status={this.state.error.status} message={this.state.error.message} />
    }
    return (
      <CardGallery
        items={this.state.tracks}
        renderItem={(track) => this.renderTrack(track)}
      />
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