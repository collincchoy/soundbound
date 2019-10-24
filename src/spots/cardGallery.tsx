import React from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Container, Columns } from 'react-bulma-components';

import { spotify } from './auth'

interface CardGalleryProps<T> {
  items: T[];
  renderItem: (item: T) => React.Component;
}

export class CardGallery<T> extends React.Component<CardGalleryProps<T>, {}> {
  constructor(props: CardGalleryProps<T>) {
    super(props);
  }

  render() {
    console.log(this.props.items);
    return (
      <Container /*Widescreen*/>
        <Columns>
          {this.props.items.map((item: T) => {
            return (
              <Columns.Column size={3}>
                {this.props.renderItem(item)}
              </Columns.Column>
            );
          })}
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


