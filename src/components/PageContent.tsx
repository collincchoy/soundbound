import React from "react";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./Nav/NavBar/NavBar";
import styled from "styled-components";

const StyledArticle = styled.article`
  min-height: 100vh;
  /* 100px @ bottom is to account for music player */
  padding: 0.75rem 1.5rem 100px 1.5rem;
`;

export default function PageContent(props: { children?: any }) {
  return (
    <>
      <StyledArticle>
        <NavBar />
        <div className="container">{props.children}</div>
      </StyledArticle>
      <MusicPlayer />
    </>
  );
}
