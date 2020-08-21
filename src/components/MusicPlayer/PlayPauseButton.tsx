import React, { ButtonHTMLAttributes } from "react";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  isPlaying,
  play,
  pause,
  onClick,
  ...props
}) => {
  return isPlaying ? (
    <PauseButton
      onClick={(e) => {
        onClick && onClick(e);
        pause();
      }}
      {...props}
    />
  ) : (
    <PlayButton
      onClick={(e) => {
        onClick && onClick(e);
        play();
      }}
      {...props}
    />
  );
};

export default PlayPauseButton;
