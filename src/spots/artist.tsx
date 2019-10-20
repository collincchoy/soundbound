import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Heading, Container, Columns } from 'react-bulma-components';

import { spotify } from './auth'
import { ArtistResponse, ArtistImage, SpotifyError } from "./types";

interface ArtistGalleryState {
  artists: ArtistResponse[];
  errors?: any;
}

export class ArtistGallery extends React.Component<{}, ArtistGalleryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      artists: [],
    };
  }

  componentDidMount() {
    console.log("HELLO??no")
    spotify.fetch("https://api.spotify.com/v1/me/top/artists", {
      method: 'GET',
      headers: {},
    }).then((data: any) => {
      console.log(`bah data is: ${data}`);
      this.setState({
        artists: data.items,
      });
    }).catch((error: SpotifyError) => this.setState({ errors: error.error }));
  }

  render() {
    if (this.state.errors) {
      if (this.state.errors.status === 401) {
        return (
          <Container>
            Oops you need to authorize this app:
              <a href={spotify.authorizeUrl.toString()}>Click here to authorize.</a>
          </Container>);
      }
      return (
        <Container>
          Uh oh. An Error Occurred: {this.state.errors.status} {this.state.errors.message}
        </Container>);
    }
    return (
      <Container /*Widescreen*/>
        <Columns>
          {this.state.artists.map((artist) => {
            return (
              <Columns.Column size={3}>
                <ArtistCard name={artist.name} image={artist.images[2]} />
              </Columns.Column>
            );
          })}
        </Columns>
      </Container>
    );
  }
}

interface ArtistCardProps {
  name: string;
  image: ArtistImage;
}

class ArtistCard extends React.Component<ArtistCardProps, {}> {
  render() {
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