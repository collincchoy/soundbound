import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink).attrs(p => ({
  className: "navbar-link is-arrowless"
}))`
  font-size: 1.2rem;
`;

export default function NavMenu() {
  return (
    <>
      <div className="navbar-item has-dropdown is-hoverable">
        <StyledNavLink to="/top" activeClassName="is-active">
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
      <div className="navbar-item">
        <StyledNavLink to="/lab" activeClassName="is-active">
          Lab
        </StyledNavLink>
      </div>

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
