import React, { useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

import { Track, PersonalizationTimeRange } from "../../../spotify/types";
import TimeRangePicker from "../TimeRangePicker";
import { CardGallery } from "../../../components/CardGallery";
import SpotifyErrorMessage from "../../../spotify/SpotifyErrorMessage";
import { usePaginatedSpotifyApi } from "../../../spotify/hooks";
import TrackCard from "./TrackCard";
import { Container } from "react-bulma-components";

export default function TrackGallery() {
  const [timeRange, setTimeRange] = useState<string>(PersonalizationTimeRange.MEDIUM);
  const {
    items: tracks,
    error,
    loadMoreItems,
    nextPage, 
    reset,
  } = usePaginatedSpotifyApi<Track>(`/me/top/tracks?time_range=${timeRange}`);
  const changeTimeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    reset();
    setTimeRange(e.currentTarget.value);
  };

  const renderTrack = (track: Track) => <TrackCard track={track} />;

  return error ? (
    <SpotifyErrorMessage {...error} />
  ) : (
    <Container>
      <TimeRangePicker
        selected={timeRange as PersonalizationTimeRange}
        onChange={changeTimeRange}
      />
      <CardGallery
        items={tracks}
        renderItem={renderTrack}
        renderKey={(track: any) => track.id}
        loadFunc={loadMoreItems}
        hasMore={!!nextPage}
      />
    </Container>
  );
}
