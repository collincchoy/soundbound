import React from "react";
import { Track } from "../../spotify/types";
import classes from "./index.module.css";
import { useOverflowTextHandler } from "hooks/OverflowTextHandler";

export default function TrackInfo({ track }: { track: Track }) {
  const albumArt = track.album.images[track.album.images.length - 1];
  const {
    hasOverflowingText: hasOverflowingTrackName,
    elRef: trackNameRef
  } = useOverflowTextHandler<HTMLParagraphElement>();
  const {
    hasOverflowingText: hasOverflowingArtistName,
    elRef: artistNameRef
  } = useOverflowTextHandler<HTMLParagraphElement>();
  return (
    <>
      <img
        src={albumArt.url}
        alt="Current track album art"
        width={albumArt.width}
        height={albumArt.height}
      />
      <div className={`${classes.trackInfo} overflow-container`}>
        <p
          className={`scroll-on-overflow ${hasOverflowingTrackName &&
            "overflowing"}`}
          ref={trackNameRef}
        >
          {track.name}
        </p>
        <p
          className={`scroll-on-overflow ${hasOverflowingArtistName &&
            "overflowing"}`}
          ref={artistNameRef}
        >
          {track.artists.map(artist => artist.name).join(", ")}
        </p>
      </div>
    </>
  );
}
