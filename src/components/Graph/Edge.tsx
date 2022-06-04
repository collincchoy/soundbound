import React from "react";
import styled from "styled-components";

interface Props {
  length: string;
  strokeWidth: string;
}

const StyledSvg = styled.svg<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.length};
  transform: translateX(-100%);
  z-index: 100;
`;

export const Edge = (props: Props) => {
  return (
    <StyledSvg {...props}>
      <line x1="100%" stroke="white" strokeWidth={props.strokeWidth} />
    </StyledSvg>
  );
};
