import styled from "styled-components";

const CardButtonOverlay = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  padding: 20px;
  border: none;
  background-color: transparent;

  svg {
    color: hsl(0deg 0% 70% / 50%);
  }

  &:hover {
    svg {
      color: hsla(0, 0%, 100%, 1);
    }
    --bg-color: hsla(0, 0%, 10%, 50%);
    background-color: var(--bg-color);
    box-shadow: 0 1px 1px 1px var(--bg-color);
  }
`;

export default CardButtonOverlay;
