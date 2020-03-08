import React from "react";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./Nav/Bar";

const styles = {
  minHeight: "100vh",
  paddingTop: "20px",
  /*Account for music player(80px) + 20px*/
  paddingBottom: "100px",
  backgroundColor: "#292c34"
};

export default function PageContent(props: { children?: any }) {
  return (
    <>
      <NavBar />

      <div className="section" style={styles}>
        <div className="container">{props.children}</div>
      </div>
      <MusicPlayer />
    </>
  );
}
