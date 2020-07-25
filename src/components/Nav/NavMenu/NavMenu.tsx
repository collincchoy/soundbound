import React from "react";
import NavItem from "../NavItem/NavItem";

export default function NavMenu() {
  return (
    <>
      <NavItem
        name="Top"
        linkTo="/top"
        subMenuItems={[
          { name: "Artists", linkTo: "/top/artists" },
          { name: "Tracks", linkTo: "/top/tracks" },
        ]}
      />
      <NavItem name="Lab" linkTo="/lab" />

      {/* <div className="navbar-item has-dropdown is-hoverable">
        <NavLink className="navbar-link" to="/">
          Discover
        </NavLink>

        <div className="navbar-dropdown">
          <NavLink className="navbar-item" to="/">
            Artists
          </NavLink>
          <NavLink className="navbar-item" to="/">
            Genres
          </NavLink>
          <hr className="navbar-divider" />
          <NavLink className="navbar-item" to="/">
            Report an issue
          </NavLink>
        </div>
      </div> */}
    </>
  );
}
