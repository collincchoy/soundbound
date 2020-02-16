import React from "react";

const styles = {
  paddingTop: "20px",
  /*Account for music player(80px) + 20px*/
  paddingBottom: "100px"
};

export default function div(props: { children?: any }) {
  return (
    <div className="section" style={styles}>
      {props.children}
    </div>
  );
}
