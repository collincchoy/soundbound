import React, { useRef } from "react";
import styled from "styled-components";

type LinePoints = {
  x1?: string;
  y1?: string;
  x2: string;
  y2?: string;
};

type Direction = "left" | "down-left" | "up-left";

const directionPoints = new Map<Direction, LinePoints>([
  ["left", { x2: "100%" }],
  ["down-left", { x2: "100%", y1: "100%" }],
  ["up-left", { x2: "100%", y2: "100%" }],
]);

const directionTranslation = new Map<Direction, string>([
  ["left", "-50%, 50%"],
  ["down-left", "-50%, 50%"],
  ["up-left", "-50%, -50%"],
]);

interface Props {
  length: string;
  strokeWidth: string;
  direction: Direction;
  collapsed?: boolean;
}

const StyledSvg = styled.svg<Props>`
  position: absolute;
  width: ${({ length }) => length};
  transform: translate(
    ${({ direction }) => directionTranslation.get(direction)}
  );
  z-index: 100;

  height: 125px;
`;

const Line = styled.line<Pick<Props, "length" | "collapsed">>`
  transition: stroke-dashoffset 1s ease;

  stroke-dasharray: ${({ length }) => length};
  stroke-dashoffset: ${({ collapsed, length }) => (collapsed ? length : 0)};
`;

export const Edge = ({
  length,
  strokeWidth,
  direction,
  collapsed = false,
}: Props) => {
  const lineRef = useRef<SVGLineElement>(null);

  return (
    <StyledSvg length={length} strokeWidth={strokeWidth} direction={direction}>
      <Line
        ref={lineRef}
        {...directionPoints.get(direction)}
        collapsed={collapsed}
        length={`${lineRef?.current?.getTotalLength() || undefined}`}
        strokeWidth={strokeWidth}
        stroke="#2cc8ab"
      />
    </StyledSvg>
  );
};
