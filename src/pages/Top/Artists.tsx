import React, { useState } from "react";
import ArtistGallery from "../../components/Artist/Gallery";
import { PersonalizationTimeRange, Artist } from "../../spotify/types";
import { usePaginatedSpotifyApi } from "../../spotify/hooks";
import SpotifyErrorMessage from "../../spotify/SpotifyErrorMessage";
import TimeRangePicker from "../../components/TimeRangePicker";
import PageContent from "components/PageContent";

export default function TopArtistsPage() {
  const defaultTimeRange = PersonalizationTimeRange["6 months"];
  const [timeRange, setTimeRange] = useState<string>(defaultTimeRange);
  const {
    items,
    error,
    loadMoreItems,
    nextPage,
    reset,
  } = usePaginatedSpotifyApi<Artist>(`/me/top/artists?time_range=${timeRange}`);

  const changeTimeRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.currentTarget.value);
    reset();
  };
  return (
    <PageContent>
      {error ? (
        <SpotifyErrorMessage {...error} />
      ) : (
        <>
          <TimeRangePicker
            selected={timeRange as PersonalizationTimeRange}
            onChange={changeTimeRange}
          />
          <ArtistGallery
            artists={items}
            loadMoreArtists={loadMoreItems}
            moreArtistsAvailable={!!nextPage}
          />
        </>
      )}
    </PageContent>
  );
}
