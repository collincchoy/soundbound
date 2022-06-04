import React from "react";
import styled from "styled-components";

interface Props {
  size?: number;
  color?: string;
  imageUrl?: string;
}

const StyledSvg = styled.svg<Props>`
  z-index: 200;
`;

const Node = ({ size = 150, color = "#C4C4C4", imageUrl }: Props) => {
  const fill = imageUrl ? "url(#image)" : color;
  return (
    <StyledSvg width={size} height={size}>
      {imageUrl && (
        <defs>
          <pattern
            id="image"
            patternUnits="userSpaceOnUse"
            height={size}
            width={size}
          >
            <image
              x="-25%"
              y="-25%"
              height={size * 1.5}
              width={size * 1.5}
              xlinkHref={imageUrl}
            />
          </pattern>
        </defs>
      )}

      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={fill} />
    </StyledSvg>
  );
};

export default Node;
