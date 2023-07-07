import React, { useEffect, useRef } from "react";
import { ReactComponent as PlayPauseIcon } from "./PlayPauseWithCircle.svg";
import styled from "styled-components";

type PlayPauseButtonProps = {
  isPlaying: boolean;
  onPlay: () => Promise<void>;
  onPause: () => void;
  withOverlay?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PlayPauseButton({
  isPlaying,
  onPlay,
  onPause,
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
      onPause();
    } else {
      await onPlay();
    }
  }
  return (
    <StyledButtonWithOverlay
      title={buttonName}
      aria-label={buttonName}
      type="button"
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <PlayPauseIcon />
    </StyledButtonWithOverlay>
  );
}

const StyledButtonWithOverlay = styled.button.attrs((p) => ({
  className: "button " + p.className ?? "",
}))`
  ${(p: { withOverlay?: boolean }) =>
    p.withOverlay &&
    `    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `};

  --transition-duration: 0.3s;
  background-color: unset;
  transition: background-color var(--transition-duration);

  height: 100%;
  width: 100%;
  cursor: pointer;
  border: none;
  border-radius: 0; // override radius from .button

  svg {
    color: hsl(0deg 0% 70%);
    opacity: 0.5;
    transition: color var(---transition-duration);
  }

  &:hover {
    svg {
      color: hsl(0, 0%, 100%);
      opacity: 1;
    }
    --bg-color: hsla(0, 0%, 10%, 50%);
    background-color: var(--bg-color);
    /* box-shadow: 0 1px 1px 1px var(--bg-color); */
  }
`;
