import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMusicPlayer } from "components/MusicPlayer/Context";
import React from "react";
import { Track } from "spotify/types";
import styled from "styled-components";

const ButtonText = styled.span.attrs({
  className: "is-size-7",
})`
  max-width: 0px;
  opacity: 0;
  margin-inline-start: 0px;
  transition: opacity 0.5s, max-width 0.5s, margin-inline-start 0.2s;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 100%;

  &:hover {
    ${ButtonText} {
      max-width: 100%;
      opacity: 1;
      margin-inline-start: var(--1stop);
    }
  }
`;

export default function AddToQueueButton({ track }: { track: Track }) {
  const { addToPlayQueue } = useMusicPlayer();
  return (
    <StyledButton
      className="button is-inverted is-dark"
      title="Add to queue"
      onClick={() => addToPlayQueue(track)}
      disabled={!track.preview_url}
    >
      <FontAwesomeIcon icon={faPlusCircle} size="lg" />
      <ButtonText>Add to Queue</ButtonText>
    </StyledButton>
  );
}
