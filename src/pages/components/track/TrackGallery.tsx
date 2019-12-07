import React, { useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

import { Track, PersonalizationTimeRange } from "../../../spotify/types";
import TimeRangePicker from "../TimeRangePicker";
import { CardGallery } from "../../../components/CardGallery";
import { SpotifyErrorMessage } from "../../../spotify/error";
import { usePaginatedSpotifyApi } from "../../../spotify/hooks";
import TrackCard from "./TrackCard";

export default function TrackGallery() {
  const [period, setPeriod] = useState<string>(PersonalizationTimeRange.MEDIUM);
  const {
    items: tracks,
    setItems: setTracks,
    error,
    loadMoreItems,
    nextPage
  } = usePaginatedSpotifyApi<Track>(`/me/top/tracks?time_range=${period}`);
  const changePeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod(e.currentTarget.value);
    setTracks([]);
  };

  const renderTrack = (track: Track) => <TrackCard track={track} />;

  return error ? (
    <SpotifyErrorMessage {...error} />
  ) : (
    <>
      <TimeRangePicker
        selected={period as PersonalizationTimeRange}
        onChange={changePeriod}
      />
      <CardGallery
        items={tracks}
        renderItem={renderTrack}
        renderKey={(track: any) => track.id}
        loadFunc={loadMoreItems}
        hasMore={!!nextPage}
      />
    </>
  );
}
