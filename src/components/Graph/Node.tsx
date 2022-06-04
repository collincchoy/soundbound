import React from "react";
import styled from "styled-components";

interface Props {
  size?: number;
  fill?: string;
}

const StyledSvg = styled.svg<Props>`
  z-index: 200;
`;

const Node = ({ size = 150, fill = "#C4C4C4" }: Props) => {
  return (
    <StyledSvg width={size} height={size}>
      <ellipse
        cx={size / 2}
        cy={size / 2}
        rx={size / 2}
        ry={size / 2}
        fill={fill}
      />
    </StyledSvg>
  );
};

export default Node;
