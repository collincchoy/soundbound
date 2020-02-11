import React, { useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Image, Tag, Container } from "react-bulma-components";

import { Artist } from "../../spotify/types";
import { CardGallery } from "../CardGallery";
import ArtistCard from "./ArtistCard";
import { ArtistModal } from "./ArtistModal";

export type ArtistGalleryProps = {
  artists: Artist[];
  loadMoreArtists?: (page: number) => void;
  moreArtistsAvailable?: boolean;
};

export default function ArtistGallery(props: ArtistGalleryProps) {
  const {
    artists,
    loadMoreArtists,
    moreArtistsAvailable: canLoadMoreArtists
  } = props;
  const [artistOnDisplay, setArtistOnDisplay] = useState<Artist | undefined>();

  const showDetails = (artist: Artist) => setArtistOnDisplay(artist);
  const closeDetails = () => setArtistOnDisplay(undefined);

  const renderArtist = (artist: Artist) => (
    <ArtistCard
      name={artist.name}
      image={artist.images[1]}
      onClick={() => showDetails(artist)}
    />
  );
  return (
    <Container>
      <CardGallery
        items={artists}
        renderItem={renderArtist}
        renderKey={artist => artist.id}
        loadFunc={loadMoreArtists}
        hasMore={canLoadMoreArtists}
      />
      <ArtistModal
        title={artistOnDisplay?.name}
        show={!!artistOnDisplay}
        onClose={closeDetails}
        closeOnEsc={true}
        closeOnBlur={true}
      >
        <div className="tags">
          {artistOnDisplay &&
            artistOnDisplay?.genres.map(genre => (
              <Tag color="dark" key={genre}>
                {genre}
              </Tag>
            ))}
        </div>
        <p>
          <b>Description</b>
        </p>
        <Image
          src={artistOnDisplay && artistOnDisplay.images[0].url}
          alt="Large Profile"
        />
      </ArtistModal>
    </Container>
  );
}
