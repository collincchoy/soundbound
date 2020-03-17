import React from "react";
import styled from "styled-components";

const StyledTextWithHelp = styled.div<{ cursorIsHelp: boolean }>`
  position: relative;
  display: inline-block;
  cursor: ${({ cursorIsHelp }) => cursorIsHelp && "help"};
`;

const Tooltip = styled.span`
  font-size: 10px;
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 5px;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 400;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Appear on hover */
  ${StyledTextWithHelp}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

type TextWithHelpProps = {
  text: string;
  tip: string;
  cursorIsHelp?: boolean;
};

export default function TextWithHelp({
  text,
  tip,
  cursorIsHelp = true
}: TextWithHelpProps) {
  return (
    <StyledTextWithHelp cursorIsHelp={cursorIsHelp}>
      {text}
      <Tooltip>{tip}</Tooltip>
    </StyledTextWithHelp>
  );
}
