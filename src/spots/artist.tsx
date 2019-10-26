import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Heading } from 'react-bulma-components';

import { spotify } from './auth'
import { ArtistResponse, ArtistImage, SpotifyError } from "./types";
import { SpotifyErrorMessage, CardGallery } from './cardGallery';

interface ArtistGalleryState {
  artists: ArtistResponse[];
  error?: {status: number, message: string};
}

export class ArtistGallery extends React.Component<{}, ArtistGalleryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      artists: [],
    };
  }

  componentDidMount() {
    const endpoint = "/me/top/artists";
    spotify.fetch(endpoint, {
      method: 'GET',
      headers: {},
    }).then((data: any) => {
      console.log(`bah data is: ${data}`);
      this.setState({
        artists: data.items,
      });
    }).catch((error: SpotifyError) => this.setState({ error: error.error }));
  }

  renderArtist(artist: ArtistResponse): any {
    return <ArtistCard name={artist.name} image={artist.images[2]} key={artist.name} />;
  }

  render() {
    if (this.state.error) {
      return <SpotifyErrorMessage status={this.state.error.status} message={this.state.error.message} />
    }
    return (
      <CardGallery
        items={this.state.artists}
        renderItem={(artist: ArtistResponse) => this.renderArtist(artist)}
      />
    )
  }
}

interface ArtistCardProps {
  name: string;
  image: ArtistImage;
}

class ArtistCard extends React.Component<ArtistCardProps, {}> {
  render() {
    console.log("rendering an artist");
    return (
      <Card>
        <Card.Content>
          <Heading size={4}>
            {this.props.name}
          </Heading>
        </Card.Content>
        <Card.Image
          src={this.props.image.url}
          alt={this.props.name}
          size="square"
        /*width={this.props.image.width} height={this.props.image.height}*/
        />
      </Card>
    )
  }
}