import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns } from 'react-bulma-components';

import { spotify } from './auth'

export class CardGallery<T> extends React.Component<{}, {}> {
  render() {
    const { children } = this.props;
    console.log(children);
    return (
      <Container /*Widescreen*/>
        <Columns>
          {children}
        </Columns>
      </Container>
    );
  }
}

export class SpotifyErrorMessage extends React.Component<{ status: number, message: string }, {}> {
  render() {
    if (this.props.status === 401) {
      return (
        <Container>
          Oops you need to authorize this app:
            <a href={spotify.authorizeUrl.toString()}>Click here to authorize.</a>
        </Container>);
    } else {
      return (
        <Container>
          Uh oh. An Error Occurred: {this.props.status} {this.props.message}
        </Container>
      );
    }
  }
}


