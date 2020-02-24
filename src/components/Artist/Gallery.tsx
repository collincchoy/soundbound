import React, { useState } from "react";

import { Artist } from "../../spotify/types";
import { CardGallery } from "../CardGallery";
import ArtistCard from "./Card";
import { ArtistModal } from "./Modal";
import Image from "../Image";

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
    <div className="container">
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
              <span className="tag is-dark" key={genre}>
                {genre}
              </span>
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
    </div>
  );
}
