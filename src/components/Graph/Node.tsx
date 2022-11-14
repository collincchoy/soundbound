import React from "react";
import styled, { css, keyframes } from "styled-components";

interface Props {
  size?: number;
  color?: string;
  imageUrl?: string;
  active?: boolean;
  collapsed?: boolean;
  moveLeft?: boolean;
  onClick?: (ev: React.MouseEvent<SVGElement>) => void;
}

const moveLeftAnimation = keyframes`
  0% {
    transform: translateX(0%) scale(1);
  }

  40% {
    transform: translateX(-100%);
  }

  60% {
    transform: translateX(-100%) scale(2);
  }

  80% {
    transform: translateX(-100%) scale(1);
  }

  100% {
    transform: translateX(0%) scale(1);
  }
`;

const Mover = styled.div<{ moveLeft?: boolean }>`
  z-index: 200;
  width: 100%;
  display: flex;
  justify-content: center;

  transition: transform 1s ease;
  ${({ moveLeft }) =>
    moveLeft
      ? css`
          animation: ${moveLeftAnimation} 4s ease-in-out;
        `
      : ""}
`;

const StyledSvg = styled.svg<Props>`
  transform: ${(props) =>
    props.active ? "scale(2)" : props.collapsed ? "scale(0)" : ""};

  box-shadow: 0px 0px 20px 0px #fa7c90;
  border-radius: 50%;

  &:hover {
    box-shadow: 0px 0px 20px 5px #fa7c90;
    cursor: pointer;
  }

  transition: box-shadow 0.3s ease-in, transform 1s ease;
`;

const Node = ({
  size = 125,
  color = "#C4C4C4",
  imageUrl,
  active = false,
  collapsed = false,
  moveLeft = false,
  onClick,
}: Props) => {
  // @ts-ignore  fixme on upgrade of TS>4.6
  const patternId = window.crypto.randomUUID();
  const fill = imageUrl ? `url(#${patternId})` : color;
  return (
    <Mover moveLeft={moveLeft}>
      <StyledSvg
        width={size}
        height={size}
        active={active}
        collapsed={collapsed}
        moveLeft={moveLeft}
        onClick={onClick}
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

export default Node;
