import Image from "components/Image";
import { useMusicPlayer } from "components/MusicPlayer/Context";
import React from "react";
import { Track } from "spotify/types";
import styled, { css } from "styled-components";
import { colonizeMilliseconds, last } from "utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import PlayPauseButton from "components/MusicPlayer/PlayPauseButton";

interface Props {
  tracks: Track[];
}

export const TrackList = ({ tracks }: Props) => {
  const musicPlayer = useMusicPlayer();

  function toggleTrack(track: Track) {
    if (!musicPlayer.currentTrackIs(track)) {
      musicPlayer.changeTrack(track);
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
          <GridArea area="name" className="has-text-weight-bold">
            {track.name}
          </GridArea>

          <GridArea area="album">
            <FontAwesomeIcon
              className="has-text-black-bis"
              icon={faRecordVinyl}
              style={{ marginRight: "0.25rem" }}
            />
            {track.album.name}
          </GridArea>

          <GridArea area="controls">
            <PlayPauseButton
              onClick={() => toggleTrack(track)}
              isPlaying={
                musicPlayer.currentTrackIs(track) && musicPlayer.isPlaying
              }
              onPlay={musicPlayer.play}
              onPause={musicPlayer.pause}
              disabled={!track.preview_url}
              withOverlay={false}
            />
          </GridArea>

          <GridArea area="duration">
            {colonizeMilliseconds(track.duration_ms)}
          </GridArea>
        </ListItem>
      ))}
    </List>
  );
};

const List = styled.ol`
  list-style-type: none;
  background-color: #343434;
  border-radius: 8px;
  padding: 1px;
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
