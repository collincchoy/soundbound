import React from "react";
import styled from "styled-components";

type LinePoints = {
  x1: string;
  y1?: string;
  x2?: string;
  y2?: string;
};

type Direction = "left" | "down-left" | "up-left";

const directionPoints = new Map<Direction, LinePoints>([
  ["left", { x1: "100%" }],
  ["down-left", { x1: "100%", y2: "100%" }],
  ["up-left", { x1: "100%", y1: "100%" }],
]);

const directionTranslation = new Map<Direction, string>([
  ["left", "-75%, 50%"],
  ["down-left", "-75%, 50%"],
  ["up-left", "-75%, -50%"],
]);

interface Props {
  length: string;
  strokeWidth: string;
  direction: Direction;
}

const StyledSvg = styled.svg<Props>`
  position: absolute;
  width: ${(props) => props.length};
  transform: translate(
    ${({ direction }) => directionTranslation.get(direction)}
  );
  z-index: 100;

  height: 125px;
`;

export const Edge = ({ length, strokeWidth, direction }: Props) => {
  return (
    <StyledSvg length={length} strokeWidth={strokeWidth} direction={direction}>
      <line
        {...directionPoints.get(direction)}
        strokeWidth={strokeWidth}
        stroke="#2cc8ab"
      />
    </StyledSvg>
  );
};
