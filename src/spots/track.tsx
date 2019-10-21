import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Container, Columns } from 'react-bulma-components';

import { spotify } from './auth'
import { SpotifyError } from "./types";

interface TrackGalleryState {
  items: [];
  errors?: any;
}

export class TrackGallery extends React.Component<{}, TrackGalleryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const endpoint = "/me/top/tracks";
    spotify.fetch(endpoint, {
      method: 'GET',
      headers: {},
    }).then((data: any) => {
      console.log(`bah data is: ${data}`);
      this.setState({
        items: data.items,
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
          {this.state.items.map((item) => {
            return (
              <Columns.Column size={3}>
                <TrackCard data={JSON.stringify(item)} />
              </Columns.Column>
            );
          })}
        </Columns>
      </Container>
    );
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