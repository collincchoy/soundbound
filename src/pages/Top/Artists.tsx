import React, { useState } from "react";
import styles from "./index.module.css";
import { Container } from "react-bulma-components";
import ArtistGallery from "../../components/Artist/Gallery";
import { PersonalizationTimeRange, Artist } from "../../spotify/types";
import { usePaginatedSpotifyApi } from "../../spotify/hooks";
import SpotifyErrorMessage from "../../spotify/SpotifyErrorMessage";
import TimeRangePicker from "../../components/TimeRangePicker";

export default function TopArtistsPage() {
  const [timeRange, setTimeRange] = useState<string>(
    PersonalizationTimeRange.MEDIUM
  );
  const {
    items,
    error,
    loadMoreItems,
    nextPage,
    reset
  } = usePaginatedSpotifyApi<Artist>(`/me/top/artists?time_range=${timeRange}`);

  const changeTimeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(e.currentTarget.value);
    reset();
  };
  return (
    <div className={styles.page}>
      {error ? (
        <SpotifyErrorMessage {...error} />
      ) : (
        <Container>
          <TimeRangePicker
            selected={timeRange as PersonalizationTimeRange}
            onChange={changeTimeRange}
          />
          <ArtistGallery
            artists={items}
            loadMoreArtists={loadMoreItems}
            moreArtistsAvailable={!!nextPage}
          />
        </Container>
      )}
    </div>
  );
}
