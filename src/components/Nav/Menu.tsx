import React from "react";
import { NavLink } from "react-router-dom";

export default function NavMenu() {
  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <NavLink className="navbar-link" to="/top" activeClassName="is-active">
          Top
        </NavLink>

        <div className="navbar-dropdown">
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/top/artists"
          >
            Artists
          </NavLink>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/top/tracks"
          >
            Tracks
          </NavLink>
        </div>
      </div>

      <NavLink className="navbar-item" to="/lab" activeClassName="is-active">
        Lab
      </NavLink>

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
