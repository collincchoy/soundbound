import Image from "components/Image";
import React from "react";
import { Track } from "spotify/types";
import styled from "styled-components";
import { last } from "utils";

interface Props {
  tracks: Track[];
}

export const TrackList = ({ tracks }: Props) => {
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
            <BoldWhiteSpan className="is-bold is-light">
              {track.name}
            </BoldWhiteSpan>
          </GridArea>

          <GridArea area="album">{track.album.name}</GridArea>

          <GridArea area="controls">
            {/* <PlayButton onClick={() => null} /> */}
            <button className="button">Play</button>
          </GridArea>

          <GridArea area="duration">{track.duration_ms}</GridArea>
        </ListItem>
      ))}
    </List>
  );
};

const BoldWhiteSpan = styled.span`
  color: #f5f5f5;
  font-weight: 500;
`;

const List = styled.ol`
  list-style-type: none;
  background-color: #343434;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
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
`;
