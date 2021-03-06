import React from "react";

import { Track } from "../../spotify/types";
import { CardGallery } from "../CardGallery";
import TrackCard from "./Card";

export type TrackGalleryProps = {
  tracks: Track[];
  loadMoreTracks?: (page: number) => void;
  moreTracksAvailable?: boolean;
};

export default function TrackGallery(props: TrackGalleryProps) {
  const { tracks, loadMoreTracks, moreTracksAvailable } = props;
  const renderTrack = (track: Track) => <TrackCard track={track} />;

  return (
    <CardGallery
      items={tracks}
      renderItem={renderTrack}
      renderKey={(track: any) => track.id}
      loadFunc={loadMoreTracks}
      hasMore={moreTracksAvailable}
    />
  );
}
