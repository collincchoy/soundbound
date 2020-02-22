import React from "react";

const styles = {
  "min-height": "100vh",
  paddingTop: "20px",
  /*Account for music player(80px) + 20px*/
  paddingBottom: "100px",
  backgroundColor: "#292c34"
};

export default function PageContent(props: { children?: any }) {
  return (
    <div className="section" style={styles}>
      <div className="container">{props.children}</div>
    </div>
  );
}
