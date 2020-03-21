import React from "react";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./Nav/Bar";

const styles = {
  minHeight: "100vh",
  paddingTop: "20px",
  /*Account for music player(80px) + 20px*/
  paddingBottom: "100px"
};

export default function PageContent(props: { children?: any }) {
  return (
    <>
      <div className="section" style={styles}>
        <NavBar />
        <div className="container">{props.children}</div>
      </div>
      <MusicPlayer />
    </>
  );
}
