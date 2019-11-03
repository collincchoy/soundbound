import React, { useState } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Heading, Columns, Modal, Image, Tag } from 'react-bulma-components';

import { spotify } from './auth'
import { ArtistResponse, ArtistImage, SpotifyError } from "./types";
import { SpotifyErrorMessage, CardGallery } from './cardGallery';

interface ArtistGalleryState {
  artists: ArtistResponse[];
  error?: { status: number, message: string };
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

    const { artists } = this.state;
    const artistCards = artists.map(artist =>
      <Columns.Column size={3} key={artist.id} >
        <ArtistCardWithDetailsModal artist={artist} />
      </Columns.Column>
    );
    return (
      <CardGallery>
        {artistCards}
      </CardGallery>
    )
  }
}

interface ArtistCardProps {
  name: string;
  image: ArtistImage;
  onClick: any;
}

function ArtistCard(props: ArtistCardProps) {
  return (
    <Card>
      <Card.Content>
        <Heading size={4}>
          {props.name}
        </Heading>
      </Card.Content>
      <a>
        <Card.Image
          src={props.image.url}
          alt={props.name}
          size="square"
          onClick={props.onClick}
        /*width={this.props.image.width} height={this.props.image.height}*/
        />
      </a>
    </Card>
  )
}

function ArtistCardWithDetailsModal(props: { artist: ArtistResponse }) {
  const { artist } = props;
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const showDetails = () => { console.log("clicked"); setIsShowingDetails(true) };
  const closeDetails = () => setIsShowingDetails(false);

  const genreList = artist.genres.map((genre) =>
    <Tag color="dark" key={genre}>{genre}</Tag>
  );
  return (
    <div>
      <ArtistCard name={artist.name} image={artist.images[2]} onClick={showDetails} />
      <Modal show={isShowingDetails} onClose={closeDetails} closeOnEsc={true} closeOnBlur={true}>
        <Modal.Card>
          <Modal.Card.Head onClose={closeDetails}>
            <Modal.Card.Title>
              {artist.name}
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <div className="tags">
              {genreList}
            </div>
            <p>
              <b>Description</b>
            </p>
            <Image src={artist.images[0].url} alt="Large Profile"></Image>
          </Modal.Card.Body>
          <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
            <p>
              Lorem Ipsum...
          </p>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    </div>
  );
}
