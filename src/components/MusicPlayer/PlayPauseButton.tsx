import React, { useEffect, useRef } from "react";
import ButtonWithOverlay from "./ButtonWithOverlay";
import { ReactComponent as PlayPauseIcon } from "./PlayPauseWithCircle.svg";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  play: () => Promise<void>;
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
  if (isPlaying) {
    buttonName = "Pause";
  } else {
    buttonName = "Play";
  }

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const playToPauseAnimationTargets = [
      ref?.current?.querySelector<SVGAnimateElement>("#animate-to-left-pause"),
      ref?.current?.querySelector<SVGAnimateElement>("#animate-to-right-pause"),
    ];

    const pauseToPlayAnimationTargets = [
      ref?.current?.querySelector<SVGAnimateElement>("#animate-to-left-play"),
      ref?.current?.querySelector<SVGAnimateElement>("#animate-to-right-play"),
    ];

    if (isPlaying) {
      playToPauseAnimationTargets.forEach((animation) => {
        // @ts-ignore vscode sees this correctly but webpack doesn't - upgrade TS?
        animation?.beginElement();
      });
    } else {
      pauseToPlayAnimationTargets.forEach((animation) =>
        // @ts-ignore
        animation?.beginElement()
      );
    }
  }, [isPlaying]);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick && onClick(e);

    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }
  return (
    <ButtonWithOverlay
      title={buttonName}
      aria-label={buttonName}
      type="button"
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <PlayPauseIcon />
    </ButtonWithOverlay>
  );
}
