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
    return (
      <Card>
        <Card.Header>
          <p className="card-header-title">
            {this.props.data.name}
          </p>
          <span className="card-header-icon">
            {this.props.data.popularity}
          </span>
        </Card.Header>
        <Card.Content>
          <span>Artist: {this.props.data.artists[0].name}</span>
          <br/>
          <span>Album: {this.props.data.album.name}</span>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <a href={this.props.data.href}>Listen!</a>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <a href={this.props.data.preview_url}>Preview!</a>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    )
  }
}