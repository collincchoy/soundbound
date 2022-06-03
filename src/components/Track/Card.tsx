import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { Track } from "../../spotify/types";
import { useMusicPlayer } from "../MusicPlayer/Context";
import Image from "components/Image";
import { useOverflowTextHandler } from "hooks/OverflowTextHandler";
import PlayPauseButton from "components/MusicPlayer/PlayPauseButton";
import TextWithHelp from "components/TextWithHelp";
import { trackAttributes } from "spotify/constants";

const TrackPopularityContainer = styled.div.attrs((props) => ({
  className: "card-header-icon",
}))`
  padding-left: 0;
`;

const FooterButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.75rem;
  margin: 5px;
`;

const popularityHelpText = trackAttributes.filter(
  (attr) => attr.name === "popularity"
)[0].description;

export type TrackCardProps = {
  track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
  const { name, artists, external_urls, id, album, popularity } = track;
  const {
    currentTrack,
    changeTrack,
    play,
    pause,
    isPlaying,
    addToPlayQueue,
  } = useMusicPlayer();

  const {
    hasOverflowingText: headerIsOverflowing,
    elRef: headerElRef,
  } = useOverflowTextHandler<HTMLAnchorElement>();

  const {
    hasOverflowingText: artistsTextIsOverflowing,
    elRef: artistTextElRef,
  } = useOverflowTextHandler<HTMLParagraphElement>();
  const {
    hasOverflowingText: albumTextIsOverflowing,
    elRef: albumTextElRef,
  } = useOverflowTextHandler<HTMLParagraphElement>();

  return (
    <div className="card">
      <header className="card-header">
        <p
          className="card-header-title overflow-container"
          style={{ paddingRight: "0.25em" }}
        >
          <a
            href={external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            ref={headerElRef}
            className={`scroll-on-overflow ${headerIsOverflowing &&
              "overflowing"}`}
          >
            {name}
          </a>
        </p>

        <TrackPopularityContainer>
          <TextWithHelp text={"" + popularity} tip={popularityHelpText} />
        </TrackPopularityContainer>
      </header>

      <div className="card-image">
        <Image
          className="is-square"
          src={album.images[1]?.url}
          alt={album.name}
        />

        <PlayPauseButton
          onClick={() => currentTrack?.id !== id && changeTrack(track)}
          {...{ isPlaying: currentTrack?.id === id && isPlaying, play, pause }}
          disabled={!track.preview_url}
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
            {artists.map((artist) => artist.name).join(", ")}
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
        <FooterButton
          className="button"
          title="Add to queue"
          onClick={() => addToPlayQueue(track)}
          disabled={!track.preview_url}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="lg" />
        </FooterButton>
      </footer>
    </div>
  );
}
