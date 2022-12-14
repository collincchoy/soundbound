import React from "react";

import { Artist } from "../../spotify/types";
import { CardGallery } from "../CardGallery";
import ArtistCard from "./Card";
import { useNavigate } from "react-router-dom";

export type ArtistGalleryProps = {
  artists: Artist[];
  loadMoreArtists?: (page: number) => void;
  moreArtistsAvailable?: boolean;
};

export default function ArtistGallery({
  artists,
  loadMoreArtists,
  moreArtistsAvailable: canLoadMoreArtists,
}: ArtistGalleryProps) {
  const navigate = useNavigate();

  const renderArtist = (artist: Artist) => (
    <ArtistCard
      name={artist.name}
      image={artist.images[1]}
      onClick={() => navigate(`/discover/${artist.id}`)}
    />
  );
  return (
    <div className="container">
      <CardGallery
        items={artists}
        renderItem={renderArtist}
        renderKey={(artist) => artist.id}
        loadFunc={loadMoreArtists}
        hasMore={canLoadMoreArtists}
      />
    </div>
  );
}
