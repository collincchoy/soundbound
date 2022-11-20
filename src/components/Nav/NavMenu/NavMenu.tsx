import React from "react";
import NavItem from "../NavItem/NavItem";

export default function NavMenu() {
  const shouldShowDiscover =
    process.env.REACT_APP_ENABLE_DISCOVER_PAGE === "true";
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
      <NavItem name="Lab" linkTo="/lab" />

      {shouldShowDiscover && <NavItem name="Discover" linkTo="/discover" />}
    </>
  );
}
