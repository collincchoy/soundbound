import React from "react";
import styled from "styled-components";

interface Props {
  size?: number;
  color?: string;
  imageUrl?: string;
  active?: boolean;
}

const StyledSvg = styled.svg<Props>`
  z-index: 200;

  transform: ${({ active }) => (active ? "scale(2)" : "")};
`;

const Node = ({
  size = 125,
  color = "#C4C4C4",
  imageUrl,
  active = false,
}: Props) => {
  // @ts-ignore  fixme on upgrade of TS>4.6
  const patternId = window.crypto.randomUUID();
  const fill = imageUrl ? `url(#${patternId})` : color;
  return (
    <StyledSvg width={size} height={size} active={active}>
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
  );
};

export default Node;
