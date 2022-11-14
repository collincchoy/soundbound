import Image from "components/Image";
import { useMusicPlayer } from "components/MusicPlayer/Context";
import React from "react";
import { Track } from "spotify/types";
import styled, { css } from "styled-components";
import { last } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

interface Props {
  tracks: Track[];
}

export const TrackList = ({ tracks }: Props) => {
  const musicPlayer = useMusicPlayer();

  function playTrack(track: Track) {
    musicPlayer.changeTrack(track);
    musicPlayer.play();
  }

  function toggleTrackPlay(track: Track) {
    if (musicPlayer.currentTrackIs(track) && musicPlayer.isPlaying) {
      musicPlayer.pause();
    } else {
      playTrack(track);
    }
  }
  return (
    <List>
      {tracks.map((track) => (
        <ListItem key={track.id}>
          <GridArea area="cover">
            <Image
              className="is-64x64"
              src={last(track.album.images)?.url}
              alt="Album Cover"
            />
          </GridArea>
          <GridArea area="name">
            <BoldWhiteSpan>{track.name}</BoldWhiteSpan>
          </GridArea>

          <GridArea area="album">{track.album.name}</GridArea>

          <GridArea area="controls">
            <StyledPlayPauseButton
              onClick={() => toggleTrackPlay(track)}
              disabled={!track.preview_url}
            >
              <FontAwesomeIcon
                icon={
                  musicPlayer.currentTrackIs(track) && musicPlayer.isPlaying
                    ? faPauseCircle
                    : faPlayCircle
                }
                size="3x"
              />
            </StyledPlayPauseButton>
          </GridArea>

          <GridArea area="duration">{track.duration_ms}</GridArea>
        </ListItem>
      ))}
    </List>
  );
};

const StyledPlayPauseButton = styled.button`
  background-color: initial;
  border: none;
  cursor: pointer;
`;

const BoldWhiteSpan = styled.span`
  color: #f5f5f5;
  font-weight: 500;
  font-size: 1.25em;
`;

const List = styled.ol`
  list-style-type: none;
  background-color: #343434;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 0.5em;
  grid-template-areas:
    "cover name controls duration"
    "cover album controls duration";
  align-items: center;

  background-color: #414141;

  margin: 3px;
  border-radius: 5px;
  padding: 5px;

  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const GridArea = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
  ${({ area }) =>
    area === "name"
      ? css`
          align-self: end;
        `
      : area === "album"
      ? css`
          align-self: start;
        `
      : ""}
`;
