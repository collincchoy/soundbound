import React from "react";
import NavItem from "../NavItem/NavItem";

export default function NavMenu() {
  return (
    <>
      <NavItem
        name="Top"
        linkTo="/top"
        subMenuItems={[
          { name: "Tracks", linkTo: "/top/tracks" },
          { name: "Artists", linkTo: "/top/artists" },
        ]}
      />
      <NavItem name="Discover" linkTo="/discover" />

      <NavItem name="Lab" linkTo="/lab" />
    </>
  );
}
