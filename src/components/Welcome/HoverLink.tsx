import styled from "styled-components";

interface HoverLinkProps {
  hoverColor: string;
  color: string;
}

const HoverLink = styled.a<HoverLinkProps>`
  font-weight: 500px;
  text-decoration: underline;
  color: ${(p) => p.color} !important; /*Override css <a> selectors*/
  background-image: linear-gradient(
    to left,
    transparent 50%,
    ${(p) => p.hoverColor ?? p.color} 50%
  );
  background-size: 200% 100%;
  background-position: bottom right;
  transition: background 0.8s ease;

  &:hover {
    color: ${(p) => p.color} !important; /*Override css <a> selectors*/
    background-image: linear-gradient(
      to right,
      ${(p) => p.hoverColor ?? p.color} 50%,
      transparent 50%
    );
    background-position: bottom left;
  }
`;

export default HoverLink;
