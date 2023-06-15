import React from "react";
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";
import ButtonWithOverlay from "./ButtonWithOverlay";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PlayPauseButton({
  isPlaying,
  play,
  pause,
  onClick,
  ...props
}: PlayPauseButtonProps) {
  let buttonName: string;
  let buttonIcon: JSX.Element;
  let onButtonClick: typeof play | typeof pause;
  if (isPlaying) {
    buttonName = "Pause";
    onButtonClick = pause;
    buttonIcon = <PauseIcon />;
  } else {
    buttonName = "Play";
    onButtonClick = play;
    buttonIcon = <PlayIcon />;
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick && onClick(e);
    onButtonClick();
  }
  return (
    <ButtonWithOverlay
      title={buttonName}
      aria-label={buttonName}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {buttonIcon}
    </ButtonWithOverlay>
  );
}
