import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMusicPlayer } from "components/MusicPlayer/Context";
import React from "react";
import { Track } from "spotify/types";
import styled from "styled-components";

export default function AddToQueueButton({ track }: { track: Track }) {
  const { addToPlayQueue } = useMusicPlayer();
  const disabled = !track.preview_url;
  return (
    <StyledButton
      className="button is-inverted is-dark"
      title="Add to Queue"
      aria-label="Add to Queue"
      onClick={() => addToPlayQueue(track)}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={faPlusCircle} size="lg" />

      {/* Do not do slide-in on hover if button is disabled */}
      {!disabled && <ButtonText>Add to Queue</ButtonText>}
    </StyledButton>
  );
}

const ButtonText = styled.span.attrs({
  className: "is-size-7",
})`
  max-width: 0px;
  opacity: 0;
  margin-inline-start: 0px;
  transition: opacity 0.5s 0.1s, max-width 0.5s 0.1s,
    // margin is faster so the text doesn't "bump out" at the end of the transition
      margin-inline-start 0.2s 0.1s;
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
