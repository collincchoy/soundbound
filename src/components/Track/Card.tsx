import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { Track } from "../../spotify/types";
import { useMusicPlayer } from "../MusicPlayer/Context";
import Image from "components/Image";
import { useOverflowTextHandler } from "hooks/OverflowTextHandler";
import PauseButton from "components/MusicPlayer/PauseButton";
import PlayButton from "components/MusicPlayer/PlayButton";

export type TrackCardProps = {
  track: Track;
};

export default function TrackCard(props: TrackCardProps) {
  const { name, artists, href, id, album, popularity } = props.track;
  const {
    currentTrack,
    changeTrack,
    play,
    pause,
    isPlaying,
    addToPlayQueue
  } = useMusicPlayer();

  function renderPlayPauseButton() {
    const sharedProps = { disabled: !props.track.preview_url };
    if (currentTrack?.id === id) {
      if (isPlaying) {
        return <PauseButton onClick={() => pause()} {...sharedProps} />;
      } else {
        return <PlayButton onClick={() => play()} {...sharedProps} />;
      }
    } else {
      return (
        <PlayButton
          onClick={() => {
            changeTrack(props.track);
            play();
          }}
          {...sharedProps}
        />
      );
    }
  }

  const {
    hasOverflowingText: headerIsOverflowing,
    elRef: headerElRef
  } = useOverflowTextHandler<HTMLAnchorElement>();

  const {
    hasOverflowingText: artistsTextIsOverflowing,
    elRef: artistTextElRef
  } = useOverflowTextHandler<HTMLParagraphElement>();
  const {
    hasOverflowingText: albumTextIsOverflowing,
    elRef: albumTextElRef
  } = useOverflowTextHandler<HTMLParagraphElement>();

  return (
    <div className="card">
      <header className="card-header">
        <p
          className="card-header-title overflow-container"
          style={{ paddingRight: "0.25em" }}
        >
          <a
            href={href}
            ref={headerElRef}
            className={`scroll-on-overflow ${headerIsOverflowing &&
              "overflowing"}`}
          >
            {name}
          </a>
        </p>
        <span className="card-header-icon" style={{ paddingLeft: 0 }}>
          {popularity}
        </span>
      </header>
      <div className="card-image">
        <Image
          className="is-square"
          src={album.images[1]?.url}
          alt={album.name}
        />
      </div>
      <div className="card-content has-text-centered">
        <div className="overflow-container">
          Artist(s):
          <p
            ref={artistTextElRef}
            className={`scroll-on-overflow ${artistsTextIsOverflowing &&
              "overflowing"}`}
          >
            {artists.map(artist => artist.name).join(", ")}
          </p>
        </div>
        <div className="overflow-container">
          Album:
          <p
            ref={albumTextElRef}
            className={`scroll-on-overflow ${
              albumTextIsOverflowing ? "overflowing" : ""
            }`}
          >
            {album.name}
          </p>
        </div>
      </div>
      <footer className="card-footer">
        <div className="card-footer-item">
          {renderPlayPauseButton()}
          <button
            className="button"
            title="Add to queue"
            onClick={() => addToPlayQueue(props.track)}
            disabled={!props.track.preview_url}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
      </footer>
    </div>
  );
}
