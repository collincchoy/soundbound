import React, { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

import { Track } from "../../spotify/types";
import { useMusicPlayer } from "../MusicPlayer/Context";
import Image from "components/Image";
import { useOverflowTextHandler } from "hooks/OverflowTextHandler";
import PlayPauseButton from "components/MusicPlayer/PlayPauseButton";
import TextWithHelp from "components/TextWithHelp";
import { trackAttributes } from "spotify/constants";
import { Link } from "react-router-dom";
import AddToQueueButton from "./AddToQueueButton";

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

      <StyledCardContent className="has-text-grey-dark">
        <div className="overflow-container">
          <p
            ref={artistTextElRef}
            className={`has-text-weight-bold has-text-dark scroll-on-overflow ${artistsTextIsOverflowing &&
              "overflowing"}`}
          >
            {artists.map((artist, i) => (
              <Fragment key={artist.id}>
                <Link
                  to={`/discover/${artist.id}`}
                  // invert the link colors. title+artist name in pink is too much
                  className="has-text-dark h:has-text-pink"
                >
                  {artist.name}
                </Link>
                {i < artists.length - 1 ? ", " : ""}
              </Fragment>
            ))}
          </p>
        </div>

        <div className="overflow-container">
          <TrackCardAlbumText
            ref={albumTextElRef}
            className={`is-size-7 scroll-on-overflow ${
              albumTextIsOverflowing ? "overflowing" : ""
            }`}
          >
            <FontAwesomeIcon
              className="has-text-black is-size-6"
              icon={faRecordVinyl}
              style={{ marginRight: "0.25rem" }}
            />

            {album.name}
          </TrackCardAlbumText>
        </div>
      </StyledCardContent>

      <footer className="card-footer">
        <AddToQueueButton track={track} />
      </footer>
    </div>
  );
}

const TrackPopularityContainer = styled.div.attrs((props) => ({
  className: "card-header-icon",
}))`
  padding-left: 0;
`;

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem;
`;

const TrackCardAlbumText = styled.p`
  display: flex;
  align-items: center;
  // this breaks the overflow css's text-overflow: ellipsis for some reason...
`;
