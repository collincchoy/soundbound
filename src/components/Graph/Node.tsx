import React from "react";
import styled, { css, keyframes, Keyframes } from "styled-components";

type Direction = "left" | "downLeft" | "upLeft" | "right";

interface Props {
  size?: number;
  scaleTo?: number;
  color?: string;
  imageUrl?: string;
  collapsed?: boolean;
  move?: Direction;
  onClick?: (ev: React.MouseEvent<SVGElement>) => void;
  bubbleAnimation?: boolean;
  title?: string;
}

const Node = ({
  size = 125,
  scaleTo = undefined,
  color = "#C4C4C4",
  imageUrl,
  collapsed = false,
  move = undefined,
  onClick,
  bubbleAnimation = false,
  title = undefined,
}: Props) => {
  // @ts-ignore  fixme on upgrade of TS>4.6
  const patternId = window.crypto.randomUUID();
  const fill = imageUrl ? `url(#${patternId})` : color;
  return (
    <Mover move={move} title={title}>
      <StyledSvg
        width={size}
        height={size}
        collapsed={collapsed}
        onClick={onClick}
        scaleTo={scaleTo}
        bubbleAnimation={bubbleAnimation}
      >
        {imageUrl && (
          <defs>
            <pattern
              id={patternId}
              patternUnits="userSpaceOnUse"
              height={size}
              width={size}
            >
              <image
                x="0"
                y="0"
                height={size}
                width={size}
                xlinkHref={imageUrl}
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
        )}

        <circle cx={size / 2} cy={size / 2} r={size / 2} fill={fill} />
      </StyledSvg>
    </Mover>
  );
};

const moveLeftAnimation = keyframes`
  20% {
    transform: translateX(0%) scale(1);
  }

  60% {
    transform: translateX(-100%);
  }

  80% {
    transform: translateX(-100%) scale(1.65);
  }

  100% {
    visibility: hidden;
    transform: translateX(-100%) scale(1.45);
  }
`;

const moveDownLeftAnimation = keyframes`
  20% {
    transform: translateX(0%) scale(1);
  }

  60% {
    transform: translate(-100%, 100%);
  }

  80% {
    transform: translate(-100%, 100%) scale(1.65);
  }

  100% {
    visibility: hidden;
    transform: translate(-100%, 100%) scale(1.45);
  }
`;

const moveUpLeftAnimation = keyframes`
  20% {
    transform: translateX(0%) scale(1);
  }

  60% {
    transform: translate(-100%, -100%);
  }

  80% {
    transform: translate(-100%, -100%) scale(1.65);
  }

  100% {
    visibility: hidden;
    transform: translate(-100%, -100%) scale(1.45);
  }
`;

const moveRightAnimation = keyframes`
  20% {
    transform: translateX(0%) scale(1);
  }

  60% {
    transform: translateX(100%);
  }

  80% {
    transform: translateX(100%) scale(1.65);
  }

  100% {
    visibility: hidden;
    transform: translateX(100%) scale(1.45);
  }
`;

const animations = new Map<Direction, Keyframes>([
  ["left", moveLeftAnimation],
  ["downLeft", moveDownLeftAnimation],
  ["upLeft", moveUpLeftAnimation],
  ["right", moveRightAnimation],
]);

const Mover = styled.div<{ move?: Direction }>`
  z-index: 200;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ move }) =>
    move
      ? css`
          animation: ${animations.get(move)} 3.5s ease-in-out;
        `
      : ""}
`;

const StyledSvg = styled.svg<Props>`
  box-shadow: 0px 0px 20px 0px #fa7c90;
  border-radius: 50%;

  &:hover {
    box-shadow: 0px 0px 20px 5px #fa7c90;
    cursor: pointer;
  }

  ${({ scaleTo }) =>
    scaleTo !== undefined
      ? css`
          transform: scale(${scaleTo});
        `
      : ""}

  ${({ bubbleAnimation }) =>
    bubbleAnimation
      ? css`
          animation: ${bubbleAnimationKf} 3.5s ease-in-out;
          transition: box-shadow 0.3s ease-in, transform 1s ease, scale 1s ease;
        `
      : css`
          transition: box-shadow 0.3s ease-in, transform 1s ease;
        `}
`;

const bubbleAnimationKf = keyframes`
  30% {
    transform: scale(1);
  }

  to {
    transform: scale(1);
  }
`;

export default Node;
