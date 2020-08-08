import styled from "styled-components";

interface HoverLinkProps {
  hoverColor: string;
  color: string;
}

const HoverLink = styled.a<HoverLinkProps>`
  font-weight: 500px;
  text-decoration: underline;
  color: ${(p) => p.color} !important; /*Override css <a> selectors*/

  position: relative;
  z-index: 100;

  /* Clip the pseudo-element on-hover */
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;

  &::before {
    content: "";
    color: ${(p) => p.color} !important; /*Override css <a> selectors*/
    background-color: ${(p) => p.hoverColor};
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    left: -101%;
    transition: left 0.8s;
  }

  &:hover {
    &::before {
      left: 0;
    }
  }
`;

export default HoverLink;
