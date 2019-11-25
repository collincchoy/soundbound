import React, { useState } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Heading, Columns, Modal, Image, Tag } from 'react-bulma-components';

import { ArtistResponse, ArtistImage, Artist } from "./types";
import { CardGallery } from './cardGallery';
import { SpotifyErrorMessage } from './spotify/error';
import { useSpotifyApi } from "./spotify/hooks";

export function ArtistGallery() {
  const [artistOnDisplay, setArtistOnDisplay] = useState<Artist | undefined>();

  const showDetails = (artist: Artist) => setArtistOnDisplay(artist);
  const closeDetails = () => setArtistOnDisplay(undefined);

  const {data, error} = useSpotifyApi<ArtistResponse>("/me/top/artists");
  const artists = (data && data.items) || [];

  if (error) {
    return <SpotifyErrorMessage {...error} />
  }

  return (
    <>
      <CardGallery>
        {artists.map(artist =>
          <Columns.Column size={3} key={artist.id} >
            <ArtistCard name={artist.name} image={artist.images[2]} onClick={() => showDetails(artist)} />
          </Columns.Column>
        )}
      </CardGallery>
      <Modal show={!!artistOnDisplay} onClose={closeDetails} closeOnEsc={true} closeOnBlur={true}>
        <Modal.Card>
          <Modal.Card.Head onClose={closeDetails}>
            <Modal.Card.Title>
              {artistOnDisplay && artistOnDisplay.name}
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <div className="tags">
              {artistOnDisplay && artistOnDisplay.genres && artistOnDisplay.genres.map((genre) =>
                <Tag color="dark" key={genre}>{genre}</Tag>
              )}
            </div>
            <p>
              <b>Description</b>
            </p>
            <Image src={artistOnDisplay && artistOnDisplay.images[0].url} alt="Large Profile"></Image>
          </Modal.Card.Body>
          <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
            <p>
              Lorem Ipsum...
            </p>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    </>
  )
}

interface ArtistCardProps {
  name: string;
  image: ArtistImage;
  onClick?: () => void;
}

function ArtistCard(props: ArtistCardProps) {
  const { name, image } = props;
  return (
    <Card>
      <Card.Content>
        <Heading size={4}>
          {props.name}
        </Heading>
      </Card.Content>
      <a>
        <Card.Image
          {...props}
          src={image.url}
          alt={name}
          size="square"
          style={{ height: image.height }}
        /*width={this.props.image.width} height={this.props.image.height}*/
        />
      </a>
    </Card>
  )
}