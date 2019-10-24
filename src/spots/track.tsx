import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card } from 'react-bulma-components';

import { spotify } from './auth'
import { SpotifyError } from "./types";
import { CardGallery, SpotifyErrorMessage } from './cardGallery';

interface TrackGalleryState {
  tracks: [];
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

  renderTrack(track: { name: string, uri: string }): any {
    console.log("rendering a track");
    return <TrackCard data={JSON.stringify(track)} key={track.uri} />;
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
  data: {},
}

class TrackCard extends React.Component<TrackCardProps, {}> {
  render() {
    return (
      <Card>
        <Card.Content>
          {this.props.data}
        </Card.Content>
      </Card>
    )
  }
}