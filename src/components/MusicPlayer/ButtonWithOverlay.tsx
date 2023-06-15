import styled from "styled-components";

const ButtonWithOverlay = styled.button.attrs((p) => ({
  className: "button" + p.className,
}))`
  --transition-duration: 0.3s;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  padding: 20px;
  border: none;
  border-radius: 0; // override radius from .button
  background-color: transparent;
  transition: background-color var(--transition-duration);

  svg {
    color: hsl(0deg 0% 70% / 50%);
    transition: color var(---transition-duration);
  }

  &:hover {
    svg {
      color: hsla(0, 0%, 100%, 1);
    }
    --bg-color: hsla(0, 0%, 10%, 50%);
    background-color: var(--bg-color);
    /* box-shadow: 0 1px 1px 1px var(--bg-color); */
  }
`;

export default ButtonWithOverlay;
