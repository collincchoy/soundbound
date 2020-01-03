import React, { useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Modal, Image, Tag, Container } from "react-bulma-components";

import { Artist, PersonalizationTimeRange } from "../../../spotify/types";
import { CardGallery } from "../../../components/CardGallery";
import SpotifyErrorMessage from "../../../spotify/SpotifyErrorMessage";
import { usePaginatedSpotifyApi } from "../../../spotify/hooks";
import ArtistCard from "./ArtistCard";
import TimeRangePicker from "../TimeRangePicker";

export default function ArtistGallery() {
  const [artistOnDisplay, setArtistOnDisplay] = useState<Artist | undefined>();

  const showDetails = (artist: Artist) => setArtistOnDisplay(artist);
  const closeDetails = () => setArtistOnDisplay(undefined);

  const [timeRange, setTimeRange] = useState<string>(PersonalizationTimeRange.MEDIUM);
  const {
    items: artists,
    error,
    loadMoreItems,
    nextPage,
    reset
  } = usePaginatedSpotifyApi<Artist>(`/me/top/artists?time_range=${timeRange}`);
  const changeTimeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(e.currentTarget.value);
    reset();
  };

  const renderArtist = (artist: Artist) => (
    <ArtistCard
      name={artist.name}
      image={artist.images[1]}
      onClick={() => showDetails(artist)}
    />
  );
  return error ? (
    <SpotifyErrorMessage { ...error } />
  ) : (
    <Container>
      <TimeRangePicker
        selected={timeRange as PersonalizationTimeRange}
        onChange={changeTimeRange}
      />
      <CardGallery
        items={artists}
        renderItem={renderArtist}
        renderKey={artist => artist.id}
        loadFunc={loadMoreItems}
        hasMore={!!nextPage}
      />
      <Modal
        show={!!artistOnDisplay}
        onClose={closeDetails}
        closeOnEsc={true}
        closeOnBlur={true}
      >
        <Modal.Card>
          <Modal.Card.Head onClose={closeDetails}>
            <Modal.Card.Title>
              {artistOnDisplay && artistOnDisplay.name}
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <div className="tags">
              {artistOnDisplay &&
                artistOnDisplay.genres &&
                artistOnDisplay.genres.map(genre => (
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
          </Modal.Card.Body>
          <Modal.Card.Foot
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <p>Lorem Ipsum...</p>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    </Container>
  );
}