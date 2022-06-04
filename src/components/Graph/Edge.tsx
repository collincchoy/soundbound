import React from "react";
import styled from "styled-components";

interface Props {
  length: string;
  strokeWidth: string;
}

const StyledSvg = styled.svg<Props>`
  position: absolute;
  width: ${(props) => props.length};
  transform: translate(-100%, 50%);
  z-index: 100;
`;

export const Edge = (props: Props) => {
  return (
    <StyledSvg {...props}>
      <line x1="100%" strokeWidth={props.strokeWidth} stroke="#08D4B0" />
    </StyledSvg>
  );
};
