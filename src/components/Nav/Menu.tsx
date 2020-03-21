import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  font-size: 1.2rem;
`;

export default function NavMenu() {
  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <StyledNavLink
          className="navbar-link is-arrowless"
          to="/top"
          activeClassName="is-active"
        >
          Top
        </StyledNavLink>

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

      <StyledNavLink
        className="navbar-item"
        to="/lab"
        activeClassName="is-active"
      >
        Lab
      </StyledNavLink>

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
